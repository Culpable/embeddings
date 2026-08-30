import { gzipSync } from 'node:zlib'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { extname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import {
  processImages,
  processImageSlotWidth,
} from '../src/lib/process-image-config.mjs'
import { mixpanelRecorderEnabled } from '../src/lib/analytics-config.mjs'
import { routes } from '../src/lib/site-config.mjs'

const repositoryRoot = resolve(fileURLToPath(new URL('..', import.meta.url)))
const outputRoot = join(repositoryRoot, 'out')
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
  const cssGzip = gzipTotal(stylesheets)
  const htmlGzip = gzipSync(htmlBuffer).byteLength
  const routeJsCeiling = route.path === '/contact' ? 175000 : 165000

  routeBaseTransfer.set(route.path, htmlGzip + jsGzip + cssGzip)
  for (const script of scripts) initialJavaScript.add(script)

  if (jsGzip > routeJsCeiling) fail(route.path, 'initial JavaScript gzip', jsGzip, routeJsCeiling)
  if (jsGzip > 180000) fail(route.path, 'absolute JavaScript gzip', jsGzip, 180000)
  if (stylesheets.size !== 1) fail(route.path, 'stylesheet count', stylesheets.size, 1)
  if (cssGzip > 15000) fail(route.path, 'shared CSS gzip', cssGzip, 15000)
  if (htmlGzip > 40000) fail(route.path, 'HTML gzip', htmlGzip, 40000)
  if (htmlBuffer.byteLength > 220 * 1024) {
    fail(route.path, 'HTML raw', htmlBuffer.byteLength, 220 * 1024)
  }

  const initialSource = Array.from(scripts, (path) => readFileSync(path, 'utf8')).join('\n')
  if (/framer-motion|AnimatePresence|motionValue/iu.test(initialSource)) {
    failures.push(`${route.path}: active initial JavaScript contains Framer Motion`)
  }
}

const fontPath = join(repositoryRoot, 'src/fonts/Mona-Sans-latin.var.woff2')
const fontBytes = statSync(fontPath).size
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

const socialPath = join(outputRoot, 'images/embeddings-agentic-shopping-1200x630.webp')
if (statSync(socialPath).size > 300000) fail('social image', 'raw size', statSync(socialPath).size, 300000)

const processHtml = readFileSync(join(outputRoot, routes.process.outputFile), 'utf8')
if ((processHtml.match(/loading="eager"/gu) ?? []).length !== 1) {
  failures.push('/process: expected exactly one eager process image')
}

const allJavaScript = readdirSync(join(outputRoot, '_next/static/chunks'), {
  recursive: true,
  withFileTypes: true,
})
  .filter((entry) => entry.isFile() && extname(entry.name) === '.js')
  .map((entry) => join(entry.parentPath ?? entry.path, entry.name))

const chunksById = new Map(
  allJavaScript
    .map((file) => [file.split('/').at(-1).match(/^(\d+)\./u)?.[1], file])
    .filter(([id]) => id),
)
const activeJavaScript = new Set(initialJavaScript)
const pendingJavaScript = Array.from(initialJavaScript)

while (pendingJavaScript.length > 0) {
  const file = pendingJavaScript.pop()
  const source = readFileSync(file, 'utf8')

  for (const match of source.matchAll(/\.e\((\d+)\)/gu)) {
    const dependency = chunksById.get(match[1])

    if (dependency && !activeJavaScript.has(dependency)) {
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
  const wrapperSource = readFileSync(selectedMixpanelChunks[0], 'utf8')
  let payloadChunk

  if (mixpanelRecorderEnabled) {
    // The full browser package is bundled into its marked dynamic wrapper.
    payloadChunk = selectedMixpanelChunks[0]
  } else {
    const dependencyModuleId = wrapperSource.match(/mixpanel:\w\((\d+)\)/u)?.[1]
    const payloadChunks = dependencyModuleId
      ? Array.from(activeJavaScript).filter((file) =>
          readFileSync(file, 'utf8').includes(`${dependencyModuleId}:`),
        )
      : []

    if (payloadChunks.length !== 1) {
      failures.push(
        `Mixpanel: expected one core payload for module ${dependencyModuleId ?? 'unknown'}; found ${payloadChunks.length}`,
      )
    } else {
      payloadChunk = payloadChunks[0]
    }
  }

  if (payloadChunk) {
    const size = gzipSync(readFileSync(payloadChunk)).byteLength
    if (size > selectedMixpanelCeiling) {
      fail(
        'Mixpanel',
        `${selectedMixpanelLabel} chunk gzip`,
        size,
        selectedMixpanelCeiling,
      )
    }
  }
}

if (failures.length > 0) {
  console.error(`Static budgets failed with ${failures.length} issue(s):`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('Static output satisfies the route, CSS, HTML, font, image, and analytics budgets.')
