// ---------------------------------------------------------------------------
// DressThumbnail — small illustrated dress thumbnail for the demo chat
// conversations (the AgentConversationShowcase product cards and the
// HeroDataFlow mobile chat card). Draws an actual dress silhouette instead of
// a flat colour swatch, so the cards read as product imagery.
//
// Static, hook-free component: pure inline SVG, so it adds no client
// JavaScript of its own and stays a Server Component wherever the parent is
// one. Gradient ids are namespaced via `idPrefix` because the sapphire dress
// renders in both the hero and the showcase on the same page, and duplicate
// SVG ids would make every instance resolve to the first gradient in the
// document.
// ---------------------------------------------------------------------------

import clsx from 'clsx'

// Each variant describes one dress silhouette on a 36×44 canvas:
//   - `backdropClass`: soft tile tint behind the dress, like a photo backdrop.
//   - `from`/`to`: gradient stops, matching the old swatch gradients so the
//     palette stays consistent with the rest of the fictional catalogue.
//   - `straps`: stroked shoulder straps, drawn in the solid `from` colour.
//   - `body`: the filled dress outline (neckline → waist → flared midi hem).
//   - `details`: white seam strokes that sell the garment shape at small sizes
//     (waist seam on both, plus the crossover panel line on the wrap dress).
const dressVariants = {
  sapphire: {
    // Sapphire Blue A-Line Midi Dress — scoop neckline, fitted bodice,
    // flared A-line skirt. Tailwind blue-500 → indigo-600.
    backdropClass: 'bg-indigo-50',
    from: '#3b82f6',
    to: '#4f46e5',
    straps: 'M12.4 7.2 L13.2 3.6 M23.6 7.2 L22.8 3.6',
    body: 'M12 7 Q18 10.5 24 7 L22.5 19 L29 39 Q18 43.5 7 39 L13.5 19 Z',
    details: ['M13.5 19 Q18 21 22.5 19'],
  },
  blush: {
    // Blush Crepe Wrap Midi Dress — deep V wrap neckline with a crossover
    // panel and waist sash. Tailwind rose-300 → rose-500.
    backdropClass: 'bg-rose-50',
    from: '#fda4af',
    to: '#f43f5e',
    straps: 'M12.4 7.2 L13.2 3.6 M23.6 7.2 L22.8 3.6',
    body: 'M12 6.5 L18 14.5 L24 6.5 L22.5 19 L29 39 Q18 43.5 7 39 L13.5 19 Z',
    details: ['M12.6 7.2 L20.2 16', 'M13.5 19 Q18 21 22.5 19'],
  },
}


export function DressThumbnail({ variant, idPrefix, className }) {
  const dress = dressVariants[variant]
  const gradientId = `${idPrefix}-dress-gradient`

  return (
    // Decorative product image — the adjacent text names the dress, so hide
    // the illustration from assistive technology. Callers pass the size and
    // corner radius so the thumbnail matches its host card.
    <span
      className={clsx('block flex-none', dress.backdropClass, className)}
      aria-hidden="true"
    >
      <svg viewBox="0 0 36 44" className="h-full w-full">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={dress.from} />
            <stop offset="100%" stopColor={dress.to} />
          </linearGradient>
        </defs>
        {/* Shoulder straps sit behind the bodice, so draw them first. */}
        <path
          d={dress.straps}
          fill="none"
          stroke={dress.from}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Dress body: filled silhouette from neckline to midi hem. */}
        <path d={dress.body} fill={`url(#${gradientId})`} />
        {/* Seam details keep the garment readable at thumbnail size. */}
        {dress.details.map((seam) => (
          <path
            key={seam}
            d={seam}
            fill="none"
            stroke="#fff"
            strokeOpacity="0.4"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
        ))}
      </svg>
    </span>
  )
}
