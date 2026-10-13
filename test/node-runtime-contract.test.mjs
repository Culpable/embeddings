import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

import { getNodeVersionError } from '../scripts/check-node-version.mjs'

const supportedNodeVersion = readFileSync(
  new URL('../.nvmrc', import.meta.url),
  'utf8',
).trim()


test('runtime preflight accepts its configured version and rejects an unsupported runtime', () => {
  // Exercise the actual comparison rather than freezing hooks, imports or prose.
  assert.equal(
    getNodeVersionError(
      supportedNodeVersion,
      supportedNodeVersion.replace(/^v/u, ''),
    ),
    null,
  )
  assert.ok(getNodeVersionError(supportedNodeVersion, '0.0.0'))
})
