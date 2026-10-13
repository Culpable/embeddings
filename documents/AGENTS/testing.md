# Checks and local lifecycle

Run `npm run lint`, `npm run check`, `npm run build`, `npm test` and `npm run test:http -- http://127.0.0.1:8794`. The build generates fresh output before any generated-output cases. Add tests only under the project’s test-first and meaningful-coverage rules.

## Runtime ownership

Before startup, verify the intended listener, process identity and repository. Preserve pre-existing runtimes. Start Astro only through foreground `npm --prefix /Users/sacino/embeddings run dev` on 3002; the explicit `--ignore-lock` prevents Astro’s agent-inferred detached mode. The temporary candidate command uses 3003. For a previously task-owned managed Astro process, `npm run dev:status` and `npm run dev:stop` report and stop its recorded lease; do not use that command for a foreign owner.

Wrangler starts through foreground `npm --prefix /Users/sacino/embeddings run worker:dev` on 8794. Build before starting it; stop it before rebuilding its generated local bundle. `.astro-local/` contains only local provider fixtures and a copy of the production bundle. Neither hosted configuration points there. Correlate readiness with the exact process and a route response; Astro cannot prove platform headers.

Keep runtimes attached to the tool session, with bounded inherited output. No shell backgrounding, detached helpers or uncapped log redirects. Stop only the foreground sessions you started. Revalidate ownership before signalling, then verify their listeners, descendants and lifecycle records close. A foreground session does not prove automatic parent-death cleanup; record that limitation rather than claiming it.

## Browser acceptance

Use dev-browser at 1440x900 and 390x900. Inspect all retained routes, actual animation phases, offscreen content, layout, fonts, overflow, keyboard, focus, form truth, native submission with a challenge and script-blocked email fallback. Reuse `scripts/browser/contact-about-navigation.dev-browser.js` for the contact-to-about flow.

Keep provider fixtures local: never send real leads or Mixpanel events. Use CDP network blocking or browser-local fetch fixtures for external calls; do not retain unresolved route callbacks between sandbox runs. Keep screenshots/logs/JSON under ignored `.artifacts/astro_cloudflare_workers_migration/` or the task-owned dev-browser temp folder. The final acceptance record belongs in `documents/evidence/astro_cloudflare_workers_migration/acceptance.md` after runs finish.

Production and mailbox acceptance require exact release/test authority. Keep their outcomes separate from local simulation. Preserve final evidence until owner acceptance and close only task-owned browsers.
