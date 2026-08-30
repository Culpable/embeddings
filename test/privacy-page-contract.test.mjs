import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const source = readFileSync('src/app/privacy/page.jsx', 'utf8')
const footer = readFileSync('src/components/Footer.jsx', 'utf8')

test('privacy route provides a general notice and contact choices', () => {
  for (const marker of [
    'Privacy at Embeddings',
    'Last updated:',
    'Information handled by this site',
    'Sharing and retention',
    'service providers may handle technical and',
    'does not sell personal information',
    'solutions@embeddings.au',
    'Changes to this notice',
  ]) {
    assert.match(source, new RegExp(marker, 'u'))
  }
  assert.doesNotMatch(source, /lawful basis|GDPR compliant|retained for \d+/iu)
  assert.doesNotMatch(source, /Formspree|Mixpanel|session recording|heatmaps/iu)
})

test('footer links to privacy without changing the minimal header', () => {
  assert.match(footer, /title: 'privacy', href: '\/privacy'/u)
})
