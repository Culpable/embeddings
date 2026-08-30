import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import {
  renderLlmsTxt,
  renderRobotsTxt,
  renderSitemapXml,
} from '../lib/public-artifacts.mjs'

const repositoryRoot = resolve(fileURLToPath(new URL('../../', import.meta.url)))
const publicRoot = resolve(repositoryRoot, 'public')
const artifacts = [
  ['llms.txt', renderLlmsTxt()],
  ['robots.txt', renderRobotsTxt()],
  ['sitemap.xml', renderSitemapXml()],
]

// Write every generated discovery file to an explicit repository path so the
// command behaves the same in local shells and CI.
for (const [fileName, contents] of artifacts) {
  await writeFile(resolve(publicRoot, fileName), contents, 'utf8')
}

console.log(`Generated ${artifacts.length} public discovery files.`)
