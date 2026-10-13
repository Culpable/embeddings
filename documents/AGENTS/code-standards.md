# Astro code standards

`package.json` and the lockfile own versions. `astro.config.mjs` owns static output and imports the shared canonical origin from `src/config/canonical-origin.mjs` so Node build tools use the same value without bundling the adapter into pages.

`src/pages/` owns route entrypoints, `src/layouts/BaseLayout.astro` owns the shell and single head renderer, and `src/components/site/` owns the preserved presentation. `src/scripts/` contains processed browser controllers. Preserve static initial content, protected CSS animation sequences, native anchors and the six-field enquiry model. Runtime code is limited to contact delivery, compatibility redirects and prebuilt representation selection.

Keep `assetsInlineLimit: 0` paired with `inlineStylesheets: 'always'`. The first setting keeps project scripts external for CSP; the second keeps CSS in the document. Keep request bundles and local fixtures outside `dist/`. Use the project’s existing commenting, British English and animation rules.
