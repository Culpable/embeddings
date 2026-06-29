import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const rootLayoutPath = resolve(process.cwd(), 'src/components/RootLayout.jsx')
const rootHeaderPath = resolve(process.cwd(), 'src/components/RootHeader.jsx')
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

test('root header owns the interactive navigation island', () => {
  // Keep menu state isolated to the header instead of hydrating the entire page shell.
  const source = readFileSync(rootHeaderPath, 'utf8')

  assert.match(
    source,
    /['"]use client['"]/,
    'Expected RootHeader.jsx to be the client island for navigation',
  )

  assert.doesNotMatch(
    source,
    /framer-motion/,
    'Expected RootHeader.jsx to use CSS transitions instead of framer-motion layout animation',
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
