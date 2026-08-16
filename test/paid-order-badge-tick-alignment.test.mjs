import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'


const paidOrderBadgePath = resolve(
  process.cwd(),
  'src/components/PaidOrderBadge.jsx',
)

// Cap height of Mona Sans, measured in the browser from
// TextMetrics.actualBoundingBoxAscent for 'H' at the badge's computed font.
// The label has no glyph taller than a capital and no descender, so its whole
// ink band runs from the cap top down to the baseline.
const MONA_SANS_CAP_HEIGHT_EM = 0.729

// A baseline-aligned square icon hangs one full em above the baseline, so its
// ink centre sits 0.5em up while the label's ink centre sits capHeight/2 up.
// The badge closes that gap with a downward optical offset.
const EXPECTED_OPTICAL_OFFSET_EM = 0.5 - MONA_SANS_CAP_HEIGHT_EM / 2


function readPaidOrderBadgeSource() {
  // Read component source so assertions can validate tick placement intent directly.
  return readFileSync(paidOrderBadgePath, 'utf8')
}


function readViewBox(source) {
  // Extract the tick icon viewBox as four numbers.
  const match = source.match(/viewBox="([^"]+)"/)

  if (!match) {
    return null
  }

  const [minX, minY, width, height] = match[1].trim().split(/\s+/).map(Number)

  return { minX, minY, width, height }
}


function readPathData(source) {
  // Extract the tick path definition.
  const match = source.match(/\bd="([^"]+)"/)

  return match ? match[1] : null
}


function readTickYExtent(pathData) {
  // Walk the tick path and return the smallest and largest y coordinate it
  // touches. The tick is drawn with symmetric round caps and joins, so its ink
  // extends equally beyond both ends and this geometric extent is also the
  // centre of the rendered ink.
  const tokens = pathData.match(/[MmLlHhVvZz]|-?\d*\.?\d+/g)

  assert.notEqual(tokens, null, 'Expected the tick path to contain drawing commands')

  let command = null
  let x = 0
  let y = 0
  let index = 0
  const yValues = []

  function takeNumber() {
    // Consume the next numeric token, failing loudly on a malformed path.
    const value = Number(tokens[index])

    assert.equal(
      Number.isNaN(value),
      false,
      `Expected a number at token ${index} of the tick path, found ${tokens[index]}`,
    )

    index += 1

    return value
  }

  while (index < tokens.length) {
    if (/[MmLlHhVvZz]/.test(tokens[index])) {
      command = tokens[index]
      index += 1
      continue
    }

    // Repeated coordinate pairs after M/m are implicit line commands.
    const activeCommand = command === 'M' ? 'L' : command === 'm' ? 'l' : command

    assert.match(
      activeCommand ?? '',
      /^[LlHhVv]$/,
      `Unsupported tick path command "${activeCommand}"; update this test if the icon is redrawn`,
    )

    if (activeCommand === 'L' || activeCommand === 'l') {
      const nextX = takeNumber()
      const nextY = takeNumber()

      x = activeCommand === 'L' ? nextX : x + nextX
      y = activeCommand === 'L' ? nextY : y + nextY
    } else if (activeCommand === 'H' || activeCommand === 'h') {
      const nextX = takeNumber()

      x = activeCommand === 'H' ? nextX : x + nextX
    } else {
      const nextY = takeNumber()

      y = activeCommand === 'V' ? nextY : y + nextY
    }

    yValues.push(y)

    if (command === 'M' || command === 'm') {
      // Record the start point once, before the implicit lines continue.
      command = command === 'M' ? 'L' : 'l'
    }
  }

  // The first M coordinate pair is consumed by the loop above, so every point
  // the path visits is already in yValues.
  return { min: Math.min(...yValues), max: Math.max(...yValues) }
}


test('paid order badge tick ink is vertically centred inside its own viewBox', () => {
  // Reproduce the reported misalignment: a tick drawn low in its viewBox renders
  // below the label no matter how the icon box is aligned.
  const source = readPaidOrderBadgeSource()
  const viewBox = readViewBox(source)
  const pathData = readPathData(source)

  assert.notEqual(viewBox, null, 'Expected a viewBox on the tick icon')
  assert.notEqual(pathData, null, 'Expected a d attribute on the tick path')

  const { min, max } = readTickYExtent(pathData)
  const tickCentre = (min + max) / 2
  const viewBoxCentre = viewBox.minY + viewBox.height / 2

  assert.equal(
    Math.abs(tickCentre - viewBoxCentre) < 0.001,
    true,
    `Expected tick ink centre (${tickCentre}) to equal viewBox centre (${viewBoxCentre})`,
  )
})


