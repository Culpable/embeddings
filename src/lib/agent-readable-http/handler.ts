import {
  htmlDocumentResponse,
  markdownDocumentResponse,
  notAcceptableResponse,
  selectForRequest,
} from '../document-response.ts';
import {
  INTERNAL_MARKDOWN_PREFIX,
  assertSafeDocumentPath,
  routeToInternalMarkdownPath,
} from '../internal-path.ts';

const FIXED_MACHINE_PATHS = new Set(['/llms.txt', '/robots.txt', '/sitemap.xml']);
const ASSET_EXTENSION = /\.(?:avif|css|gif|ico|jpe?g|js|json|map|mjs|pdf|png|svg|txt|webmanifest|webp|woff2?|xml)$/i;

export interface NegotiatedAssetFetcher {
  (request: Request): Promise<Response>;
}

export function isDocumentPath(pathname: string): boolean {
  return !FIXED_MACHINE_PATHS.has(pathname) && !ASSET_EXTENSION.test(pathname);
}

export async function handleNegotiatedDocument(input: {
  request: Request;
  fetchPublicAsset: NegotiatedAssetFetcher;
  fetchInternalAsset: NegotiatedAssetFetcher;
}): Promise<Response> {
  const url = new URL(input.request.url);
  let safePath: string
  try { safePath = assertSafeDocumentPath(url.pathname) } catch { return new Response('Not found\n', { status: 404 }) }
  if (safePath === INTERNAL_MARKDOWN_PREFIX.slice(0, -1) || safePath.startsWith(INTERNAL_MARKDOWN_PREFIX)) {
    return new Response('Not found\n', { status: 404 });
  }
  if (!['GET', 'HEAD'].includes(input.request.method) || !isDocumentPath(url.pathname)) {
    return input.fetchPublicAsset(input.request);
  }

  const selection = selectForRequest(input.request);
  if (selection === null) return notAcceptableResponse(input.request);
  // Keep HTML cache validators out of a different representation's status and body.
  const sourceHeaders = new Headers(input.request.headers);
  if (selection === 'markdown') {
    for (const name of ['if-none-match', 'if-modified-since', 'if-match', 'if-unmodified-since', 'range', 'if-range']) sourceHeaders.delete(name);
  }
  const html = await input.fetchPublicAsset(new Request(input.request, { headers: sourceHeaders }));
  if (selection === 'html') return htmlDocumentResponse(input.request, html);

  const internalPath = html.status === 404
    ? `${INTERNAL_MARKDOWN_PREFIX}404.md`
    : routeToInternalMarkdownPath(url.pathname);
  const internalUrl = new URL(internalPath, url);
  const markdownAsset = await input.fetchInternalAsset(new Request(internalUrl, {
    method: 'GET',
  }));
  if (!markdownAsset.ok) {
    // Preserve the source document when its derivative is unavailable.
    return htmlDocumentResponse(input.request, html);
  }
  return markdownDocumentResponse(input.request, await markdownAsset.text(), html.status, html.headers);
}
