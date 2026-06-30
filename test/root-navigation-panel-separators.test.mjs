import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const rootNavigationPanelPath = resolve(
  process.cwd(),
  'src/components/RootNavigationPanel.jsx',
)


test('navigation rows draw separators before every row after the first', () => {
  // Keep the menu grid lines continuous across all navigation rows, including
  // the boundary between the second and third rows.
  const source = readFileSync(rootNavigationPanelPath, 'utf8')
  const navigationRow = source.match(
    /function NavigationRow\(\{ children \}\) \{[\s\S]*?className="(?<classes>[^"]+)"/,
  )

  assert.ok(navigationRow, 'Expected to find the NavigationRow wrapper classes')

  const classes = navigationRow.groups.classes

  assert.match(
    classes,
    /\bmt-px\b/,
    'Expected navigation rows to include a default top separator',
  )

  assert.match(
    classes,
    /\bfirst:mt-0\b/,
    'Expected the first navigation row to remove the top separator',
  )

  assert.doesNotMatch(
    classes,
    /\beven:mt-px\b/,
    'Expected row separators not to be limited to even rows',
  )
})
