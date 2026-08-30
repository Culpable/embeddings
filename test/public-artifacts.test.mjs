import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import {
  renderLlmsTxt,
  renderRobotsTxt,
  renderSitemapXml,
} from '../src/lib/public-artifacts.mjs'

test('public discovery renderers match checked-in UTF-8 files', () => {
  const artifacts = [
    ['llms.txt', renderLlmsTxt()],
    ['robots.txt', renderRobotsTxt()],
    ['sitemap.xml', renderSitemapXml()],
  ]

  for (const [fileName, rendered] of artifacts) {
    assert.equal(readFileSync(resolve('public', fileName), 'utf8'), rendered)
  }
})

test('llms and sitemap expose only the five canonical public routes', () => {
  const llms = renderLlmsTxt()
  const sitemap = renderSitemapXml()
  const canonicalRoutes = [
    'https://embeddings.au',
    'https://embeddings.au/about',
    'https://embeddings.au/process',
    'https://embeddings.au/contact',
    'https://embeddings.au/privacy',
  ]

  assert.match(llms, /^# Embeddings\n\n> /u)
  for (const label of ['When to use', 'When not to use', 'How to use']) {
    assert.match(llms, new RegExp(`\\*\\*${label}:\\*\\*`, 'u'))
  }
  for (const route of canonicalRoutes) {
    assert.match(llms, new RegExp(route.replaceAll('/', '\\/'), 'u'))
    assert.match(sitemap, new RegExp(`<loc>${route.replaceAll('/', '\\/')}<\\/loc>`, 'u'))
  }
  for (const forbidden of ['/thank-you', '/test-mixpanel', '.md', 'llms-full.txt']) {
    assert.doesNotMatch(llms, new RegExp(forbidden.replaceAll('/', '\\/'), 'u'))
    assert.doesNotMatch(sitemap, new RegExp(forbidden.replaceAll('/', '\\/'), 'u'))
  }
  assert.doesNotMatch(sitemap, /lastmod|changefreq|priority/u)
})
