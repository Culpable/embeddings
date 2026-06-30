import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const thankYouPath = resolve(process.cwd(), 'src/app/thank-you/page.jsx')
const notFoundPath = resolve(process.cwd(), 'src/app/not-found.jsx')

test('thank-you page offers a services follow-up action', () => {
  // Keep the successful form fallback from ending at a single home-page action.
  const source = readFileSync(thankYouPath, 'utf8')

  assert.match(
    source,
    /Back to home/,
    'Expected the thank-you page to retain the home recovery action',
  )

  assert.match(
    source,
    /Review services/,
    'Expected the thank-you page to link visitors back to the service offer',
  )

  assert.match(
    source,
    /href="\/#services"/,
    'Expected the thank-you page services action to target the services section',
  )
})

test('not-found page offers home and service recovery actions', () => {
  // Keep unknown routes useful for visitors who still need to understand the offer.
  const source = readFileSync(notFoundPath, 'utf8')

  assert.match(
    source,
    /Go to the home page/,
    'Expected the 404 page to retain a home recovery action',
  )

  assert.match(
    source,
    /View services/,
    'Expected the 404 page to include a services recovery action',
  )

  assert.match(
    source,
    /href="\/#services"/,
    'Expected the 404 services action to target the services section',
  )
})
