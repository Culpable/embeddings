import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const homePagePath = resolve(process.cwd(), 'src/app/page.jsx')

test('homepage emits shared static json ld without next script loader', () => {
  // Keep static structured data out of the route script-loader runtime.
  const source = readFileSync(homePagePath, 'utf8')

  assert.doesNotMatch(
    source,
    /next\/script/,
    'Expected homepage JSON-LD not to import next/script',
  )

  assert.match(
    source,
    /<StructuredData routeKey="home" \/>/,
    'Expected homepage structured data to use the safe shared component',
  )
})

test('homepage service timeline omits proof label blocks below each service', () => {
  // Prevent the service animation sections from adding the unwanted proof chip
  // rows below each service visual.
  const timelineSource = readFileSync(
    resolve(process.cwd(), 'src/components/ServiceTimelineLeftRail.jsx'),
    'utf8',
  )

  assert.doesNotMatch(
    timelineSource,
    /proof:\s*\[/,
    'Expected service proof label data to stay removed',
  )

  assert.doesNotMatch(
    timelineSource,
    /proof points/,
    'Expected service proof point lists not to render below the animations',
  )

  for (const removedLabel of [
    'gap map',
    'revenue priority',
    'stock updates',
    'price sync',
    'status freshness',
    'richer attributes',
    'brand-safe copy',
    'agent taxonomy',
    'seasonal updates',
    'demand capture',
  ]) {
    assert.doesNotMatch(
      timelineSource,
      new RegExp(removedLabel),
      `Expected ${removedLabel} label block to stay removed`,
    )
  }
})
