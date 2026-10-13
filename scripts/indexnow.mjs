import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { setTimeout as sleep } from 'node:timers/promises';
import { parse } from 'parse5';

const ROOT = resolve(import.meta.dirname, '..');
const configuration = JSON.parse(readFileSync(resolve(ROOT, 'scripts/indexnow.config.json'), 'utf8'));
const ORIGIN = new URL(configuration.origin).origin;
const WORKER_NAME = configuration.workerName;
if (ORIGIN !== configuration.origin || !ORIGIN.startsWith('https://') || !WORKER_NAME || !Array.isArray(configuration.deployArgs)) {
  throw new Error('IndexNow requires a canonical HTTPS origin, production Worker name and deploy arguments.');
}
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const KEY_PATH = '/indexnow.txt';
const ATTEMPTS = 3;
const MAX_URLS = 10_000;


async function waitForRetry(milliseconds) {
  await sleep(milliseconds);
}


function hash(body) {
  return createHash('sha256').update(body).digest('hex');
}


/** Keep sitemap reads and submissions on the public marketing host. */
function canonicalUrl(value) {
  const url = new URL(value);
  if (url.origin !== ORIGIN || url.search || url.hash || url.username || url.password) {
    throw new Error('IndexNow requires canonical site URLs without query strings.');
  }
  return url;
}


function localFile(directory, url) {
  const path = decodeURIComponent(canonicalUrl(url).pathname);
  const file = resolve(directory, `.${path}`, path.endsWith('/') ? 'index.html' : '');
  if (!file.startsWith(`${resolve(directory)}${sep}`)) throw new Error('Sitemap path escapes the built site.');
  return file;
}


function sitemapLocations(xml) {
  if (!/<(?:urlset|sitemapindex)(?:\s|>)/.test(xml)) throw new Error('Invalid site sitemap.');
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => canonicalUrl(match[1].trim().replace(/&(amp|quot|apos|lt|gt);/g, (_entity, name) => ({ amp: '&', quot: '"', apos: "'", lt: '<', gt: '>' })[name])).href);
}


/** Check the actual robots declarations as well as sitemap membership. */
function noindex(html, headers = new Headers()) {
  if (/\b(?:noindex|none)\b/i.test(headers.get('x-robots-tag') ?? '')) return true;
  const visit = (node) => {
    const attrs = Object.fromEntries((node.attrs ?? []).map(({ name, value }) => [name, value]));
    if (node.tagName === 'meta' && /^(?:robots|bingbot)$/i.test(attrs.name ?? '') && /\b(?:noindex|none)\b/i.test(attrs.content ?? '')) return true;
    return (node.childNodes ?? []).some(visit);
  };
  return visit(parse(html));
}


function request(fetchImpl, url, options = {}) {
  return fetchImpl(url, { redirect: 'manual', signal: AbortSignal.timeout(12_000), cache: 'no-store', ...options });
}


/** Bound parallel reads so the article inventory does not delay every release. */
async function mapPages(pages, visit) {
  const values = [...pages];
  const results = [];
  for (let start = 0; start < values.length; start += 6) {
    results.push(...await Promise.all(values.slice(start, start + 6).map(visit)));
  }
  return results;
}


/** Derive submission candidates from the same generated sitemap as crawlers. */
export function readBuiltSite(distDirectory = resolve(ROOT, 'dist')) {
  const key = readFileSync(resolve(distDirectory, 'indexnow.txt'), 'utf8').trim();
  if (!/^[a-z0-9-]{8,128}$/i.test(key)) throw new Error('Invalid IndexNow ownership file.');
  const pages = new Map();
  const seen = new Set();
  const visit = (url) => {
    if (seen.has(url)) throw new Error('Repeated child sitemap.');
    if (seen.size >= 100) throw new Error('Too many child sitemaps.');
    seen.add(url);
    const xml = readFileSync(localFile(distDirectory, url), 'utf8');
    for (const location of sitemapLocations(xml)) {
      if (/<sitemapindex(?:\s|>)/.test(xml)) visit(location);
      else {
        if (!new URL(location).pathname.endsWith('/')) throw new Error('Sitemap page must use its canonical trailing slash.');
        const body = readFileSync(localFile(distDirectory, location), 'utf8');
        if (!noindex(body)) pages.set(location, { url: location, hash: hash(body) });
        if (pages.size > MAX_URLS) throw new Error('IndexNow batch exceeds 10,000 URLs.');
      }
    }
  };
  visit(`${ORIGIN}/sitemap.xml`);
  return { key, pages, distDirectory };
}


