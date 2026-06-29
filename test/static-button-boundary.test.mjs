import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const buttonPath = resolve(process.cwd(), 'src/components/Button.jsx')


test('shared button does not hydrate static CTA links for analytics', () => {
  // Keep ordinary links and buttons server-renderable; form-specific tracking
  // should live in the interactive components that already own those events.
  const source = readFileSync(buttonPath, 'utf8')

  assert.doesNotMatch(
    source,
    /['"]use client['"]/,
    'Expected Button.jsx to stay usable by Server Components',
  )

  assert.doesNotMatch(
    source,
    /mixpanelClient/,
    'Expected Button.jsx not to import analytics code',
  )

  assert.match(
    source,
    /trackingLabel/,
    'Expected legacy tracking props to remain accepted at call sites',
  )
})
