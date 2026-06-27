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
