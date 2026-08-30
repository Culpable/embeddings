import { spawnSync } from 'node:child_process'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const repositoryRoot = resolve(fileURLToPath(new URL('..', import.meta.url)))
const inputPath = resolve(repositoryRoot, 'src/fonts/Mona-Sans.var.woff2')
const outputPath = resolve(repositoryRoot, 'src/fonts/Mona-Sans-latin.var.woff2')
const unicodeRanges = [
  'U+0000-007F',
  'U+0080-00FF',
  'U+0100-017F',
  'U+2000-206F',
  'U+20A0-20CF',
  'U+2190-21FF',
].join(',')

const result = spawnSync(
  'uvx',
  [
    '--from',
    'fonttools==4.63.0',
    '--with',
    'brotli==1.1.0',
    'pyftsubset',
    inputPath,
    `--output-file=${outputPath}`,
    '--flavor=woff2',
    `--unicodes=${unicodeRanges}`,
    '--layout-features=kern,liga,calt,case',
    '--name-IDs=0,1,2,3,4,5,6,17',
    '--name-languages=0x409',
    '--notdef-glyph',
    '--recommended-glyphs',
    '--no-hinting',
    '--drop-tables=',
  ],
  {
    cwd: repositoryRoot,
    encoding: 'utf8',
    stdio: 'inherit',
  },
)

if (result.error) throw result.error
if (result.status !== 0) process.exit(result.status ?? 1)

console.log(`Generated ${outputPath}`)
