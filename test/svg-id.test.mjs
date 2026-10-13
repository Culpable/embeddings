import assert from 'node:assert/strict'
import test from 'node:test'
import { tsImport } from 'tsx/esm/api'
const { createSvgId } = await tsImport('../src/lib/svg-id.ts', import.meta.url)

// Protect unchanged-publication detection without pinning the generated spelling.
test('fresh document scopes produce stable identifiers and repeated instances remain unique', () => {
  const first={}, second={}
  const ids=[createSvgId(first,'/process/','grid'),createSvgId(first,'/process/','grid')]
  assert.notEqual(ids[0],ids[1])
  assert.deepEqual(ids,[createSvgId(second,'/process/','grid'),createSvgId(second,'/process/','grid')])
  assert.notEqual(createSvgId({},'/','logo'),createSvgId({},'/about/','logo'))
  assert.match(ids[0],/^[a-zA-Z][a-zA-Z0-9_-]*$/u)
})
