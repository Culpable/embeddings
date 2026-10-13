import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

import {
  buildStructuredData,
  serialiseStructuredData,
} from '../src/lib/structured-data.mjs'

test('indexable routes emit linked organisation, website, and page nodes', () => {
  for (const routeKey of ['home', 'about', 'process', 'contact', 'privacy']) {
    const graph = buildStructuredData(routeKey)['@graph']
    const ids = new Set(graph.map((node) => node['@id']))

    assert.ok(ids.has('https://embeddings.au/#organisation'))
    assert.ok(ids.has('https://embeddings.au/#website'))
    assert.equal(graph.filter((node) => node['@type'] === 'Organization').length, 1)
    assert.equal(graph.filter((node) => node['@type'] === 'WebSite').length, 1)
  }

  assert.equal(buildStructuredData('about')['@graph'][2]['@type'], 'AboutPage')
  assert.equal(buildStructuredData('contact')['@graph'][2]['@type'], 'ContactPage')
  assert.deepEqual(
    buildStructuredData('process')['@graph']
      .filter((node) => node['@type'] === 'Service')
      .map((node) => node.name),
    ['Discover', 'Build', 'Deploy', 'Operate'],
  )
})

test('structured data serializer preserves values without unsafe script text', () => {
  const original = { value: '<\/script>\u2028\u2029' }
  const serialised = serialiseStructuredData(original)

  assert.doesNotMatch(serialised, /</u)
  assert.deepEqual(JSON.parse(serialised), original)
})

test('route files use shared metadata and structured-data helpers', () => {
  const routeFiles = {
    home: 'src/app/page.jsx',
    about: 'src/app/about/page.jsx',
    process: 'src/app/process/page.jsx',
    contact: 'src/app/contact/page.jsx',
    privacy: 'src/app/privacy/page.jsx',
  }

  for (const [routeKey, path] of Object.entries(routeFiles)) {
    const source = readFileSync(path, 'utf8')
    assert.match(source, new RegExp(`buildPageMetadata\\('${routeKey}'\\)`, 'u'))
    assert.match(source, new RegExp(`<StructuredData routeKey="${routeKey}" \\/>`, 'u'))
  }
})
