import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'


const heroDataFlowPath = resolve(process.cwd(), 'src/components/HeroDataFlow.jsx')
const heroDesktopDataFlowPath = resolve(
  process.cwd(),
  'src/components/HeroDesktopDataFlow.jsx',
)
const homePagePath = resolve(process.cwd(), 'src/app/page.jsx')
const serviceTimelinePath = resolve(
  process.cwd(),
  'src/components/ServiceTimelineLeftRail.jsx',
)
const responsiveServiceAnimationPath = resolve(
  process.cwd(),
  'src/components/ResponsiveServiceAnimation.jsx',
)


test('public hero keeps the original desktop svg animation in its desktop module', () => {
  // Preserve the frontpage hero animation while allowing the wrapper to
  // code-split desktop-only vector markup away from mobile first load.
  const wrapperSource = readFileSync(heroDataFlowPath, 'utf8')
  const desktopSource = readFileSync(heroDesktopDataFlowPath, 'utf8')
  const publicHeroBlock = desktopSource.match(
    /export function DesktopHeroDataFlow\(\) \{([\s\S]*)/,
  )

  assert.notEqual(
    publicHeroBlock,
    null,
    'Expected to isolate the DesktopHeroDataFlow export',
  )
  assert.match(
    publicHeroBlock[1],
    /<svg/,
    'Expected the public HeroDataFlow path to render the original desktop SVG',
  )
  assert.match(
    publicHeroBlock[1],
    /pathCatalogueToAgent/,
    'Expected the original catalogue-to-agent path animation to remain present',
  )
  assert.match(
    wrapperSource,
    /dynamic\(/,
    'Expected the public hero wrapper to dynamically load desktop vector markup',
  )
  assert.match(
    wrapperSource,
    /matchMedia\('\(min-width: 640px\)'\)/,
    'Expected the public hero wrapper to avoid loading desktop markup on mobile viewports',
  )
  assert.doesNotMatch(
    `${wrapperSource}\n${publicHeroBlock[1]}`,
    /DesktopHeroFlowSummary|LegacyHeroDataFlow/,
    'Expected no replacement summary or legacy split for the original hero animation',
  )
})


test('mobile service timeline does not server-render hidden desktop animations', () => {
  // Require the service timeline to reference desktop animations through the
  // viewport-gated client loader instead of importing every SVG into the server path.
  const homePageSource = readFileSync(homePagePath, 'utf8')
  const timelineSource = readFileSync(serviceTimelinePath, 'utf8')
  const responsiveSource = readFileSync(responsiveServiceAnimationPath, 'utf8')

  for (const removedImport of [
    'AuditXRayScanner',
    'FreshnessPipelineFlow',
    'EnrichmentTypewriter',
    'OptimisationRipple',
  ]) {
    assert.doesNotMatch(
      timelineSource,
      new RegExp(`import \\{ ${removedImport} \\}`),
      `Expected ServiceTimelineLeftRail not to import ${removedImport} directly`,
    )
    assert.doesNotMatch(
      homePageSource,
      new RegExp(`import \\{ ${removedImport} \\}`),
      `Expected the home page not to import ${removedImport} directly`,
    )
  }

  assert.match(
    timelineSource,
    /ResponsiveServiceAnimation/,
    'Expected ServiceTimelineLeftRail to render desktop animations through the responsive loader',
  )
  assert.match(
    responsiveSource,
    /matchMedia\('\(min-width: 640px\)'\)/,
    'Expected service animations to load only for desktop animation viewports',
  )
  assert.match(
    responsiveSource,
    /dynamic\(/,
    'Expected service animations to stay code-split behind dynamic imports',
  )
  assert.match(
    responsiveSource,
    /IntersectionObserver/,
    'Expected service animations to wait until the service step approaches the viewport',
  )
  assert.match(
    responsiveSource,
    /data-service-animation/,
    'Expected service animation shells to reserve the target area before loading',
  )
})
