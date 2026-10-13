import { readFile, writeFile, copyFile, mkdir, cp } from 'node:fs/promises'
import ts from 'typescript'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const generated = resolve(root, '.astro-server')
const production = JSON.parse(await readFile(resolve(generated, 'wrangler.json'), 'utf8'))
if (production.name !== 'embeddings' || production.main !== 'entry.mjs' || production.assets?.directory !== '../dist') throw new Error('Unexpected generated Worker target.')
// Flatten preview configuration so inherited routes and production values cannot leak.
const preview = { ...production, name: 'embeddings-preview', routes: [], workers_dev: true, preview_urls: true, vars: { CONTACT_MODE: 'preview' }, secrets: { required: [] } }
const localDirectory = resolve(root, '.astro-local')
await mkdir(localDirectory, { recursive: true })
await cp(generated, resolve(localDirectory, 'server'), { recursive: true, filter: source => !/wrangler[^/]*\.json$|contact-fixture\.mjs$|local-entry\.mjs$/u.test(source) })
const local = { ...preview, name: 'embeddings-local', main: 'local-entry.mjs', vars: { CONTACT_MODE: 'preview', CONTACT_ALLOWED_ORIGIN: 'http://127.0.0.1:8794' } }
await writeFile(resolve(generated, 'wrangler.preview.json'), JSON.stringify(preview, null, 2) + '\n')
await writeFile(resolve(localDirectory, 'wrangler.json'), JSON.stringify(local, null, 2) + '\n')

// Keep provider fixtures outside hosted entrypoints and outside public assets.
const handler = await readFile(resolve(root, 'src/lib/contact/handler.ts'), 'utf8')
await writeFile(resolve(localDirectory, 'contact-fixture.mjs'), ts.transpileModule(handler.replace("import { site } from '../../config/site'", "import { site } from './site-fixture.mjs'"), { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText)
await copyFile(resolve(root, 'scripts/fixtures/local-worker.mjs'), resolve(localDirectory, 'local-entry.mjs'))

const publicFacts = await readFile(resolve(root, 'src/config/site.ts'), 'utf8')
await writeFile(resolve(localDirectory, 'site-fixture.mjs'), ts.transpileModule(publicFacts, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText)
