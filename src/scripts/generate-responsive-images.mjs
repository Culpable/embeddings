import { mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import sharp from 'sharp'

import { processImages } from '../lib/process-image-config.mjs'

const repositoryRoot = resolve(fileURLToPath(new URL('../../', import.meta.url)))
const outputRoot = resolve(repositoryRoot, 'public/images/process')

await mkdir(outputRoot, { recursive: true })

for (const image of Object.values(processImages)) {
  const sourcePath = resolve(repositoryRoot, image.sourceFile)

  for (const candidate of image.avif) {
    await sharp(sourcePath)
      .resize({ width: candidate.width, withoutEnlargement: true })
      .avif({ quality: 45, effort: 6, chromaSubsampling: '4:2:0' })
      .toFile(resolve(repositoryRoot, `public${candidate.url}`))
  }

  for (const candidate of image.webp) {
    await sharp(sourcePath)
      .resize({ width: candidate.width, withoutEnlargement: true })
      .webp({ quality: 72, effort: 6, smartSubsample: true })
      .toFile(resolve(repositoryRoot, `public${candidate.url}`))
  }
}

// Keep the owner-selected, losslessly optimised social PNG as a reviewed public asset.
// Generate only responsive process imagery; do not recreate the superseded retail image.
console.log('Generated responsive process images.')
