import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const repositoryRoot = process.cwd()
const nvmrcPath = resolve(repositoryRoot, '.nvmrc')
const packagePath = resolve(repositoryRoot, 'package.json')
const packageLockPath = resolve(repositoryRoot, 'package-lock.json')
const deployWorkflowPath = resolve(
  repositoryRoot,
  '.github/workflows/deploy.yml',
)
const readmePath = resolve(repositoryRoot, 'README.md')
const agentsPath = resolve(repositoryRoot, 'AGENTS.md')


function readJson(path) {
  // Parse tracked JSON declarations so the assertions compare their semantic values.
  return JSON.parse(readFileSync(path, 'utf8'))
}


function readSupportedNodeVersion() {
  // Treat the project-local nvm pin as the single source of runtime truth.
  const declaration = readFileSync(nvmrcPath, 'utf8').trim()
  const match = declaration.match(/^v?(?<version>\d+\.\d+\.\d+)$/)

  assert.ok(
    match,
    'Expected .nvmrc to contain one exact semantic Node.js version',
  )

  return match.groups.version
}


function readDeclaredNodeVersions(source) {
  // Collect exact versions only from documentation lines that describe Node.js.
  const nodeVersionPattern = /\bv?(\d+\.\d+\.\d+)\b/g

  return source
    .split('\n')
    .filter(
      (line) =>
        /\bNode(?:\.js)?\b/i.test(line) || /\bRequired version\b/i.test(line),
    )
    .flatMap((line) =>
      [...line.matchAll(nodeVersionPattern)].map((match) => match[1]),
    )
}

const supportedNodeVersion = readSupportedNodeVersion()
const packageJson = readJson(packagePath)
const packageLockJson = readJson(packageLockPath)


test('package metadata mirrors the exact Node.js version from .nvmrc', () => {
  // Keep install-time package metadata aligned with the local runtime pin.
  assert.deepEqual(
    {
      packageJson: packageJson.engines?.node ?? null,
      packageLock: packageLockJson.packages?.['']?.engines?.node ?? null,
    },
    {
      packageJson: supportedNodeVersion,
      packageLock: supportedNodeVersion,
    },
    'Expected package.json and the lockfile root package to declare the .nvmrc version exactly',
  )
})


test('deployment reads its Node.js version from .nvmrc', () => {
  // Make CI consume the same tracked pin instead of duplicating a version literal.
  const deployWorkflow = readFileSync(deployWorkflowPath, 'utf8')

  assert.match(
    deployWorkflow,
    /node-version-file:\s*['"]?\.nvmrc['"]?/,
    'Expected actions/setup-node to use node-version-file: .nvmrc',
  )
  assert.doesNotMatch(
    deployWorkflow,
    /\bnode-version:\s*/,
    'Expected deployment not to maintain a separate node-version literal',
  )
})


test('setup and deployment documentation declare only the .nvmrc Node.js version', () => {
  // Prevent human-facing setup requirements from drifting away from the executable pin.
  const documentationFiles = [
    ['README.md', readFileSync(readmePath, 'utf8')],
    ['AGENTS.md', readFileSync(agentsPath, 'utf8')],
  ]
  const declaredVersionsByFile = Object.fromEntries(
    documentationFiles.map(([fileName, source]) => [
      fileName,
      [...new Set(readDeclaredNodeVersions(source))],
    ]),
  )

  assert.deepEqual(
    declaredVersionsByFile,
    {
      'README.md': [supportedNodeVersion],
      'AGENTS.md': [supportedNodeVersion],
    },
    'Expected every documented Node.js version to match .nvmrc',
  )
})


test('dev, build, and test share one dependency-free Node.js preflight', async () => {
  // Require npm lifecycle hooks to reject an unsupported runtime before project work starts.
  const lifecycleHooks = {
    predev: packageJson.scripts?.predev ?? null,
    prebuild: packageJson.scripts?.prebuild ?? null,
    pretest: packageJson.scripts?.pretest ?? null,
  }

  assert.ok(
    Object.values(lifecycleHooks).every(
      (command) => typeof command === 'string' && command.length > 0,
    ),
    `Expected predev, prebuild, and pretest hooks, received ${JSON.stringify(lifecycleHooks)}`,
  )

  const preflightReferences = Object.values(lifecycleHooks).map((command) =>
    command.match(/^npm run (?<scriptName>[\w:-]+)$/),
  )

  assert.ok(
    preflightReferences.every(Boolean),
    'Expected each lifecycle hook to call one shared npm preflight script',
  )

  const preflightScriptNames = preflightReferences.map(
    (match) => match.groups.scriptName,
  )

  assert.equal(
    new Set(preflightScriptNames).size,
    1,
    'Expected predev, prebuild, and pretest to call the same preflight script',
  )

  const preflightCommand = packageJson.scripts[preflightScriptNames[0]]

  assert.equal(
    typeof preflightCommand,
    'string',
    'Expected the shared preflight package script to exist',
  )

  const preflightCommandMatch = preflightCommand.match(
    /^node\s+(?<scriptPath>[^\s;&|]+\.mjs)$/,
  )

  assert.ok(
    preflightCommandMatch,
    'Expected the preflight package script to run one dependency-free Node.js module',
  )

  const preflightPath = resolve(
    repositoryRoot,
    preflightCommandMatch.groups.scriptPath,
  )

  assert.ok(
    existsSync(preflightPath),
    `Expected the runtime preflight module to exist at ${preflightCommandMatch.groups.scriptPath}`,
  )

  const preflightSource = readFileSync(preflightPath, 'utf8')
  const importSpecifiers = [
    ...preflightSource.matchAll(
      /\b(?:from|import)\s*(?:\(\s*)?['"](?<specifier>[^'"]+)['"]/g,
    ),
  ].map((match) => match.groups.specifier)

  assert.match(
    preflightSource,
    /\.nvmrc/,
    'Expected the runtime preflight to read the authoritative .nvmrc pin',
  )
  assert.match(
    preflightSource,
    /process\.versions\.node/,
    'Expected the runtime preflight to compare the active Node.js version',
  )
  assert.ok(
    importSpecifiers.every((specifier) => specifier.startsWith('node:')),
    `Expected the runtime preflight to use only Node.js built-ins, received ${JSON.stringify(importSpecifiers)}`,
  )

  const preflightModule = await import(pathToFileURL(preflightPath).href)

  assert.equal(
    typeof preflightModule.getNodeVersionError,
    'function',
    'Expected the runtime preflight to expose its version comparison for regression tests',
  )
  assert.equal(
    preflightModule.getNodeVersionError(
      `v${supportedNodeVersion}`,
      supportedNodeVersion,
    ),
    null,
    'Expected the runtime preflight to accept the exact supported version',
  )
  assert.match(
    preflightModule.getNodeVersionError(`v${supportedNodeVersion}`, '0.0.0'),
    new RegExp(`requires Node\\.js v${supportedNodeVersion}`),
    'Expected the runtime preflight to reject a different Node.js version',
  )
})
