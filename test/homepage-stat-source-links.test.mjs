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

test('homepage Why Now statistics render visible server text', () => {
  // Keep the card numbers visible in the server-rendered page source so they
  // cannot disappear while waiting for client-side enhancement or animation.
  const source = readFileSync(homePagePath, 'utf8')
  const whyNowStart = source.indexOf('function WhyNow()')
  const whyNowEnd = source.indexOf('// Services', whyNowStart)

  assert.notEqual(whyNowStart, -1, 'Expected to find the WhyNow component')
  assert.notEqual(whyNowEnd, -1, 'Expected to find the end of the WhyNow component')

  for (const [statPattern, label] of [
    [/stat:\s*'\$5T'/, '$5T'],
    [/stat:\s*'393%'/, '393%'],
    [/stat:\s*'81%'/, '81%'],
  ]) {
    assert.match(
      source,
      statPattern,
      `Expected Why Now data to include ${label}`,
    )
  }

  const whyNowSource = source.slice(whyNowStart, whyNowEnd)

  assert.doesNotMatch(
    whyNowSource,
    /<p className="[^"]*\btext-transparent\b[^"]*">[\s\S]*?<AnimatedStat[\s\S]*?<\/p>/,
    'Expected Why Now stat values to render as visible server text, not inside AnimatedStat under a transparent text wrapper',
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

test('homepage proof strip and hero spacing stay mobile-readable', () => {
  // Keep the first viewport dense enough while avoiding compressed three-column proof cards on phones.
  const source = readFileSync(homePagePath, 'utf8')

  assert.match(
    source,
    /grid-cols-1[\s\S]*sm:grid-cols-3/,
    'Expected hero proof signals to stack on mobile and become three columns on larger screens',
  )

  assert.match(
    source,
    /<span className="sm:hidden">Source<\/span>/,
    'Expected mobile source pills to use compact text',
  )

  assert.match(
    source,
    /mt-20 sm:mt-28 md:mt-40 lg:mt-44/,
    'Expected the hero to start earlier in the first viewport',
  )

  assert.doesNotMatch(
    source,
    /mt-24 sm:mt-32 md:mt-56/,
    'Did not expect the previous large hero lead-in spacing',
  )
})

test('homepage service section includes a compact delivery loop before the timeline', () => {
  // Keep the service section scannable before the detailed animated timeline begins.
  const source = readFileSync(homePagePath, 'utf8')
  const timelineSource = readFileSync(
    resolve(process.cwd(), 'src/components/ServiceTimelineLeftRail.jsx'),
    'utf8',
  )

  assert.match(
    source,
    /<ServiceTimelineLeftRail \/>/,
    'Expected the homepage to render the service timeline after the transformation visual',
  )

  assert.doesNotMatch(
    source,
    /function ServiceLoopOverview|<ServiceLoopOverview \/>/,
    'Expected the service loop overview to live inside ServiceTimelineLeftRail rather than duplicating on the homepage',
  )

  assert.match(
    timelineSource,
    /aria-label="Service stages"/,
    'Expected the service timeline to include the compact service loop overview',
  )

  for (const expectedSignal of [
    'risk register',
    'schema map',
    'review queue',
    'freshness loop',
  ]) {
    assert.match(
      timelineSource,
      new RegExp(expectedSignal),
      `Expected service loop to include ${expectedSignal}`,
    )
  }
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
