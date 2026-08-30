import { brotliCompressSync, gzipSync } from 'node:zlib'
import { existsSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { dirname, extname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import {
  processImages,
  processImageSlotWidth,
} from '../src/lib/process-image-config.mjs'
import { routes } from '../src/lib/site-config.mjs'

const repositoryRoot = resolve(fileURLToPath(new URL('..', import.meta.url)))
const outputRoot = join(repositoryRoot, 'out')
const transferProfiles = {
  desktop: { viewportWidth: 1440, devicePixelRatio: 1 },
  mobile: { viewportWidth: 390, devicePixelRatio: 3 },
}

function normaliseAssetPath(assetUrl) {
  const pathname = assetUrl.split(/[?#]/u, 1)[0]

  if (!pathname.startsWith('/') || pathname.startsWith('//')) return null

  return join(outputRoot, pathname.slice(1))
}


function classifyAsset(assetPath) {
  const extension = extname(assetPath).toLowerCase()

  if (extension === '.js') return 'javascript'
  if (extension === '.css') return 'css'
  if (extension === '.woff2') return 'font'

  return 'other'
}


function compressedSizes(buffer) {
  return {
    rawBytes: buffer.byteLength,
    gzipBytes: gzipSync(buffer).byteLength,
    brotliBytes: brotliCompressSync(buffer).byteLength,
  }
}


function emptySizes() {
  return { rawBytes: 0, gzipBytes: 0, brotliBytes: 0 }
}


function addSizes(target, sizes) {
  target.rawBytes += sizes.rawBytes
  target.gzipBytes += sizes.gzipBytes
  target.brotliBytes += sizes.brotliBytes
}


function selectedProcessCandidate(profile) {
  const targetWidth =
    processImageSlotWidth(profile.viewportWidth, 'whiteboard') *
    profile.devicePixelRatio
  const image = processImages.whiteboard

  return (
    image.avif.find((candidate) => candidate.width >= targetWidth) ??
    image.avif.at(-1)
  )
}


function measureRoute(route) {
  const htmlPath = join(outputRoot, route.outputFile)
  const html = readFileSync(htmlPath)
  const htmlText = html.toString('utf8')
  const initialAssets = new Set()

  for (const pattern of [
    /<script\b[^>]*\bsrc=["']([^"']+)["']/gu,
    /<link\b(?=[^>]*\brel=["']stylesheet["'])[^>]*\bhref=["']([^"']+)["']/gu,
  ]) {
    for (const match of htmlText.matchAll(pattern)) {
      const assetPath = normaliseAssetPath(match[1])

      if (assetPath && existsSync(assetPath) && statSync(assetPath).isFile()) {
        initialAssets.add(assetPath)
      }
    }
  }

  // Follow stylesheet URLs so the first-view report includes the active font.
  for (const stylesheetPath of Array.from(initialAssets).filter(
    (assetPath) => extname(assetPath).toLowerCase() === '.css',
  )) {
    const css = readFileSync(stylesheetPath, 'utf8')

    for (const match of css.matchAll(/url\(["']?([^"')]+)["']?\)/gu)) {
      const referencedPath = match[1].startsWith('/')
        ? normaliseAssetPath(match[1])
        : resolve(dirname(stylesheetPath), match[1])

      if (
        referencedPath &&
        existsSync(referencedPath) &&
        statSync(referencedPath).isFile()
      ) {
        initialAssets.add(referencedPath)
      }
    }
  }

  const result = {
    route: route.path,
    outputFile: route.outputFile,
    html: compressedSizes(html),
    javascript: emptySizes(),
    css: emptySizes(),
    font: emptySizes(),
    other: emptySizes(),
    profiles: {},
  }

  for (const assetPath of initialAssets) {
    addSizes(result[classifyAsset(assetPath)], compressedSizes(readFileSync(assetPath)))
  }

  for (const [profileName, profile] of Object.entries(transferProfiles)) {
    const selectedImages = []
    let selectedImageBytes = 0

    if (route.path === '/process') {
      const candidate = selectedProcessCandidate(profile)
      selectedImages.push(candidate.url)
      selectedImageBytes = statSync(join(outputRoot, candidate.url.slice(1))).size
    }

    result.profiles[profileName] = {
      viewportWidth: profile.viewportWidth,
      devicePixelRatio: profile.devicePixelRatio,
      selectedInitialImages: selectedImages,
      firstViewTransferBytes:
        result.html.gzipBytes +
        result.javascript.gzipBytes +
        result.css.gzipBytes +
        result.font.rawBytes +
        result.other.gzipBytes +
        selectedImageBytes,
    }
  }

  return result
}


if (!existsSync(outputRoot)) {
  throw new Error(`Static output is missing at ${outputRoot}. Run the build first.`)
}

const measurements = Object.values(routes).map(measureRoute)
const report = `${JSON.stringify(measurements, null, 2)}\n`
const outputArgumentIndex = process.argv.indexOf('--output')

if (outputArgumentIndex !== -1) {
  const outputPath = process.argv[outputArgumentIndex + 1]

  if (!outputPath) throw new Error('Pass an absolute path after --output.')

  writeFileSync(resolve(outputPath), report, 'utf8')
}

console.log(report.trimEnd())
