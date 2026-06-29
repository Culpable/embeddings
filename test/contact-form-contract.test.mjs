import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const agentsPath = resolve(process.cwd(), 'AGENTS.md')
const contactFormPath = resolve(
  process.cwd(),
  'src/app/contact/ContactForm.jsx',
)
const contactPagePath = resolve(process.cwd(), 'src/app/contact/page.jsx')
const contactDetailsPath = resolve(
  process.cwd(),
  'src/app/contact/ContactDetails.jsx',
)
const thankYouPath = resolve(process.cwd(), 'src/app/thank-you/page.jsx')


test('project guidance protects the business enquiry field contract', () => {
  // Require future design work to preserve the field model unless explicitly
  // requested, preventing aesthetic improvements from changing lead data.
  const source = readFileSync(agentsPath, 'utf8')

  assert.match(
    source,
    /<contact_form_rules>/,
    'Expected AGENTS.md to document contact form rules',
  )

  assert.match(
    source,
    /name, email, company, phone, message, and budget/,
    'Expected AGENTS.md to name the preserved business enquiry fields',
  )

  assert.match(
    source,
    /must not replace the field contract with catalogue-readiness, SKU, platform, feed source, or priority fields without explicit approval/,
    'Expected AGENTS.md to prevent unapproved catalogue-readiness field changes',
  )

  assert.match(
    source,
    /Preserve the stable contact page copy unless the user explicitly requests copy changes/,
    'Expected AGENTS.md to protect the stable contact page copy',
  )

  assert.match(
    source,
    /do not add new trust, process, readiness, workflow, or "what we handle" copy to that side panel without explicit approval/,
    'Expected AGENTS.md to prevent unapproved contact details side-panel copy changes',
  )
})


test('contact form posts to formspree with a real thank-you fallback route', () => {
  // Ensure the no-JavaScript submission path does not point to a missing page.
  const source = readFileSync(contactFormPath, 'utf8')
  const thankYouSource = readFileSync(thankYouPath, 'utf8')

  assert.match(
    source,
    /action="https:\/\/formspree\.io\/f\/xrbgdgwq"/,
    'Expected the contact form to include a Formspree action for fallback submission',
  )

  assert.match(
    source,
    /name="_next"\s+value="https:\/\/embeddings\.au\/thank-you"/,
    'Expected the contact form to redirect fallback submissions to /thank-you',
  )

  assert.match(
    thankYouSource,
    /export default function ThankYou/,
    'Expected the /thank-you route to exist',
  )
})


test('contact form preserves the original business enquiry fields', () => {
  // Preserve the original submitted field names while allowing improved visual
  // treatment and accessible status states around the form.
  const source = readFileSync(contactFormPath, 'utf8')

  for (const expected of [
    'label="Name"',
    'name="name"',
    'label="Email"',
    'name="email"',
    'label="Company"',
    'name="company"',
    'label="Phone"',
    'name="phone"',
    'label="Message"',
    'name="message"',
    'Budget',
    'name="budget"',
    'Less than 100k',
    '$100K – $500K',
    '$500K – $1M',
    'More than $1M',
  ]) {
    assert.match(
      source,
      new RegExp(expected.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
      `Expected contact form to preserve ${expected}`,
    )
  }

  for (const removedField of [
    'Catalogue platform or feed source',
    'Approximate SKU count',
    'Readiness priority',
    'readinessPriority',
    'skuCount',
    'platform',
    'catalogue-readiness enquiry',
    'Send catalogue enquiry',
  ]) {
    assert.doesNotMatch(
      source,
      new RegExp(removedField),
      `Did not expect the contact form to include ${removedField}`,
    )
  }

  assert.match(
    source,
    /form_type: 'business_enquiry'/,
    'Expected analytics to use the original business enquiry form type',
  )

  assert.match(
    source,
    /budget_range: formData\.get\('budget'\)/,
    'Expected analytics metadata to preserve budget range tracking',
  )
})


test('contact page copy no longer asks for removed catalogue fields', () => {
  // Keep visible copy aligned with the restored generic business enquiry fields.
  const pageSource = readFileSync(contactPagePath, 'utf8')
  const detailsSource = readFileSync(contactDetailsPath, 'utf8')

  for (const removedPhrase of [
    'how many SKUs',
    'product data lives',
    'catalogue-readiness audit',
    'catalogue size',
    'readiness priority',
    'what we handle',
    'Retail catalogue data for agentic shopping',
  ]) {
    assert.doesNotMatch(
      `${pageSource}\n${detailsSource}`,
      new RegExp(removedPhrase),
      `Did not expect contact copy to ask for ${removedPhrase}`,
    )
  }

  for (const stablePhrase of [
    'Contact us to learn how we can integrate AI into your business.',
    'Your AI advantage starts here',
    'Ready to experience the future of work? Contact us to see how we can',
    'integrate AI into your business.',
    'our offices',
    'We’re based in Perth and Melbourne, and work with clients all over',
    'Australia.',
    'email us',
    'business enquiries',
  ]) {
    assert.match(
      `${pageSource}\n${detailsSource}`,
      new RegExp(stablePhrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
      `Expected contact copy to preserve ${stablePhrase}`,
    )
  }
})


test('contact form exposes accessible status states', () => {
  // Require submit feedback that screen readers can announce.
  const source = readFileSync(contactFormPath, 'utf8')

  assert.match(
    source,
    /aria-live=\{isError \? 'assertive' : 'polite'\}/,
    'Expected status feedback to use aria-live',
  )

  assert.match(
    source,
    /role=\{isError \? 'alert' : 'status'\}/,
    'Expected error and non-error form states to use appropriate roles',
  )

  assert.match(
    source,
    /Sending your message/,
    'Expected a visible loading message during submission',
  )

  assert.match(
    source,
    /Message sent. We’ll get back to you soon./,
    'Expected a visible success message after submission',
  )
})


test('contact form validates fields inline before submission', () => {
  // Require accessible field-level validation while preserving the same submitted names.
  const source = readFileSync(contactFormPath, 'utf8')

  assert.match(
    source,
    /noValidate/,
    'Expected custom validation to replace browser-only invalid UI',
  )

  assert.match(
    source,
    /aria-invalid=\{error \? 'true' : undefined\}/,
    'Expected text inputs to expose aria-invalid when invalid',
  )

  assert.match(
    source,
    /function ErrorSummary/,
    'Expected an inline error summary component',
  )

  assert.match(
    source,
    /Contact Form Validation Failed/,
    'Expected validation failures to be tracked without submitting',
  )
})
