# Astro and Cloudflare migration acceptance

## Result and revision

Local implementation and isolated hosted preview pass. Canonical production migration remains incomplete. GitHub Pages and the public repository still serve as the old release boundary. A pending sender domain and domain-restricted sending key are prepared without DNS changes or mail. No apex DNS, shared widget, production mail, Pages retirement, IndexNow submission or visibility change has occurred.

Initial source baseline: `35d81cdde4adc78ea9e1e90ac011efa76c49ba01`. Current committed base includes the independent planning commit `8da1baf681cde92e4b3de460abc170398df067ba` and the separately owned social-artwork commit `815185e`. The tested migration source is the uncommitted scoped tree above that base; its exact file hashes are retained in the ignored `source-snapshot.json` next to the logs. The migration commit is recorded separately in the same ignored evidence directory after committing, avoiding a self-referential evidence revision.

Reviewed inactive Worker version: `b27ab615-c71d-4c66-ad83-ee660a4a7634`, [version URL](https://b27ab615-embeddings-preview.webpop.workers.dev). The preview alias points to it. Production Worker `embeddings` has not been created. The active isolated bootstrap remains `020ca849-9c6c-4a73-b29a-31b601a87d64`; uploading versions did not promote them.

## Setup and command results

Use Node 22.17.0, locked npm dependencies, the official public test challenge key `1x00000000000000000000AA`, and no production runtime mail secrets. The local Worker uses `.astro-local/` injected providers; hosted previews refuse mail. No customer information or live analytics events are used.

The final automated sequence runs from `/Users/sacino/embeddings`, stopping at its first failure:

| Command | Expected | Actual | Raw output |
|---|---|---|---|
| `npm run lint` | Zero ESLint errors | Pass | `.artifacts/astro_cloudflare_workers_migration/final-acceptance/analytics-final-lint.log` |
| `npm run check` | Valid bindings, Astro and TypeScript | 110 files, zero errors/warnings/hints | `analytics-final-check.log` in the same directory |
| `npm run build` | Static documents, isolated Worker, valid output and budgets | Eight documents, discovery and private Markdown generated; all checks pass | `analytics-final-build.log` |
| `npm test` | All meaningful Node cases pass | 43 passed, zero failed/skipped | `analytics-final-test.log` |
| `npm run test:http -- http://127.0.0.1:8794` | Real Worker protocol and exact document bytes | 19 passed | `final-local-http.log` |
| Same HTTP runner with the reviewed version URL | Hosted protocol and exact bytes | 19 passed | `final-hosted-http.log` |

`commands-analytics-final.json` records the final complete sequence after production-module fixes; `commands-og.json` records exact commands, duration, exit status and absolute output paths. The complete log directory is `/Users/sacino/embeddings/.artifacts/astro_cloudflare_workers_migration/final-acceptance/`. The initial baseline also passes lint/build and all 23 cases. Normal build warnings identify missing production secrets; they are intentionally not supplied to local/preview acceptance and do not prove production contact readiness. The Node 22.17.0 compatibility override keeps unifont on undici7.29.1; undici8 requires a newer Node runtime. Next/React dependencies stay until canonical acceptance.

## Browser and HTTP outcomes

The task-owned browser is `embeddings-astro-migration-1013`; raw browser evidence stays in `/Users/sacino/.dev-browser/tmp/embeddings-migration-1013-71a4/`. Local Astro owns port 3002; production-shaped Wrangler owns 8794; the frozen Pages comparison used owned 3003. Each listener was identified before use. Browser and server cleanup is recorded after these checks; evidence is retained until owner acceptance.

- Homepage, About, Process, Contact, Privacy, confirmation, debug and unknown-route recovery are inspected at 1440x900 and 390x900. Built/hosted pages preserve the reviewed text, structure, fonts, weights, size, colour and geometry. Contact gains the required email fallback, so its following content moves by the fallback's height. No horizontal overflow or offscreen changed content is found.
- Matching baseline/candidate protected animation phases pass at 900, 2,200 and 4,300 ms on both widths. Names, delay, duration, easing, opacity, transforms, edit caret and publish/live states match. Original shared animation declarations and dormant JSX are preserved. `motion-final.json` contains the phase comparison; selected baseline/candidate captures stay under `final/`.
- All 16 final hosted route/viewport combinations pass 33 applicable axe rules, with no page errors. Open-menu, invalid, pending, delivery-failed and success states also pass at both widths. Expected 404 console responses belong to the deliberately missing route. `final/final-hosted-pages.json` and `final/material-states-axe.json` record the outcomes.
- Tab/Shift+Tab containment, Escape, trigger focus restoration, background inertness (including header links), interrupted transitions, restoring scroll 550, and same-page services navigation pass. The selected anchor receives focus. `final/menu-keyboard-1440.json`, `final/menu-keyboard-390.json` and `final/accessibility-tree.json` retain the results/tree. No practical screen-reader automation tool is available; a spoken screen-reader session remains unverified. The accessibility tree and keyboard flow do not replace that session.
- The retained contact-to-about script passes 20 iterations with zero request failures/page errors. Its final result is copied to `navigation.json` in the ignored log directory. The temporary run with an active test widget could not reach `networkidle` because the third-party frame continues requests. The final navigation run uses default dev setup without a widget key; actual challenge/native behaviour is separately checked below. No test is weakened to count provider traffic as navigation correctness. Future key-enabled navigation runs must use an explicit readiness boundary or isolate provider traffic.
- Enhanced contact fixtures prove all six fields, validation/focus, disabled pending controls, failure retaining input, clearing the challenge for retry, stable retry UUID, fresh UUID for changed content, success only after `{ok:true}`, and send-another clearing/focusing Name. `final/contact-retry-states.json` and success screenshots record these outcomes. A pending blur no longer invents a missing message; see the before/after files.
- Native form submission works with project bundles blocked while the official test Turnstile loader remains available. The generated token exists independently of enhancement; POST reaches `/thank-you/` through the actual local handler and fake providers. `final/native-real-challenge.json` records it without the token. This is not real mailbox delivery.
- All scripts disabled leaves useful static content and the visible `solutions@embeddings.au` fallback. `no-javascript.json` records the five indexable routes. No bypass permits success without provider acceptance.
- HTML/Markdown cache order, byte parity, HEAD,406,404recovery,308legacy redirects with queries, discovery MIME/UTF-8, fixed-asset cache policy and private paths pass. Extra hosted checks cover encoded/private-root paths, weighted Accept, HTML ETag on a Markdown request and the contact405guard; `hosted-extra.json` records them on the earlier version with identical routing code. Python urllib returned403 for a diagnostic request while strict-TLS curl and the existing Node runner return the required404; the supported runner is the evidence authority.
- Preview pages report noindex, apex canonicals and no Mixpanel mutation. Static output contains no provider credentials. Broader optional organisation address/contact-point completeness is not claimed or invented.

## Social image selection

The independently selected five-capabilities PNG is used for Open Graph and Twitter on all eight built routes, declared image/png,1200x630. The public file is43992bytes and SHA-256 `3a6a8f77d70517c0bd0e48ec7d01e1f99c84962d35dad61cdb4c69900c1e7970`, matching the reviewed lossless asset. The same exact bytes return 200/image/png from the final hosted preview. `social-image.json` and `social-image-hosted.json` retain these checks. Production image serving remains a required post-cutover check. No artwork is regenerated by this migration.

## Reproduced defects and lessons

The two independent audit reports and their consolidated XML pass the shared validator. The contact partition and the Worker/release partition identify five defects; all are independently reproduced and fixed. The reports remain unchanged at `documents/todo/bugs/codex/subagent_bug_sweep_20261013_contact_9c71.xml`, `subagent_bug_sweep_20261013_worker_41af.xml` and `combined_bug_sweep_20261013_42d6c871.xml` (project-ignored audit records). Their scope excludes hosted mail/account writes. `before-fix-excerpts.txt` contains captured red-run excerpts; final test logs contain the passing reruns.

| Defect | Before | After and lesson |
|---|---|---|
| Budget prototype-property bypass | `constructor` passes with 200 and provider calls | Own-property allowlist returns422before providers. Add the test before the fix. |
| Malformed multipart UTF-8 | Raw0xff is replaced and mailed | Fatal decoding rejects 422 before providers; validate bytes before form parsers repair them. |
| Deferred focusout during pending | Filled Message gets a missing-field error | Ignore queued blur when pending/disabled; disabled fields are excluded from FormData. |
| Conditional Markdown | HTML 304 is copied into a body response and throws | Strip HTML validators/range headers when selecting Markdown; representation validators do not transfer. |
| IndexNow legacy no-slash URL | Same-named output directory causes EISDIR before deploy | Only regular files get hashes; removed slashless URLs verify a redirect. |

Additional observable fixes: same-page menu anchors no longer restore the previous scroll; header links outside the modal become inert; pointer selection completes before error geometry changes; stable document-scoped SVG IDs avoid changed-release notifications from random IDs; hosted HTML explicitly declares UTF-8. Presentation/source-only Next hydration guards are removed because the app no longer hydrates; actual navigation/focus/extension-safe static outcomes and runtime checks replace their relevant coverage.

## Replay and remaining production acceptance

1. Use the recorded source revision and exact candidate file hashes. `npm ci` uses the committed lockfile. Preserve the official test public key and keep production provider secrets absent.
2. Run the four automated commands above in order. Start only owned lifecycle servers after checking ports; build before `npm run worker:dev`.
3. Run the HTTP runner with local or immutable preview origin. Run the existing navigation script through dev-browser at the default dev setup. Browser fixture code/state outputs and the before-fix XML examples support focused replay; do not send real mail as a reproduction fixture.
4. For fault isolation, run `node --import tsx --test test/contact-handler.test.mjs test/negotiated-conditional.test.mjs test/indexnow.test.mjs test/svg-id.test.mjs`. They inject provider/asset/deploy transport and never deploy or submit notifications. Before-fix snippets belong in an isolated temporary copy, not a restoration of the collaborative working tree.
5. Stop only owned foreground sessions, close the named browser, verify ports/names close, and preserve retained evidence.

Required and not run: actual Git-connected production/preview builds, sender DNS verification, runtime secret provisioning, production Turnstile hostname addition, authorised push/canonical Worker/DNS cutover, strict apex/www IPv4/IPv6/TLS checks, one authorised synthetic enquiry and mailbox receipt/Reply-To confirmation, search notification if authorised, Pages retirement, private visibility and a build fetching the private repository. The expanded local credential check succeeds with an existing Resend administrator. Earlier 401/403 responses do not establish that administration is unavailable. The account Usage API confirms two of three included domains used. Pending `notifications.embeddings.au` (ID `4f0f6e02-4fc5-4ba1-a603-fdb7972a3ac2`) uses the third slot, region `ap-northeast-1`, sending only and tracking disabled. Four provider-generated DNS payloads and their empty before-state are recorded in the hosting packet; the complete 22-record zone still matches the initial baseline after provider preparation. The new restricted sending key is stored only in Keychain with safe metadata recorded under ignored `cutover/resend-sending-key-metadata.json`. Neither domain verification, Worker secret binding nor actual sending is claimed. Exact production authority is required by the plan. These gaps prevent end-to-end completion and keep the plan in progress. See `documents/cloudflare-workers-hosting.md` for the concrete web before-state, restoration payloads and unresolved sender packet.

Cleanup verification: the owned browser is closed and absent from the browser list. Ports 3002, 3003 and 8794 are closed, with foreign browsers preserved. `cleanup.json` records the result. Raw evidence is retained until owner acceptance.

## Final production-module regressions

The compiled analytics client is explicitly imported before changing the build mapping. The browser reports `ReferenceError: process is not defined`; `intermediate/analytics-before.json` records it. Astro's Vite define allowlist now compiles only the two reviewed public recording/heatmap values from the same owner used for loader selection. No complete environment object or Node shim is exposed.

The first successful bootstrap then reproduces a separate ready-state event defect: Page View and Referral Source Identified reach the SDK stub, but a later Contact Form Submitted Successfully event remains queued. `intermediate/analytics-ready-events-before.json` records it. The instrumentation handler now flushes the queue when its client is ready, while retaining deferred startup for earlier events.

`final/analytics-after.json` verifies three fresh native documents, one SDK initialisation and one Page View each, disabled recording/heatmaps, and exactly one contact-outcome event. The contact case fills the actual six-field UI and submits through the local injected-provider Worker with the official test challenge. Budget selection, submit attempt and successful submission each produce one event. Raw name, email, phone, company and message are not sent to the SDK; Mixpanel network endpoints are blocked and no request is attempted. This checks production-compiled modules without mutating the live analytics project. The final standard lint/type/build/43 Node sequence and local/hosted 19-case HTTP checks pass after these fixes. The latest 16 hosted page/viewport checks have zero page errors, overflow or applicable axe violations.

Final source hygiene removes only spaces on blank lines and inserts required function separation. The earlier format-only rebuild proves every public output byte unchanged (`format-byte-comparison.json` and `spacing-byte-comparison.json`). Later analytics changes intentionally update browser script fingerprints. The editor startup regex initially fails the observed Astro 7 Local line; it now captures the exact URL from both plain and JSON log forms (`editor-ready.json`). A temporary Wrangler startup fails because its default inspector port is occupied; the owned verification uses the same lifecycle command with a positively free `--inspector-port 9464`. No foreign runtime is stopped. The physical web port remains 8794.


## Approved release: portable fixture recovery

The owner authorises all remaining release operations on 13 October 2026. Initial exact-revision production build `32d0568c-92e3-4deb-9d20-9693811a392d` and preview build `0e5fb71f-f44d-4b79-9974-d54c2cc62cdb` fetch `ec929d248e05117eff70da1d2fad87bdfb223e63`, install Node 22.17.0 with locked npm, and pass lint/check/build. All 43 substantive Node cases pass; the suite fails only in the after-hook because Linux lacks the macOS `trash` CLI. Neither build deploys.

- Reproduce: run the absolute Node executable with `PATH=/nonexistent`, `--import tsx --test test/indexnow.test.mjs`, from the project root. Expected: the 11 notifier cases pass without requiring an external cleanup binary. Before: all 11 cases pass, then the cleanup hook fails `null !== 0` (exit 1). After: all 11 pass, no failed hook (exit 0).
- Change: recoverably rename the task-created temporary fixture directory to its `-retained` sibling using Node’s filesystem API. No files are permanently deleted; no product assertion is removed, narrowed or skipped. Keep cleanup portable when a check runs in Workers Builds.
- Raw output: `.artifacts/astro_cloudflare_workers_migration/release/fixture-portability-before.log`, `fixture-portability-after.log`, and both `*-build-log.json` files. The original production build IDs above preserve the independent Linux reproduction.
- Sender domain is now verified. Four sender records are added; all 22 original records remain identical. Only `embeddings.au` is appended to the shared widget; settings and previous host membership are verified unchanged. Runtime secrets are separate and never retained in output.
