import test from 'node:test'
import assert from 'node:assert/strict'

import {
  buildStructuredData,
  serialiseStructuredData,
} from '../src/lib/structured-data.mjs'


test('structured data retains required organisation, website and page types', () => {
  for (const routeKey of ['home', 'about', 'process', 'contact', 'privacy']) {
    const graph = buildStructuredData(routeKey)['@graph']
    assert.equal(
      graph.filter((node) => node['@type'] === 'Organization').length,
      1,
    )
    assert.equal(graph.filter((node) => node['@type'] === 'WebSite').length, 1)
  }

  // Preserve schema page types without depending on graph order or stage copy.
  for (const [routeKey, pageType] of [
    ['about', 'AboutPage'],
    ['contact', 'ContactPage'],
  ]) {
    const page = buildStructuredData(routeKey)['@graph'].find(
      (node) => node['@id'] === `https://embeddings.au/${routeKey}/#webpage`,
    )
    assert.equal(page?.['@type'], pageType)
  }
})


test('structured data serializer preserves values without unsafe script text', () => {
  const original = { value: '</script>\u2028\u2029' }
  const serialised = serialiseStructuredData(original)

  assert.doesNotMatch(serialised, /</u)
  assert.deepEqual(JSON.parse(serialised), original)
})
