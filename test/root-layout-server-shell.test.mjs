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
const noiseOverlayPath = resolve(
  process.cwd(),
  'src/components/NoiseOverlay.jsx',
)
const componentsCssPath = resolve(process.cwd(), 'src/styles/components.css')
const agentsPath = resolve(process.cwd(), 'AGENTS.md')

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

test('root header intentionally keeps route links in the menu panel', () => {
  // Preserve the intentionally minimal header chrome: logo, contact CTA, and
  // menu trigger only. Route discovery belongs in the dedicated menu panel.
  const headerSource = readFileSync(rootHeaderPath, 'utf8')
  const panelSource = readFileSync(rootNavigationPanelPath, 'utf8')
  const agentsSource = readFileSync(agentsPath, 'utf8')

  assert.doesNotMatch(
    headerSource,
    /const desktopNavigation|aria-label="Primary"/,
    'Expected RootHeader.jsx not to add inline desktop navigation',
  )

  for (const expectedLink of [
    { href: '/#why-now', label: 'why now' },
    { href: '/#services', label: 'services' },
    { href: '/#proof', label: 'proof' },
    { href: '/process', label: 'our process' },
  ]) {
    assert.doesNotMatch(
      headerSource,
      new RegExp(expectedLink.href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
      `Expected RootHeader.jsx not to include inline route ${expectedLink.href}`,
    )
    assert.match(
      panelSource,
      new RegExp(expectedLink.href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
      `Expected RootNavigationPanel.jsx to include ${expectedLink.href}`,
    )
    assert.match(
      panelSource,
      new RegExp(expectedLink.label),
      `Expected RootNavigationPanel.jsx to include ${expectedLink.label}`,
    )
  }

  assert.match(
    agentsSource,
    /global header is intentionally minimal[\s\S]*Do not add inline desktop navigation/,
    'Expected AGENTS.md to document that inline desktop navigation is intentionally absent',
  )
})

test('root navigation renders the full overlay panel without an async loading gap', () => {
  // Keep the overlay available when the visitor opens navigation so the menu
  // trigger does not disappear while a client-only chunk loads.
  const navigationSource = readFileSync(rootNavigationPath, 'utf8')
  const panelSource = readFileSync(rootNavigationPanelPath, 'utf8')

  assert.doesNotMatch(
    navigationSource,
    /from\s+['"]next\/dynamic['"]/,
    'Expected RootNavigation.jsx not to lazy-load the overlay panel through next/dynamic',
  )

  assert.match(
    navigationSource,
    /import\s+\{\s*RootNavigationPanel\s*\}\s+from\s+['"]@\/components\/RootNavigationPanel['"]/,
    'Expected RootNavigation.jsx to import RootNavigationPanel synchronously',
  )

  assert.doesNotMatch(
    navigationSource,
    /ssr\s*:\s*false/,
    'Expected RootNavigation.jsx not to create a client-only panel loading gap',
  )

  assert.doesNotMatch(
    navigationSource,
    /usePathname|Offices|focusableSelector|getFocusableElements/,
    'Expected the initial root navigation island not to include panel-only work',
  )

  assert.match(
    panelSource,
    /usePathname/,
    'Expected the menu panel to retain route highlighting',
  )

  assert.match(
    panelSource,
    /Offices/,
    'Expected the menu panel to retain office links',
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

test('dark-section noise uses a shared css texture', () => {
  // Keep dark-section texture depth without repeating expensive SVG filter work.
  const noiseSource = readFileSync(noiseOverlayPath, 'utf8')
  const cssSource = readFileSync(componentsCssPath, 'utf8')

  assert.doesNotMatch(
    noiseSource,
    /feTurbulence|filter=\{/,
    'Expected NoiseOverlay.jsx not to render per-section SVG turbulence filters',
  )

  assert.match(
    noiseSource,
    /noise-overlay/,
    'Expected NoiseOverlay.jsx to render the shared CSS texture class',
  )

  assert.match(
    cssSource,
    /\.noise-overlay\s*\{/,
    'Expected shared CSS to define the noise overlay texture',
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
