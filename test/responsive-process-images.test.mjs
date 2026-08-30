import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, statSync } from 'node:fs'

import sharp from 'sharp'

import {
  processImages,
  processImageSizes,
  processImageSlotWidth,
} from '../src/lib/process-image-config.mjs'

test('process sources have deterministic AVIF and WebP candidates', async () => {
  for (const image of Object.values(processImages)) {
    for (const format of ['avif', 'webp']) {
      assert.deepEqual(
        image[format].map((candidate) => candidate.width),
        [390, 640, 960, 1080, 1440],
      )
      for (const candidate of image[format]) {
        const path = `public${candidate.url}`
        const metadata = await sharp(path).metadata()
        assert.equal(metadata.width, candidate.width)
        assert.ok(statSync(path).size > 0)
      }
    }
  }
})

test('responsive process component keeps one eager image contract', () => {
  const source = readFileSync('src/components/StylizedImage.jsx', 'utf8')
  assert.match(source, /loading=\{priority \? 'eager' : 'lazy'\}/u)
  assert.match(source, /fetchPriority=\{priority \? 'high' : 'auto'\}/u)
  assert.match(source, /decoding="async"/u)
})

test('whiteboard sizes match its narrower SVG slot on mobile', () => {
  assert.match(processImageSizes.whiteboard, /calc\(91\.1vw - 43\.7px\)/u)
  assert.ok(processImageSlotWidth(390, 'whiteboard') < 312)
  assert.ok(processImageSlotWidth(390, 'whiteboard') > 311)
  assert.equal(processImageSlotWidth(390, 'meeting'), 342)
})