async function liveSitemap(fetchImpl) {
  const seen = new Set();
  const pages = new Set();
  const visit = async (url) => {
    if (seen.has(url) || seen.size >= 100) throw new Error('Invalid live child sitemap inventory.');
    seen.add(url);
    const response = await request(fetchImpl, canonicalUrl(url).href);
    if (response.status !== 200) throw new Error(`Live sitemap returned HTTP ${response.status}.`);
    const xml = await response.text();
    for (const location of sitemapLocations(xml)) {
      if (/<sitemapindex(?:\s|>)/.test(xml)) await visit(location);
      else pages.add(location);
      if (pages.size > MAX_URLS) throw new Error('Live sitemap exceeds 10,000 URLs.');
    }
  };
  await visit(`${ORIGIN}/sitemap.xml`);
  return pages;
}


async function planChanges(site, fetchImpl) {
  const keyResponse = await request(fetchImpl, `${ORIGIN}${KEY_PATH}`);
  if (keyResponse.status === 404 || keyResponse.status === 410) return [...site.pages.values()];
  if (keyResponse.status !== 200 || (await keyResponse.text()).trim() !== site.key) throw new Error('Live IndexNow ownership file does not match.');
  const previous = await liveSitemap(fetchImpl);
  const compared = await mapPages(site.pages.values(), async (page) => {
    const response = await request(fetchImpl, page.url, { headers: { accept: 'text/html' } });
    if (![200, 404, 410].includes(response.status)) throw new Error(`Page comparison returned HTTP ${response.status}.`);
    const body = await response.text();
    return !previous.has(page.url) || response.status !== 200 || noindex(body, response.headers) || hash(body) !== page.hash ? page : null;
  });
  const changes = compared.filter(Boolean);
  for (const url of previous) {
    if (!site.pages.has(url)) {
      const file = localFile(site.distDirectory, url);
      changes.push({ url, hash: existsSync(file) && statSync(file).isFile() ? hash(readFileSync(file, 'utf8')) : null });
    }
  }
  if (changes.length > MAX_URLS) throw new Error('Changed URL batch exceeds 10,000 URLs.');
  return changes;
}


/** Wait for deployed bytes, including the ownership file, before notifying. */
async function verifyPublication(site, changes, fetchImpl, wait) {
  for (let attempt = 0; attempt < ATTEMPTS; attempt += 1) {
    try {
      const keyResponse = await request(fetchImpl, `${ORIGIN}${KEY_PATH}`);
      if (keyResponse.status !== 200 || (await keyResponse.text()).trim() !== site.key) throw new Error('IndexNow ownership verification failed.');
      await mapPages(changes, async (page) => {
        canonicalUrl(page.url);
        const response = await request(fetchImpl, page.url, { headers: { accept: 'text/html' } });
        if (page.hash === null) {
          if (![301, 302, 307, 308, 404, 410].includes(response.status)) throw new Error('Removed page is still live.');
        } else if (response.status !== 200 || (site.pages.has(page.url) && /\b(?:noindex|none)\b/i.test(response.headers.get('x-robots-tag') ?? '')) || hash(await response.text()) !== page.hash) {
          throw new Error('Published page does not match the new build.');
        }
      });
      return;
    } catch (error) {
      if (attempt === ATTEMPTS - 1) throw error;
      await wait(2_000 * (attempt + 1));
    }
  }
}


