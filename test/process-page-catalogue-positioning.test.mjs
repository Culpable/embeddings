import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const processPagePath = resolve(process.cwd(), 'src/app/process/page.jsx')

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

test('process page prioritises the first visual after the intro', () => {
  // Keep the browser from warning that the first process image needs priority.
  const source = readFileSync(processPagePath, 'utf8')

  assert.match(
    source,
    /image=\{\{ src: imageWhiteboard, priority: true \}\}/,
    'Expected the first process section image to be marked priority',
  )
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
