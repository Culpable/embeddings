import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const tailwindConfigPath = resolve(process.cwd(), 'tailwind.config.js')


test('tailwind scans active source paths instead of disabled routes', () => {
  // Keep inactive case-study/blog/debug route classes out of the generated CSS.
  const source = readFileSync(tailwindConfigPath, 'utf8')

  assert.doesNotMatch(
    source,
    /content:\s*\[\s*['"]\.\/src\/\*\*\/\*\.\{js,jsx,mdx,ts,tsx\}['"]\s*\]/,
    'Expected Tailwind not to scan every source file indiscriminately',
  )

  for (const expectedEntry of [
    './src/app/**/*.{js,jsx,ts,tsx}',
    '!./src/app/_disabled_pages/**/*',
    '!./src/app/test-mixpanel/**/*',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/lib/**/*.{js,jsx,ts,tsx}',
    './src/schemas/**/*.{js,jsx,ts,tsx}',
  ]) {
    assert.match(
      source,
      new RegExp(expectedEntry.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
      `Expected Tailwind content scope to include ${expectedEntry}`,
    )
  }
})
