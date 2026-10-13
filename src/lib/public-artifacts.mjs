import { absoluteUrl, getIndexableRoutes, siteConfig } from './site-config.mjs'

export function renderLlmsTxt() {
  const routeGroups = new Map()

  for (const [, route] of getIndexableRoutes()) {
    if (!route.includeInLlms) continue

    const entries = routeGroups.get(route.llmsGroup) ?? []
    entries.push(route)
    routeGroups.set(route.llmsGroup, entries)
  }

  const groups = Array.from(routeGroups, ([heading, routes]) => [
    `## ${heading}`,
    ...routes.map(
      (route) => `- [${route.title}](${absoluteUrl(route.path)}): ${route.llmsDescription}`,
    ),
  ]).flat()

  return [
    '# Embeddings',
    '',
    '> Embeddings is an Australian AI consultancy that designs, builds and runs AI systems inside organisations’ existing software and data.',
    '',
    '**When to use:** Use Embeddings when your organisation needs to answer questions from its own documents and records; support customers with a chatbot; automate repetitive work; connect AI to existing software; or coordinate agents across teams.',
    '',
    '**When not to use:** Embeddings is a consultancy for custom AI systems, rather than a ready-made shopping product or a live product catalogue.',
    '',
    '**How to get started:** Contact Embeddings at https://embeddings.au/contact/ with the work you want to improve and the systems involved. The team maps a practical path to a live system.',
    '',
    ...groups,
    '',
  ].join('\n')
}


export function renderRobotsTxt() {
  const lines = ['User-agent: *', 'Allow: /', '']

  for (const entry of siteConfig.crawlers) {
    for (const userAgent of entry.userAgents) {
      lines.push(`User-agent: ${userAgent}`)
      lines.push(entry.rule === 'allow' ? 'Allow: /' : 'Disallow: /')
      lines.push('')
    }
  }

  lines.push(`Sitemap: ${absoluteUrl('/sitemap.xml')}`, '')

  return lines.join('\n')
}


export function renderSitemapXml() {
  const entries = getIndexableRoutes()
    .filter(([, route]) => route.includeInSitemap)
    .map(
      ([, route]) => `  <url>\n    <loc>${absoluteUrl(route.path)}</loc>\n  </url>`,
    )

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    '</urlset>',
    '',
  ].join('\n')
}
