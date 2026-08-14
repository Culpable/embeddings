import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { resolve, join, extname } from 'node:path'

const srcRoot = resolve(process.cwd(), 'src')
const homePagePath = resolve(srcRoot, 'app/page.jsx')
const showcasePath = resolve(srcRoot, 'components/AgentConversationShowcase.jsx')

// Only text sources carry copy. Image binaries and the disabled routes are out
// of scope for the claims policy.
const textExtensions = new Set(['.js', '.jsx', '.ts', '.tsx', '.mjs', '.css'])


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


test('homepage leads with the owned shopping agent', () => {
  // Guard the headline promise and the anchor the navigation links point at.
  const source = readFileSync(homePagePath, 'utf8')

  assert.match(
    source,
    /The shopping agent that’s actually yours/,
    'Expected the hero H1 to claim ownership of the agent',
  )

  assert.match(
    source,
    /id="agent"/,
    'Expected the homepage to expose the agent showcase section anchor',
  )

  assert.match(
    source,
    /Algolia, Coveo, Elasticsearch, Google Retail Search,/,
    'Expected the agent section body to name the supported search platforms',
  )

  for (const removedPhrase of [
    'Be the brand AI agents recommend first',
    'You become invisible',
    'competitive moat',
  ]) {
    assert.doesNotMatch(
      source,
      new RegExp(removedPhrase),
      `Did not expect the homepage to retain the old-frame phrase ${removedPhrase}`,
    )
  }
})


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


test('agent showcase renders the conversation, controls, and reporting', () => {
  // Every capability the section claims must be shown, not merely stated.
  const source = readFileSync(showcasePath, 'utf8')

  for (const expectedBeat of [
    'I need a dress for a spring wedding, size 10, under \\$200',
    'Sapphire Blue A-Line Midi Dress',
    '0614141123456',
    'The sapphire one. Can I pay here\\?',
    'Paid · order #8412 confirmed',
    'Where’s my order\\?',
    'Order #8412 left the warehouse this morning.',
  ]) {
    assert.match(
      source,
      new RegExp(expectedBeat),
      `Expected the conversation storyboard to include ${expectedBeat}`,
    )
  }

  for (const expectedControl of [
    'your controls',
    'Always offer the in-store pickup option',
    'Publish',
    'Live',
    'live in seconds',
    'No ticket. No release cycle.',
  ]) {
    assert.match(
      source,
      new RegExp(expectedControl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
      `Expected the control strip to include ${expectedControl}`,
    )
  }

  for (const expectedTile of ['sessions', 'conversion', 'assisted revenue']) {
    assert.match(
      source,
      new RegExp(`label: '${expectedTile}'`),
      `Expected the analytics tiles to include ${expectedTile}`,
    )
  }

  for (const expectedChip of [
    'conversational discovery',
    'checkout in the chat',
    'order & returns support',
    'bring your own search',
    'self-service control',
    'revenue analytics',
  ]) {
    assert.match(
      source,
      new RegExp(expectedChip.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
      `Expected the capability chips to include ${expectedChip}`,
    )
  }
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

  for (const forbidden of ['up to', 'ROI']) {
    assert.doesNotMatch(
      source,
      new RegExp(forbidden, 'i'),
      `Did not expect the agent showcase to frame demo values as ${forbidden} claims`,
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
