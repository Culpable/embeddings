import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'


const rootLayoutPath = resolve(process.cwd(), 'src/components/RootLayout.jsx')


function readInertExpressions() {
  // Read the layout source and capture each JavaScript expression assigned to `inert`.
  const source = readFileSync(rootLayoutPath, 'utf8')
  const inertExpressionMatches = [...source.matchAll(/inert\s*=\s*\{([^}]*)\}/g)]

  return inertExpressionMatches.map((match) => match[1].trim())
}


function findEmptyStringInertExpressions(inertExpressions) {
  // Find inert expressions that use empty string literals, which trigger React warnings.
  return inertExpressions.filter((expression) => /''|""/.test(expression))
}


test('root layout does not pass empty strings to the inert prop', () => {
  // Prevent regressions where `inert` receives `''` rather than a boolean.
  const inertExpressions = readInertExpressions()
  const emptyStringExpressions = findEmptyStringInertExpressions(inertExpressions)

  assert.ok(
    inertExpressions.length > 0,
    'Expected at least one inert prop expression in src/components/RootLayout.jsx',
  )

  assert.equal(
    emptyStringExpressions.length,
    0,
    `Found inert expressions with empty strings: ${emptyStringExpressions.join(' | ')}`,
  )
})
