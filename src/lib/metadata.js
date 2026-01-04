import { siteImages } from './images'

/**
 * Site-wide metadata configuration
 * Uses environment variables for flexible URL handling:
 * - Development: http://localhost:3000 (from .env.development)
 * - Production: https://embeddings.au (from deployment)
 */
export const siteMetadata = {
  title: 'Embeddings: Generative AI for Australian Businesses',
  description: 'Helping Australian businesses leverage the power of generative AI and large language models.',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://embeddings.au',
  // Combine site URL with featured image path for absolute URL
  ogImage: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://embeddings.au'}${siteImages.featured}`,
  twitter: {
    cardType: 'summary_large_image'
  }
}

export const pageMetadata = {
  home: {
    title: siteMetadata.title,
    description:
      'Helping Australian businesses 10x their productivity with generative AI solutions. Offices in Perth and Melbourne.',
  },
}
