import { defineConfig } from 'astro/config'
import { canonicalOrigin } from './src/config/canonical-origin.mjs'
import cloudflare from '@astrojs/cloudflare'
import { mixpanelRecorderEnabled, mixpanelRecordingPercent, mixpanelRecordsHeatmaps } from './src/lib/analytics-config.mjs'
import { fileURLToPath } from 'node:url'

// Prerender all documents; bundle only the contact endpoint for request-time use.
export default defineConfig({
  site: canonicalOrigin,
  output: 'static',
  trailingSlash: 'always',
  adapter: cloudflare({ imageService: 'compile', prerenderEnvironment: 'node' }),
  session: false,
  build: {
    format: 'directory',
    client: './',
    server: '../.astro-server/',
    // Keep first paint in one request when scripts must remain external for CSP.
    inlineStylesheets: 'always',
  },
  vite: {
    // Replace only the reviewed public analytics settings; browsers have no Node process object.
    define: {
      'process.env.NEXT_PUBLIC_MIXPANEL_RECORDING_PERCENT': JSON.stringify(String(mixpanelRecordingPercent)),
      'process.env.NEXT_PUBLIC_MIXPANEL_RECORD_HEATMAPS': JSON.stringify(String(mixpanelRecordsHeatmaps)),
    },
    resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)), 'embeddings-mixpanel-active-loader': fileURLToPath(new URL(mixpanelRecorderEnabled ? './src/lib/mixpanelFullLoader.js' : './src/lib/mixpanelCoreLoader.js', import.meta.url)) } },
    build: {
      // Couple this script setting with inlineStylesheets above to preserve CSS delivery.
      assetsInlineLimit: 0,
    },
  },
  server: { host: '127.0.0.1', port: 3002 },
})
