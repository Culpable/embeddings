import { absoluteUrl, getRoute, siteConfig } from './site-config.mjs'

const processServices = [
  {
    id: `${absoluteUrl('/process')}#foundation`,
    name: 'Foundation',
    description:
      'Audit and enrich the product catalogue, rank data gaps, and connect source systems for current stock, price, and status.',
  },
  {
    id: `${absoluteUrl('/process')}#deploy`,
    name: 'Deploy',
    description:
      'Build a retailer-owned shopping agent into the existing site and connect search, cart, checkout, order status, and returns.',
  },
  {
    id: `${absoluteUrl('/process')}#operate`,
    name: 'Operate',
    description:
      'Measure commercial outcomes, improve catalogue content from live demand, and give the retailer direct control of prompts and policies.',
  },
]

export function buildStructuredData(routeKey) {
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
  const pageNode = {
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


export function serialiseStructuredData(value) {
  // Escape characters that can terminate an inline script or change how a
  // JavaScript parser treats the serialised JSON payload.
  return JSON.stringify(value)
    .replaceAll('<', '\\u003c')
    .replaceAll('\u2028', '\\u2028')
    .replaceAll('\u2029', '\\u2029')
}
