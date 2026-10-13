# Embeddings

Astro 7 static marketing site with Tailwind CSS 3 and self-hosted Mona Sans. Node.js **22.17.0** and npm remain required.

## Local development

```sh
npm --prefix /Users/sacino/embeddings install
npm --prefix /Users/sacino/embeddings run dev
```

Open http://localhost:3002. The development command stays in the foreground; stop the server you start with Ctrl+C. Verify that its port closes. The saved pre-migration source and published Pages artefact remain the rollback authority until production acceptance.

## Checks and production-shaped review

```sh
npm --prefix /Users/sacino/embeddings run lint
npm --prefix /Users/sacino/embeddings run check
npm --prefix /Users/sacino/embeddings run build
npm --prefix /Users/sacino/embeddings test
npm --prefix /Users/sacino/embeddings run worker:dev
npm --prefix /Users/sacino/embeddings run test:http -- http://127.0.0.1:8794
```

`build` emits static documents and assets into ignored `dist/`, then generates private Markdown, isolated Worker configurations, output validation and delivered-byte checks. The request-time bundle stays in ignored `.astro-server/`. Local contact requests use fake providers and cannot send mail. Preview refuses production mail.

## Publishing

Cloudflare Workers Builds publishes the Astro site at https://embeddings.au. The source is pushed and the Actions publisher is disabled. The preserved Pages artefact remains available for rollback until live contact delivery is accepted. Repository privacy and automatic/private-build verification remain pending that acceptance and GitHub App access.

Production uses `.astro-server/wrangler.json`; isolated version previews use `.astro-server/wrangler.preview.json`. Never deploy the source Wrangler configuration. `deploy:initial` publishes without search notifications before cutover; `deploy` verifies canonical publication before notifying IndexNow. Both require exact external release authority.

Read [the hosting guide](documents/cloudflare-workers-hosting.md) for account/resource identities, contact setup, before-state, cutover gates and rollback. Read [site positioning](documents/site-positioning.md) before editing messaging. Keep the separate Shoppa product boundary and protected animation designs.
