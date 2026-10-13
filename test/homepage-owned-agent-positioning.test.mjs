import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const srcRoot = fileURLToPath(new URL('../src', import.meta.url))
const textExtensions = new Set(['.js', '.jsx', '.ts', '.tsx', '.mjs', '.css', '.astro'])


test('animations do not introduce prohibited reduced-motion gates', () => {
  // Enforce the current animation rule once across active and reusable code.
  const sources = readdirSync(srcRoot, { recursive: true, withFileTypes: true })
    .filter(
      (entry) => entry.isFile() && textExtensions.has(extname(entry.name)),
    )
    .map((entry) => join(entry.parentPath ?? entry.path, entry.name))
    .filter((path) => !path.includes('/app/_disabled_pages/'))

  assert.ok(sources.length > 0, 'Expected animation sources to be discoverable')
  for (const path of sources) {
    assert.doesNotMatch(
      readFileSync(path, 'utf8'),
      /prefers-reduced-motion|motion-safe:/u,
      path,
    )
  }
})


test('agent showcase description lists put each term before its definition', () => {
  // A <dd> ahead of its <dt> breaks the description-list contract and the
  // term/definition pairing assistive technology relies on.
  const source = readFileSync(new URL('../src/components/site/AnalyticsTiles.astro', import.meta.url), 'utf8')
  const lists = source.match(/<dl[\s\S]*?<\/dl>/g) ?? []

  assert.ok(lists.length > 0, 'Expected the showcase to render description lists')

  for (const list of lists) {
    const firstTerm = list.indexOf('<dt')
    const firstDefinition = list.indexOf('<dd')

    assert.notEqual(firstTerm, -1, 'Expected every description list to define a term')
    assert.ok(
      firstTerm < firstDefinition,
      'Expected <dt> to precede <dd> in every showcase description list',
    )
  }
})
