import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const contactSectionPath = resolve(
  process.cwd(),
  'src/components/ContactSection.jsx',
)
const componentsCssPath = resolve(process.cwd(), 'src/styles/components.css')

function readSnippetOpacities() {
  // Read the component source and extract all opacity values used in floating snippets.
  const source = readFileSync(contactSectionPath, 'utf8')
  const opacityMatches = [...source.matchAll(/opacity:\s*'([0-9]*\.?[0-9]+)'/g)]

  return opacityMatches.map((match) => Number.parseFloat(match[1]))
}

test('floating snippets stay visible enough to read on dark background', () => {
  // Prevent regressions where snippets become too faint to perceive.
  const opacities = readSnippetOpacities()

  assert.ok(
    opacities.length > 0,
    'Expected at least one floating snippet opacity value',
  )

  const minimumAllowedOpacity = 0.1
  const tooFaintValues = opacities.filter(
    (value) => value < minimumAllowedOpacity,
  )

  assert.equal(
    tooFaintValues.length,
    0,
    `Found too-faint snippet opacities: ${tooFaintValues.join(', ')} (minimum allowed: ${minimumAllowedOpacity})`,
  )
})

test('floating snippet animation uses shared css keyframes', () => {
  // Keep repeated CTA instances from embedding duplicate keyframes in route markup.
  const source = readFileSync(contactSectionPath, 'utf8')
  const cssSource = readFileSync(componentsCssPath, 'utf8')

  assert.doesNotMatch(
    source,
    /@keyframes\s+floatUp/,
    'Expected ContactSection.jsx not to embed the old per-instance float keyframes',
  )

  assert.match(
    source,
    /floating-catalogue-snippet/,
    'Expected snippets to use the shared animation class',
  )

  assert.match(
    cssSource,
    /@keyframes floatingCatalogueSnippet/,
    'Expected shared CSS to define the floating catalogue snippet keyframes',
  )

  assert.match(
    cssSource,
    /translate3d\(0, -120vh, 0\)/,
    'Expected snippet movement to stay transform-based',
  )
})
