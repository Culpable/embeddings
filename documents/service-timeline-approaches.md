# Service Section Timeline — Left-Rail Layout

Reference document for the left-rail timeline layout that visually connects the homepage service sections (Catalogue Audit → Freshness → Enrichment → Contextual Optimisation) into a cohesive four-step process.

**Chosen approach:** Left Rail (formerly Approach B)

---

## Implementation

**File:** `src/components/ServiceTimelineLeftRail.jsx`

### Description

The timeline runs vertically along the left edge. Each step has a numbered circle on the rail, with text indented to the right. The animation SVG renders **full-width** below the text block, preserving maximum SVG readability.

### ASCII Diagram (Desktop)

```
●— Catalogue Audit
|  See every gap before your competitors exploit it
|  [body text ...]
|
|  ┌──────────────────────────────────────────┐
|  │         FULL-WIDTH ANIMATION SVG         │
|  └──────────────────────────────────────────┘
|
●— Catalogue Freshness
|  Fresh data keeps you in the recommendation set
|  [body text ...]
|
|  ┌──────────────────────────────────────────┐
|  │         FULL-WIDTH ANIMATION SVG         │
|  └──────────────────────────────────────────┘
```

### Layout Details

- `relative` wrapper with `absolute` vertical line at `left-5`
- Text: `pl-16 lg:pl-20` (indented right of circle)
- Animation: full-width below, offset to clear the rail
- Mobile: rail narrows to `pl-12`
- SVGs remain full-width — no readability compromise

### Mechanics

- **Server Component** — no `'use client'` directive; animations delegated to existing `FadeIn` wrapper
- **Step circles:** `h-10 w-10 rounded-full bg-neutral-950 text-white` with step number
- **Vertical connecting line:** `bg-neutral-200`
- **Typography:** `font-display text-base font-semibold` (eyebrow), `font-display text-4xl font-medium sm:text-5xl tracking-tight` (title), `text-xl text-neutral-600` (body)
- **British English** and right-curly apostrophes (`'` U+2019)

### Strengths

- SVGs stay full-width — no readability compromise
- Simple, linear reading flow
- Cleanest mobile collapse
