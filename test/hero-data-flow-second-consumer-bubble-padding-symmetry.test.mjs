import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'


const heroDataFlowPath = resolve(process.cwd(), 'src/components/HeroDataFlow.jsx')


function readHeroDataFlowSource() {
  // Read HeroDataFlow source text to validate the second consumer bubble geometry directly.
  return readFileSync(heroDataFlowPath, 'utf8')
}


function readSecondConsumerBubbleBlock(source) {
  // Extract the second consumer bubble block bounded by the response and typing indicator comments.
  const secondBubbleBlockMatch = source.match(
    /\/\* AI response — product recommendation \*\/([\s\S]*?)\/\* Typing indicator for second response \*\//,
  )

  assert.notEqual(
    secondBubbleBlockMatch,
    null,
    'Expected to find the second consumer bubble block in src/components/HeroDataFlow.jsx',
  )

  return secondBubbleBlockMatch[1]
}


function readSecondBubbleRectMetrics(secondBubbleBlock) {
  // Parse second bubble rect y and height values from the bubble block.
  const rectMatch = secondBubbleBlock.match(
    /<rect[^>]*\by="(\d+(?:\.\d+)?)"[^>]*\bheight="(\d+(?:\.\d+)?)"[^>]*\/>/,
  )

  assert.notEqual(
    rectMatch,
    null,
    'Expected to find second bubble rect y and height in src/components/HeroDataFlow.jsx',
  )

  return {
    rectY: Number(rectMatch[1]),
    rectHeight: Number(rectMatch[2]),
  }
}


function readSecondBubbleTextMetrics(secondBubbleBlock) {
  // Parse all response text y values and font sizes from the second bubble block.
  const textTagMatches = [...secondBubbleBlock.matchAll(/<text[\s\S]*?<\/text>/g)]

  assert.equal(
    textTagMatches.length,
    3,
    'Expected exactly three response text nodes in the second consumer bubble block',
  )

  return textTagMatches.map((tagMatch) => {
    const textTag = tagMatch[0]
    const yMatch = textTag.match(/\by="(\d+(?:\.\d+)?)"/)
    const fontSizeMatch = textTag.match(/fontSize:\s*'(\d+(?:\.\d+)?)px'/)

    assert.notEqual(
      yMatch,
      null,
      'Expected each second bubble response text node to include a y value',
    )
    assert.notEqual(
      fontSizeMatch,
      null,
      'Expected each second bubble response text node to include a fontSize in px',
    )

    return {
      y: Number(yMatch[1]),
      fontSize: Number(fontSizeMatch[1]),
    }
  })
}


test('second consumer bubble top and bottom paddings are visually balanced', () => {
  // Reproduce current mismatch by using text y values as top anchors and comparing top vs bottom padding.
  const source = readHeroDataFlowSource()
  const secondBubbleBlock = readSecondConsumerBubbleBlock(source)
  const { rectY, rectHeight } = readSecondBubbleRectMetrics(secondBubbleBlock)
  const textMetrics = readSecondBubbleTextMetrics(secondBubbleBlock)

  const firstTextY = textMetrics[0].y
  const lastTextY = textMetrics[textMetrics.length - 1].y
  const lastTextFontSize = textMetrics[textMetrics.length - 1].fontSize
  const rectBottom = rectY + rectHeight
  const topPadding = firstTextY - rectY
  const bottomPadding = rectBottom - (lastTextY + lastTextFontSize)
  const paddingDifference = Math.abs(topPadding - bottomPadding)

  assert.ok(
    paddingDifference <= 1,
    `Expected second bubble top vs bottom padding difference <= 1, but got ${paddingDifference} (topPadding=${topPadding}, bottomPadding=${bottomPadding}, rectY=${rectY}, rectHeight=${rectHeight}, firstTextY=${firstTextY}, lastTextY=${lastTextY}, fontSize=${lastTextFontSize})`,
  )
})
