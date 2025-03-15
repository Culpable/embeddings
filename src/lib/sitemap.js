/**
 * Sitemap Configuration
 * 
 * This file contains settings for the sitemap generation process.
 * Update these values when new routes need to be added or removed.
 */

/**
 * Base URL for the website
 * Used as prefix for all URLs in the sitemap
 */
const SITE_URL = 'https://embeddings.au';

/**
 * Core routes that are always included in the sitemap
 * These routes should NOT have trailing slashes (except homepage which is just /)
 */
const CORE_ROUTES = [
  '/',             // Homepage
  '/about',        // About page
  '/process',      // Process page
  '/contact',      // Contact page
];

/**
 * Routes that should be excluded from the sitemap
 * These should also NOT have trailing slashes for consistency
 */
const EXCLUDED_ROUTES = [
  '/404',          // 404 page
  '/500',          // 500 page
];

/**
 * Change frequency settings for different types of pages
 */
const CHANGE_FREQUENCY = {
  homepage: 'daily',
  default: 'monthly',
};

/**
 * Priority settings for different types of pages (0.0 to 1.0)
 */
const PRIORITIES = {
  homepage: 1.0,
  default: 0.8,
};

// CommonJS exports for use in Node.js scripts
module.exports = {
  SITE_URL,
  CORE_ROUTES,
  EXCLUDED_ROUTES,
  CHANGE_FREQUENCY,
  PRIORITIES,
}; 