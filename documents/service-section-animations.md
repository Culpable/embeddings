# Service Section Animations — Design Decisions & Reference

> **Created:** 2026-02-12
> **Status:** Final selections made; implementation complete.

---

## Overview

The home page features four dedicated service sections below the existing `CatalogueTransformation` before/after visual. Each section has a `SectionIntro` (eyebrow + title + body) followed by one or two bespoke animated SVGs.

All animations share these conventions:
- **viewBox:** `0 0 960 320`
- **Colour palette:** `#171717` (neutral-950) at varying opacities; red (`#dc2626`) for problems/stale; amber/yellow (`#f59e0b`, `#fbbf24`) for warnings; green (`#16a34a`) for fresh/success
- **Typography:** `font-display text-[11px] font-semibold tracking-wider uppercase` for labels
- **Animation:** Pure CSS `@keyframes` in `<style>` blocks within each SVG, plus SVG `<animateMotion>` for particles
- **Wrapper:** `<div className="relative mt-8 w-full overflow-hidden" aria-hidden="true">`
- **Component type:** Server Component (no `'use client'` directive)

---

## Final Selections

| Service | Selected Variant(s) | Component File(s) |
|---------|---------------------|--------------------|
| Catalogue Audit | A — X-Ray Scanner (enhanced) | `AuditXRayScanner.jsx` |
| Catalogue Freshness | A — Pipeline Flow | `FreshnessPipelineFlow.jsx` |
| Catalogue Enrichment | A — Typewriter | `EnrichmentTypewriter.jsx` |
| Contextual Optimisation | C — Ripple (active) + B — Seismograph (commented out, kept for future use) | `OptimisationRipple.jsx`, `OptimisationSeismograph.jsx` |

> **Note:** The Seismograph animation (`OptimisationSeismograph.jsx`) is intentionally commented out in `page.jsx` but the component file is retained. It can be re-enabled by uncommenting the `<FadeIn>` block in the `ContextualOptimisation` function.

### Rejected Variants (deleted)

- `AuditHeatmapGrid.jsx` (Audit B)
- `AuditMagnifyingGlass.jsx` (Audit C)
- `FreshnessHeartbeat.jsx` (Freshness B)
- `FreshnessTimestamps.jsx` (Freshness C)
- `EnrichmentBloom.jsx` (Enrichment B)
- `EnrichmentFillGaps.jsx` (Enrichment C)
- `OptimisationSignalHub.jsx` (Optimisation A)

---

## Section Copy (British English, right single quotation marks)

### Service 1: Catalogue Audit

- **Eyebrow:** "catalogue audit"
- **Title:** "See every gap before your competitors exploit it"
- **Body:** "We analyse your entire product catalogue against Google Merchant Centre specifications and agentic commerce standards. The audit identifies missing descriptions, malformed GTINs, inconsistent taxonomy, and thin data — then produces a prioritised remediation plan ranked by revenue impact."

### Service 2: Catalogue Freshness

- **Eyebrow:** "catalogue freshness"
- **Title:** "Stale data is invisible data"
- **Body:** "AI agents penalise outdated catalogues. We build real-time integrations from your ERP, POS, and inventory systems so stock levels, pricing, and product status are always current. A fresh catalogue means your products stay in the recommendation set."

### Service 3: Catalogue Enrichment

- **Eyebrow:** "catalogue enrichment"
- **Title:** "From thin listings to rich, AI-readable content"
- **Body:** "Our LLM pipelines transform sparse product data into rich, brand-aligned descriptions, categories, and attributes. Thousands of SKUs enriched in hours, not months. If an AI agent can't understand your product data, your products don't exist in agentic commerce."

### Service 4: Contextual Catalogue Optimisation

- **Eyebrow:** "contextual optimisation"
- **Title:** "A living catalogue that captures demand as it shifts"
- **Body:** "We connect your catalogue to live trend signals — Google Trends, social platforms, news cycles — so product descriptions evolve with what consumers are searching for right now. When cultural moments create demand spikes, your products are positioned to capture that intent before competitors."

---

## Animation Detail — Per Component

### AuditXRayScanner.jsx (Enhanced)

**Concept:** A horizontal scan beam sweeps down a product card, revealing data gaps. Warning markers appear at broken fields. Enhanced with:

1. **Yellow/amber highlighting** — When the scan beam crosses a field, a warm yellow glow (similar to the magnifying glass lens tint from rejected Option C) washes over that region briefly, drawing the eye to the problem area.
2. **Red/amber discrepancy markers** — Warning "!" circles use red (`#dc2626`) fills instead of neutral. Broken fields (dashed GTIN, thin descriptions, missing attributes) gain a subtle red or amber tint/stroke when revealed by the beam, making the discrepancies visually unmistakable.
3. **Amber scan beam** — The beam itself has a warm amber-tinted glow halo (using `#f59e0b` at low opacity) to blend the "diagnostic scan" feeling with a warning colour palette.

