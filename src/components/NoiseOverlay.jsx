// ---------------------------------------------------------------------------
// NoiseOverlay — SVG noise/grain texture overlay for dark sections.
// Adds subtle visual depth to flat dark backgrounds via an feTurbulence
// noise pattern. Renders as a Server Component (no client JS needed).
//
// Usage: Place inside a relatively-positioned dark section container.
// The overlay is pointer-events-none and purely decorative.
//
// Props:
//   id – unique identifier to prevent SVG filter ID collisions when
//        multiple NoiseOverlay instances appear on the same page
// ---------------------------------------------------------------------------

export function NoiseOverlay({ id = 'noise' }) {
  const filterId = `noiseFilter-${id}`

  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 opacity-[0.03] mix-blend-overlay"
      aria-hidden="true"
    >
      <svg
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <filter id={filterId}>
          {/* Generate high-frequency fractal noise for a film-grain effect */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.80"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter={`url(#${filterId})`}
        />
      </svg>
    </div>
  )
}