export async function submitIndexNow(site, changes, { fetchImpl = fetch, wait = waitForRetry, log = console.log } = {}) {
  if (changes.length === 0) {
    log('IndexNow: no public pages changed; no notification sent.');
    return { status: null, count: 0 };
  }
  if (changes.length > MAX_URLS) throw new Error('IndexNow batch exceeds 10,000 URLs.');
  await verifyPublication(site, changes, fetchImpl, wait);
  for (let attempt = 0; attempt < ATTEMPTS; attempt += 1) {
    let response;
    try {
      response = await request(fetchImpl, ENDPOINT, {
        method: 'POST',
        headers: { 'content-type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ host: new URL(ORIGIN).hostname, key: site.key, keyLocation: `${ORIGIN}${KEY_PATH}`, urlList: changes.map(({ url }) => canonicalUrl(url).href) }),
      });
    } catch {
      if (attempt === ATTEMPTS - 1) throw new Error('IndexNow request failed after three attempts.');
      await wait(2_000 * (attempt + 1));
      continue;
    }
    if (response.status === 200 || response.status === 202) {
      log(`IndexNow: ${changes.length} URLs received (HTTP ${response.status})${response.status === 202 ? '; key validation pending' : ''}. Indexing is not guaranteed.`);
      return { status: response.status, count: changes.length };
    }
    if ((response.status !== 429 && response.status < 500) || attempt === ATTEMPTS - 1) throw new Error(`IndexNow returned HTTP ${response.status}.`);
    const retryAfter = response.headers.get('retry-after');
    const seconds = retryAfter === null ? NaN : Number(retryAfter);
    const delay = Number.isFinite(seconds) ? seconds * 1_000 : retryAfter ? Date.parse(retryAfter) - Date.now() : 2_000 * (attempt + 1);
    // Respect rate limits without holding a deployment job open indefinitely.
    if (delay > 30_000) throw new Error('IndexNow requested a later retry; retry after the rate-limit window.');
    await wait(Math.max(0, Number.isFinite(delay) ? delay : 2_000));
  }
  throw new Error('IndexNow retry limit exceeded.');
}


function wranglerDeploy() {
  return new Promise((resolveDeploy, reject) => {
    const child = spawn('npm', configuration.deployArgs, { cwd: ROOT, stdio: 'inherit' });
    child.once('error', reject);
    child.once('exit', (code, signal) => code === 0 ? resolveDeploy() : reject(new Error(`Deployment failed (${signal ?? code}).`)));
  });
}


export async function deployWithIndexNow({ distDirectory = resolve(ROOT, 'dist'), environment = /** @type {Record<string, string | undefined>} */ (process.env), fetchImpl = fetch, deploy = wranglerDeploy, wait = waitForRetry, log = console.log } = {}) {
  if (environment.WORKERS_CI !== '1' || environment.WORKERS_CI_BRANCH !== 'main' || (environment.WRANGLER_CI_OVERRIDE_NAME && environment.WRANGLER_CI_OVERRIDE_NAME !== WORKER_NAME)) {
    throw new Error(`Production deployment requires Cloudflare Workers Builds on main for ${WORKER_NAME}.`);
  }
  const site = readBuiltSite(distDirectory);
  // Preserve the pre-deployment comparison in memory; no database or public manifest.
  const changes = await planChanges(site, fetchImpl);
  log(`IndexNow: prepared ${changes.length} changed URLs; deploying ${WORKER_NAME}.`);
  await deploy();
  try {
    return await submitIndexNow(site, changes, { fetchImpl, wait, log });
  } catch (error) {
    log(`IndexNow retry URLs: ${changes.map(({ url }) => url).join(' ')}`);
    throw new Error(`Deployment succeeded; IndexNow notification failed: ${error.message} Retry with npm run indexnow -- --submit-all, adding any removed URLs shown above.`, { cause: error });
  }
}


async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) return deployWithIndexNow();
  const site = readBuiltSite();
  if (args[0] === '--dry-run' && args.length === 1) {
    const changes = await planChanges(site, fetch);
    console.log(`IndexNow dry run: ${changes.length} URLs; no deployment or submission.`);
    for (const page of changes) console.log(page.url);
    return;
  }
  if (args[0] === '--submit-all') {
    const changes = new Map(site.pages);
    for (const url of args.slice(1)) {
      canonicalUrl(url);
      const file = localFile(site.distDirectory, url);
      changes.set(url, { url, hash: existsSync(file) && statSync(file).isFile() ? hash(readFileSync(file, 'utf8')) : null });
    }
    return submitIndexNow(site, [...changes.values()]);
  }
  throw new Error('Use --dry-run or --submit-all [removed canonical URLs].');
}


if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