**Key animations:**
- `scanBeam`: `translateY` 30px → 250px over 4s, infinite loop
- `warnPulse`: per-row opacity 0 → 0.8 → 0, timed to beam position
- `highlightGlow`: amber wash rect fades in/out as beam passes each field zone

### FreshnessPipelineFlow.jsx

**Concept:** Three source nodes (ERP, POS, Inventory) on the left with curved paths carrying flowing particles to a Catalogue node on the right. Status text snippets ("stock: 142 → 139", "price: $189 → $179", "status: active") fade in/out along each path.

**Key animations:**
- `<animateMotion>` particles along 3 curved `<path>` definitions (3s, 3.5s, 4s durations, staggered begins)
- Catalogue node breathes with a subtle pulse
- Status text snippets cycle visibility with staggered delays

### EnrichmentTypewriter.jsx

**Concept:** Left: sparse product card ("Blue Dress", one line). Centre: LLM processor node (concentric circles with orbital dots). Right: enriched card with text being "typed" via `clip-path` animation, attribute tags fading in with staggered delays. Flowing particles connect the three stages. Blinking cursor at the typing position.

**Badge text alignment:**
- Attribute tag labels use SVG `dominantBaseline="central"` with each label `y` set to the `rect` vertical centre and `dy="0.15"` for a tiny optical downward correction. This keeps pills visually balanced across browsers.

**Key animations:**
- `typeText`: clip-path inset from 100% to 0% on right edge using `steps(30)` over 5s
- `blinkCursor`: opacity toggle with `steps(1)` at 0.8s
- `fadeInTag`: staggered per attribute tag (2s, 2.3s, 2.6s, 2.9s, 3.2s)
- `<animateMotion>` particles along both connection paths

### OptimisationSeismograph.jsx

**Concept:** A line chart with a trend line drawn via `stroke-dashoffset` over 10s. Gentle baseline with two dramatic spike eruptions. At each spike peak, a dashed drop line descends to a product card below showing the content update triggered by that trend.

- **Spike 1** at x≈320: "Taylor Swift blue dress" → product card shows "Taylor Swift-inspired"
- **Spike 2** at x≈640: "heavy metals in food" → product card shows "independently tested"

**Key animations:**
- `drawTrendLine`: stroke-dashoffset full → 0 over 10s
- Spike labels, drop lines, and product cards appear with staggered delays timed to when the drawing reaches each spike

### OptimisationRipple.jsx (Enhanced)

**Concept:** Trend drops appear at a central point, triggering concentric ripple rings that expand outward. Product card nodes are arranged around the centre with **contextually relevant names** that match the trends:

| Trend Drop | Relevant Product Nodes |
|------------|----------------------|
| "Taylor Swift blue dress" | "Blue Midi Dress", "Sapphire Earrings" |
| "SPF sunscreen recall" | "SPF 50+ Sunscreen", "UV Beach Hat" |
| "heavy metals" | "Organic Chocolate", "Kids Lunchbox" |

When a ripple ring reaches a product card node, that node flashes and receives a "+optimised" badge — demonstrating that the catalogue content has been updated in response to the trend signal.

**Badge text alignment:**
- Node label text uses SVG `dominantBaseline="central"` with label `y` anchored to the node `rect` centre (`y`), so labels remain vertically centred inside node badges.

**Key animations:**
- `rippleExpand`: scale 0 → 250, opacity 0.3 → 0 over 3s (3 concentric rings per drop, staggered 0.3s)
- 3 drop sets staggered by 4s
- Node flash: brightness spike timed to ripple arrival
- Badge fade: "+optimised" text appears after flash

---

## Page Structure (Final)

```
Services SectionIntro (existing)
  └─ CatalogueTransformation (existing before/after visual)

Service 1: Catalogue Audit
  └─ SectionIntro
  └─ AuditXRayScanner (enhanced with yellow/red)

Service 2: Catalogue Freshness
  └─ SectionIntro
  └─ FreshnessPipelineFlow

Service 3: Catalogue Enrichment
  └─ SectionIntro
  └─ EnrichmentTypewriter

Service 4: Contextual Catalogue Optimisation
  └─ SectionIntro
  └─ OptimisationSeismograph (intentionally commented out; kept for future use)
  └─ OptimisationRipple (contextual product nodes)

ContactSection (existing)
```
