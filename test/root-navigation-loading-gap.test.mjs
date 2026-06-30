import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const rootNavigationPath = resolve(
  process.cwd(),
  'src/components/RootNavigation.jsx',
)


test('root navigation does not create a blank open state while the panel code loads', () => {
  // Prevent the menu trigger from disappearing before the navigation panel can
  // render. A client-only dynamic panel needs a visible loading fallback, or the
  // panel should be available synchronously when expanded becomes true.
  const source = readFileSync(rootNavigationPath, 'utf8')
  const importsDynamic = /from\s+['"]next\/dynamic['"]/.test(source)
  const disablesPanelServerRendering = /ssr\s*:\s*false/.test(source)
  const providesLoadingFallback = /loading\s*:/.test(source)

  assert.equal(
    importsDynamic && disablesPanelServerRendering && !providesLoadingFallback,
    false,
    'Expected RootNavigation.jsx not to hide the menu trigger while a client-only dynamic panel loads',
  )
})
