import { siteImages } from './images'

/**
 * Site-wide metadata configuration
 * Uses environment variables for flexible URL handling:
 * - Development: http://localhost:3000 (from .env.development)
 * - Production: https://embeddings.au (from deployment)
 */
export const siteMetadata = {
  title: 'Embeddings: Agentic Shopping Readiness for Australian Retailers',
  description: 'Helping Australian retailers prepare their product catalogs for AI-driven commerce. Catalog audit, enrichment, and freshness services.',
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
      'We help Australian retailers become agentic-ready. Catalog audit, enrichment, freshness, and feedback services for the AI shopping revolution.',
  },
}
