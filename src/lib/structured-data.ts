import { absoluteUrl, getRoute, siteConfig } from './site-config.mjs'

const processServices = [
  {
    id: `${absoluteUrl('/process/')}#discover`,
    name: 'Discover',
    description:
      'Map processes, data and systems, identify where AI will take the most work off the team, and deliver an implementation roadmap.',
  },
  {
    id: `${absoluteUrl('/process/')}#build`,
    name: 'Build',
    description:
      'Build a working system on real data and test it with the people who will use it.',
  },
  {
    id: `${absoluteUrl('/process/')}#deploy`,
    name: 'Deploy',
    description:
      'Connect the system to existing software, set guardrails, and roll it out into production in stages.',
  },
  {
    id: `${absoluteUrl('/process/')}#operate`,
    name: 'Operate',
    description:
      'Support, monitor and improve the live system, and hand everyday controls to the client’s team.',
  },
]

export function buildStructuredData(routeKey: string) {
  const route = getRoute(routeKey)

  if (!route.indexable || !route.pageType) {
    throw new Error(`Structured data is unavailable for ${routeKey}`)
  }

  const canonicalUrl = absoluteUrl(route.path)
  const organisationNode = {
    '@type': 'Organization',
    '@id': siteConfig.organisation.id,
    name: siteConfig.organisation.name,
    url: siteConfig.origin,
    logo: siteConfig.organisation.logo,
    description: siteConfig.organisation.description,
  }
  const websiteNode = {
    '@type': 'WebSite',
    '@id': siteConfig.websiteId,
    name: siteConfig.name,
    url: siteConfig.origin,
    inLanguage: siteConfig.htmlLang,
    publisher: { '@id': siteConfig.organisation.id },
  }
  const pageNode: Record<string, unknown> = {
    '@type': route.pageType,
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: route.title,
    description: route.description,
    inLanguage: siteConfig.htmlLang,
    isPartOf: { '@id': siteConfig.websiteId },
    about: { '@id': siteConfig.organisation.id },
  }
  const serviceNodes = routeKey === 'process'
    ? processServices.map((service) => ({
        '@type': 'Service',
        '@id': service.id,
        name: service.name,
        description: service.description,
        provider: { '@id': siteConfig.organisation.id },
        mainEntityOfPage: { '@id': `${canonicalUrl}#webpage` },
      }))
    : []

  if (serviceNodes.length > 0) {
    pageNode.hasPart = serviceNodes.map((service) => ({ '@id': service['@id'] }))
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [organisationNode, websiteNode, pageNode, ...serviceNodes],
  }
}


export function serialiseStructuredData(value: unknown) {
  // Escape characters that can terminate an inline script or change how a
  // JavaScript parser treats the serialised JSON payload.
  return JSON.stringify(value)
    .replaceAll('<', '\\u003c')
    .replaceAll('\u2028', '\\u2028')
    .replaceAll('\u2029', '\\u2029')
}
