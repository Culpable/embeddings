import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

test('active route modules do not import Framer Motion', () => {
  for (const path of [
    'src/components/NavigationButton.jsx',
    'src/app/contact/ContactForm.jsx',
    'src/components/TransitionPresence.jsx',
  ]) {
    assert.doesNotMatch(readFileSync(path, 'utf8'), /framer-motion/u)
  }
})

test('analytics selects the core loader when recording features are disabled', () => {
  const source = readFileSync('src/lib/mixpanelClient.js', 'utf8')
  const nextConfig = readFileSync('next.config.mjs', 'utf8')
  const coreLoader = readFileSync('src/lib/mixpanelCoreLoader.js', 'utf8')
  assert.match(source, /import\('embeddings-mixpanel-active-loader'\)/u)
  assert.match(nextConfig, /mixpanelCoreLoader/u)
  assert.match(nextConfig, /embeddings-mixpanel-active-loader/u)
  assert.match(coreLoader, /loader-module-core/u)
  assert.match(source, /mixpanelRecorderEnabled/u)
  assert.match(source, /if \(mixpanelRecorderEnabled\)[\s\S]*record_sessions_percent/u)
})
