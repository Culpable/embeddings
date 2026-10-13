const productionOrigin = 'https://embeddings.au'

const socialImage = {
  path: '/images/embeddings-agentic-shopping-1200x630.webp',
  width: 1200,
  height: 630,
  mimeType: 'image/webp',
  alt: 'Embeddings retailer-owned AI shopping agent interface',
}

export const crawlerRegistry = [
  {
    accessClass: 'search',
    userAgents: ['OAI-SearchBot', 'ChatGPT-User'],
    rule: 'allow',
    providerUrl: 'https://developers.openai.com/api/docs/bots',
  },
  {
    accessClass: 'search',
    userAgents: ['Claude-SearchBot', 'Claude-User'],
    rule: 'allow',
    providerUrl:
      'https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler',
  },
  {
    accessClass: 'search',
    userAgents: ['PerplexityBot', 'Perplexity-User'],
    rule: 'allow',
    providerUrl:
      'https://docs.perplexity.ai/docs/resources/perplexity-crawlers',
  },
  {
    accessClass: 'model-training',
    userAgents: ['GPTBot'],
    rule: 'disallow',
    providerUrl: 'https://developers.openai.com/api/docs/bots',
  },
  {
    accessClass: 'model-training',
    userAgents: ['ClaudeBot'],
    rule: 'disallow',
    providerUrl:
      'https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler',
  },
  {
    accessClass: 'model-training',
    userAgents: ['Google-Extended'],
    rule: 'disallow',
    providerUrl:
      'https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers#google-extended',
  },
  {
    accessClass: 'bulk-dataset',
    userAgents: ['CCBot'],
    rule: 'disallow',
    providerUrl: 'https://commoncrawl.org/ccbot',
  },
]

export const routes = {
  home: {
    path: '/',
    outputFile: 'index.html',
    title: 'Embeddings: AI Shopping Agents for Australian Retailers',
    description:
      'We build AI shopping agents that Australian retailers own. Grounded in your enriched catalogue, connected to your systems, and live on your site in weeks.',
    llmsDescription:
      'Understand the retailer-owned shopping agent offer, commercial context, proof, and services.',
    llmsGroup: 'Offer and process',
    pageType: 'WebPage',
    expectedMarker: 'AI that works inside your organisation',
    indexable: true,
    includeInSitemap: true,
    includeInLlms: true,
    absoluteTitle: true,
  },
  about: {
    path: '/about',
    outputFile: 'about.html',
    title: 'About Us',
    description:
      'Meet the Australian consultancy building retailer-owned AI shopping agents with LLM pipeline engineering and data infrastructure at scale.',
    llmsDescription:
      'Learn who Embeddings is, what the team builds, and the engineering focus behind the work.',
    llmsGroup: 'Company and trust',
    pageType: 'AboutPage',
    expectedMarker: 'The team building Australia’s retailer-owned shopping agents',
    indexable: true,
    includeInSitemap: true,
    includeInLlms: true,
  },
  process: {
    path: '/process',
    outputFile: 'process.html',
    title: 'From Catalogue to Live Agent',
    description:
      'How Embeddings builds retailer-owned AI shopping agents: catalogue foundation, agent deployment, and live operation.',
    llmsDescription:
      'Review the Foundation, Deploy, and Operate phases from catalogue audit to a live agent.',
    llmsGroup: 'Offer and process',
    pageType: 'WebPage',
    expectedMarker: 'How we take you from catalogue to live agent',
    indexable: true,
    includeInSitemap: true,
    includeInLlms: true,
  },
  contact: {
    path: '/contact',
    outputFile: 'contact.html',
    title: 'Contact Us',
    description: 'Contact us to put your own AI shopping agent on your site.',
    llmsDescription:
      'Prepare a business enquiry about a product catalogue, commerce stack, and retailer-owned shopping agent.',
    llmsGroup: 'Contact',
    pageType: 'ContactPage',
    expectedMarker: 'Your agent starts here',
    indexable: true,
    includeInSitemap: true,
    includeInLlms: true,
  },
  privacy: {
    path: '/privacy',
    outputFile: 'privacy.html',
    title: 'Privacy',
    description:
      'How the Embeddings marketing site and business enquiries handle personal information.',
    llmsDescription:
      'Read how the marketing site and business enquiries handle personal information.',
    llmsGroup: 'Company and trust',
    pageType: 'WebPage',
    expectedMarker: 'Privacy at Embeddings',
    indexable: true,
    includeInSitemap: true,
    includeInLlms: true,
  },
  thankYou: {
    path: '/thank-you',
    outputFile: 'thank-you.html',
    title: 'Thank You',
    description: 'Confirmation that Embeddings received your business enquiry.',
    pageType: null,
    expectedMarker: 'We’ll review your enquiry',
    indexable: false,
    includeInSitemap: false,
    includeInLlms: false,
  },
  testMixpanel: {
    path: '/test-mixpanel',
    outputFile: 'test-mixpanel.html',
    title: 'Mixpanel Test',
    description: 'Internal Mixpanel integration checks for Embeddings.',
    pageType: null,
    expectedMarker: 'Mixpanel',
    indexable: false,
    includeInSitemap: false,
    includeInLlms: false,
  },
  notFound: {
    path: '/404',
    outputFile: '404.html',
    title: 'Page Not Found',
    description: 'The requested Embeddings page could not be found.',
    pageType: null,
    expectedMarker: 'Page not found',
    indexable: false,
    includeInSitemap: false,
    includeInLlms: false,
  },
}

export const siteConfig = {
  name: 'Embeddings',
  origin: productionOrigin,
  htmlLang: 'en-AU',
  openGraphLocale: 'en_AU',
  defaultTitle: routes.home.title,
  defaultDescription:
    'We build AI shopping agents that retailers own. Your catalogue, your brand, your customer conversations. Discovery, checkout, and support on your own site.',
  socialImage,
  organisation: {
    id: `${productionOrigin}/#organisation`,
    name: 'Embeddings',
    description:
      'Australian consultancy that builds retailer-owned AI shopping agents and the enriched product catalogues that power them.',
    logo: `${productionOrigin}/images/embeddings-logo.png`,
  },
  websiteId: `${productionOrigin}/#website`,
  publicEmail: 'solutions@embeddings.au',
  routes,
  crawlers: crawlerRegistry,
}

export function absoluteUrl(path) {
  return path === '/' ? productionOrigin : new URL(path, `${productionOrigin}/`).href
}


export function getRoute(routeKey) {
  const route = routes[routeKey]

  if (!route) {
    throw new Error(`Unknown route key: ${routeKey}`)
  }

  return route
}


export function getIndexableRoutes() {
  return Object.entries(routes).filter(([, route]) => route.indexable)
}
