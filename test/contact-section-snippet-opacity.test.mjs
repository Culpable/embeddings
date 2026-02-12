import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'


const contactSectionPath = resolve(process.cwd(), 'src/components/ContactSection.jsx')


function readSnippetOpacities() {
  // Read the component source and extract all opacity values used in floating snippets.
  const source = readFileSync(contactSectionPath, 'utf8')
  const opacityMatches = [...source.matchAll(/opacity:\s*'([0-9]*\.?[0-9]+)'/g)]

  return opacityMatches.map((match) => Number.parseFloat(match[1]))
}


test('floating snippets stay visible enough to read on dark background', () => {
  // Prevent regressions where snippets become too faint to perceive.
  const opacities = readSnippetOpacities()

  assert.ok(opacities.length > 0, 'Expected at least one floating snippet opacity value')

  const minimumAllowedOpacity = 0.1
  const tooFaintValues = opacities.filter((value) => value < minimumAllowedOpacity)

  assert.equal(
    tooFaintValues.length,
    0,
    `Found too-faint snippet opacities: ${tooFaintValues.join(', ')} (minimum allowed: ${minimumAllowedOpacity})`,
  )
})
