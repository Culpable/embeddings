import { spawnSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const repositoryRoot = resolve(fileURLToPath(new URL('..', import.meta.url)))
const inputPath = resolve(repositoryRoot, 'src/fonts/Mona-Sans.var.woff2')
const outputDirectory = resolve(repositoryRoot, 'public/fonts')
const outputPath = resolve(outputDirectory, 'Mona-Sans-latin.var.woff2')
const temporaryDirectory = mkdtempSync(join(tmpdir(), 'embeddings-font-'))
const rangedFontPath = resolve(temporaryDirectory, 'Mona-Sans-ranged.ttf')
const unicodeRanges = [
  'U+0000-007F',
  'U+0080-00FF',
  'U+0100-017F',
  'U+2000-206F',
  'U+20A0-20CF',
  'U+2190-21FF',
].join(',')

// Create the explicit public asset directory before the font tool writes its
// deterministic subset.
mkdirSync(outputDirectory, { recursive: true })

function runFontTool(args) {
  const result = spawnSync('uvx', args, {
    cwd: repositoryRoot,
    encoding: 'utf8',
    stdio: 'inherit',
  })

  if (result.error) throw result.error
  if (result.status !== 0) {
    throw new Error(`Font tool exited with status ${result.status ?? 1}.`)
  }
}

try {
  // Remove the unused italic axis and restrict weight and width to the values
  // used by the live site before subsetting glyphs. This keeps the variable
  // font behaviour while removing variation data that browsers never request.
  runFontTool([
    '--from',
    'fonttools==4.63.0',
    '--with',
    'brotli==1.1.0',
    'fonttools',
    'varLib.instancer',
    inputPath,
    'ital=0',
    'wght=400:700',
    'wdth=100:125',
    '-o',
    rangedFontPath,
    '--no-recalc-timestamp',
  ])

  runFontTool([
    '--from',
    'fonttools==4.63.0',
    '--with',
    'brotli==1.1.0',
    'pyftsubset',
    rangedFontPath,
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
  ])
} finally {
  // Remove only the task-specific disposable font workspace.
  rmSync(temporaryDirectory, { recursive: true, force: true })
}

console.log(`Generated ${outputPath}`)
