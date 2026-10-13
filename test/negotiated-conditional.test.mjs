import test from 'node:test'
import assert from 'node:assert/strict'
import { handleNegotiatedDocument } from '../src/lib/agent-readable-http/handler.ts'

// Inject an HTML validator boundary without changing a published asset or cache.
test('HTML conditional validators cannot suppress a requested Markdown representation', async () => {
  const request = new Request('https://embeddings.au/about/', { headers: { Accept: 'text/markdown', 'If-None-Match': 'html-validator', 'If-Modified-Since': 'Tue, 13 Oct 2026 00:00:00 GMT' } })
  const response = await handleNegotiatedDocument({ request,
    fetchPublicAsset: async source => source.headers.has('if-none-match') || source.headers.has('if-modified-since') ? new Response(null, { status: 304 }) : new Response('<h1>About</h1>', { headers: { ETag: 'html-validator' } }),
    fetchInternalAsset: async () => new Response('# About\n'),
  })
  assert.equal(response.status, 200)
  assert.equal(await response.text(), '# About\n')
  assert.equal(response.headers.get('etag'), null)
})
