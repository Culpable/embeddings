import { absoluteUrl, getRoute, siteConfig } from './site-config.mjs'

export const siteMetadata = {
  title: siteConfig.defaultTitle,
  description: siteConfig.defaultDescription,
  siteUrl: siteConfig.origin,
  ogImage: absoluteUrl(siteConfig.socialImage.path),
  twitter: {
    cardType: 'summary_large_image',
  },
}

export function buildPageMetadata(routeKey) {
  const route = getRoute(routeKey)
  const canonicalUrl = absoluteUrl(route.path)
  const title = route.absoluteTitle
    ? { absolute: route.title }
    : route.title
  const robots = route.indexable
    ? { index: true, follow: true }
    : { index: false, follow: false }

  return {
    title,
    description: route.description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots,
    openGraph: {
      title: route.title,
      description: route.description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: siteConfig.openGraphLocale,
      type: 'website',
      images: [
        {
          url: absoluteUrl(siteConfig.socialImage.path),
          type: siteConfig.socialImage.mimeType,
          width: siteConfig.socialImage.width,
          height: siteConfig.socialImage.height,
          alt: siteConfig.socialImage.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: route.title,
      description: route.description,
      images: [
        {
          url: absoluteUrl(siteConfig.socialImage.path),
          alt: siteConfig.socialImage.alt,
        },
      ],
    },
  }
}
