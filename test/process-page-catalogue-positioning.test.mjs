import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const processPagePath = resolve(process.cwd(), 'src/app/process/page.jsx')

test('process page renders the four journey stages in order', () => {
  // Guard the narrative order so discovery always precedes the build, which in
  // turn precedes deployment and ongoing operation.
  const source = readFileSync(processPagePath, 'utf8')

  const discoverIndex = source.indexOf('title="Discover"')
  const buildIndex = source.indexOf('title="Build"')
  const deployIndex = source.indexOf('title="Deploy"')
  const operateIndex = source.indexOf('title="Operate"')

  assert.ok(
    [discoverIndex, buildIndex, deployIndex, operateIndex].every((index) => index !== -1),
    'Expected all four process stage titles to be present',
  )

  assert.ok(
    discoverIndex < buildIndex && buildIndex < deployIndex && deployIndex < operateIndex,
    'Expected process stages to render as Discover, Build, Deploy, then Operate',
  )
})

test('process page prioritises the first visual after the intro', () => {
  // Keep the browser from warning that the first process image needs priority.
  const source = readFileSync(processPagePath, 'utf8')

  assert.match(
    source,
    /image=\{\{[\s\S]*?image:\s*processImages\.whiteboard,[\s\S]*?priority:\s*true,[\s\S]*?\}\}/u,
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
