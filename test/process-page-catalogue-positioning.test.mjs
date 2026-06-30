import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const processPagePath = resolve(process.cwd(), 'src/app/process/page.jsx')

test('process page speaks to catalogue readiness instead of generic AI consulting', () => {
  // Keep the process route aligned with the homepage agentic commerce offer.
  const source = readFileSync(processPagePath, 'utf8')

  for (const expectedPhrase of [
    'How we make catalogues agentic-ready',
    'Merchant Feed Audit',
    'GTIN Coverage',
    'Built for agentic commerce, not generic AI adoption',
    'catalogue-readiness score',
  ]) {
    assert.match(
      source,
      new RegExp(expectedPhrase),
      `Expected process page to include ${expectedPhrase}`,
    )
  }

  for (const oldPhrase of [
    'future of work',
    'productivity gains',
    'strategic AI implementation',
  ]) {
    assert.doesNotMatch(
      source,
      new RegExp(oldPhrase, 'i'),
      `Did not expect process page to retain generic phrase ${oldPhrase}`,
    )
  }
})

test('process page prioritises the first visual after the intro', () => {
  // Keep the browser from warning that the first process image needs priority.
  const source = readFileSync(processPagePath, 'utf8')

  assert.match(
    source,
    /image=\{\{ src: imageWhiteboard, priority: true \}\}/,
    'Expected the first process section image to be marked priority',
  )
})

test('process images include catalogue-readiness signal overlays', () => {
  // Keep the process visuals tied to measurable catalogue work instead of generic stock imagery.
  const source = readFileSync(processPagePath, 'utf8')

  assert.match(
    source,
    /function ProcessImageSignals/,
    'Expected process images to render domain-specific signal overlays',
  )

  for (const expectedSignal of [
    '74/100 ready',
    '128 fixes',
    'ERP + PIM sync',
    'review queue',
    '<15 min drift',
    'trend pulse',
  ]) {
    assert.match(
      source,
      new RegExp(expectedSignal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
      `Expected process visual overlay to include ${expectedSignal}`,
    )
  }
})
