import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'


const enrichmentTypewriterPath = resolve(
  process.cwd(),
  'src/components/EnrichmentTypewriter.jsx',
)

const optimisationRipplePath = resolve(
  process.cwd(),
  'src/components/OptimisationRipple.jsx',
)


function readEnrichmentTypewriterSource() {
  // Read component source so assertions can validate badge text placement intent directly.
  return readFileSync(enrichmentTypewriterPath, 'utf8')
}


function readOptimisationRippleSource() {
  // Read component source so assertions can validate node badge text placement intent directly.
  return readFileSync(optimisationRipplePath, 'utf8')
}


function normaliseExpression(expression) {
  // Return a whitespace-normalised expression string for stable source assertions.
  return expression.replace(/\s+/g, ' ').trim()
}


function readEnrichmentTagBlocks(source) {
  // Find each right-hand attribute tag group by its enrich-type-tag-N class.
  return [
    ...source.matchAll(/<g className="enrich-type-tag-\d">([\s\S]*?)<\/g>/g),
  ].map((match) => match[1])
}


function readEnrichmentTagMetrics(tagBlock) {
  // Extract rect y/height and matching text y values from one attribute tag group.
  const rectMatch = tagBlock.match(
    /<rect[^>]*\by="(\d+(?:\.\d+)?)"[^>]*\bheight="(\d+(?:\.\d+)?)"[^>]*\/>/,
  )
  const textMatch = tagBlock.match(/<text[^>]*\by="(\d+(?:\.\d+)?)"[^>]*>/)

  return {
    rectY: rectMatch ? Number(rectMatch[1]) : null,
    rectHeight: rectMatch ? Number(rectMatch[2]) : null,
    textY: textMatch ? Number(textMatch[1]) : null,
  }
}


function readOptimisationNodeBadgeGeometry(source) {
  // Extract the mapped node rect and label text geometry expressions in one contiguous block.
  const nodeGeometryMatch = source.match(
    /<rect\s+x=\{x - 48\}\s+y=\{([^}]+)\}\s+width="96"\s+height="([^"]+)"[\s\S]*?<text\s+x=\{x\}\s+y=\{([^}]+)\}([^>]*)>\s*\{label\}\s*<\/text>/,
  )

  if (!nodeGeometryMatch) {
    return null
  }

  return {
    rectYExpression: normaliseExpression(nodeGeometryMatch[1]),
    rectHeight: nodeGeometryMatch[2],
    textYExpression: normaliseExpression(nodeGeometryMatch[3]),
    textTagAttributes: nodeGeometryMatch[4],
  }
}


test('enrichment typewriter badge labels include dominant-baseline central with dy optical offset', () => {
  // Require dominant-baseline central and dy optical offset on each right-hand attribute tag label.
  const source = readEnrichmentTypewriterSource()
  const tagBlocks = readEnrichmentTagBlocks(source)

  assert.equal(
    tagBlocks.length,
    5,
    'Expected five right-hand attribute tag groups in src/components/EnrichmentTypewriter.jsx',
  )

  for (const [index, tagBlock] of tagBlocks.entries()) {
    assert.match(
      tagBlock,
      /<text[^>]*\bdominantBaseline="central"[^>]*>/,
      `Expected enrich-type-tag-${index + 1} text to include dominantBaseline="central"`,
    )

    assert.match(
      tagBlock,
      /<text[^>]*\bdy="0\.15"[^>]*>/,
      `Expected enrich-type-tag-${index + 1} text to include dy="0.15"`,
    )
  }
})


test('enrichment typewriter badge label y values align to rect vertical centres', () => {
  // Require each right-hand attribute tag label y to equal its rect vertical centre.
  const source = readEnrichmentTypewriterSource()
  const tagBlocks = readEnrichmentTagBlocks(source)

  assert.equal(
    tagBlocks.length,
    5,
    'Expected five right-hand attribute tag groups in src/components/EnrichmentTypewriter.jsx',
  )

  for (const [index, tagBlock] of tagBlocks.entries()) {
    const { rectY, rectHeight, textY } = readEnrichmentTagMetrics(tagBlock)

    assert.notEqual(
      rectY,
      null,
      `Expected enrich-type-tag-${index + 1} rect y to exist for geometric centre checks`,
    )
    assert.notEqual(
      rectHeight,
      null,
      `Expected enrich-type-tag-${index + 1} rect height to exist for geometric centre checks`,
    )
    assert.notEqual(
      textY,
      null,
      `Expected enrich-type-tag-${index + 1} text y to exist for geometric centre checks`,
    )

    const expectedCentreY = rectY + (rectHeight / 2)

    assert.equal(
      textY,
      expectedCentreY,
      `Expected enrich-type-tag-${index + 1} text y (${textY}) to equal rect centre y (${expectedCentreY})`,
    )
  }
})


test('optimisation ripple node badge labels include dominant-baseline central', () => {
  // Require dominant-baseline central on mapped node badge label text.
  const source = readOptimisationRippleSource()
  const geometry = readOptimisationNodeBadgeGeometry(source)

  assert.notEqual(
    geometry,
    null,
    'Expected to find mapped node rect/text geometry in src/components/OptimisationRipple.jsx',
  )

  assert.match(
    geometry.textTagAttributes,
    /dominantBaseline="central"/,
    'Expected optimisation ripple node label text to include dominantBaseline="central"',
  )
})


test('optimisation ripple node badge label y expression equals rect vertical centre', () => {
  // Require mapped node label y expression to equal centre of y - 12 rect with height 24.
  const source = readOptimisationRippleSource()
  const geometry = readOptimisationNodeBadgeGeometry(source)

  assert.notEqual(
    geometry,
    null,
    'Expected to find mapped node rect/text geometry in src/components/OptimisationRipple.jsx',
  )

  assert.equal(
    geometry.rectYExpression,
    'y - 12',
    'Expected optimisation ripple node rect y expression to remain y - 12',
  )

  assert.equal(
    geometry.rectHeight,
    '24',
    'Expected optimisation ripple node rect height to remain 24',
  )

  assert.equal(
    geometry.textYExpression,
    'y',
    'Expected optimisation ripple node label text y expression to equal rect centre y',
  )
})
