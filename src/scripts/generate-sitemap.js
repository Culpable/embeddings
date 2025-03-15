/**
 * Sitemap Generation Script for embeddings.au
 * 
 * This script automatically generates a sitemap.xml file by scanning the project's
 * file structure to identify all pages based on Next.js 14 App Router conventions.
 * 
 * Output: public/sitemap.xml
 */

const fs = require('fs');
const path = require('path');
const globby = require('fast-glob');

// Import configuration from sitemap.js
const {
  SITE_URL,
  CORE_ROUTES,
  EXCLUDED_ROUTES,
  CHANGE_FREQUENCY,
  PRIORITIES
} = require('../lib/sitemap');

/**
 * Generate the sitemap by scanning the app directory structure
 * and creating a standardized sitemap.xml file
 */
async function generateSitemap() {
  console.log('Generating sitemap...');

  // Generate core URLs (always included)
  const coreUrls = CORE_ROUTES.map(route => {
    // Special handling for homepage
    const isHomepage = route === '/';
    
    return {
      url: `${SITE_URL}${route}`,
      lastmod: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      changefreq: isHomepage ? CHANGE_FREQUENCY.homepage : CHANGE_FREQUENCY.default,
      priority: isHomepage ? PRIORITIES.homepage : PRIORITIES.default
    };
  });
  
  // Discover dynamic URLs from the project file structure
  let pages = await globby([
    'src/app/**/page.jsx',
    'src/app/**/page.js',
    'src/app/**/page.tsx',
    'src/app/**/page.ts',
    // Exclude patterns
    '!src/app/api/**/*',              // API routes
    '!src/app/_*/**/*',               // Private folders (prefixed with _)
    '!**/_*.*',                       // Private files
    '!**/*.test.*',                   // Test files
    '!**/node_modules/**/*',          // node_modules
    '!**/not-found.*',                // Next.js special files
    '!**/loading.*',                  // Next.js special files
    '!**/error.*',                    // Next.js special files
    '!**/layout.*',                   // Next.js layout files
    '!**/template.*',                 // Next.js template files
    '!**/_disabled_pages/**/*',       // Disabled pages
  ]);
  
  // Process file paths into URLs
  const dynamicUrls = pages
    .map(page => {
      // Convert file path to route
      const route = page
        .replace('src/app', '')                    // Remove app directory prefix
        .replace(/\/(page)\.(jsx|js|tsx|ts)$/, '') // Remove page.jsx suffix
        .replace(/\/index$/, '')                   // Handle index routes
        .replace(/\/$/, '')                        // Remove trailing slash if present
        || '/';                                    // Default to / for empty path
      
      // No trailing slash for consistency (except homepage which is just /)
      const formattedRoute = route === '/' ? '/' : `${route}`;
      
      // Skip if this is an excluded route or already in core routes
      if (
        EXCLUDED_ROUTES.includes(formattedRoute) ||
        CORE_ROUTES.includes(formattedRoute)
      ) {
        return null;
      }
      
      return {
        url: `${SITE_URL}${formattedRoute}`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: CHANGE_FREQUENCY.default,
        priority: PRIORITIES.default
      };
    })
    .filter(Boolean); // Remove null entries
  
  // Combine core and dynamic URLs
  const allUrls = [...coreUrls, ...dynamicUrls];
  
  // Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    ({ url, lastmod, changefreq, priority }) => `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  // Ensure public directory exists
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // Write to file
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  
  // Log summary
  console.log(`Sitemap generated with ${allUrls.length} URLs`);
  console.log('Sitemap saved to public/sitemap.xml');
}

// Execute the function
generateSitemap().catch(error => {
  console.error('Error generating sitemap:', error);
  process.exit(1);
}); 