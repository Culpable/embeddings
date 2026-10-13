import { site } from '../config/site'

export interface PageMetadataInput {
  title: string
  description: string
  titleMode?: 'composed' | 'prefixed' | 'absolute'
  canonicalPath?: string
  indexable?: boolean
}


/** Reject incomplete metadata and compose each public title exactly once. */
export function resolveMetadata(input: PageMetadataInput, context: { site: URL; pathname: string }) {
  const title = input.title.trim(), description = input.description.trim()
  if (!title || !description || !site.name) throw new Error('Page metadata is incomplete.')
  const mode = input.titleMode ?? 'composed'
  if (mode === 'composed' && title.endsWith(site.titleSeparator + site.name)) throw new Error('Supply an uncomposed page title.')
  if (mode === 'prefixed' && (context.pathname !== '/' || title.startsWith(site.name + site.titlePrefixSeparator))) throw new Error('Only home uses an uncomposed prefixed title.')
  const path = input.canonicalPath ?? context.pathname
  if (!path.startsWith('/') || path.startsWith('//') || /[?#\\]/u.test(path)) throw new Error('Supply a canonical pathname.')
  const canonical = new URL(path, context.site).href
  const documentTitle = mode === 'absolute' ? title : mode === 'prefixed' ? site.name + site.titlePrefixSeparator + title : title + site.titleSeparator + site.name
  return { pageTitle: title, documentTitle, description, canonical, indexable: input.indexable !== false }
}
