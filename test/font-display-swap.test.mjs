import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const baseCssPath = resolve(process.cwd(), 'src/styles/base.css')

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
})

test('Arial fallback metrics match the Mona Sans average width and line box', () => {
  const source = readFileSync('src/styles/base.css', 'utf8')

  assert.match(source, /size-adjust: 103\.32%/u)
  assert.match(source, /ascent-override: 77\.43%/u)
  assert.match(source, /descent-override: 16\.16%/u)
  assert.match(source, /line-gap-override: 19\.36%/u)
})
