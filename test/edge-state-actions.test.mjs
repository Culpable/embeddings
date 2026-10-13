import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'


test('thank-you page offers a services follow-up action', () => {
  // Preserve a useful destination after the external submission redirect.
  const source = readFileSync(
    new URL('../src/app/thank-you/page.jsx', import.meta.url),
    'utf8',
  )
  assert.match(source, /href=["']\/#services["']/u)
})


test('not-found page offers process and contact recovery actions', () => {
  const source = readFileSync(
    new URL('../src/app/not-found.jsx', import.meta.url),
    'utf8',
  )
  assert.match(source, /href=["']\/process["']/u)
  assert.match(source, /href=["']\/contact["']/u)
})
