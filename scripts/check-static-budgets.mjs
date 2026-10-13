import { gzipSync } from 'node:zlib'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { extname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import {
  processImages,
  processImageSlotWidth,
} from '../src/lib/process-image-config.mjs'
import { mixpanelRecorderEnabled } from '../src/lib/analytics-config.mjs'
import { routes, siteConfig } from '../src/lib/site-config.mjs'

const repositoryRoot = resolve(fileURLToPath(new URL('..', import.meta.url)))
const outputRoot = join(repositoryRoot, process.env.SITE_OUTPUT || 'dist')
const failures = []
const routeBaseTransfer = new Map()
const initialJavaScript = new Set()
const transferProfiles = {
  desktop: { viewportWidth: 1440, devicePixelRatio: 1 },
  mobile: { viewportWidth: 390, devicePixelRatio: 3 },
}

function localAsset(url) {
  const pathname = url.split(/[?#]/u, 1)[0]
  if (!pathname.startsWith('/') || pathname.startsWith('//')) return null
  const path = join(outputRoot, pathname.slice(1))
  return existsSync(path) ? path : null
}


function referencedAssets(html, pattern) {
  return new Set(
    Array.from(html.matchAll(pattern), (match) => localAsset(match[1])).filter(Boolean),
  )
}


function gzipTotal(paths) {
  return Array.from(paths).reduce(
    (total, path) => total + gzipSync(readFileSync(path)).byteLength,
    0,
  )
}


function fail(route, budget, actual, ceiling) {
  failures.push(`${route}: ${budget} is ${actual} bytes; ceiling is ${ceiling} bytes`)
}


function selectedCandidate(image, profile) {
  const targetWidth =
    processImageSlotWidth(profile.viewportWidth, image.slug) *
    profile.devicePixelRatio

  return (
    image.avif.find((candidate) => candidate.width >= targetWidth) ??
    image.avif.at(-1)
  )
}


const activeRoutes = Object.values(routes)
for (const route of activeRoutes) {
  const htmlPath = join(outputRoot, route.outputFile)
  const htmlBuffer = readFileSync(htmlPath)
  const html = htmlBuffer.toString('utf8')
  const scripts = referencedAssets(html, /<script\b[^>]*\bsrc=["']([^"']+)["']/gu)
  const stylesheets = referencedAssets(
    html,
    /<link\b(?=[^>]*\brel=["']stylesheet["'])[^>]*\bhref=["']([^"']+)["']/gu,
  )
  const jsGzip = gzipTotal(scripts)
  // Count inline CSS once in HTML transfer, while retaining its separate protective ceiling.
  const inlineCss = Array.from(html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gu), match => match[1]).join('')
  const cssGzip = gzipTotal(stylesheets) + (inlineCss ? gzipSync(inlineCss).byteLength : 0)
  const htmlGzip = gzipSync(htmlBuffer).byteLength
  const routeJsCeiling = route.path === '/contact/' ? 175000 : 165000

  routeBaseTransfer.set(route.path, htmlGzip + jsGzip + gzipTotal(stylesheets))
  for (const script of scripts) initialJavaScript.add(script)

  if (jsGzip > routeJsCeiling) fail(route.path, 'initial JavaScript gzip', jsGzip, routeJsCeiling)
  if (cssGzip > 15000) fail(route.path, 'shared CSS gzip', cssGzip, 15000)
  if (htmlGzip > 40000) fail(route.path, 'HTML gzip', htmlGzip, 40000)
  if (htmlBuffer.byteLength > 220 * 1024) {
    fail(route.path, 'HTML raw', htmlBuffer.byteLength, 220 * 1024)
  }
}

const fontPaths = [
  join(repositoryRoot, 'public/fonts/Mona-Sans-body-latin.var.woff2'),
  join(repositoryRoot, 'public/fonts/Mona-Sans-display-latin.var.woff2'),
]
const fontBytes = fontPaths.reduce(
  (total, fontPath) => total + statSync(fontPath).size,
  0,
)
if (fontBytes > 100000) fail('font', 'Mona Sans transfer', fontBytes, 100000)

const candidateBytes = (candidate) =>
  statSync(join(outputRoot, candidate.url.slice(1))).size

for (const [profileName, profile] of Object.entries(transferProfiles)) {
  const selectedImages = Object.values(processImages).map((image) =>
    selectedCandidate(image, profile),
  )
  const eagerImageBytes = candidateBytes(selectedImages[0])
  const fullSessionBytes = selectedImages
    .map(candidateBytes)
    .reduce((total, bytes) => total + bytes, 0)
  const imageCeiling = profileName === 'mobile' ? 90000 : 150000

  if (eagerImageBytes > imageCeiling) {
    fail('/process', `${profileName} selected LCP image`, eagerImageBytes, imageCeiling)
  }
  if (fullSessionBytes > 300000) {
    fail('/process', `${profileName} full-session process images`, fullSessionBytes, 300000)
  }

  const homeFirstView = routeBaseTransfer.get('/') + fontBytes
  const processFirstView =
    routeBaseTransfer.get('/process') + fontBytes + eagerImageBytes

  if (homeFirstView > 330 * 1024) {
    fail('/', `${profileName} first-view transfer`, homeFirstView, 330 * 1024)
  }
  if (processFirstView > 350 * 1024) {
    fail('/process', `${profileName} first-view transfer`, processFirstView, 350 * 1024)
  }
}

// Check the selected social asset so changing its format cannot bypass the byte budget.
const socialPath = join(outputRoot, siteConfig.socialImage.path)
if (statSync(socialPath).size > 300000) fail('social image', 'raw size', statSync(socialPath).size, 300000)

const processHtml = readFileSync(join(outputRoot, routes.process.outputFile), 'utf8')
if ((processHtml.match(/loading="eager"/gu) ?? []).length !== 1) {
  failures.push('/process: expected exactly one eager process image')
}

const allJavaScript = readdirSync(join(outputRoot, '_astro'), {
  recursive: true,
  withFileTypes: true,
})
  .filter((entry) => entry.isFile() && extname(entry.name) === '.js')
  .map((entry) => join(entry.parentPath ?? entry.path, entry.name))

const activeJavaScript = new Set(initialJavaScript)
const pendingJavaScript = Array.from(initialJavaScript)

// Follow the emitted ESM imports instead of the retired Webpack module IDs.
function scriptDependencies(file) {
  const source = readFileSync(file, 'utf8')
  return Array.from(source.matchAll(/["'`]([^"'`]+\.js)["'`]/gu), match => {
    const path = resolve(file, '..', match[1])
    return allJavaScript.includes(path) ? path : null
  }).filter(Boolean)
}

while (pendingJavaScript.length > 0) {
  for (const dependency of scriptDependencies(pendingJavaScript.pop())) {
    if (!activeJavaScript.has(dependency)) {
      activeJavaScript.add(dependency)
      pendingJavaScript.push(dependency)
    }
  }
}

const mixpanelCoreChunks = Array.from(activeJavaScript).filter((file) =>
  readFileSync(file, 'utf8').includes('EMBEDDINGS_MIXPANEL_CORE_CHUNK'),
)
const emittedMixpanelFullChunks = allJavaScript.filter((file) =>
  readFileSync(file, 'utf8').includes('EMBEDDINGS_MIXPANEL_FULL_CHUNK'),
)
const activeMixpanelFullChunks = emittedMixpanelFullChunks.filter((file) =>
  activeJavaScript.has(file),
)

if (!mixpanelRecorderEnabled && emittedMixpanelFullChunks.length > 0) {
  failures.push(
    `Mixpanel: recording is disabled but ${emittedMixpanelFullChunks.length} full recorder chunk(s) were emitted`,
  )
}

const selectedMixpanelChunks = mixpanelRecorderEnabled
  ? activeMixpanelFullChunks
  : mixpanelCoreChunks
const selectedMixpanelLabel = mixpanelRecorderEnabled ? 'full' : 'core'
const selectedMixpanelCeiling = mixpanelRecorderEnabled ? 200000 : 70000

if (selectedMixpanelChunks.length !== 1) {
  failures.push(
    `Mixpanel: expected one marked ${selectedMixpanelLabel} chunk; found ${selectedMixpanelChunks.length}`,
  )
} else {
  // Measure the selected loader and its actual imported payload together.
  const payload = new Set(selectedMixpanelChunks)
  const queue = Array.from(payload)
  while (queue.length) {
    for (const dependency of scriptDependencies(queue.pop())) {
      if (!payload.has(dependency)) { payload.add(dependency); queue.push(dependency) }
    }
  }
  const size = gzipTotal(payload)
  if (size > selectedMixpanelCeiling) fail('Mixpanel', `${selectedMixpanelLabel} chunk gzip`, size, selectedMixpanelCeiling)

}

if (failures.length > 0) {
  console.error(`Static budgets failed with ${failures.length} issue(s):`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('Static output satisfies the route, CSS, HTML, font, image, and analytics budgets.')
