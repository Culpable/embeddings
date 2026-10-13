import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'


test('process image wrapper is explicitly decorative', () => {
  // Prevent duplicate image announcements and focus on the decorative SVG.
  const image = readFileSync(
    new URL('../src/components/site/StylizedImage.astro', import.meta.url),
    'utf8',
  )
  assert.match(image, /aria-hidden="true"/u)
  assert.match(image, /focusable="false"/u)
  assert.match(image, /alt=""/u)
})
