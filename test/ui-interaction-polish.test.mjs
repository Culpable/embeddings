import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const readSource = (path) => readFileSync(resolve(process.cwd(), path), 'utf8')

const buttonSource = readSource('src/components/Button.jsx')
const navigationButtonSource = readSource('src/components/NavigationButton.jsx')
const rootNavigationSource = readSource('src/components/RootNavigation.jsx')
const rootNavigationPanelSource = readSource(
  'src/components/RootNavigationPanel.jsx',
)
const contactFormSource = readSource('src/app/contact/ContactForm.jsx')
const homePageSource = readSource('src/app/page.jsx')
const stylesSource = readSource('src/styles/components.css')
const stylizedImageSource = readSource('src/components/StylizedImage.jsx')

const deliberatelyChangedSources = [
  'src/app/about/page.jsx',
  'src/app/contact/ContactDetails.jsx',
  'src/app/contact/ContactForm.jsx',
  'src/app/page.jsx',
  'src/app/thank-you/page.jsx',
  'src/components/Button.jsx',
  'src/components/CatalogueTransformation.jsx',
  'src/components/Footer.jsx',
  'src/components/Logo.jsx',
  'src/components/NavigationButton.jsx',
  'src/components/RootHeader.jsx',
  'src/components/RootNavigation.jsx',
  'src/components/RootNavigationPanel.jsx',
  'src/components/ServiceTimelineLeftRail.jsx',
  'src/components/StatList.jsx',
  'src/components/StylizedImage.jsx',
]

test('shared buttons expose exact press feedback with a static fallback', () => {
  // Keep the press response centralised so CTA links and form buttons use the
  // same interruptible interaction without hydrating the shared component.
  assert.match(buttonSource, /static:\s*isStatic\s*=\s*false/)
  assert.match(buttonSource, /active:scale-\[0\.96\]/)
  assert.match(buttonSource, /!isStatic\s*&&\s*!isDisabled/)
  assert.match(
    buttonSource,
    /transition-\[transform,background-color,color,box-shadow\]/,
  )
})

test('navigation icons and panel use interruptible contextual motion', () => {
  // Require the exact Better UI icon values and asymmetric panel timing while
  // preventing a default menu-icon animation during initial hydration.
  assert.match(navigationButtonSource, /<AnimatePresence initial=\{false\}/)
  assert.match(navigationButtonSource, /opacity:\s*0/)
  assert.match(navigationButtonSource, /scale:\s*0\.25/)
  assert.match(navigationButtonSource, /filter:\s*'blur\(4px\)'/)
  assert.match(navigationButtonSource, /duration:\s*0\.3/)
  assert.match(navigationButtonSource, /bounce:\s*0/)

  assert.match(rootNavigationSource, /panelMounted/)
  assert.match(rootNavigationPanelSource, /onTransitionEnd/)
  assert.match(rootNavigationPanelSource, /-translate-y-3 opacity-0 duration-150/)
  assert.match(rootNavigationPanelSource, /translate-y-0 opacity-100 duration-300/)
  assert.doesNotMatch(stylesSource, /navigationPanelEnter/)
})

test('compact links and logo wrappers provide minimum responsive hit areas', () => {
  // Guard the sampled targets from regressing below 44 pixels on mobile and 40
  // pixels on larger viewports while retaining their existing visible labels.
  for (const path of [
    'src/app/page.jsx',
    'src/components/StatList.jsx',
    'src/components/Footer.jsx',
    'src/app/contact/ContactDetails.jsx',
  ]) {
    const source = readSource(path)
    assert.match(
      source,
      /min-h-11[\s\S]*?sm:min-h-10/,
      `Expected ${path} to include responsive minimum hit-area classes`,
    )
  }

  for (const path of [
    'src/components/RootHeader.jsx',
    'src/components/RootNavigationPanel.jsx',
    'src/components/Footer.jsx',
  ]) {
    const source = readSource(path)
    assert.match(
      source,
      /min-h-11[\s\S]*?min-w-11[\s\S]*?sm:min-h-10[\s\S]*?sm:min-w-10/,
      `Expected ${path} logo link to provide a responsive square hit area`,
    )
  }
})

test('changed UI files avoid broad transition utilities', () => {
  // Check only the deliberately reviewed files so protected animation modules
  // remain untouched while every edited interaction names its animated fields.
  for (const path of deliberatelyChangedSources) {
    const source = readSource(path)
    assert.doesNotMatch(
      source,
      /\btransition-all\b| transition |['"]transition /,
      `Expected ${path} not to use broad transition utilities`,
    )
  }
})

test('shared surfaces and the hero proof group use the planned geometry', () => {
  // Require reusable elevation treatments and exact concentric mobile radii.
  for (const token of [
    '.surface-elevation-light',
    '.surface-elevation-light-hover',
    '.surface-elevation-dark',
    '.surface-elevation-dark-hover',
  ]) {
    assert.match(stylesSource, new RegExp(token.replace('.', '\\.')))
  }

  assert.match(
    homePageSource,
    /rounded-\[18px\][\s\S]*?p-1\.5[\s\S]*?rounded-xl/,
  )
})

test('source arrows and process images use exact optical edge treatment', () => {
  // Keep external arrows two pixels tighter on their trailing side and clip the
  // process-image stroke so the visible edge remains inset-equivalent.
  assert.match(homePageSource, /pl-3 pr-2\.5/)
  assert.match(homePageSource, /inline-flex[\s\S]*?items-center[\s\S]*?↗/)
  assert.match(stylizedImageSource, /strokeWidth="1"/)
  assert.match(stylizedImageSource, /stroke-black\/10/)
  assert.match(stylizedImageSource, /group-hover:scale-105/)
  assert.doesNotMatch(stylizedImageSource, /motion-safe:/)
})

test('contact feedback preserves semantics while adding contextual motion', () => {
  // Ensure animation stays visual only: live regions and focus remain immediate
  // while panels, field messages and the loading icon receive exact timing.
  assert.match(contactFormSource, /<AnimatePresence initial=\{false\}/)
  assert.match(contactFormSource, /const \[selectedBudget, setSelectedBudget\]/)
  assert.match(contactFormSource, /checked=\{selectedBudget === value\}/)
  assert.match(contactFormSource, /`budget-field-\$\{value\}`/)
  assert.match(
    contactFormSource,
    /if \(isSuccess\)[\s\S]*?statusPanelRef\.current\?\.focus/,
  )
  assert.match(contactFormSource, /role=\{isError \? 'alert' : 'status'\}/)
  assert.match(
    contactFormSource,
    /aria-live=\{isError \? 'assertive' : 'polite'\}/,
  )
  assert.match(
    contactFormSource,
    /focusFirstInvalidField\(form, firstInvalidField\)/,
  )
  assert.match(contactFormSource, /FIELD_ERROR_STAGGER_SECONDS\s*=\s*0\.09/)
  assert.match(contactFormSource, /duration:\s*0\.15/)
  assert.match(contactFormSource, /duration:\s*0\.3/)
  assert.match(contactFormSource, /filter:\s*'blur\(4px\)'/)
  assert.match(contactFormSource, /y:\s*-12/)
})
