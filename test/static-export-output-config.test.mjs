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
