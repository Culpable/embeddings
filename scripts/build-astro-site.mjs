import { existsSync, mkdirSync, renameSync } from 'node:fs'
import { randomUUID } from 'node:crypto'
import { spawnSync } from 'node:child_process'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import configuration from '../astro.config.mjs'

// Refuse canonical CI publication without a real configured challenge key.
if (process.env.WORKERS_CI === '1' && process.env.WORKERS_CI_BRANCH === 'main') {
  const key = process.env.PUBLIC_TURNSTILE_SITE_KEY
  if (!key || /^[123]x/u.test(key)) throw new Error('Configure the production Turnstile site key before releasing main.')
}

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
// Preserve the prior generated bundle before replacement so stale chunks cannot be uploaded.
const serverDirectory = resolve(root, '.astro-server')
if (existsSync(serverDirectory)) {
  const recoveryDirectory = resolve(root, '.artifacts/build-recovery')
  mkdirSync(recoveryDirectory, { recursive: true })
  renameSync(serverDirectory, resolve(recoveryDirectory, `server-${Date.now()}-${randomUUID()}`))
}
const stages = [
  [process.execPath, ['--import', 'tsx', 'src/scripts/generate-public-artifacts.mjs']],
  [process.execPath, ['src/scripts/generate-responsive-images.mjs']],
  [resolve(root, 'node_modules/.bin/astro'), ['build']],
  [process.execPath, ['--import', 'tsx', 'scripts/generate-agent-markdown.mjs', resolve(root, 'dist'), configuration.site]],
  [process.execPath, ['scripts/generate-worker-configs.mjs']],
  [process.execPath, ['--import', 'tsx', 'scripts/validate-static-export.mjs']],
  [process.execPath, ['--import', 'tsx', 'scripts/check-static-budgets.mjs']],
]

// Stop at the first failed stage so an invalid output cannot reach deployment.
for (const [command, args] of stages) {
  const result = spawnSync(command, args, { cwd: root, stdio: 'inherit' })
  if (result.error) throw result.error
  if (result.status !== 0) process.exit(result.status ?? 1)
}
