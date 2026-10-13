import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const form = readFileSync(
  new URL('../src/components/site/ContactForm.astro', import.meta.url),
  'utf8',
)
const page = readFileSync(
  new URL('../src/components/site/contact-Contact.astro', import.meta.url),
  'utf8',
)
const details = readFileSync(
  new URL('../src/components/site/contact-ContactDetails.astro', import.meta.url),
  'utf8',
)


function withoutComments(source) {
  // Exclude standalone and JSX comments from the prohibited visitor-copy scan.
  return source.replace(/\/\*[\s\S]*?\*\/|^\s*\/\/.*$/gmu, '')
}


test('native contact submission posts to the same-origin handler', () => {
  assert.match(form, /<form\b(?=[^>]*\baction=["']\/api\/contact\/["'])(?=[^>]*\bmethod=["']post["'])[^>]*>/u)
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
  const enhancement = readFileSync(new URL('../src/scripts/contact-form.ts', import.meta.url), 'utf8')
  assert.match(enhancement, /\bform_type\s*:\s*["']business_enquiry["']/u)
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


test('native contact submission retains its empty honeypot field', () => {
  // Preserve the anti-spam input without pinning whitespace or attribute order.
  assert.match(
    form,
    /<input\b(?=[^>]*\btype=["']hidden["'])(?=[^>]*\bname=["']_gotcha["'])(?=[^>]*\bvalue=["']["'])[^>]*>/u,
  )
})
