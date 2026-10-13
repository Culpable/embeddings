/// <reference types="astro/client" />

// Declare progressive WebMCP annotations without changing native form behaviour.
declare namespace astroHTML.JSX {
  interface FormHTMLAttributes { toolname?: string; tooldescription?: string }
  interface InputHTMLAttributes { toolparamdescription?: string }
  interface TextareaHTMLAttributes { toolparamdescription?: string }
}

// Import Worker types without merging HTMLRewriter's HTMLElement into browser DOM types.
type Fetcher = import('@cloudflare/workers-types').Fetcher

// Resolve the runtime binding object from Wrangler’s generated schema.
declare module 'cloudflare:workers' {
  export const env: Cloudflare.Env
}

type WorkerVersionMetadata = import('@cloudflare/workers-types').WorkerVersionMetadata

// Keep render counters in the document context, never in a mutable Worker module global.
declare namespace App {
  interface Locals { svgIdCounts?: Map<string, number> }
}
