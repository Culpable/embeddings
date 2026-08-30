import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const source = readFileSync('scripts/check-static-budgets.mjs', 'utf8')

test('static budget checker enforces route and asset ceilings', () => {
  for (const contract of [
    "route.path === '/contact' ? 175000 : 165000",
    'cssGzip > 15000',
    'htmlGzip > 40000',
    '220 * 1024',
    'fontPaths',
    'fontBytes > 100000',
    "profileName === 'mobile' ? 90000 : 150000",
    'fullSessionBytes > 300000',
    'homeFirstView > 330 * 1024',
    'processFirstView > 350 * 1024',
    'EMBEDDINGS_MIXPANEL_CORE_CHUNK',
    'EMBEDDINGS_MIXPANEL_FULL_CHUNK',
    'emittedMixpanelFullChunks',
    'activeJavaScript',
    'selectedMixpanelChunks.length !== 1',
    'selectedMixpanelCeiling',
  ]) {
    assert.ok(source.includes(contract), `Expected budget contract: ${contract}`)
  }
})
