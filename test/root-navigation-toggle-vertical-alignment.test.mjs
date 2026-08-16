import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const rootNavigationPath = resolve(
  process.cwd(),
  'src/components/RootNavigation.jsx',
)


test('the navigation toggle wrapper lays the toggle out as a flex item', () => {
  // Regression: the wrapper was a plain block element, so the inline-block
  // toggle sat on a text baseline. The line box added descender space below the
  // button, which made the wrapper 33px tall instead of the toggle's 24px
  // footprint. The header row centred that taller wrapper, so the toggle
  // rendered 4.5px above the "Contact us" button's centre line on every
  // viewport. Measured at 390px before the fix: toggle centre 81.5 against the
  // CTA centre 86; after the fix both centre on 86.
  const source = readFileSync(rootNavigationPath, 'utf8')

  assert.match(
    source,
    /className="flex items-center"/,
    'Expected the navigation toggle wrapper to be a centred flex row',
  )
})
