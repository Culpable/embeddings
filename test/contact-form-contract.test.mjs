import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const form = readFileSync(
  new URL('../src/app/contact/ContactForm.jsx', import.meta.url),
  'utf8',
)
const page = readFileSync(
  new URL('../src/app/contact/page.jsx', import.meta.url),
  'utf8',
)
const details = readFileSync(
  new URL('../src/app/contact/ContactDetails.jsx', import.meta.url),
  'utf8',
)


function withoutComments(source) {
  // Exclude standalone and JSX comments from the prohibited visitor-copy scan.
  return source.replace(/\/\*[\s\S]*?\*\/|^\s*\/\/.*$/gmu, '')
}


test('native contact submission retains the external confirmation redirect', () => {
  // Preserve the value Formspree reads, allowing attribute reordering.
  assert.match(
    form,
    /<input\b(?=[^>]*\bname=["']_next["'])(?=[^>]*\bvalue=["']https:\/\/embeddings\.au\/thank-you["'])[^>]*>/u,
  )
})


test('contact form excludes the prohibited catalogue field model and retains its analytics identity', () => {
  const copy = withoutComments(form)
  for (const phrase of [
    'Catalogue platform or feed source',
    'Approximate SKU count',
    'Readiness priority',
    'catalogue-readiness enquiry',
    'Send catalogue enquiry',
  ]) {
    assert.ok(
      !copy.includes(phrase),
      `Unexpected catalogue enquiry copy: ${phrase}`,
    )
  }
  assert.doesNotMatch(
    copy,
    /\bname\s*=\s*["'](?:platform|readinessPriority|skuCount)["']/u,
  )
  assert.match(form, /\bform_type\s*:\s*["']business_enquiry["']/u)
  assert.doesNotMatch(form, /Contact Form Field Focused/u)
})


test('contact page copy no longer asks for removed catalogue fields', () => {
  const copy = withoutComments(`${page}\n${details}`)
  for (const phrase of [
    'how many SKUs',
    'product data lives',
    'catalogue-readiness audit',
    'catalogue size',
    'readiness priority',
    'what we handle',
    'Retail catalogue data for agentic shopping',
  ]) {
    assert.ok(
      !copy.includes(phrase),
      `Unexpected catalogue guidance: ${phrase}`,
    )
  }
})


test('native contact submission retains its empty external honeypot field', () => {
  // Preserve the anti-spam input without pinning whitespace or attribute order.
  assert.match(
    form,
    /<input\b(?=[^>]*\btype=["']hidden["'])(?=[^>]*\bname=["']_gotcha["'])(?=[^>]*\bvalue=["']["'])[^>]*>/u,
  )
})
