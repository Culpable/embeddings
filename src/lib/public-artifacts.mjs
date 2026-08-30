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
    '> Embeddings builds retailer-owned AI shopping agents and the enriched product catalogues that power them.',
    '',
    '**When to use:** Use these pages to understand Embeddings’ offer, process, company, privacy practices, or contact path.',
    '',
    '**When not to use:** Do not treat this file as product inventory, live availability, legal advice, or a substitute for the linked pages.',
    '',
    '**How to use:** Follow the canonical HTML links below and cite the page that supports each claim.',
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
