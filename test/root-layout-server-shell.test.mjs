import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const rootLayoutPath = resolve(process.cwd(), 'src/components/RootLayout.jsx')
const rootHeaderPath = resolve(process.cwd(), 'src/components/RootHeader.jsx')

test('root layout remains a server shell without framer motion', () => {
  // Guard the performance boundary so global route chrome does not become a full client component again.
  const source = readFileSync(rootLayoutPath, 'utf8')

  assert.doesNotMatch(
    source,
    /['"]use client['"]/,
    'Expected RootLayout.jsx to remain a Server Component',
  )

  assert.doesNotMatch(
    source,
    /framer-motion/,
    'Expected RootLayout.jsx not to import framer-motion',
  )
})

test('root header owns the interactive navigation island', () => {
  // Keep menu state isolated to the header instead of hydrating the entire page shell.
  const source = readFileSync(rootHeaderPath, 'utf8')

  assert.match(
    source,
    /['"]use client['"]/,
    'Expected RootHeader.jsx to be the client island for navigation',
  )

  assert.doesNotMatch(
    source,
    /framer-motion/,
    'Expected RootHeader.jsx to use CSS transitions instead of framer-motion layout animation',
  )
})
