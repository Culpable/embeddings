import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const nextConfigPath = resolve(process.cwd(), 'next.config.mjs')
const packagePath = resolve(process.cwd(), 'package.json')
const deployWorkflowPath = resolve(
  process.cwd(),
  '.github/workflows/deploy.yml',
)
const sitemapConfigPath = resolve(process.cwd(), 'src/lib/sitemap.js')
const testMixpanelLayoutPath = resolve(
  process.cwd(),
  'src/app/test-mixpanel/layout.jsx',
)

test('static export keeps next internals out of the published out directory', () => {
  // Keep Next build internals in .next so GitHub Pages receives only the
  // generated static export under out.
  const nextConfig = readFileSync(nextConfigPath, 'utf8')
  const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'))
  const deployWorkflow = readFileSync(deployWorkflowPath, 'utf8')

  assert.match(
    nextConfig,
    /output:\s*['"]export['"]/,
    'Expected Next to keep static export mode enabled',
  )

  assert.doesNotMatch(
    nextConfig,
    /distDir:\s*['"]out['"]/,
    'Expected Next build internals not to use out as distDir',
  )

  assert.match(
    packageJson.scripts.build,
    /rm -rf \.next out && node src\/scripts\/generate-sitemap\.js && next build/,
    'Expected npm run build to clean stale build output and generate sitemap before exporting',
  )

  assert.match(
    deployWorkflow,
    /rm -rf \.next out[\s\S]*npm run build/,
    'Expected deployment to clean stale build output before building',
  )
})


test('sitemap excludes internal debug routes', () => {
  // Keep internal diagnostics out of crawlable production metadata.
  const sitemapConfig = readFileSync(sitemapConfigPath, 'utf8')

  assert.match(
    sitemapConfig,
    /EXCLUDED_ROUTES\s*=\s*\[[\s\S]*['"]\/test-mixpanel['"]/,
    'Expected the internal Mixpanel debug page to be excluded from the public sitemap',
  )
})


test('internal debug routes opt out of indexing', () => {
  // Keep the diagnostics URL available for direct checks without presenting it
  // as a crawlable marketing page.
  const testMixpanelLayout = readFileSync(testMixpanelLayoutPath, 'utf8')

  assert.match(
    testMixpanelLayout,
    /robots:\s*\{[\s\S]*index:\s*false[\s\S]*follow:\s*false/,
    'Expected the internal Mixpanel debug route to declare noindex,nofollow metadata',
  )
})
