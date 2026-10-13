import test from 'node:test'
import assert from 'node:assert/strict'

import { crawlerRegistry } from '../src/lib/site-config.mjs'


test('crawler registry retains recognised external user-agent tokens', () => {
  const tokens = crawlerRegistry.flatMap((entry) => entry.userAgents)

  // Preserve names external crawlers send, without freezing registry order.
  for (const token of [
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
  ]) {
    assert.ok(
      tokens.includes(token),
      `Expected robots policy to recognise ${token}`,
    )
  }
})
