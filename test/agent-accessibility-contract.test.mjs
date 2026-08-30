import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const navigation = readFileSync('src/components/RootNavigation.jsx', 'utf8')
const navigationPanel = readFileSync(
  'src/components/RootNavigationPanel.jsx',
  'utf8',
)
const footer = readFileSync('src/components/Footer.jsx', 'utf8')
const image = readFileSync('src/components/StylizedImage.jsx', 'utf8')
const form = readFileSync('src/app/contact/ContactForm.jsx', 'utf8')
const catalogueTransformation = readFileSync(
  'src/components/CatalogueTransformation.jsx',
  'utf8',
)

test('navigation and footer relationships target mounted labelled content', () => {
  assert.match(navigation, /panelId=\{panelMounted \? `\$\{panelId\}-panel` : undefined\}/u)
  assert.match(navigationPanel, /<nav[\s\S]*aria-label="Primary navigation"/u)
  assert.match(footer, /aria-label="Footer navigation"/u)
  assert.match(footer, /aria-labelledby=\{headingId\}/u)
})

test('process image wrapper is explicitly decorative', () => {
  assert.match(image, /aria-hidden="true"/u)
  assert.match(image, /focusable="false"/u)
  assert.match(image, /alt=""/u)
})

test('catalogue comparison uses logical headings and readable small text', () => {
  assert.equal((catalogueTransformation.match(/<h3 className=/gu) ?? []).length, 2)
  assert.doesNotMatch(catalogueTransformation, /<h4 className=/u)
  assert.doesNotMatch(catalogueTransformation, /text-neutral-400/u)
  assert.match(catalogueTransformation, /text-red-600/u)
  assert.match(catalogueTransformation, /text-emerald-700/u)
})

test('contact form retains native validation and exposes a manual WebMCP tool', () => {
  assert.doesNotMatch(form, /\snoValidate(?:\s|=)/u)
  assert.match(form, /formRef\.current\.noValidate = true/u)
  assert.match(form, /toolname="prepare_business_enquiry"/u)
  assert.match(form, /tooldescription="[^"]*manual submission[^"]*"/u)
  assert.equal((form.match(/toolparamdescription=/gu) ?? []).length, 6)
  assert.doesNotMatch(form, /toolautosubmit/u)
})
