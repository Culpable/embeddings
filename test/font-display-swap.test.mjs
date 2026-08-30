import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const baseCssPath = resolve(process.cwd(), 'src/styles/base.css')
const layoutPath = resolve(process.cwd(), 'src/app/layout.jsx')

test('local display font uses swap instead of blocking text paint', () => {
  // Require visible fallback text while Mona Sans downloads.
  const source = readFileSync(baseCssPath, 'utf8')

  assert.match(
    source,
    /font-display:\s*swap;/,
    'Expected Mona Sans @font-face to use font-display: swap',
  )

  assert.doesNotMatch(
    source,
    /font-display:\s*block;/,
    'Did not expect blocking font display for Mona Sans',
  )

  assert.match(
    source,
    /url\('\/fonts\/Mona-Sans-latin\.var\.woff2'\)/u,
    'Expected Mona Sans to use the stable public font URL',
  )

  const layout = readFileSync(layoutPath, 'utf8')
  assert.match(
    layout,
    /rel="preload"[\s\S]*href="\/fonts\/Mona-Sans-latin\.var\.woff2"[\s\S]*as="font"/u,
    'Expected the shared layout to preload the LCP font',
  )
})

test('Arial fallback metrics match the Mona Sans average width and line box', () => {
  const source = readFileSync('src/styles/base.css', 'utf8')

  assert.match(source, /size-adjust: 103\.32%/u)
  assert.match(source, /ascent-override: 77\.43%/u)
  assert.match(source, /descent-override: 16\.16%/u)
  assert.match(source, /line-gap-override: 19\.36%/u)
})
