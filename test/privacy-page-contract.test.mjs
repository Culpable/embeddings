import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const source = readFileSync('src/app/privacy/page.jsx', 'utf8')
const footer = readFileSync('src/components/Footer.jsx', 'utf8')


test('privacy notice retains its legal commitments and contact destination', () => {
  // Preserve the legal commitment and contact destination, not section wording.
  assert.match(source, /does not sell personal information/u)
  assert.match(source, /mailto:solutions@embeddings\.au/u)
  assert.doesNotMatch(source, /GDPR compliant|retained for \d+/iu)
  assert.doesNotMatch(source, /session recording|heatmaps/iu)
})


test('footer retains a privacy destination', () => {
  assert.match(footer, /href:\s*['"]\/privacy['"]/u)
})
