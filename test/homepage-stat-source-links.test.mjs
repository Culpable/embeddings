import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const homePagePath = resolve(process.cwd(), 'src/app/page.jsx')

test('homepage market statistics include visible source links', () => {
  // Keep executive-facing claims visibly sourced in the stat cards.
  const source = readFileSync(homePagePath, 'utf8')

  for (const expectedSource of [
    'OpenAI Instant Checkout',
    'Google UCP',
    'Deloitte 2026 outlook',
    'McKinsey',
    'Adobe Digital Insights',
  ]) {
    assert.match(
      source,
      new RegExp(expectedSource),
      `Expected homepage statistics to cite ${expectedSource}`,
    )
  }
})

test('homepage uses the current Adobe retail traffic figure', () => {
  // Guard the sourced Adobe stat so the visible number matches the current citation.
  const source = readFileSync(homePagePath, 'utf8')

  assert.match(
    source,
    /stat:\s*'393%'/,
    'Expected the Adobe traffic card to use 393%',
  )

  assert.doesNotMatch(
    source,
    /stat:\s*'758%'/,
    'Did not expect the previous unsourced 758% Adobe traffic stat',
  )
})

test('homepage emits static json ld without next script loader', () => {
  // Keep static structured data out of the route script-loader runtime.
  const source = readFileSync(homePagePath, 'utf8')

  assert.doesNotMatch(
    source,
    /next\/script/,
    'Expected homepage JSON-LD not to import next/script',
  )

  assert.match(
    source,
    /<script\s+id="organization-schema"/,
    'Expected organisation schema to render as a static script tag',
  )
})
