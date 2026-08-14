import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const processPagePath = resolve(process.cwd(), 'src/app/process/page.jsx')

test('process page describes the owned-agent journey instead of generic AI consulting', () => {
  // Keep the process route aligned with the homepage owned-agent offer:
  // catalogue foundation, agent deployment, then live operation.
  const source = readFileSync(processPagePath, 'utf8')

  for (const expectedPhrase of [
    'How we take you from catalogue to live agent',
    'title="Foundation"',
    'title="Deploy"',
    'title="Operate"',
    'Merchant Feed Audit',
    'GTIN Coverage',
    'Built for retail conversations, not generic AI adoption',
    'catalogue-readiness score',
  ]) {
    assert.match(
      source,
      new RegExp(expectedPhrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
      `Expected process page to include ${expectedPhrase}`,
    )
  }

  for (const oldPhrase of [
    'future of work',
    'productivity gains',
    'strategic AI implementation',
    'agentic-ready',
  ]) {
    assert.doesNotMatch(
      source,
      new RegExp(oldPhrase, 'i'),
      `Did not expect process page to retain generic phrase ${oldPhrase}`,
    )
  }
})

test('process page renders the three journey stages in order', () => {
  // Guard the narrative order so the catalogue foundation always precedes the
  // agent build, which in turn precedes live operation.
  const source = readFileSync(processPagePath, 'utf8')

  const foundationIndex = source.indexOf('title="Foundation"')
  const deployIndex = source.indexOf('title="Deploy"')
  const operateIndex = source.indexOf('title="Operate"')

  assert.ok(
    foundationIndex !== -1 && deployIndex !== -1 && operateIndex !== -1,
    'Expected all three process stage titles to be present',
  )

  assert.ok(
    foundationIndex < deployIndex && deployIndex < operateIndex,
    'Expected process stages to render as Foundation, then Deploy, then Operate',
  )
})

test('process page covers checkout, post-sales, control, and analytics', () => {
  // Every owned-agent capability sold on the homepage must have a delivery
  // stage behind it on the process page.
  const source = readFileSync(processPagePath, 'utf8')

  for (const expectedCapability of [
    'checkout',
    'order status',
    'returns',
    'assisted revenue',
    'prompts, policies, and canned responses',
    'Algolia, Coveo, Elasticsearch, Google Retail Search, or your own',
  ]) {
    assert.match(
      source,
      new RegExp(expectedCapability.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'),
      `Expected process page to describe ${expectedCapability}`,
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

test('process images include journey-stage signal overlays', () => {
  // Keep the process visuals tied to measurable delivery work instead of generic stock imagery.
  const source = readFileSync(processPagePath, 'utf8')

  assert.match(
    source,
    /function ProcessImageSignals/,
    'Expected process images to render domain-specific signal overlays',
  )

  for (const expectedSignal of [
    '74/100 ready',
    '128 fixes',
    'plugged into your stack',
    'in the conversation',
    'assisted revenue',
    'self-service',
  ]) {
    assert.match(
      source,
      new RegExp(expectedSignal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
      `Expected process visual overlay to include ${expectedSignal}`,
    )
  }
})

test('process image signal overlays stay mobile-safe', () => {
  // Keep signal cards readable on phones by placing them below the image crop,
  // then restoring the overlay treatment only once the image has room.
  const source = readFileSync(processPagePath, 'utf8')
  const signalListMatch = source.match(
    /function ProcessImageSignals[\s\S]*?className="(?<classes>[^"]+)"/,
  )

  assert.ok(signalListMatch, 'Expected to find ProcessImageSignals classes')

  const classes = signalListMatch.groups.classes

  assert.match(
    classes,
    /\bstatic\b/,
    'Expected process signal cards to use static mobile placement',
  )

  assert.match(
    classes,
    /\bmt-3\b/,
    'Expected process signal cards to sit below the mobile image with spacing',
  )

  assert.match(
    classes,
    /\bsm:absolute\b/,
    'Expected process signal cards to return to absolute overlay placement on wider screens',
  )
})
