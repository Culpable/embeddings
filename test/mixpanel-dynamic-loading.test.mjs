import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const mixpanelClientPath = resolve(process.cwd(), 'src/lib/mixpanelClient.js')
const instrumentationClientPath = resolve(
  process.cwd(),
  'src/instrumentation-client.js',
)
const appLayoutPath = resolve(process.cwd(), 'src/app/layout.jsx')
const contactFormPath = resolve(
  process.cwd(),
  'src/app/contact/ContactForm.jsx',
)

test('mixpanel browser package is loaded with a dynamic import', () => {
  // Prevent the analytics package from returning to the initial client bundle through a top-level import.
  const source = readFileSync(mixpanelClientPath, 'utf8')

  assert.doesNotMatch(
    source,
    /import\s+mixpanel\s+from\s+['"]mixpanel-browser['"]/,
    'Expected mixpanel-browser not to be imported at module evaluation time',
  )

  assert.match(
    source,
    /import\(['"]mixpanel-browser['"]\)/,
    'Expected mixpanel-browser to load through a dynamic import',
  )
})

test('client instrumentation schedules analytics after initial render work', () => {
  // Require idle scheduling so analytics does not compete with first paint and
  // does not hydrate a React provider on every static marketing route.
  const source = readFileSync(instrumentationClientPath, 'utf8')
  const layoutSource = readFileSync(appLayoutPath, 'utf8')

  assert.match(
    source,
    /requestIdleCallback/,
    'Expected client instrumentation to schedule analytics with requestIdleCallback when available',
  )

  assert.match(
    source,
    /setTimeout\(callback,\s*1500\)/,
    'Expected client instrumentation to include a timeout fallback for browsers without requestIdleCallback',
  )

  assert.doesNotMatch(
    layoutSource,
    /MixpanelProvider/,
    'Expected src/app/layout.jsx not to hydrate a global analytics provider',
  )
})

test('referral attribution loads after mixpanel instead of in the initial instrumentation bundle', () => {
  // Keep the heavier referral classifier out of the first client route chunk.
  const source = readFileSync(instrumentationClientPath, 'utf8')

  assert.doesNotMatch(
    source,
    /import\s+\{\s*initReferralTracking\s*\}\s+from\s+['"]@\/lib\/referralTracking['"]/,
    'Expected referral tracking not to be statically imported by client instrumentation',
  )

  assert.match(
    source,
    /import\(['"]@\/lib\/referralTracking['"]\)/,
    'Expected referral tracking to be loaded with a dynamic import',
  )

  assert.match(
    source,
    /pushState|popstate|embeddings:navigation/,
    'Expected client instrumentation to track client-side navigation without next/navigation hydration',
  )
})

test('client instrumentation preserves the initial landing page through delayed analytics setup', () => {
  // Capture the original landing path before client-side navigation can change
  // window.location during the idle analytics delay.
  const source = readFileSync(instrumentationClientPath, 'utf8')

  assert.match(
    source,
    /const\s+initialPagePath\s*=\s*typeof\s+window\s*===\s*['"]undefined['"]\s*\?\s*null\s*:\s*getPagePath\(\)/,
    'Expected the initial page path to be captured at module load',
  )

  assert.match(
    source,
    /function\s+trackPageView\s*\(\s*page\s*=\s*getPagePath\(\)\s*\)/,
    'Expected page-view tracking to accept an explicit path',
  )

  assert.match(
    source,
    /trackPageView\(initialPagePath\)/,
    'Expected analytics initialisation to queue the original landing path',
  )
})

test('mixpanel replay defaults stay light for public marketing pages', () => {
  // Keep core analytics while avoiding full-session recording and heatmap work
  // for every visitor by default.
  const source = readFileSync(mixpanelClientPath, 'utf8')

  assert.match(
    source,
    /track_pageview:\s*false/,
    'Expected automatic Mixpanel page-view tracking to stay disabled',
  )

  assert.doesNotMatch(
    source,
    /record_sessions_percent:\s*100/,
    'Expected session replay not to sample every visitor by default',
  )

  assert.match(
    source,
    /NEXT_PUBLIC_MIXPANEL_RECORDING_PERCENT\s*\?\?\s*'0'/,
    'Expected Mixpanel replay sampling to default to 0 for public marketing visits',
  )

  assert.match(
    source,
    /record_heatmap_data:\s*shouldRecordHeatmaps/,
    'Expected heatmap recording to be opt-in',
  )

  assert.match(
    source,
    /record_collect_fonts:\s*false/,
    'Expected font collection to stay disabled',
  )
})

test('contact form loads analytics only after visitor form intent', () => {
  // Keep Mixpanel out of the contact route’s initial client chunk while still
  // tracking budget, validation, submit, success, and failure events.
  const source = readFileSync(contactFormPath, 'utf8')

  assert.doesNotMatch(
    source,
    /import\s+\{\s*track\s*\}\s+from\s+['"]@\/lib\/mixpanelClient['"]/,
    'Expected ContactForm.jsx not to statically import mixpanel tracking',
  )

  assert.match(
    source,
    /function\s+trackContactEvent/,
    'Expected contact analytics calls to be centralised behind an intent loader',
  )

  assert.match(
    source,
    /import\(['"]@\/lib\/mixpanelClient['"]\)/,
    'Expected the contact form to dynamically load the Mixpanel client',
  )

  assert.match(
    source,
    /trackContactEvent\('Contact Form Submit Attempted'/,
    'Expected submit analytics to use the deferred contact analytics helper',
  )
})
