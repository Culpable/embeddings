import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const mixpanelClientPath = resolve(process.cwd(), 'src/lib/mixpanelClient.js')
const mixpanelProviderPath = resolve(
  process.cwd(),
  'src/components/MixpanelProvider.jsx',
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

test('mixpanel provider schedules analytics after initial render work', () => {
  // Require idle scheduling so analytics does not compete with first paint.
  const source = readFileSync(mixpanelProviderPath, 'utf8')

  assert.match(
    source,
    /requestIdleCallback/,
    'Expected MixpanelProvider to schedule analytics with requestIdleCallback when available',
  )

  assert.match(
    source,
    /setTimeout\(callback,\s*1500\)/,
    'Expected MixpanelProvider to include a timeout fallback for browsers without requestIdleCallback',
  )
})


test('referral attribution loads after mixpanel instead of in the initial provider bundle', () => {
  // Keep the heavier referral classifier out of the first client route chunk.
  const source = readFileSync(mixpanelProviderPath, 'utf8')

  assert.doesNotMatch(
    source,
    /import\s+\{\s*initReferralTracking\s*\}\s+from\s+['"]@\/lib\/referralTracking['"]/,
    'Expected referral tracking not to be statically imported by MixpanelProvider',
  )

  assert.match(
    source,
    /import\(['"]@\/lib\/referralTracking['"]\)/,
    'Expected referral tracking to be loaded with a dynamic import',
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
    /record_heatmap_data:\s*shouldRecordHeatmaps/,
    'Expected heatmap recording to be opt-in',
  )

  assert.match(
    source,
    /record_collect_fonts:\s*false/,
    'Expected font collection to stay disabled',
  )
})
