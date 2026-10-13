import { site } from '../../config/site'

/** Keep contact data request-scoped and expose only safe outcomes to logs. */
export interface ContactConfig {
  CONTACT_MODE?: string
  CONTACT_TO_EMAIL?: string
  RESEND_API_KEY?: string
  TURNSTILE_SECRET_KEY?: string
  CONTACT_ALLOWED_ORIGIN?: string
  CF_VERSION_METADATA?: { id: string }
}

interface Providers {
  fetch?: typeof fetch
  log?: (entry: { requestId: string; version: string; outcome: string; duration: number }) => void
}

const limits = { name: 120, email: 254, company: 160, phone: 40, message: 4000 } as const
const budgets: Record<string, string> = { '100': 'Less than $100k', '500': '$100k – $500k', '1000': '$500k – $1M', '1500': 'More than $1M' }
const allowed = new Set([...Object.keys(limits), 'budget', '_gotcha', 'cf-turnstile-response', 'submissionId'])
const maxBytes = 64 * 1024


/** Bound unknown-length bodies before parsing; never buffer untrusted unlimited input. */
async function readBody(request: Request): Promise<Uint8Array<ArrayBuffer>> {
  const reader = request.body?.getReader()
  const chunks: Uint8Array[] = []
  let length = 0
  if (Number(request.headers.get('content-length')) > maxBytes) throw new RangeError('body')
  if (!reader) return new Uint8Array()
  try {
    for (;;) {
      const { done, value } = await reader.read()
      if (done) break
      length += value.byteLength
      if (length > maxBytes) { await reader.cancel(); throw new RangeError('body') }
      chunks.push(value)
    }
  } finally { reader.releaseLock() }
  const body = new Uint8Array(length)
  let offset = 0
  for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.byteLength }
  return body
}


/** Parse only browser form encodings and reject malformed bytes or duplicate parameters. */
async function parseForm(request: Request): Promise<FormData> {
  const body = await readBody(request)
  const type = request.headers.get('content-type') ?? ''
  // Reject undecodable bytes before formData can silently replace invalid field text.
  const text = new TextDecoder('utf-8', { fatal: true }).decode(body)
  if (type.startsWith('application/x-www-form-urlencoded')) {
    for (const part of text.split('&')) for (const value of part.split('=')) decodeURIComponent(value.replaceAll('+', ' '))
  } else if (!type.startsWith('multipart/form-data;')) throw new TypeError('encoding')
  return new Response(body, { headers: { 'Content-Type': type } }).formData()
}


/** Validate the six-field schema before either external provider is contacted. */
function validate(form: FormData): { values: Record<string, string>; errors: Record<string, string> } {
  const values: Record<string, string> = {}, errors: Record<string, string> = {}
  for (const [name, value] of form) {
    if (!allowed.has(name) || typeof value !== 'string' || form.getAll(name).length !== 1) errors.form = 'Check the enquiry details.'
    if (typeof value === 'string') values[name] = value.trim().replace(/\r\n?/g, '\n')
  }
  for (const [name, limit] of Object.entries(limits)) {
    if (!values[name] || values[name].length > limit || Array.from(values[name]).some(char => { const code = char.charCodeAt(0); return code === 127 || (code < 32 && ![9, 10, 13].includes(code)) })) errors[name] = `Enter ${name === 'email' ? 'a valid email address' : 'your ' + name} within ${limit} characters.`
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(values.email ?? '')) errors.email = 'Enter a valid email address.'
  // Accept only declared ranges; inherited object properties are never valid choices.
  if (!Object.hasOwn(budgets, values.budget)) errors.budget = 'Select the closest planning range.'
  if (values._gotcha) errors.form = 'Check the enquiry details.'
  if (!values['cf-turnstile-response'] || values['cf-turnstile-response'].length > 2048) errors.challenge = 'Complete the security check again.'
  if (values.submissionId && !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu.test(values.submissionId)) errors.form = 'Start a fresh enquiry.'
  return { values, errors }
}


/** Await provider acceptance before showing success; retain uncertain failures for manual retry. */
export async function handleContact(request: Request, config: ContactConfig, providers: Providers = {}): Promise<Response> {
  const requestId = crypto.randomUUID(), started = Date.now()
  const log = providers.log ?? ((entry) => console.log(JSON.stringify(entry)))
  const send = providers.fetch ?? fetch
  const enhanced = request.headers.get('accept')?.includes('application/json')
  const headers = { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }

  function result(status: number, outcome: string, errors?: Record<string, string>): Response {
    log({ requestId, version: config.CF_VERSION_METADATA?.id ?? 'local', outcome, duration: Date.now() - started })
    if (status === 405) return new Response(null, { status, headers: { ...headers, Allow: 'POST' } })
    if (enhanced) return Response.json(status === 200 ? { ok: true } : { ok: false, error: outcome, ...(errors ? { errors } : {}) }, { status, headers })
    return new Response(null, { status: 303, headers: { ...headers, Location: status === 200 ? '/thank-you/' : `/contact/?error=${status === 503 ? 'delivery' : 'validation'}` } })
  }
  if (request.method !== 'POST') return result(405, 'method')
  const origin = request.headers.get('origin')
  const preview = config.CONTACT_MODE === 'preview'
  const expectedOrigin = preview ? config.CONTACT_ALLOWED_ORIGIN : 'https://embeddings.au'
  if (!origin || !expectedOrigin || origin !== expectedOrigin) return result(422, 'validation', { form: 'Open the contact page and try again.' })
  // Refuse live delivery in every preview. Local tests inject providers directly.
  if (preview || !config.RESEND_API_KEY || !config.TURNSTILE_SECRET_KEY || config.CONTACT_TO_EMAIL !== site.publicEmail) return result(503, 'delivery')
  let form: FormData
  try { form = await parseForm(request) } catch (error) { return result(error instanceof RangeError ? 413 : 422, 'validation') }
  const { values, errors } = validate(form)
  if (Object.keys(errors).length) return result(422, 'validation', errors)
  try {
    const verification = await send('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: new URLSearchParams({ secret: config.TURNSTILE_SECRET_KEY, response: values['cf-turnstile-response'] }), signal: AbortSignal.timeout(8000) })
    const challenge = await verification.json() as { success?: boolean; hostname?: string; action?: string }
    if (!verification.ok || !challenge.success || challenge.hostname !== 'embeddings.au' || challenge.action !== 'contact') return result(422, 'validation', { challenge: 'Complete the security check again.' })
    const text = `Name: ${values.name}\nEmail: ${values.email}\nCompany: ${values.company}\nPhone: ${values.phone}\nBudget: ${budgets[values.budget]}\n\nMessage:\n${values.message}`
    const payload = { from: 'Embeddings <contact@notifications.embeddings.au>', to: [config.CONTACT_TO_EMAIL], reply_to: values.email, subject: 'New business enquiry from embeddings.au', text }
    // Exclude the changing challenge from the digest so a safe retry reuses the provider key.
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(JSON.stringify(payload)))
    const hex = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('')
    const key = `contact/${values.submissionId || requestId}/${hex}`
    const delivery = await send('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${config.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': key }, body: JSON.stringify(payload), signal: AbortSignal.timeout(8000) })
    if (!delivery.ok) return result(503, 'delivery')
    const accepted = await delivery.json() as { id?: string }
    return result(accepted.id ? 200 : 503, accepted.id ? 'accepted' : 'delivery')
  } catch { return result(503, 'delivery') }
}
