# Metadata and discovery

The shared head component `src/components/head/PageMetadata.astro` renders once from `BaseLayout.astro`. `src/lib/metadata.ts` validates the route input and composes titles. Home uses the brand prefix; internal pages retain the existing ` / Embeddings` suffix. Reject empty descriptions, double-composed titles, foreign canonicals and query/fragment canonicals.

`src/lib/structured-data.ts` builds the single truthful graph and `src/components/head/StructuredData.astro` safely serialises it. Keep stable fragment identifiers and supported page/service facts. Optional business facts need evidence; missing broader identity-completeness facts remain documented.

`src/lib/public-artifacts.mjs` and its build script own sitemap, robots and curated llms output. Keep slash canonicals, exact crawler tokens and noindex utility exclusions aligned with the route inventory. Do not add a second SEO or discovery owner. Test generated HTML and actual Worker MIME/headers rather than only source configuration.
