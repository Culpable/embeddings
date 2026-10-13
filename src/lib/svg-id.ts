interface DocumentScope { svgIdCounts?: Map<string, number> }


/** Allocate stable, unique SVG identifiers within the current prerendered document. */
export function createSvgId(scope: DocumentScope, pathname: string, component: string): string {
  const counters = scope.svgIdCounts ?? (scope.svgIdCounts = new Map())
  const prefix = `svg-${pathname.replace(/[^a-zA-Z0-9_-]/gu, '-')}-${component}`
  const instance = counters.get(prefix) ?? 0
  counters.set(prefix, instance + 1)
  return `${prefix}-${instance}`
}
