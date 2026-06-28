import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const fadeInPath = resolve(process.cwd(), 'src/components/FadeIn.jsx')
const animatedStatPath = resolve(process.cwd(), 'src/components/AnimatedStat.jsx')
const gridPatternPath = resolve(process.cwd(), 'src/components/GridPattern.jsx')

test('shared reveal primitives avoid framer motion for basic page animation', () => {
  // Preserve the existing FadeIn API while keeping simple reveals out of the
  // heavy animation runtime.
  const fadeInSource = readFileSync(fadeInPath, 'utf8')
  const animatedStatSource = readFileSync(animatedStatPath, 'utf8')
  const gridPatternSource = readFileSync(gridPatternPath, 'utf8')

  assert.doesNotMatch(
    fadeInSource,
    /framer-motion/,
    'Expected FadeIn.jsx not to import framer-motion',
  )

  assert.doesNotMatch(
    animatedStatSource,
    /framer-motion/,
    'Expected AnimatedStat.jsx not to import framer-motion',
  )

  assert.doesNotMatch(
    gridPatternSource,
    /framer-motion/,
    'Expected GridPattern.jsx not to import framer-motion for global background hover animation',
  )

  assert.match(
    fadeInSource,
    /IntersectionObserver/,
    'Expected FadeIn.jsx to reveal elements with IntersectionObserver',
  )

  assert.match(
    animatedStatSource,
    /IntersectionObserver/,
    'Expected AnimatedStat.jsx to start counting when stats enter view',
  )
})
