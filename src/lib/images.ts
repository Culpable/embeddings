/**
 * Site-wide image configuration
 * 
 * Featured image is stored in public/images/ to:
 * 1. Avoid Next.js image optimization (image is pre-optimized)
 * 2. Ensure consistent URL for social sharing
 * 3. Maintain direct path mapping with production URL
 * 
 * All other images should remain in src/images/ for Next.js optimization
 */
export const siteImages = {
  // Featured image path starts with / to reference from public directory
  // This creates a direct mapping to the production URL: https://embeddings.au/images/...
  featured: '/images/embeddings-agentic-shopping.png',
} as const

export type SiteImages = typeof siteImages 
