import test from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

test('analytics keeps manual page views and recording opt-in by default', () => {
  const source = readFileSync(
    new URL('../src/lib/mixpanelClient.js', import.meta.url),
    'utf8',
  )
  // Preserve SDK option contracts; automatic page views duplicate manual events.
  assert.match(source, /track_pageview:\s*false/u)
  assert.match(source, /record_collect_fonts:\s*false/u)
  assert.doesNotMatch(source, /record_sessions_percent:\s*100/u)

  // Execute the actual default configuration in a child with opt-in absent.
  const environment = { ...process.env }
  delete environment.NEXT_PUBLIC_MIXPANEL_RECORDING_PERCENT
  delete environment.NEXT_PUBLIC_MIXPANEL_RECORD_HEATMAPS
  const config = JSON.parse(
    execFileSync(
      process.execPath,
      [
        '--input-type=module',
        '--eval',
        'const config = await import(process.argv[1]); console.log(JSON.stringify({percent: config.mixpanelRecordingPercent, heatmaps: config.mixpanelRecordsHeatmaps, enabled: config.mixpanelRecorderEnabled}))',
        new URL('../src/lib/analytics-config.mjs', import.meta.url).href,
      ],
      { env: environment, encoding: 'utf8' },
    ),
  )
  assert.equal(config.percent, 0)
  assert.equal(config.heatmaps, false)
  assert.equal(config.enabled, false)
})
