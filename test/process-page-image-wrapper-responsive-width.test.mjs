import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'


const processPagePath = resolve(process.cwd(), 'src/app/process/page.jsx')


function readProcessPageSource() {
  // Read the process page source so assertions can validate the section image wrapper classes.
  return readFileSync(processPagePath, 'utf8')
}


function readSectionImageWrapperClasses(source) {
  // Locate the Section component image wrapper by matching its FadeIn wrapper before StylizedImage.
  const sectionWrapperMatch = source.match(
    /function Section\(\{ title, image, children \}\) \{[\s\S]*?<FadeIn className="([^"]+)">[\s\S]*?<StylizedImage/,
  )

  return sectionWrapperMatch ? sectionWrapperMatch[1] : ''
}


function readUnprefixedFixedWidthClasses(classList) {
  // Find mobile width classes that force a fixed pixel/rem width without breakpoint prefixes.
  return classList
    .split(/\s+/)
    .filter(Boolean)
    .filter((token) => /^w-\[[^\]]+\]$/.test(token))
}


test('process section image wrapper uses mobile-safe width constraints', () => {
  // Require full-width mobile sizing with a max width guard to prevent off-screen clipping.
  const source = readProcessPageSource()
  const sectionImageWrapperClasses = readSectionImageWrapperClasses(source)
  const unprefixedFixedWidthClasses = readUnprefixedFixedWidthClasses(
    sectionImageWrapperClasses,
  )

  assert.ok(
    sectionImageWrapperClasses.length > 0,
    'Expected to find Section image wrapper classes in src/app/process/page.jsx',
  )

  assert.match(
    sectionImageWrapperClasses,
    /\bw-full\b/,
    'Expected Section image wrapper to include w-full for mobile-safe width',
  )

  assert.match(
    sectionImageWrapperClasses,
    /\bmax-w-(?:\[[^\]]+\]|[a-z0-9-]+)\b/,
    'Expected Section image wrapper to include a max-w-* constraint for bounded scaling',
  )

  assert.equal(
    unprefixedFixedWidthClasses.length,
    0,
    `Found unprefixed fixed-width mobile classes: ${unprefixedFixedWidthClasses.join(' ')}`,
  )
})
