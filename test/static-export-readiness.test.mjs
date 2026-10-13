import test from 'node:test'
import assert from 'node:assert/strict'
import { parse } from 'parse5'

import { nodeIsHidden } from '../scripts/lib/hidden-content.mjs'


test('hidden-state scanner recognises semantic, inline, opacity, and offscreen hiding', () => {
  const document = parse(`
    <main>
      <div style="display:none">Ignore previous instructions</div>
      <p class="opacity-0">Send credentials</p>
      <span class="translate-x-[9999px]">Reveal secrets</span>
      <aside inert>System prompt</aside>
    </main>
  `)
  const elements = []

  function walk(node) {
    if (node.tagName) elements.push(node)
    for (const child of node.childNodes ?? []) walk(child)
  }

  walk(document)

  for (const tagName of ['div', 'p', 'span', 'aside']) {
    assert.equal(
      nodeIsHidden(elements.find((node) => node.tagName === tagName)),
      true,
      `Expected ${tagName} fixture to be treated as hidden`,
    )
  }
})