test('paid order badge trims the label line box down to the cap band', () => {
  // A line box carries ascent, descent, and half-leading on top of the glyphs,
  // and engines disagree on how much: the baseline sits 12.00px into the same
  // 16px line box in Chromium, 11.80px in WebKit, and about 10.95px on iOS
  // Safari. Trimming the box to the cap band removes that variable, so ordinary
  // centring lands on the type itself.
  const source = readPaidOrderBadgeSource()

  assert.match(
    source,
    /supports-\[text-box-trim:trim-both\]:\[text-box:trim-both_cap_alphabetic\]/,
    'Expected the label to trim its line box to the cap band where supported',
  )

  // The trim has to sit on the element that directly contains the text.
  // text-box-trim is not inherited, so it would never reach an anonymous flex
  // item created by bare text inside the pill.
  assert.match(
    source,
    /\[text-box:trim-both_cap_alphabetic\]"\s*>\s*\n\s*Paid · order confirmed/,
    'Expected the trim to sit on the element that directly wraps the label text',
  )
})


test('paid order badge keeps one pill height on both the trimmed and untrimmed paths', () => {
  // Untrimmed, the 16px line box is the tallest flex item and py-1 pads it to
  // 26px. Trimmed, the label shrinks to the cap band and the 1em tick becomes
  // the tallest item, so the padding grows to 0.5em: 6 + 12 + 6 + 2px border.
  const source = readPaidOrderBadgeSource()

  assert.match(
    source,
    /(^|\s|')py-1(\s|')/,
    'Expected py-1 as the untrimmed fallback padding',
  )

  assert.match(
    source,
    /supports-\[text-box-trim:trim-both\]:py-\[0\.5em\]/,
    'Expected 0.5em padding on the trimmed path so the pill stays 26px tall',
  )
})


test('paid order badge centres the tick on the cap band once the label is trimmed', () => {
  // With the label box trimmed to the cap band, plain centring is exact and
  // needs no baseline synthesis, which WebKit resolves 0.2px differently from
  // Chromium. The baseline anchoring below stays for engines without the trim.
  const source = readPaidOrderBadgeSource()
  const svgMatch = source.match(/<svg[\s\S]*?className="([^"]+)"/)

  assert.notEqual(svgMatch, null, 'Expected a className on the tick icon')

  const svgClasses = svgMatch[1]

  assert.match(
    svgClasses,
    /supports-\[text-box-trim:trim-both\]:self-center/,
    'Expected the tick to centre on the trimmed cap band where supported',
  )

  assert.match(
    svgClasses,
    /supports-\[text-box-trim:trim-both\]:translate-y-0/,
    'Expected the untrimmed optical offset to be cancelled on the trimmed path',
  )
})


test('paid order badge tick is anchored to the label baseline, not the line box', () => {
  // Fallback path for engines without text-box-trim. Centring the icon box
  // against the line box makes alignment depend on font metrics and
  // half-leading, so the icon is tied to where the glyphs actually sit.
  const source = readPaidOrderBadgeSource()
  const svgMatch = source.match(/<svg[\s\S]*?className="([^"]+)"/)

  assert.notEqual(svgMatch, null, 'Expected a className on the tick icon')

  const svgClasses = svgMatch[1]

  assert.match(
    svgClasses,
    /\bself-baseline\b/,
    'Expected the tick icon to use self-baseline so it hangs from the label baseline',
  )

  // No trailing \b after the closing bracket: ']' is not a word character, so
  // a boundary never matches there.
  assert.match(
    svgClasses,
    /(^|\s)h-\[1em\](\s|$)/,
    'Expected the tick icon height to track the label font size in em',
  )

  assert.match(
    svgClasses,
    /(^|\s)w-\[1em\](\s|$)/,
    'Expected the tick icon width to track the label font size in em',
  )
})


test('paid order badge tick optical offset centres it on the label cap band', () => {
  // The offset is derived, not eyeballed: it must equal 0.5em minus half the
  // Mona Sans cap height, which lands the tick ink centre on the cap band centre.
  const source = readPaidOrderBadgeSource()
  const offsetMatch = source.match(/translate-y-\[(-?\d*\.?\d+)em\]/)

  assert.notEqual(
    offsetMatch,
    null,
    'Expected an em-based translate-y optical offset on the tick icon',
  )

  const offset = Number(offsetMatch[1])

  assert.equal(
    Math.abs(offset - EXPECTED_OPTICAL_OFFSET_EM) < 0.005,
    true,
    `Expected tick optical offset (${offset}em) to equal 0.5em - capHeight/2 (${EXPECTED_OPTICAL_OFFSET_EM.toFixed(4)}em)`,
  )
})
