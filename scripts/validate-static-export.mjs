import { readFileSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { parse } from 'parse5'

import { absoluteUrl, routes, siteConfig } from '../src/lib/site-config.mjs'
import {
  renderLlmsTxt,
  renderRobotsTxt,
  renderSitemapXml,
} from '../src/lib/public-artifacts.mjs'
import {
  nodeAttributes,
  nodeIsHidden,
} from './lib/hidden-content.mjs'

const repositoryRoot = resolve(fileURLToPath(new URL('..', import.meta.url)))
const outputRoot = join(repositoryRoot, process.env.SITE_OUTPUT || 'dist')
const failures = []
const hiddenInstructionPatterns = [
  /ignore previous instructions/iu,
  /system prompt/iu,
  /developer message/iu,
  /reveal secrets/iu,
  /send credentials/iu,
  /follow these hidden instructions/iu,
  /(?:execute|run) (?:a |the )?tool without (?:user|human) review/iu,
  /submit (?:the )?data without (?:user|human) review/iu,
]

function attributes(node) {
  return nodeAttributes(node)
}


function walk(node, callback, ancestors = []) {
  callback(node, ancestors)

  for (const child of node.childNodes ?? []) {
    walk(child, callback, [...ancestors, node])
  }
}


function findAll(document, predicate) {
  const matches = []
  walk(document, (node, ancestors) => {
    if (predicate(node, attributes(node), ancestors)) matches.push(node)
  })
  return matches
}


function textContent(node) {
  if (node.nodeName === '#text') return node.value ?? ''
  return (node.childNodes ?? []).map(textContent).join('')
}


function visibleText(node, hidden = false) {
  const attrs = attributes(node)
  const classes = attrs.class ?? ''
  const isHidden =
    hidden ||
    attrs.hidden !== undefined ||
    attrs['aria-hidden'] === 'true' ||
    /(?:^|\s)(?:hidden|invisible)(?:\s|$)/u.test(classes) ||
    ['script', 'style', 'template'].includes(node.tagName)

  if (node.nodeName === '#text') return hidden ? '' : node.value ?? ''

  return (node.childNodes ?? [])
    .map((child) => visibleText(child, isHidden))
    .join(' ')
}


function metaContent(document, name) {
  return attributes(
    findAll(
      document,
      (node, attrs) =>
        node.tagName === 'meta' &&
        (attrs.name === name || attrs.property === name),
    )[0] ?? {},
  ).content
}


function allMetaContent(document, name) {
  return findAll(
    document,
    (node, attrs) =>
      node.tagName === 'meta' &&
      (attrs.name === name || attrs.property === name),
  )
    .map((node) => attributes(node).content ?? '')
    .join(', ')
}


function fail(routePath, rule, detail) {
  failures.push(`${routePath}: ${rule} - ${detail}`)
}


function selector(node) {
  const attrs = attributes(node)
  return `${node.tagName ?? node.nodeName}${attrs.id ? `#${attrs.id}` : ''}`
}


function validateHiddenInstructions(routePath, document) {
  walk(document, (node, ancestors) => {
    const attrs = attributes(node)
    const hidden = [...ancestors, node].some(nodeIsHidden)
    const sources = [
      ...(hidden && node.nodeName === '#text'
        ? [['hidden text', node.value ?? '']]
        : []),
      ...['aria-label', 'alt', 'title']
        .filter((name) => attrs[name])
        .map((name) => [name, attrs[name]]),
    ]

    for (const [source, value] of sources) {
      for (const pattern of hiddenInstructionPatterns) {
        const match = value.match(pattern)
        if (match) {
          fail(routePath, 'hidden instruction scan', `${selector(node)} ${source}: ${match[0]}`)
        }
      }
    }
  })
}


function validateRoute(routeKey, route) {
  const html = readFileSync(join(outputRoot, route.outputFile), 'utf8')
  const document = parse(html)
  const htmlElement = findAll(document, (node) => node.tagName === 'html')[0]
  const title = findAll(document, (node) => node.tagName === 'title')[0]
  const headings = findAll(document, (node) => node.tagName === 'h1')
  const mains = findAll(document, (node) => node.tagName === 'main')
  const ids = new Set(
    findAll(document, (node, attrs) => Boolean(attrs.id)).map(
      (node) => attributes(node).id,
    ),
  )
  const canonicalLinks = findAll(
    document,
    (node, attrs) => node.tagName === 'link' && attrs.rel === 'canonical',
  )
  const llmsLinks = findAll(
    document,
    (node, attrs) =>
      node.tagName === 'link' &&
      attrs.rel === 'describedby' &&
      attrs.href === '/llms.txt' &&
      attrs.type === 'text/plain',
  )
  const routePath = route.path

  if (attributes(htmlElement ?? {}).lang !== siteConfig.htmlLang) {
    fail(routePath, 'document language', `expected ${siteConfig.htmlLang}`)
  }
  if (!title || textContent(title).trim().length === 0) fail(routePath, 'title', 'missing')
  if (!metaContent(document, 'description')) fail(routePath, 'description', 'missing')
  if (headings.length !== 1) fail(routePath, 'H1 count', `found ${headings.length}`)
  if (mains.length !== 1) fail(routePath, 'main count', `found ${mains.length}`)
  if (llmsLinks.length === 0) fail(routePath, 'llms relationship', 'missing')

  const skipLinks = findAll(
    document,
    (node, attrs) => node.tagName === 'a' && attrs.href === '#main-content',
  )
  if (skipLinks.length === 0 || !ids.has('main-content')) {
    fail(routePath, 'skip link', 'expected a link to #main-content')
  }

  for (const node of findAll(document, (candidate, attrs) =>
    Boolean(attrs['aria-controls'] || attrs['aria-labelledby']),
  )) {
    const attrs = attributes(node)
    for (const name of ['aria-controls', 'aria-labelledby']) {
      for (const target of (attrs[name] ?? '').split(/\s+/u).filter(Boolean)) {
        if (!ids.has(target)) fail(routePath, name, `${selector(node)} references missing #${target}`)
      }
    }
  }

  const robots = allMetaContent(document, 'robots').toLowerCase()

  if (route.indexable) {
    const expectedCanonical = absoluteUrl(route.path)
    const canonical = attributes(canonicalLinks[0] ?? {}).href
    if (canonicalLinks.length !== 1 || canonical !== expectedCanonical) {
      fail(routePath, 'canonical', `expected ${expectedCanonical}, found ${canonical ?? 'none'}`)
    }
    if (robots.includes('noindex')) fail(routePath, 'robots', 'unexpected noindex')
    if (metaContent(document, 'og:url') !== expectedCanonical) {
      fail(routePath, 'Open Graph URL', `expected ${expectedCanonical}`)
    }
    for (const field of ['og:title', 'og:description', 'twitter:card', 'twitter:title', 'twitter:description']) {
      if (!metaContent(document, field)) fail(routePath, field, 'missing')
    }

    const mainText = visibleText(mains[0]).replace(/\s+/gu, ' ').trim()
    // Reject an empty exported shell without imposing a prose length or heading.
    if (!mainText) {
      fail(routePath, 'visible main content', 'empty')
    }
    if (/(?:checking your browser|enable javascript to continue|meta http-equiv=["']refresh)/iu.test(mainText)) {
      fail(routePath, 'primary content', 'challenge, shell, or redirect signature found')
    }

    const schemaScripts = findAll(
      document,
      (node, attrs) => node.tagName === 'script' && attrs.type === 'application/ld+json',
    )
    if (schemaScripts.length !== 1) {
      fail(routePath, 'JSON-LD count', `found ${schemaScripts.length}`)
    } else {
      const rawJson = textContent(schemaScripts[0])
      if (rawJson.includes('<')) fail(routePath, 'JSON-LD escaping', 'raw less-than sign found')
      try {
        const data = JSON.parse(rawJson)
        const idsInGraph = new Set((data['@graph'] ?? []).map((node) => node['@id']))
        for (const requiredId of [siteConfig.organisation.id, siteConfig.websiteId, `${expectedCanonical}#webpage`]) {
          if (!idsInGraph.has(requiredId)) fail(routePath, 'JSON-LD graph', `missing ${requiredId}`)
        }
      } catch (error) {
        fail(routePath, 'JSON-LD parsing', error.message)
      }
    }
  } else if (!robots.includes('noindex') || !robots.includes('nofollow')) {
    fail(routePath, 'robots', 'expected noindex, nofollow')
  }

  if (routeKey === 'contact') {
    const forms = findAll(document, (node) => node.tagName === 'form')
    const form = forms[0]
    const formAttrs = attributes(form ?? {})
    if (forms.length !== 1) fail(routePath, 'contact form', `found ${forms.length}`)
    if (
      formAttrs.action !== '/api/contact/' ||
      formAttrs.method?.toLowerCase() !== 'post'
    ) {
      fail(routePath, 'contact form fallback', 'unexpected action or method')
    }
    if (formAttrs.novalidate !== undefined) fail(routePath, 'native validation', 'novalidate found')
    if (formAttrs.toolname !== 'prepare_business_enquiry') fail(routePath, 'WebMCP tool', 'missing tool name')
    if (formAttrs.toolautosubmit !== undefined) fail(routePath, 'WebMCP safety', 'toolautosubmit found')

    const controls = findAll(form, (node, attrs) =>
      ['input', 'textarea', 'select'].includes(node.tagName) && Boolean(attrs.name),
    )
    const publicNames = new Set(['name', 'email', 'company', 'phone', 'message', 'budget'])
    const parameterNames = new Set(
      controls
        .filter((node) => attributes(node).toolparamdescription)
        .map((node) => attributes(node).name),
    )
    for (const name of publicNames) {
      const matching = controls.filter((node) => attributes(node).name === name)
      if (matching.length === 0) fail(routePath, 'contact field', `missing ${name}`)
      if (!matching.some((node) => attributes(node).required !== undefined)) {
        fail(routePath, 'contact field', `${name} is not required`)
      }
      if (!parameterNames.has(name)) fail(routePath, 'WebMCP parameter', `missing ${name}`)
    }
    for (const hiddenName of ['_subject', '_next', '_gotcha']) {
      if (parameterNames.has(hiddenName)) fail(routePath, 'WebMCP parameter', `exposed ${hiddenName}`)
    }
    if (parameterNames.size !== 6) fail(routePath, 'WebMCP parameters', `found ${parameterNames.size}`)
  }

  validateHiddenInstructions(routePath, document)
}

for (const [routeKey, route] of Object.entries(routes)) validateRoute(routeKey, route)

const expectedHtmlFiles = new Set(Object.values(routes).map((route) => route.outputFile))
const exportedHtmlFiles = new Set(
  readdirSync(outputRoot, { recursive: true })
    .filter((file) => file.endsWith('.html'))
    .map((file) => file.replaceAll('\\', '/')),
)

for (const file of expectedHtmlFiles) {
  if (!exportedHtmlFiles.has(file)) fail(file, 'route inventory', 'expected HTML export is missing')
}
for (const file of exportedHtmlFiles) {
  if (!expectedHtmlFiles.has(file)) fail(file, 'route inventory', 'unregistered HTML export found')
}

const robots = readFileSync(join(outputRoot, 'robots.txt'), 'utf8')
const sitemap = readFileSync(join(outputRoot, 'sitemap.xml'), 'utf8')
const llms = readFileSync(join(outputRoot, 'llms.txt'), 'utf8')

for (const [fileName, actual, expected] of [
  ['robots.txt', robots, renderRobotsTxt()],
  ['sitemap.xml', sitemap, renderSitemapXml()],
  ['llms.txt', llms, renderLlmsTxt()],
]) {
  if (actual !== expected) fail(fileName, 'discovery file', 'does not exactly match the route configuration')
}

const sitemapLocations = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/gu), (match) => match[1])
const llmsLinks = Array.from(llms.matchAll(/\]\((https:\/\/embeddings\.au[^)]*)\)/gu), (match) => match[1])
const expectedSitemapLocations = Object.values(routes)
  .filter((route) => route.includeInSitemap)
  .map((route) => absoluteUrl(route.path))
const expectedLlmsLinks = Object.values(routes)
  .filter((route) => route.includeInLlms)
  .map((route) => absoluteUrl(route.path))

for (const [name, actual, expected] of [
  ['sitemap locations', sitemapLocations, expectedSitemapLocations],
  ['llms links', llmsLinks, expectedLlmsLinks],
]) {
  if (new Set(actual).size !== actual.length) fail(name, 'duplicate entries', 'duplicates found')
  if (
    actual.length !== expected.length ||
    actual.some((value) => !expected.includes(value))
  ) {
    fail(name, 'configured entries', `expected ${expected.join(', ')}`)
  }
}

if (failures.length > 0) {
  console.error(`Static export validation failed with ${failures.length} issue(s):`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`Validated ${Object.keys(routes).length} exported HTML routes and public discovery files.`)
