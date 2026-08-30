import { spawnSync } from 'node:child_process'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const repositoryRoot = resolve(fileURLToPath(new URL('..', import.meta.url)))
const stages = [
  ['Generate public discovery files', process.execPath, ['src/scripts/generate-public-artifacts.mjs']],
  ['Generate responsive images', process.execPath, ['src/scripts/generate-responsive-images.mjs']],
  ['Build the Next.js static export', resolve(repositoryRoot, 'node_modules/.bin/next'), ['build']],
  ['Validate the static export', process.execPath, ['scripts/validate-static-export.mjs']],
  ['Enforce static output budgets', process.execPath, ['scripts/check-static-budgets.mjs']],
]

for (const [label, command, args] of stages) {
  console.log(`\n${label}`)

  const result = spawnSync(command, args, {
    cwd: repositoryRoot,
    encoding: 'utf8',
    stdio: 'inherit',
  })

  if (result.error) throw result.error
  if (result.status !== 0) process.exit(result.status ?? 1)
}
