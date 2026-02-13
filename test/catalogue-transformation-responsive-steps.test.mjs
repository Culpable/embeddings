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
    /<div className="([^"]+)">\s*\{\/\* Arrow \(horizontal on mobile, vertical on desktop\) \*\/[\s\S]*?<ServiceStep[\s\S]*?number="1"[\s\S]*?label="Audit"[\s\S]*?\/>/,
  )

  return pipelineContainerMatch ? pipelineContainerMatch[1] : ''
}


function readServiceStepClasses(source) {
  // Locate the ServiceStep root classes in case responsive width rules live on each step item.
  const serviceStepMatch = source.match(
    /function ServiceStep\(\{ number, label(?:, className = ''|, className=''|, className)? \}\) \{[\s\S]*?<div[\s\S]*?className=\{`([^`]+)`\}/,
  )

  return serviceStepMatch ? serviceStepMatch[1] : ''
}


function readServiceStepInvocationClasses(source) {
  // Locate className props on each service step call to assert responsive alignment intent.
  const serviceStepClassMatches = [
    ...source.matchAll(
      /<ServiceStep[\s\S]*?number="\d+"[\s\S]*?label="[^"]+"[\s\S]*?className="([^"]+)"[\s\S]*?\/>/g,
    ),
  ]

  return serviceStepClassMatches.map((match) => match[1])
}


function readServiceStepSlotClasses(source) {
  // Locate number and label span classes to assert separate slot intent inside each step cell.
  const serviceStepSlotMatch = source.match(
    /function ServiceStep\(\{ number, label(?:, className = ''|, className=''|, className)? \}\) \{[\s\S]*?<span className="([^"]+)">\s*\{number\}\s*<\/span>[\s\S]*?<span className="([^"]+)">\s*\{label\}\s*<\/span>/,
  )

  if (!serviceStepSlotMatch) {
    return {
      numberSlotClasses: '',
      labelSlotClasses: '',
    }
  }

  return {
    numberSlotClasses: serviceStepSlotMatch[1],
    labelSlotClasses: serviceStepSlotMatch[2],
  }
}


test('service pipeline includes mobile 2x2 and tablet+ single-row responsive classes', () => {
  // Assert responsive class behaviour expected for four steps: 2x2 on small screens, single-row on tablet+.
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


test('service steps use dedicated number and label slots with left-aligned mobile content', () => {
  // Require dedicated slot classes and left-aligned mobile content in each 2x2 step cell.
  const source = readCatalogueTransformationSource()
  const serviceStepClasses = readServiceStepClasses(source)
  const serviceStepInvocationClasses = readServiceStepInvocationClasses(source)
  const { numberSlotClasses, labelSlotClasses } = readServiceStepSlotClasses(source)

  assert.ok(
    serviceStepInvocationClasses.length > 0,
    'Expected to find ServiceStep className props in src/components/CatalogueTransformation.jsx',
  )

  assert.doesNotMatch(
    serviceStepClasses,
    /\bjustify-center\b/,
    'Did not expect mobile centring intent inside each service-step cell',
  )

  assert.match(
    serviceStepClasses,
    /\b(?:grid|inline-grid)\b/,
    'Expected each service step cell to use grid-based slots for number and label content',
  )

  assert.ok(
    numberSlotClasses.length > 0 && labelSlotClasses.length > 0,
    'Expected to find number and label span classes in src/components/CatalogueTransformation.jsx',
  )

  assert.match(
    serviceStepClasses,
    /\bjustify-start\b/,
    'Expected mobile content to be left-aligned inside each service-step cell',
  )

  assert.match(
    numberSlotClasses,
    /\b(?:w-\d+|size-\d+)\b/,
    'Expected number slot classes to reserve a fixed mobile slot width',
  )

  assert.match(
    labelSlotClasses,
    /\b(?:min-w-0|w-full|grow)\b/,
    'Expected label slot classes to reserve an independent text slot',
  )

  assert.match(
    labelSlotClasses,
    /\btext-left\b/,
    'Expected label slot text to remain left-aligned on mobile',
  )

  assert.match(
    serviceStepInvocationClasses.join(' '),
    /\bmd:justify-start\b/,
    'Expected tablet+ alignment to switch back to non-centred start alignment',
  )
})
