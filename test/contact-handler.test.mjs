import assert from 'node:assert/strict'
import test from 'node:test'
import { tsImport } from 'tsx/esm/api'

// Exercise real Request parsing and provider boundaries without live mail or tokens.
// Browsers cannot safely reproduce upstream faults, streaming limits or replay.
const { handleContact } = await tsImport('../src/lib/contact/handler.ts', import.meta.url)
const fields = { name: 'Migration check', email: 'visitor@example.net', company: 'Test company', phone: '+61 (08) 1234 5678', message: 'Synthetic enquiry', budget: '100', _gotcha: '', 'cf-turnstile-response': 'test-token', submissionId: '12345678-1234-4123-8123-123456789abc' }
const config = { CONTACT_MODE: 'production', CONTACT_TO_EMAIL: 'solutions@embeddings.au', RESEND_API_KEY: 'fixture-only', TURNSTILE_SECRET_KEY: 'fixture-only' }

function request(changes = {}, headers = {}) {
  return new Request('https://embeddings.au/api/contact/', { method: 'POST', headers: { Origin: 'https://embeddings.au', Accept: 'application/json', ...headers }, body: new URLSearchParams({ ...fields, ...changes }) })
}

function fixture(challenge = { success: true, hostname: 'embeddings.au', action: 'contact' }, mailStatus = 200) {
  const calls = [], logs = []
  return { calls, logs, fetch: async (url, init) => { calls.push({ url: String(url), init }); return Response.json(String(url).includes('siteverify') ? challenge : { id: 'fixture-mail' }, { status: String(url).includes('siteverify') ? 200 : mailStatus }) }, log: entry => logs.push(entry) }
}

test('valid enhanced and native requests preserve all six fields and fixed mail identity', async () => {
  for (const accept of ['application/json', 'text/html']) {
    const f = fixture(), response = await handleContact(request({}, { Accept: accept }), config, f)
    assert.equal(response.status, accept === 'application/json' ? 200 : 303)
    assert.equal(response.headers.get('cache-control'), 'no-store')
    if (accept === 'text/html') assert.equal(response.headers.get('location'), '/thank-you/')
    else assert.deepEqual(await response.json(), { ok: true })
    const mail = JSON.parse(f.calls[1].init.body)
    assert.equal(mail.from, 'Embeddings <contact@notifications.embeddings.au>')
    assert.deepEqual(mail.to, ['solutions@embeddings.au'])
    assert.equal(mail.reply_to, fields.email)
    for (const field of ['name', 'email', 'company', 'phone', 'message']) assert.ok(mail.text.includes(fields[field]))
    assert.ok(mail.text.includes('Less than $100k'))
    const output = JSON.stringify(f.logs)
    for (const value of [fields.email, fields.message, fields['cf-turnstile-response'], config.RESEND_API_KEY]) assert.ok(!output.includes(value))
  }
})

test('invalid fields, honeypot, unknown fields, duplicate fields and foreign origins send no mail', async () => {
  const cases = [request({ name: '' }), request({ email: 'bad' }), request({ budget: '200' }), request({ name: 'a'.repeat(121) }), request({ message: 'a'.repeat(4001) }), request({ _gotcha: 'bot' }), request({ surprise: 'no' }), request({ submissionId: 'invalid' }), request({}, { Origin: 'https://foreign.example' }), request({}, { Origin: 'null' })]
  const duplicate = request(); cases.push(new Request(duplicate.url, { method: 'POST', headers: duplicate.headers, body: new URLSearchParams([...Object.entries(fields), ['email', 'other@example.net']]) }))
  for (const req of cases) { const f = fixture(); assert.equal((await handleContact(req, config, f)).status, 422); assert.equal(f.calls.length, 0) }
})

test('prototype property names cannot pass the budget allowlist', async () => {
  for (const budget of ['constructor', 'toString', '__proto__']) {
    const f = fixture(), response = await handleContact(request({ budget }), config, f)
    assert.equal(response.status, 422)
    assert.equal(f.calls.length, 0)
  }
})

