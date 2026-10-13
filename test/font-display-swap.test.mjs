import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'


test('local fonts do not block text paint while downloading', () => {
  // Reject the known blank-text signature without pinning font assets or metrics.
  const source = readFileSync(
    new URL('../src/styles/base.css', import.meta.url),
    'utf8',
  )
  assert.doesNotMatch(source, /font-display:\s*block\s*;/u)
})
