import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const rootHeaderPath = resolve(process.cwd(), 'src/components/RootHeader.jsx')
const rootNavigationPath = resolve(
  process.cwd(),
  'src/components/RootNavigation.jsx',
)
const rootNavigationPanelPath = resolve(
  process.cwd(),
  'src/components/RootNavigationPanel.jsx',
)

function readInertExpressions() {
  // Read the layout source and capture each JavaScript expression assigned to `inert`.
  const source = [
    readFileSync(rootHeaderPath, 'utf8'),
    readFileSync(rootNavigationPath, 'utf8'),
    readFileSync(rootNavigationPanelPath, 'utf8'),
  ].join('\n')
  const inertExpressionMatches = [
    ...source.matchAll(/inert\s*=\s*\{([^}]*)\}/g),
  ]

  return inertExpressionMatches.map((match) => match[1].trim())
}

function findEmptyStringInertExpressions(inertExpressions) {
  // Find inert expressions that use empty string literals, which trigger React warnings.
  return inertExpressions.filter((expression) => /''|""/.test(expression))
}

test('root layout does not pass empty strings to the inert prop', () => {
  // Prevent regressions where `inert` receives `''` rather than a boolean.
  const inertExpressions = readInertExpressions()
  const emptyStringExpressions =
    findEmptyStringInertExpressions(inertExpressions)

  assert.equal(
    emptyStringExpressions.length,
    0,
    `Found inert expressions with empty strings: ${emptyStringExpressions.join(' | ')}`,
  )
})

test('mobile navigation overlay contains keyboard focus while open', () => {
  // Keep the fixed navigation panel from exposing hidden focus behind the overlay.
  const source = readFileSync(rootNavigationPanelPath, 'utf8')

  assert.match(
    source,
    /role="dialog"/,
    'Expected open navigation panel to use dialog semantics',
  )

  assert.match(
    source,
    /aria-modal="true"/,
    'Expected open navigation panel to mark the background as modal to assistive technology',
  )

  assert.match(
    source,
    /event\.key\s*===\s*['"]Escape['"]/,
    'Expected Escape to close the open navigation panel',
  )

  assert.match(
    source,
    /event\.key\s*!==\s*['"]Tab['"]/,
    'Expected Tab handling to keep focus inside the open navigation panel',
  )

  assert.match(
    source,
    /getFocusableElements/,
    'Expected the open navigation panel to calculate focusable descendants',
  )
})
