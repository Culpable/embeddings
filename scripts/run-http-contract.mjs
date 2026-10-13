import { spawnSync } from 'node:child_process'
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const manifestPath = resolve(root, 'test/http-contract.json')
const asset = readdirSync(resolve(root, 'dist/_astro')).find(name => /\.[a-z0-9_-]{6,}\.js$/iu.test(name))
if (!asset) throw new Error('Build the fingerprinted browser entry before HTTP checks.')
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8').replace('{{ASTRO_ASSET_PATH}}', `/_astro/${asset}`))
for (const entry of manifest.cases) if (entry.expect?.bodyEqualsFile) entry.expect.bodyEqualsFile = resolve(dirname(manifestPath), entry.expect.bodyEqualsFile)
const output = resolve(root, '.artifacts/astro_cloudflare_workers_migration/http')
mkdirSync(output, { recursive: true })
const runtimePath = resolve(output, 'manifest.json')
writeFileSync(runtimePath, JSON.stringify(manifest))
const args = process.argv.slice(2), index = args.indexOf('--base-url')
const base = index === -1 ? args[0] : args[index + 1]
const result = spawnSync(process.execPath, [resolve(root, 'scripts/verify-http-contract.mjs'), '--manifest', runtimePath, ...(base ? ['--base-url', base] : [])], { cwd: root, stdio: 'inherit' })
if (result.error) throw result.error
process.exitCode = result.status ?? 1
