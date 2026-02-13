# SVG Badge Alignment Learnings

## Context

The service section SVGs use small pill badges with short labels. A pure geometric centre can still look slightly off because of font metrics and browser text rendering.

Two areas were tuned:

- `src/components/EnrichmentTypewriter.jsx` (right-side attribute pills such as `Sapphire Blue`)
- `src/components/OptimisationRipple.jsx` (node pills such as `Sapphire Earrings`)


## Final Alignment Rules

Use these defaults for SVG badge text in this project:

1. Set `dominantBaseline="central"` on badge `<text>` labels.
2. Keep badge text `y` anchored to the matching badge `rect` vertical centre.
3. Apply a tiny optical correction only where needed:
- Enrichment attribute pills use `dy="0.15"` to lower text by a very small amount.
- Optimisation ripple node pills do not use `dy`; `central` is already visually correct.


## Why This Works

- `dominantBaseline="central"` gave the most stable cross-browser centring in testing.
- `dominantBaseline="middle"` left labels slightly low.
- The enrichment pills still looked slightly high even at geometric centre, so a micro `dy` offset was applied for optical balance.
- The optimisation pills did not need this offset and remained cleanly centred without it.


## Verification Method

Use `dev-browser` on `http://localhost:3002` and compare text and badge geometry:

1. Find the target SVG `<text>` and its parent badge `<rect>`.
2. Measure centre delta:
- `(text.top + text.height / 2) - (rect.top + rect.height / 2)`
3. Check gap symmetry:
- `text.top - rect.top`
- `rect.bottom - text.bottom`
4. Confirm expected outcome:
- Enrichment tags: small positive delta (tiny downward optical shift).
- Optimisation tags: near-zero delta (true geometric centre).


## Regression Guard

The file `test/svg-badge-vertical-centering.test.mjs` protects this setup by asserting:

- Enrichment tags use `dominantBaseline="central"`.
- Enrichment tags keep centred `y` values and include `dy="0.15"`.
- Optimisation node labels use `dominantBaseline="central"` and keep centred `y`.


## Change Discipline

When editing badge typography in these service SVGs:

1. Change one alignment variable at a time (`dominantBaseline`, `y`, or `dy`).
2. Re-run `npm test`.
3. Re-verify both service sections in `dev-browser` before merging.
