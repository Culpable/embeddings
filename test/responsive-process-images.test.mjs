import test from 'node:test'
import assert from 'node:assert/strict'
import { statSync } from 'node:fs'

import sharp from 'sharp'

import { processImages } from '../src/lib/process-image-config.mjs'


test('process image resources match their declared responsive widths', async () => {
  const images = Object.values(processImages)
  assert.ok(images.length > 0, 'Expected process images to be configured')
  for (const image of images) {
    for (const format of ['avif', 'webp']) {
      const candidates = image[format]
      assert.ok(
        candidates.length > 0,
        `Expected ${image.slug} ${format} candidates`,
      )
      // Verify real resources, allowing the candidate inventory to evolve.
      for (const candidate of candidates) {
        const path = new URL(`../public${candidate.url}`, import.meta.url)
        const metadata = await sharp(path.pathname).metadata()
        assert.equal(metadata.width, candidate.width)
        assert.ok(statSync(path).size > 0)
      }
    }
  }
})
