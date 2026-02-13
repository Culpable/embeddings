import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'


const layoutPath = resolve(process.cwd(), 'src/app/layout.jsx')


function readBodyOpeningTag() {
  // Read the layout source and return the <body ...> opening tag for hydration assertions.
  const source = readFileSync(layoutPath, 'utf8')
  const bodyTagMatch = source.match(/<body\b[^>]*>/)

  return bodyTagMatch ? bodyTagMatch[0] : null
}


test('app layout body includes suppressHydrationWarning to tolerate extension-injected attributes', () => {
  // Guard against hydration mismatch warnings caused by browser extensions mutating <body> attributes.
  const bodyOpeningTag = readBodyOpeningTag()

  assert.ok(bodyOpeningTag, 'Expected src/app/layout.jsx to include a <body> opening tag')

  assert.match(
    bodyOpeningTag,
    /\bsuppressHydrationWarning\b/,
    'Expected <body> in src/app/layout.jsx to include suppressHydrationWarning',
  )
})
