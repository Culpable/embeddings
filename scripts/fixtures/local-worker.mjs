import worker from './server/entry.mjs'
import { handleContact } from './contact-fixture.mjs'

// Exercise native POST and redirects locally without real mail, tokens or secrets.
// Generate this module only into .astro-local; hosted configs always use entry.mjs.
export default {
  async fetch(request, env, context) {
    const url = new URL(request.url)
    if (request.method !== 'POST' || (url.pathname !== '/api/contact/' && url.pathname !== '/api/contact')) return worker.fetch(request, env, context)
    if (!['127.0.0.1', 'localhost'].includes(url.hostname) || request.headers.get('origin') !== url.origin) return new Response(null, { status: 422 })
    const headers = new Headers(request.headers)
    headers.set('origin', 'https://embeddings.au')
    const synthetic = new Request('https://embeddings.au/api/contact/', { method: request.method, headers, body: request.body, duplex: 'half' })
    const response = await handleContact(synthetic, { CONTACT_MODE: 'production', RESEND_API_KEY: 'local-fixture', TURNSTILE_SECRET_KEY: 'local-fixture', CONTACT_TO_EMAIL: 'solutions@embeddings.au' }, {
      fetch: async input => Response.json(String(input).includes('siteverify') ? { success: true, hostname: 'embeddings.au', action: 'contact' } : { id: 'local-fixture' }),
      log: () => {},
    })
    const finalHeaders = new Headers(response.headers)
    const source = await env.ASSETS.fetch(new Request(new URL('/contact/', url)))
    for (const name of ['Content-Security-Policy', 'X-Frame-Options', 'X-Content-Type-Options', 'Permissions-Policy', 'Referrer-Policy']) {
      const value = source.headers.get(name)
      if (value) finalHeaders.set(name, value)
    }
    return new Response(response.body, { status: response.status, headers: finalHeaders })
  },
}
