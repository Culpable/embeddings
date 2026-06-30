import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const rootLayoutPath = resolve(process.cwd(), 'src/components/RootLayout.jsx')
const rootHeaderPath = resolve(process.cwd(), 'src/components/RootHeader.jsx')
const rootNavigationPath = resolve(
  process.cwd(),
  'src/components/RootNavigation.jsx',
)
const rootNavigationPanelPath = resolve(
  process.cwd(),
  'src/components/RootNavigationPanel.jsx',
)
const gridPatternPath = resolve(process.cwd(), 'src/components/GridPattern.jsx')
const componentsCssPath = resolve(process.cwd(), 'src/styles/components.css')

test('root layout remains a server shell without framer motion', () => {
  // Guard the performance boundary so global route chrome does not become a full client component again.
  const source = readFileSync(rootLayoutPath, 'utf8')

  assert.doesNotMatch(
    source,
    /['"]use client['"]/,
    'Expected RootLayout.jsx to remain a Server Component',
  )

  assert.doesNotMatch(
    source,
    /framer-motion/,
    'Expected RootLayout.jsx not to import framer-motion',
  )
})

test('root header delegates only the menu control to a client island', () => {
  // Keep static logo and contact chrome server-rendered while isolating menu
  // state to the smallest navigation component.
  const headerSource = readFileSync(rootHeaderPath, 'utf8')
  const navigationSource = readFileSync(rootNavigationPath, 'utf8')

  assert.doesNotMatch(
    headerSource,
    /['"]use client['"]/,
    'Expected RootHeader.jsx to remain server-rendered static chrome',
  )

  assert.match(
    navigationSource,
    /['"]use client['"]/,
    'Expected RootNavigation.jsx to own the menu interaction island',
  )

  assert.doesNotMatch(
    `${headerSource}\n${navigationSource}`,
    /framer-motion/,
    'Expected root navigation chrome to use CSS transitions instead of framer-motion layout animation',
  )
})

test('root navigation lazy-loads the full overlay panel after menu intent', () => {
  // Keep offices, route highlighting, and focus-trap work out of the initial
  // global menu button island until the visitor opens navigation.
  const navigationSource = readFileSync(rootNavigationPath, 'utf8')
  const panelSource = readFileSync(rootNavigationPanelPath, 'utf8')

  assert.match(
    navigationSource,
    /dynamic\(/,
    'Expected RootNavigation.jsx to lazy-load the overlay panel',
  )

  assert.match(
    navigationSource,
    /@\/components\/RootNavigationPanel/,
    'Expected RootNavigation.jsx to load RootNavigationPanel dynamically',
  )

  assert.doesNotMatch(
    navigationSource,
    /usePathname|Offices|focusableSelector|getFocusableElements/,
    'Expected the initial root navigation island not to include panel-only work',
  )

  assert.match(
    panelSource,
    /usePathname/,
    'Expected the dynamically loaded panel to retain route highlighting',
  )

  assert.match(
    panelSource,
    /Offices/,
    'Expected the dynamically loaded panel to retain office links',
  )
})

test('global background grid stays static server-rendered chrome', () => {
  // Keep decorative route chrome from adding a global pointer listener to every page.
  const rootLayoutSource = readFileSync(rootLayoutPath, 'utf8')
  const gridPatternSource = readFileSync(gridPatternPath, 'utf8')

  assert.doesNotMatch(
    gridPatternSource,
    /['"]use client['"]/,
    'Expected GridPattern.jsx to remain server-rendered static decoration',
  )

  assert.doesNotMatch(
    gridPatternSource,
    /addEventListener\(['"]mousemove['"]/,
    'Expected the global grid not to attach a mousemove listener',
  )

  assert.doesNotMatch(
    rootLayoutSource,
    /interactive/,
    'Expected RootLayout.jsx not to request interactive grid hydration',
  )
})

test('navigation menu entrance does not leave a persistent height cap', () => {
  // The open mobile menu can be taller than the entrance target, so max-height
  // must not remain applied after the animation completes.
  const source = readFileSync(componentsCssPath, 'utf8')
  const navigationRule = source.match(
    /\.navigation-panel-enter\s*\{(?<body>[\s\S]*?)\}/,
  )

  assert.ok(navigationRule, 'Expected a navigation panel entrance rule')
  assert.doesNotMatch(
    navigationRule.groups.body,
    /animation:[^;]*(?:both|forwards)/,
    'Expected the navigation entrance animation not to persist max-height after completion',
  )
})
