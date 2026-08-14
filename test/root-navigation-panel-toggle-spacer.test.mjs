import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const navigationButtonPath = resolve(
  process.cwd(),
  'src/components/NavigationButton.jsx',
)

const rootNavigationPanelPath = resolve(
  process.cwd(),
  'src/components/RootNavigationPanel.jsx',
)


test('the navigation toggle exposes a single shared layout footprint', () => {
  // The toggle's own hit area overflows the header flex row via `-m-2.5 p-2.5`,
  // so only the inner icon box occupies layout space. Keep that box exported and
  // applied to the icon wrapper so the panel placeholder can reuse it.
  const source = readFileSync(navigationButtonPath, 'utf8')

  const footprint = source.match(
    /export const navigationButtonFootprintClassName = '(?<classes>[^']+)'/,
  )

  assert.ok(
    footprint,
    'Expected NavigationButton to export navigationButtonFootprintClassName',
  )

  assert.match(
    source,
    /clsx\('relative block', navigationButtonFootprintClassName\)/,
    'Expected the toggle icon wrapper to use the shared footprint classes',
  )

  assert.match(
    source,
    /-m-2\.5 rounded-full p-2\.5/,
    'Expected the toggle to keep pulling its padded hit area out of layout flow',
  )
})


test('the panel header placeholder reserves the toggle footprint exactly', () => {
  // Regression: the placeholder previously used `min-h-11 min-w-11 sm:min-h-10
  // sm:min-w-10`, which is wider than the toggle's 24px layout box. That pushed
  // the "Contact us" button 16px left whenever the navigation panel opened.
  const source = readFileSync(rootNavigationPanelPath, 'utf8')

  const placeholder = source.match(
    /<span\s+className=\{(?<classes>[^}]+)\}\s+aria-hidden="true"\s*\/>/,
  )

  assert.ok(placeholder, 'Expected to find the aria-hidden toggle placeholder')

  assert.equal(
    placeholder.groups.classes.trim(),
    "clsx('block', navigationButtonFootprintClassName)",
    'Expected the placeholder to reuse the shared toggle footprint classes',
  )

  assert.match(
    source,
    /import \{ navigationButtonFootprintClassName \} from '@\/components\/NavigationButton'/,
    'Expected the panel to import the shared toggle footprint classes',
  )

  assert.doesNotMatch(
    source,
    /min-w-11 sm:min-h-10 sm:min-w-10/,
    'Expected the placeholder not to reserve a wider box than the toggle',
  )
})


test('the header and panel header wrap their actions in the same flex row', () => {
  // Both rows must share gap and alignment, otherwise the CTA position diverges
  // even with a correct placeholder footprint.
  const headerSource = readFileSync(
    resolve(process.cwd(), 'src/components/RootHeader.jsx'),
    'utf8',
  )
  const panelSource = readFileSync(rootNavigationPanelPath, 'utf8')

  const actionRow = /<div className="flex items-center gap-x-6 sm:gap-x-8">/

  assert.match(headerSource, actionRow, 'Expected the header action row classes')
  assert.match(panelSource, actionRow, 'Expected the panel action row classes')
})
