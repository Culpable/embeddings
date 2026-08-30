import { siteConfig } from './site-config.mjs'

/** Keep the typed image export as a compatibility layer over site configuration. */
export const siteImages = {
  featured: siteConfig.socialImage.path,
} as const

export type SiteImages = typeof siteImages
