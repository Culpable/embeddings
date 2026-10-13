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
    title: 'Embeddings: Practical AI for Australian Businesses',
    description:
      'We design, build and run AI systems inside your existing software and data, from internal assistants to agents that coordinate work across teams.',
    llmsDescription:
      'Understand what Embeddings builds, the e-commerce specialism, and how engagements run.',
    llmsGroup: 'Offer and process',
    pageType: 'WebPage',
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
      'We combine deep technical expertise with hands-on implementation to help Australian businesses put AI to work.',
    llmsDescription:
      'Learn who Embeddings is, what the team builds, and the engineering focus behind the work.',
    llmsGroup: 'Company and trust',
    pageType: 'AboutPage',
    indexable: true,
    includeInSitemap: true,
    includeInLlms: true,
  },
  process: {
    path: '/process',
    outputFile: 'process.html',
    title: 'Our Process',
    description:
      'How we help Australian businesses put AI to work: find the opportunities, build on your real data, deploy it into production, and keep improving it.',
    llmsDescription:
      'Review the Discover, Build, Deploy, and Operate phases of an engagement.',
    llmsGroup: 'Offer and process',
    pageType: 'WebPage',
    indexable: true,
    includeInSitemap: true,
    includeInLlms: true,
  },
  contact: {
    path: '/contact',
    outputFile: 'contact.html',
    title: 'Contact Us',
    description: 'Contact us to learn how we can integrate AI into your business.',
    llmsDescription:
      'Prepare a business enquiry about the work, systems and data an AI project would involve.',
    llmsGroup: 'Contact',
    pageType: 'ContactPage',
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
    'We design, build and run AI systems inside your existing software and data, from internal assistants to agents that coordinate work across teams.',
  socialImage,
  organisation: {
    id: `${productionOrigin}/#organisation`,
    name: 'Embeddings',
    description:
      'Australian AI consultancy that designs, builds and runs AI systems inside organisations’ existing software and data, including custom shopping assistants for retailers.',
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
