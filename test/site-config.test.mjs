import test from 'node:test'
import assert from 'node:assert/strict'

import {
  crawlerRegistry,
  getIndexableRoutes,
  routes,
  siteConfig,
} from '../src/lib/site-config.mjs'

test('site configuration has one coherent public route inventory', () => {
  const routeEntries = Object.values(routes)
  const paths = routeEntries.map((route) => route.path)
  const indexable = getIndexableRoutes().map(([, route]) => route.path)

  assert.equal(new Set(paths).size, paths.length)
  assert.deepEqual(indexable, ['/', '/about', '/process', '/contact', '/privacy'])

  for (const route of routeEntries) {
    assert.ok(route.title)
    assert.ok(route.description)
    assert.equal(
      route.indexable,
      route.includeInSitemap && route.includeInLlms,
      `${route.path} discovery flags must match indexability`,
    )
  }

  assert.equal(siteConfig.htmlLang, 'en-AU')
  assert.equal(siteConfig.openGraphLocale, 'en_AU')
  assert.equal(siteConfig.organisation.sameAs, undefined)
})

test('crawler registry records each reviewed token and provider reference', () => {
  const tokens = crawlerRegistry.flatMap((entry) => entry.userAgents)

  assert.deepEqual(tokens, [
    'OAI-SearchBot',
    'ChatGPT-User',
    'Claude-SearchBot',
    'Claude-User',
    'PerplexityBot',
    'Perplexity-User',
    'GPTBot',
    'ClaudeBot',
    'Google-Extended',
    'CCBot',
  ])

  for (const entry of crawlerRegistry) {
    assert.match(entry.providerUrl, /^https:\/\//u)
  }
})