test('unsupported methods, streamed overflow and malformed form encoding are refused', async () => {
  const f = fixture()
  const get = await handleContact(new Request('https://embeddings.au/api/contact/'), config, f)
  assert.equal(get.status, 405); assert.equal(get.headers.get('allow'), 'POST')
  const stream = new ReadableStream({ start(c) { c.enqueue(new TextEncoder().encode('x'.repeat(65537))); c.close() } })
  const large = new Request('https://embeddings.au/api/contact/', { method: 'POST', headers: { Origin: 'https://embeddings.au', Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' }, body: stream, duplex: 'half' })
  assert.equal((await handleContact(large, config, f)).status, 413)
  const malformed = new Request(request(), { body: 'name=%FF&email=%ZZ' })
  assert.equal((await handleContact(malformed, config, f)).status, 422)
  assert.equal(f.calls.length, 0)
})

test('malformed UTF-8 multipart input cannot reach providers', async () => {
  const boundary = 'fixture-boundary'
  const bytes = new TextEncoder().encode(Object.entries(fields).map(([name, value]) => `--${boundary}\r\nContent-Disposition: form-data; name="${name}"\r\n\r\n${value}\r\n`).join('') + `--${boundary}--\r\n`)
  bytes[bytes.indexOf('M'.charCodeAt(0))] = 255
  const req = new Request('https://embeddings.au/api/contact/', { method: 'POST', headers: { Origin: 'https://embeddings.au', Accept: 'application/json', 'Content-Type': `multipart/form-data; boundary=${boundary}` }, body: bytes })
  const f = fixture(), response = await handleContact(req, config, f)
  assert.equal(response.status, 422)
  assert.equal(f.calls.length, 0)
})

test('invalid, expired, replayed, wrong-host and wrong-action challenges never send mail', async () => {
  for (const challenge of [{ success: false }, { success: false, 'error-codes': ['timeout-or-duplicate'] }, { success: true, hostname: 'foreign.example', action: 'contact' }, { success: true, hostname: 'embeddings.au', action: 'other' }]) {
    const f = fixture(challenge); assert.equal((await handleContact(request(), config, f)).status, 422); assert.equal(f.calls.length, 1)
  }
  const f = fixture(); assert.equal((await handleContact(request({ 'cf-turnstile-response': '' }), config, f)).status, 422); assert.equal(f.calls.length, 0)
})

test('provider errors and timeouts return safe failure and native recovery', async () => {
  for (const accept of ['application/json', 'text/html']) {
    const f = fixture(undefined, 500), response = await handleContact(request({}, { Accept: accept }), config, f)
    assert.equal(response.status, accept === 'application/json' ? 503 : 303)
    if (accept === 'text/html') assert.equal(response.headers.get('location'), '/contact/?error=delivery')
  }
  const response = await handleContact(request(), config, { fetch: async () => { throw new DOMException('fixture', 'TimeoutError') }, log: () => {} })
  assert.equal(response.status, 503)
})

test('enhanced retry uses a stable bounded key with fresh token; changed content gets a new key', async () => {
  const keys = []
  for (const changes of [{}, { 'cf-turnstile-response': 'fresh-token' }, { message: 'Different enquiry' }]) {
    const f = fixture(); assert.equal((await handleContact(request(changes), config, f)).status, 200)
    keys.push(new Headers(f.calls[1].init.headers).get('Idempotency-Key'))
  }
  assert.equal(keys[0], keys[1]); assert.notEqual(keys[0], keys[2]); assert.ok(keys[0].length <= 256)
  const f = fixture(); assert.equal((await handleContact(request({ submissionId: '' }), config, f)).status, 200)
})

test('preview cannot send production mail or accept an arbitrary origin', async () => {
  const f = fixture()
  assert.equal((await handleContact(request(), { ...config, CONTACT_MODE: 'preview', CONTACT_ALLOWED_ORIGIN: 'https://embeddings.au' }, f)).status, 503)
  assert.equal(f.calls.length, 0)
})
