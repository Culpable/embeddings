import { siteImages } from './images'

/**
 * Site-wide metadata configuration
 * Uses environment variables for flexible URL handling:
 * - Development: http://localhost:3000 (from .env.development)
 * - Production: https://embeddings.au (from deployment)
 */
export const siteMetadata = {
  title: 'Embeddings: AI Shopping Agents for Australian Retailers',
  description: 'We build AI shopping agents that retailers own. Your catalogue, your brand, your customer conversations. Discovery, checkout, and support on your own site.',
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
      'We build AI shopping agents that Australian retailers own. Grounded in your enriched catalogue, connected to your systems, and live on your site in weeks.',
  },
}
