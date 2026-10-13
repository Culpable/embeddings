import type { ExecutionContext, ExportedHandler, Request as WorkerRequest, Response as WorkerResponse } from '@cloudflare/workers-types'
import headerPolicy from '../public/_headers?raw'
import { handle as handleAstroRequest } from '@astrojs/cloudflare/handler'
import { handleNegotiatedDocument } from './lib/agent-readable-http/handler'

// Read the platform policy at build time so generated responses share its CSP owner.
const csp = headerPolicy.split('\n').find(line => line.trim().startsWith('Content-Security-Policy:'))!.trim().slice('Content-Security-Policy:'.length).trim()

const legacyDocuments = new Set(['/about', '/process', '/contact', '/privacy', '/thank-you', '/test-mixpanel'])

// Keep runtime responsibilities narrow: native contact, compatibility redirects and prebuilt representations.
export default {
  async fetch(incoming: WorkerRequest, env: Env, context: ExecutionContext): Promise<WorkerResponse> {
    // Bridge the generated Worker Web API types to the shared DOM-compatible handler.
    const request = incoming as unknown as Request
    const assetFetch = (input: Request) => env.ASSETS.fetch(input as unknown as WorkerRequest) as unknown as Promise<Response>
    const url = new URL(request.url)
    let response: Response
    if (url.pathname === '/api/contact' || url.pathname === '/api/contact/') {
      response = await handleAstroRequest(request, env, context)
    } else if (legacyDocuments.has(url.pathname) && ['GET', 'HEAD'].includes(request.method)) {
      url.pathname += '/'
      response = new Response(null, { status: 308, headers: { Location: url.pathname + url.search } })
    } else {
      response = await handleNegotiatedDocument({ request, fetchPublicAsset: assetFetch, fetchInternalAsset: assetFetch })
    }
    const headers = new Headers(response.headers)
    // Declare the encoding of prebuilt HTML explicitly; hosted Static Assets omit it.
    if (headers.get('Content-Type')?.toLowerCase() === 'text/html') headers.set('Content-Type', 'text/html; charset=utf-8')
    // Cover generated responses as well as Static Assets, whose _headers policy is separate.
    headers.set('Content-Security-Policy', csp)
    if (!url.pathname.startsWith('/api/contact')) headers.set('Cache-Control', 'public, max-age=0, must-revalidate')
    headers.set('X-Content-Type-Options', 'nosniff')
    headers.set('X-Frame-Options', 'DENY')
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
    if (env.CONTACT_MODE === 'preview' || url.hostname !== 'embeddings.au') headers.set('X-Robots-Tag', 'noindex, nofollow')
    return new Response(request.method === 'HEAD' ? null : response.body, { status: response.status, headers }) as unknown as WorkerResponse
  },
} satisfies ExportedHandler<Env>
