import test from 'node:test'
import assert from 'node:assert/strict'

import {
  renderLlmsTxt,
  renderSitemapXml,
} from '../src/lib/public-artifacts.mjs'


test('llms and sitemap retain canonical public links and exclude internal destinations', () => {
  const llmsLinks = Array.from(
    renderLlmsTxt().matchAll(/\]\((https:\/\/[^)]+)\)/gu),
    (match) => match[1],
  )
  const sitemapLinks = Array.from(
    renderSitemapXml().matchAll(/<loc>([^<]+)<\/loc>/gu),
    (match) => match[1],
  )

  // Preserve promised destinations while allowing new routes and revised prose.
  for (const links of [llmsLinks, sitemapLinks]) {
    for (const route of ['', '/about', '/process', '/contact', '/privacy']) {
      assert.ok(links.includes(`https://embeddings.au${route}`), route || '/')
    }
    for (const link of links) {
      assert.doesNotMatch(link, /\/(?:thank-you|test-mixpanel)(?:[/?#]|$)/u)
      assert.doesNotMatch(link, /\.md(?:[?#]|$)|\/llms-full\.txt(?:[?#]|$)/u)
    }
  }
})
