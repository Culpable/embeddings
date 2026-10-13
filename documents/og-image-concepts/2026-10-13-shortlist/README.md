# Embeddings: retained top three Open Graph designs

These are the owner’s top three, kept in their final reviewed form. **The third option, the capabilities poster, is selected for the site on 13 October 2026.**

| Review order | Design | Reference |
| --- | --- | --- |
| 1 | Brand poster | [Full-size PNG](dark/05-brand-poster.png): oversized logo, connected outline and a centred single-line “AI built into the way you work” tagline. |
| 2 | Systems hub | [Full-size PNG](dark/01-systems-hub.png): full header logo, central ribbon and five system cards. Description: “We connect AI to your documents, systems and inbox, then keep it running.” |
| 3 | Capabilities poster - selected | [Full-size PNG](dark/03-five-capabilities.png): “AI built into the way you work” above Knowledge assistants, Customer chatbots, Workflow automation, System integration and Agent orchestration. |

All three have the exact footer “Australian AI consultancy” and embeddings.au. The [numbered contact sheet](00-dark-contact-sheet.png) compares their final pixels at 600 px. Each design retains its standalone HTML, full-size PNG, and 600 px / 300 px previews.

## Selected public image

- File: `public/images/embeddings-ai-consultancy-1200x630.png`.
- Canonical Open Graph and Twitter URL: `https://embeddings.au/images/embeddings-ai-consultancy-1200x630.png`.
- Format: image/png, 1200 × 630, opaque sRGB with its ICC profile preserved.
- Selection owner: `src/config/site.ts`; the shared metadata component uses these facts across retained routes.
- The old retail diagram is superseded. The responsive-image generator now generates only process imagery; it must not recreate or select the old social image. The existing social-image byte budget follows the selected asset.

## Optimisation

OxiPNG reduced the selected source from **72,567 bytes to 43,992 bytes**, a **39.38% saving**, using lossless compression and safe metadata stripping. Sharp decoding confirms identical pixel buffers before and after optimisation. The PNG remains opaque and retains its sRGB profile. No external upload or package installation was needed. `selection.json` records source/public hashes and the optimisation result.

Reproduce the selected public PNG with the installed local optimiser:

```sh
oxipng -o 4 --strip safe --out /Users/sacino/embeddings/public/images/embeddings-ai-consultancy-1200x630.png /Users/sacino/embeddings/documents/og-image-concepts/2026-10-13-shortlist/dark/03-five-capabilities.png
```

Normal site builds use the checked-in optimised public PNG and do not need OxiPNG installed in CI.

## Reproduce the references

`base-artwork.mjs` retains the original compositions. `artwork.mjs` applies the final approved wording and layout. `render.mjs` embeds the real SVG logo and Mona Sans fonts in standalone HTML and uses the installed Bulma Chromium / Embeddings Sharp dependencies. There is no dependency on the earlier ignored concept directories.

```sh
node /Users/sacino/embeddings/documents/og-image-concepts/2026-10-13-shortlist/render.mjs
```

The renderer captures at 1200 × 630 with device scale factor 2 and `--force-color-profile=srgb`, then downsamples to opaque profiled sRGB PNGs. It protects the site selection and public PNG from modification. Sources under `dark/sources/` can be opened without a server or network request. Rerendering references does not select or publish a new public image.

## Reference validation

All three references pass decoded dimensions, opacity, sRGB profile, under-1-MB, loaded-font/image, safe-text-margin, overflow, card-padding and footer-clearance checks. The standalone browser pages report no console/page errors or network requests. Every final PNG and 300 px preview was visually inspected; all headlines read clearly. Fine diagram and capability labels are secondary at thumbnail size. `validation.json` records the original review capture; `visual-review.json` identifies the exact inspected pixels. `selection.json` records the later promotion and optimisation.

The selected public image is configured locally. Deployment and hosted social-preview cache refresh require the site’s normal authorised release; no push or deployment is part of this selection task.
