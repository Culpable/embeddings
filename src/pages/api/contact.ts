import type { APIRoute } from 'astro'
import { env } from 'cloudflare:workers'
import { handleContact } from '../../lib/contact/handler'

export const prerender = false

// Route every method through one schema and response owner, including explicit 405s.
export const ALL: APIRoute = ({ request }) => handleContact(request, env)
