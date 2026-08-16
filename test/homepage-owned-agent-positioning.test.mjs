import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { resolve, join, extname } from 'node:path'

const srcRoot = resolve(process.cwd(), 'src')
const showcasePath = resolve(srcRoot, 'components/AgentConversationShowcase.jsx')
const componentsCssPath = resolve(srcRoot, 'styles/components.css')

// Only text sources carry copy, so image binaries are skipped. Markdown is
// included because src/ still holds a legacy prose file, and the claims policy
// applies to any copy that lives under src/ whether or not it ships today.
const textExtensions = new Set([
  '.js',
  '.jsx',
  '.ts',
  '.tsx',
  '.mjs',
  '.css',
  '.md',
])


function readSourceFiles() {
  // Walk src/ once and return [relativePath, contents] for every text source
  // that ships as part of the live site.
  return readdirSync(srcRoot, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && textExtensions.has(extname(entry.name)))
    .map((entry) => {
      const absolutePath = join(entry.parentPath ?? entry.path, entry.name)

      return [absolutePath.slice(srcRoot.length + 1), readFileSync(absolutePath, 'utf8')]
    })
    .filter(([relativePath]) => !relativePath.startsWith('app/_disabled_pages'))
}


test('agent showcase ships as a static server component', () => {
  // Keep the showcase free of client JavaScript and of accessibility media
  // query gating, which AGENTS.md forbids in animation code.
  const source = readFileSync(showcasePath, 'utf8')

  assert.doesNotMatch(
    source,
    /'use client'/,
    'Expected the agent showcase to stay a Server Component',
  )

  assert.doesNotMatch(
    source,
    /prefers-reduced-motion/,
    'Expected the agent showcase to animate consistently for all users',
  )
})


test('agent showcase avoids competitor naming and result claims', () => {
  // Contrast with incumbent offerings stays implicit, and the sample reporting
  // values must read as product UI rather than as promised outcomes.
  const source = readFileSync(showcasePath, 'utf8')

  for (const forbidden of ['Google', 'OpenAI', 'Bunnings', 'Buddy']) {
    assert.doesNotMatch(
      source,
      new RegExp(forbidden),
      `Did not expect the agent showcase to name ${forbidden}`,
    )
  }

  // Anchor on word boundaries so an unrelated word that merely contains these
  // letters cannot fail the guard later.
  for (const forbidden of ['up to', 'ROI', 'uplift']) {
    assert.doesNotMatch(
      source,
      new RegExp(`\\b${forbidden}\\b`, 'i'),
      `Did not expect the agent showcase to frame demo values as ${forbidden} claims`,
    )
  }
})


test('agent showcase animations stay in shared css', () => {
  // AGENTS.md protects this component's animation design, so keep the class
  // and keyframe contract between the component and components.css intact.
  const source = readFileSync(showcasePath, 'utf8')
  const cssSource = readFileSync(componentsCssPath, 'utf8')

  assert.doesNotMatch(
    source,
    /@keyframes/,
    'Expected the showcase to use shared CSS rather than inlining keyframes',
  )

  for (const className of [
    'agent-beat',
    'agent-caret',
    'agent-publish-label',
    'agent-live-label',
  ]) {
    assert.match(
      source,
      new RegExp(className),
      `Expected the showcase to use the shared ${className} class`,
    )
    assert.match(
      cssSource,
      new RegExp(`\\.${className}`),
      `Expected components.css to define .${className}`,
    )
  }

  for (const keyframes of [
    'agentBeatReveal',
    'agentCaretBlink',
    'agentPublishFade',
    'agentLiveFade',
  ]) {
    assert.match(
      cssSource,
      new RegExp(`@keyframes ${keyframes}`),
      `Expected components.css to define @keyframes ${keyframes}`,
    )
  }

  assert.match(
    cssSource,
    /--agent-beat-delay/,
    'Expected the stagger to be driven by the shared delay custom property',
  )

  assert.doesNotMatch(
    cssSource,
    /prefers-reduced-motion/,
    'Expected shared CSS to animate consistently for all users',
  )
})


test('agent showcase description lists put each term before its definition', () => {
  // A <dd> ahead of its <dt> breaks the description-list contract and the
  // term/definition pairing assistive technology relies on.
  const source = readFileSync(showcasePath, 'utf8')
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


test('site copy keeps competitor names and internal figures off the page', () => {
  // Enforce the claims policy across every shipped source file: no competitor
  // or incumbent naming, and no uplift, per-session, or pricing figures.
  const sourceFiles = readSourceFiles()

  assert.ok(sourceFiles.length > 0, 'Expected to find site source files to scan')

  const caseSensitiveForbidden = ['Bunnings', 'Buddy', '$0.50', 'US$260', '2–4', '2-4×']
  const caseInsensitiveForbidden = [
    'cheaper',
    'lower cost',
    'per-session',
    'per session',
    'platform fee',
    'usage-based',
  ]

  for (const [relativePath, contents] of sourceFiles) {
    for (const forbidden of caseSensitiveForbidden) {
      assert.doesNotMatch(
        contents,
        new RegExp(forbidden.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
        `Did not expect ${relativePath} to contain ${forbidden}`,
      )
    }

    for (const forbidden of caseInsensitiveForbidden) {
      assert.doesNotMatch(
        contents,
        new RegExp(forbidden.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'),
        `Did not expect ${relativePath} to contain ${forbidden}`,
      )
    }
  }
})
