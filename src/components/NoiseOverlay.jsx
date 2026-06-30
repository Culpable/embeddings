// ---------------------------------------------------------------------------
// NoiseOverlay — SVG noise/grain texture overlay for dark sections.
// Add subtle visual depth to flat dark backgrounds via a shared CSS texture.
// Renders as a Server Component with no per-section SVG filter paint work.
//
// Usage: Place inside a relatively-positioned dark section container.
// The overlay is pointer-events-none and purely decorative.
//
// Props:
//   id – accepted for backwards compatibility with existing call sites.
// ---------------------------------------------------------------------------

export function NoiseOverlay({ id = 'noise' }) {
  void id

  return (
    <div
      className="noise-overlay pointer-events-none absolute inset-0 z-10 opacity-[0.03] mix-blend-overlay"
      aria-hidden="true"
    />
  )
}
