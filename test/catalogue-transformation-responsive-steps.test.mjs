import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'


const catalogueTransformationPath = resolve(
  process.cwd(),
  'src/components/CatalogueTransformation.jsx',
)


function readCatalogueTransformationSource() {
  // Read the component source so assertions can validate responsive class intent directly.
  return readFileSync(catalogueTransformationPath, 'utf8')
}


function readServicePipelineContainerClasses(source) {
  // Locate the service pipeline container by matching the arrow marker and first service step.
  const pipelineContainerMatch = source.match(
    /<div className="([^"]+)">\s*\{\/\* Arrow \(horizontal on mobile, vertical on desktop\) \*\/[\s\S]*?<ServiceStep number="1" label="Audit"(?: [^>]*)? \/>/,
  )

  return pipelineContainerMatch ? pipelineContainerMatch[1] : ''
}


function readServiceStepClasses(source) {
  // Locate the ServiceStep root classes in case responsive width rules live on each step item.
  const serviceStepMatch = source.match(
    /function ServiceStep\(\{ number, label(?:, className = ''|, className=''|, className)? \}\) \{[\s\S]*?<div className=\{`([^`]+)`\}/,
  )

  return serviceStepMatch ? serviceStepMatch[1] : ''
}


function readServiceStepInvocationClasses(source) {
  // Locate className props on each service step call to assert responsive alignment intent.
  const serviceStepClassMatches = [
    ...source.matchAll(
      /<ServiceStep number="\d+" label="[^"]+" className="([^"]+)" \/>/g,
    ),
  ]

  return serviceStepClassMatches.map((match) => match[1])
}


test('service pipeline includes mobile 2x2 and tablet 1x4 responsive classes', () => {
  // Assert responsive class behaviour expected for four steps: 2x2 on small screens, 1x4 on tablet.
  const source = readCatalogueTransformationSource()
  const pipelineClasses = readServicePipelineContainerClasses(source)
  const serviceStepClasses = readServiceStepClasses(source)
  const searchableClassList = `${pipelineClasses} ${serviceStepClasses}`

  assert.ok(
    pipelineClasses.length > 0,
    'Expected to find service pipeline container classes in src/components/CatalogueTransformation.jsx',
  )

  assert.match(
    searchableClassList,
    /\b(?:flex-wrap|grid-cols-2|basis-1\/2|w-1\/2)\b/,
    'Expected mobile wrapping with two-column classes for a 2x2 service-step layout',
  )

  assert.match(
    searchableClassList,
    /\bmd:(?:flex-nowrap|grid-cols-4|basis-1\/4|w-1\/4)\b/,
    'Expected tablet single-row classes for a 1x4 service-step layout',
  )
})


test('service steps centre within mobile 2x2 boxes and return to start alignment on tablet+', () => {
  // Require mobile centring in each half-width box while preserving non-centred alignment on tablet+.
  const source = readCatalogueTransformationSource()
  const serviceStepClasses = readServiceStepClasses(source)
  const serviceStepInvocationClasses = readServiceStepInvocationClasses(source)
  const searchableClassList = [
    serviceStepClasses,
    ...serviceStepInvocationClasses,
  ].join(' ')

  assert.ok(
    serviceStepInvocationClasses.length > 0,
    'Expected to find ServiceStep className props in src/components/CatalogueTransformation.jsx',
  )

  assert.match(
    searchableClassList,
    /\bbasis-1\/2\b/,
    'Expected mobile half-width classes so each step occupies one cell in the 2x2 layout',
  )

  assert.match(
    searchableClassList,
    /\bjustify-center\b/,
    'Expected mobile horizontal centring inside each half-width service-step box',
  )

  assert.match(
    searchableClassList,
    /\bmd:justify-start\b/,
    'Expected tablet+ alignment to switch back to non-centred start alignment',
  )
})
