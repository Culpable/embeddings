# Astro and Cloudflare Workers migration plan

**Plan status:** Ready for implementation. The blindspot pass is complete and owner choices are integrated: Cloudflare/Resend contact delivery to `solutions@embeddings.au`, Turnstile with an email-link fallback, trailing-slash URLs with redirects from old URLs, and sibling-style Markdown responses. This planning task does not itself authorise migration implementation or external writes.

**Implementation status:** Not started. All steps below are pending.

**Planning validation:** Required sections, step criteria, local reference paths and template hygiene pass. The current Next.js lint, Node tests and static build pass. These results establish the existing-site baseline; they do not establish Astro, browser-parity or Cloudflare deployment acceptance.

<critical_warning>
> **Cutover order:** Prove the Astro build and isolated Cloudflare preview first. Move both IPv4 and IPv6 web traffic, verify the canonical production site, retire GitHub Pages, then make `Culpable/embeddings` private. Making the repository private before cutover can remove the existing GitHub Pages site. Preserve a usable rollback until Cloudflare acceptance passes.
</critical_warning>

## 1. Goal

### 1.1 End goal

Move the existing Embeddings website to a maintainable hosting and publishing setup while visitors retain its content, design, animations, navigation and enquiry flow. The public website remains available at `https://embeddings.au`; its source repository becomes private after successful cutover.

The owner requests a comprehensive plan to “get the current site onto both Astro and Cloudflare Workers” and states: “After cutover, we should move from public to private.” This means GitHub repository privacy, not access restrictions on the marketing website.

### 1.2 Chosen approach and deliverable

Astro and Cloudflare Workers are the owner’s selected technologies. Cloudflare Pages is not the selected destination. The owner names Bulma root, FinTrace root, Tax Genie root and “Shopper root” as baselines. The last name is interpreted as Shoppa root at `/Users/sacino/shoppa-root`, consistent with the workspace project register.

This deliverable is a project-local implementation plan plus a blindspot pass. Implementation must directly follow [build-astro-websites](/Users/sacino/.agents/skills/build-astro-websites/SKILL.md), including its [Cloudflare Workers Builds reference](/Users/sacino/.agents/skills/build-astro-websites/references/cloudflare-workers-builds-github.md). Re-read the installed skill and applicable project instructions when execution begins. Project rules and the owner’s choices take precedence.

### 1.3 What would not count as success

- A framework conversion that changes the current broad AI consulting positioning, redesigns pages or simplifies protected animations.
- A working Astro development server without proof from built output and the Cloudflare runtime.
- A Cloudflare Pages deployment, a second production deployment controller, or an entire hydrated React application inside Astro.
- A contact form that looks correct but changes its six fields, loses native submission when Turnstile is available, lacks the selected email fallback when browser scripts are unavailable, or reports success after a rejected request.
- An apex cutover that leaves GitHub Pages IPv6 records behind or leaves `www` unable to complete HTTPS.
- Making the marketing site private, assuming repository privacy removes public forks or previously downloaded source, or assuming old public builds become private automatically.

### 1.4 Done means

1. Every retained route, discovery file and asset works from the production Astro build and the authorised Cloudflare release.
2. The real interface preserves current content, responsive appearance, animation sequences and interactive states at the project’s desktop and mobile viewports.
3. The business enquiry flow preserves its six-field contract, truthful feedback and keyboard flow; Resend delivers to the selected inbox after validated Turnstile, native submissions redirect correctly, and blocked scripts expose the email fallback.
4. Page URLs, redirects, metadata, structured data, sitemap and crawler guidance follow one selected policy, without preview-host leakage.
5. Workers Builds deploys the intended production branch and isolates preview versions; a failed check cannot publish a release.
6. DNS, HTTPS, response headers and caches behave correctly on both web hosts; mail and other unrelated services retain their existing records.
7. Rollback instructions name a preserved artefact or Worker version and the exact recorded state to restore.
8. GitHub Pages and its publishing workflow are retired, the repository is private, and an authenticated rebuild from the private repository succeeds while the public website remains available.
9. Project instructions and architecture documentation describe the final system, and one final acceptance record distinguishes verified results from unavailable evidence.

## 2. Current state analysis

### 2.1 Application and publishing path

The runnable application is at `/Users/sacino/embeddings`, using Next.js App Router with a static export, React and Tailwind CSS 3. The package manager is npm, with `package-lock.json`. `.nvmrc`, package engines and `scripts/check-node-version.mjs` enforce Node.js `22.17.0`. A separate Node upgrade plan exists at `documents/todo/node_22_23_1_upgrade_plan.md`; its proposed version is not the current runtime authority.

`npm run dev` serves port `3002`. `scripts/build-static-site.mjs` generates discovery files and responsive process images, builds Next.js into `out/`, validates the export, and checks delivered-output limits. `.github/workflows/deploy.yml` runs lint, tests and build on a push to `main`, then publishes `out/` to `gh-pages` with `peaceiris/actions-gh-pages`. The package’s manual `deploy` command can also publish to GitHub Pages.

GitHub API inspection confirms `Culpable/embeddings` is public, `main` is its default branch, and Pages publishes from `gh-pages` at `/`, with `embeddings.au` as its custom domain. The inspected starting revision is `53c0c03afb5e84e28a888bb78d41878a61ced3d5`. Other task changes appeared during planning, including test and documentation maintenance. Re-inventory the worktree and index at execution start; do not treat this revision as a frozen source snapshot or include other task changes in migration commits.

### 2.2 Routes and execution boundaries

| Route or surface | Current purpose | Current execution | Proposed destination |
| --- | --- | --- | --- |
| `/` | AI consulting offer, assistant visual, capabilities, e-commerce specialism, engagement stages, CTA | Static HTML plus browser enhancements | `src/pages/index.astro` |
| `/about` | Implementation-first company story and expertise | Static HTML | `src/pages/about.astro` |
| `/process` | Discover, Build, Deploy, Operate, with responsive imagery | Static HTML | `src/pages/process.astro` |
| `/contact` | Business enquiry form and office details | Static HTML plus form state | `src/pages/contact.astro` |
| `/privacy` | Marketing-site and enquiry privacy notice | Static HTML | `src/pages/privacy.astro` |
| `/thank-you` | Native form confirmation and onward links | Static HTML, noindex | `src/pages/thank-you.astro` |
| `/test-mixpanel` | Existing analytics debug utility | Static HTML plus debug interaction, noindex | `src/pages/test-mixpanel.astro`; retain its current visibility unless separately changed |
| Unknown paths and `404.html` | Real not-found status and recovery links | Static error document | `src/pages/404.astro` |
| `/robots.txt`, `/sitemap.xml`, `/llms.txt` | Crawler policy and public discovery | Generated at build time | One build-time owner per file |
| Header menu | Open/close, focus containment, Escape, current route, scroll locking | React state and events | Static markup plus a focused TypeScript controller |
| Contact delivery | Formspree `https://formspree.io/f/xrbgdgwq` | External POST | Replace with `/api/contact/` in the Cloudflare Worker, delivering through Resend under D-1 |
| Analytics | Deferred Mixpanel, referral attribution, enquiry events | Browser modules | Preserve through a guarded Astro browser entry |
| HTML/Markdown selection | No current selector | Unavailable on plain GitHub Pages | Selected narrow Worker selector under D-3 |

No database, authenticated product, API application or CMS belongs to this migration. Disabled blog/work pages are reference material, not new public routes.

### 2.3 Content, appearance and interaction authority

- `documents/site-positioning.md` owns the broad, implementation-first AI consulting positioning. E-commerce is one specialism. Shoppa remains a separate product, mentioned only through the homepage Shoppa card.
- Preserve the homepage anchors `#services`, `#ecommerce` and `#how-we-work`, and the process stage anchors. Preserve the minimal header: logo, Contact us and menu trigger. Main navigation and footer labels remain lowercase.
- The contact fields remain `name`, `email`, `company`, `phone`, `message` and `budget`, with the existing required-field rules and submitted budget values. The current Formspree transport fields are `_subject`, `_next` and empty `_gotcha`; `_subject` and `_next` retire with that provider, while `_gotcha` remains the hidden spam trap. The current native confirmation URL is `https://embeddings.au/thank-you`; the selected replacement is `/thank-you/`.
- Preserve the exact contact intro, metadata description, office panel copy and intentionally empty trailing `Border` placeholder required by `AGENTS.md`.
- `HeroAssistantConversation.jsx` and `AgentConversationShowcase.jsx` use CSS animation sequences. Port their markup mechanically; preserve staggered reveal, edit caret, publish/live crossfade, keyframes, durations and visual geometry. Do not replace them with a different animation design.
- Keep unrendered protected animation components and disabled pages unchanged and outside the active build. `documents/service-section-animations.md` explains that its catalogue timeline is currently unrendered; it is not a source for new homepage content.
- Current typography uses self-hosted Mona Sans body/display WOFF2 files, `swap`, a calibrated fallback and the display width axis. Keep those facts and their loading behaviour.
- Preserve current imagery, intrinsic sizes, process `picture` selection, SVG framing, icon appearance and social-image selection from the execution baseline. Do not invent new claims, testimonials, physical addresses or product pricing.

### 2.4 Verified hosting and DNS baseline

The Cloudflare zone is active, uses Cloudflare nameservers, and belongs to the same account as the sibling Workers. There is no Embeddings Worker or attached Embeddings Worker custom domain in the inspected account.

| Resource | Verified value |
| --- | --- |
| Account | `213ab3604485056376263d22fa242742` |
| Zone | `embeddings.au` |
| Zone ID | `9148c362fcb1400590f7a5eb923f75fc` |
| Nameservers | `vita.ns.cloudflare.com`, `will.ns.cloudflare.com` |
| Account compute subscription | Workers Paid; do not purchase or change a plan as part of this migration |
| Apex web DNS | Four unproxied A records and four unproxied AAAA records for GitHub Pages |
| `www` web DNS | Unproxied CNAME to `embeddings.au` |
| Zone settings | `always_use_https: off`, `ssl: flexible`, `min_tls_version: 1.0`, `browser_cache_ttl: 14400` |
| Proposed names, subject to collision recheck | `embeddings` and `embeddings-preview` |

The A contents are `185.199.108.153`, `.109.153`, `.110.153` and `.111.153`. The AAAA contents are `2606:50c0:8000::153`, `8001::153`, `8002::153` and `8003::153`. There are also Microsoft mail, identity and service records. Those records are outside the web migration.

This is an inventory, not the rollback snapshot. Immediately before every authorised DNS or custom-domain write, save the complete live state of all affected records, including IDs, type, name, content, TTL, proxy flags, settings, priority where applicable, comments, tags and metadata, in the hosting document. Record rules and zone settings before changing them. Never copy a sibling’s DNS IDs or rollback payloads.

Direct HTTPS reads confirm `/about` and `/contact` return 200, while their slash variants return 404. A verified read of `https://www.embeddings.au/about?migration=check` fails certificate validation because the certificate does not cover that host. This is a cutover acceptance failure to resolve, not permission to bypass TLS verification.

### 2.5 Sibling baseline and limits on reuse

| Repository | Observed architecture | Useful baseline | Do not copy blindly |
| --- | --- | --- | --- |
| `/Users/sacino/bulma-root/site` | Astro static, Tailwind 4, plain TypeScript browser modules, Formspree, negotiated Markdown | One guarded browser entry, navigation lifecycle, Worker preview separation | Product copy, dark-only design, fonts, Tailwind major, `site/` nesting, historical migration tooling |
| `/Users/sacino/fintrace-root/site` | Astro static, route CSS, Formspree, anonymous Mixpanel, negotiated Markdown | Deferred analytics, truthful 404, hosting rollback, separate build triggers | FinTrace typography, WebGL, business claims, `site/` nesting |
| `/Users/sacino/taxgenie-root` | Root Astro static with a narrow contact endpoint, Cloudflare adapter, Resend/Turnstile, negotiated Markdown | Root project layout; selected contact runtime and generated deployment configuration pattern | Tax Genie’s field model, sender, credentials, product mail records or recipient |
| `/Users/sacino/shoppa-root` | Root Astro static, plain browser code, negotiated Markdown | Root layout, inline CSS with external scripts, simple Worker and header policy | Shoppa branding/copy, absence of enquiry delivery, historical helper/report files |

All four source repositories are private and use Workers Builds for production, with separate preview Workers. Current package manifests show Astro 7 and Wrangler 4. npm registry inspection reports stable Astro `7.3.8` requiring Node `>=22.12.0`, and Wrangler `4.149.0` requiring Node `>=22.0.0`. These are research observations, not permanent version pins; confirm compatible stable versions at execution and lock them then.

Primary local reuse paths include each sibling’s `astro.config.mjs`, `wrangler.jsonc`, base layout, `src/worker.ts`, `src/lib/agent-readable-http/`, header owner, and `scripts/run-http-contract.mjs`. Prefer current skill assets for portable code and use sibling code to identify proven adaptations. Do not create a cross-repository shared package.

## 3. Desired state

### 3.1 Requirements

- **REQ-1 (MUST):** Preserve the current website’s content, page structure, visual design and animations under the authorities in section 2.3. Framework syntax changes do not authorise a redesign.
- **REQ-2 (MUST):** Prerender every retained document in Astro with `output: 'static'`, canonical `site: 'https://embeddings.au'` and no `base` subpath. Ordinary navigation uses anchors and document loads.
- **REQ-3 (MUST):** Preserve the existing six-field enquiry and feedback contracts and manual submission boundary. Replace Formspree with `/api/contact/` and Resend delivery to `solutions@embeddings.au` under D-1/D-10. Require production Turnstile validation under D-11. Native submission works without the project’s enhancement code when Turnstile runs; with all JavaScript disabled or the challenge blocked, the visitor uses the visible mailto fallback. Contact and confirmation documents remain static.
- **REQ-4 (MUST):** Prefer trailing-slash document URLs and redirect the old no-slash URLs to them, as the owner selects in D-2. Apply this policy to built paths, links, form confirmation, canonicals, JSON-LD, sitemap and discovery. Fixed machine files retain their extension-based URLs without a final slash.
- **REQ-5 (MUST):** Render one metadata system, meaningful initial HTML and truthful structured data; preserve current public title/description values unless an explicitly selected URL change requires a path update.
- **REQ-6 (MUST):** Retain deliberate search/retrieval versus training crawler policy, public discovery and noindex utility routes. Preview URLs and generated private paths never enter discovery.
- **REQ-7 (MUST):** Under D-3, use only a prebuilt representation selector with cache-safe negotiation and private-path blocking. No primary document is server-rendered.
- **REQ-8 (MUST):** Use Workers Builds as the sole new production release controller, with separate production and preview Worker identities, branch filters and target checks.
- **REQ-9 (MUST):** Verify response headers and caching through Wrangler and the authorised hosted deployment, including browser execution under the Content Security Policy.
- **REQ-10 (MUST):** Cut over apex IPv4/IPv6 and `www` safely, with valid HTTPS, canonical redirects, complete recorded before-state and unchanged unrelated DNS.
- **REQ-11 (MUST):** Preserve working rollback before retirement, and use a prior Worker version after GitHub Pages becomes unavailable.
- **REQ-12 (MUST):** Make `Culpable/embeddings` private only after cutover acceptance; prove private-repository build access and continued public website access.
- **REQ-13 (MUST):** Keep npm, the current Node pin and Tailwind major unless a verified compatibility requirement or separate owner instruction changes them. Keep existing checks meaningful during migration.
- **REQ-14 (MUST):** Update local architecture and operating instructions, keep the plan’s step statuses current during implementation, and write the final acceptance evidence after the checks finish.
- **REQ-15 (MUST NOT):** Introduce a database, sessions, CMS, Starlight, client router, new tracking provider or unrelated product features. Do not add reduced-motion conditions or animation setup gates.

### 3.2 Defaults and fallbacks

- D-1 B, D-2 B and D-3 A are owner-selected. Use `trailingSlash: 'always'`, `build.format: 'directory'` and Workers `assets.html_handling: 'force-trailing-slash'`. Redirect `/about`, `/process`, `/contact`, `/privacy`, `/thank-you` and `/test-mixpanel` to their slash equivalents, retaining query strings and browser fragments. The native contact confirmation becomes `/thank-you/`.
- Use Astro components, existing Tailwind utilities and native browser controls. A processed TypeScript module owns each required interaction; one guarded entry imports or lazily loads those modules. Add a React island only if a concrete parity requirement cannot be met this way, with its cost and boundary recorded before installation.
- Keep useful content and navigation in initial HTML. With JavaScript unavailable, footer links still provide route discovery and the visible email link provides contact. Native form POST remains available when Turnstile runs but the project enhancement does not. Only enable custom `novalidate` after the enhancing script has mounted.
- If an optional analytics dependency fails, navigation and enquiries remain usable. If a contact request fails, retain the input and show the existing recovery/error state rather than a success message.
- If a generated Markdown representation cannot be fetched, use the selector’s explicit HTML fallback with the source status; direct private-path access remains denied. Emergency removal of representation selection keeps the selected contact runtime; restoring an earlier reviewed Worker version is the preferred recovery.

### 3.3 Contact endpoint and mail contract

The native form posts to `/api/contact/`. The Worker routes that endpoint to the Astro Cloudflare handler before any document negotiation. Accept only POST; unsupported methods return 405 with `Allow: POST`. Accept normal form bodies, enforce a 64 KiB streaming body limit even without `Content-Length`, reject malformed encoding, and validate all six required fields on the server. Use limits of 120 characters for name, 254 for email, 160 for company, 40 for phone and 4,000 for message; budget is one of the current submitted strings `100`, `500`, `1000` or `1500`. Match client length guidance to this schema and preserve ordinary phone punctuation rather than adding a country-specific phone rule. These proposed implementation bounds follow the sibling handler’s bounded-input pattern; they are not claims about current Formspree limits.

Preserve empty `_gotcha` as a honeypot. Reject filled honeypots without sending mail. Accept only the business fields plus the documented transport controls, including `cf-turnstile-response` and optional `submissionId`. Validate a supplied identifier as a bounded UUID; its absence must not disable native submission. Reject foreign origins and malformed/untrusted origin values before provider calls; allow local/preview origins only through their trusted deployment configuration, never client-supplied hostname settings. Production siteverify must succeed and return the expected `contact` action and exact `embeddings.au` hostname. Expired, reused, missing or invalid tokens require a fresh challenge and must not send mail. Preview/test handling is selected by a trusted deployment variable, never by form input.

Use `Embeddings <contact@notifications.embeddings.au>` as the verified sender and `solutions@embeddings.au` as the destination; the visitor’s validated email is Reply-To. Deliver a plain-text enquiry containing the six submitted fields and current budget meaning. Add no submission database or automatic customer receipt. Keep the Resend key and challenge secret only in Worker runtime secrets. The public Turnstile site key is a build value, and the sender is non-secret server configuration. Provision and verify the Embeddings sending subdomain before live use, after recording DNS before-state; do not alter the existing Microsoft inbound-mail records or reuse another brand’s sender. Check the existing account’s domain capacity before provisioning; a paid upgrade is not assumed or authorised.

For enhanced requests using `Accept: application/json`, accepted delivery returns 200 with `{ ok: true }`; only then show the existing inline success state. Invalid fields/challenge/origin return a stable 422 JSON error with connected field guidance. Oversized requests return 413; provider timeout/failure returns a safe 503 error, retaining visitor input. Bound each provider call with an eight-second abort deadline and do not add automatic delivery retries. Native successful submissions return 303 to static `/thank-you/`; native failures return 303 to `/contact/?error=delivery` or another documented stable error code so the static page can show recovery through its enhancement and the always-visible email alternative. Never put contact content, email, phone or challenge tokens in the URL. All contact responses use `Cache-Control: no-store` and carry the appropriate security headers.

The form enhancement gives each new enquiry a cryptographically generated identifier and retains it for a retry of the same normalised content. Derive Resend’s idempotency key from that identifier plus a non-reversible digest of the normalised mail payload; exclude challenge tokens from the digest. A retry reuses that key and obtains a fresh Turnstile token. New content/new enquiry gets a new key. For native requests without an identifier, the server generates a request identifier; native resubmission cannot claim cross-request deduplication. Resend currently retains keys for 24 hours and permits at most 256 characters; enforce those limits and recheck them before implementation. Do not claim indefinite or exactly-once delivery. For an uncertain provider result, show that delivery could not be confirmed rather than claiming rejection or success. Logs contain only a request ID, serving version, safe outcome code and duration, with no input, token or payload digest; provider acceptance is distinct from verified mailbox delivery.

Turnstile is the only new browser provider script. Load its literal provider URL only on contact, allow its documented CSP origins and keep status/focus behaviour intact. With the project enhancement blocked but Turnstile available, native POST and 303 remain usable. With Turnstile or all scripts blocked, the form must not bypass the server check: display the visible email link and concise fallback guidance. Keep the protected contact intro and office panel unchanged.

## 4. Additional context

### 4.1 Scope and authority

This task produces a plan. It does not connect repositories, create Workers, upload previews, deploy, push, change DNS, submit search notifications or change repository visibility now. Later execution must resolve authority for each exact external target. The owner has selected private repository visibility after cutover; do not reopen that outcome as a design choice.

Use the existing checkout. Do not create a worktree or change branches without explicit consent. Preserve other tasks’ worktree and staged changes and apply the project’s whole-file ownership rule for commits. Remove obsolete task-owned files through recoverable Trash. Never delete or recreate `gh-pages`, rewrite Git history or make the repository public again as an automatic rollback.

### 4.2 Decision record

#### D-1: Contact delivery

- **Context:** The current form and two siblings use Formspree; Tax Genie proves a different mail boundary.
- **Options:** (a) keep Formspree; (b) replace it with a Cloudflare contact handler and Resend.
- **Decision:** (b), owner; departed from the recommendation; no further reason given.
- **Why:** The owner selects the Cloudflare-and-Resend contact architecture.
- **Why not (a):** Would retain the service the owner chooses to replace.
- **Assumptions:** Preserve all six business fields and feedback states. Follow Tax Genie’s adapter-generated Worker pattern, not its field model or private credentials.
- **Reconsider when:** A verified incompatibility prevents the selected handler; resolve it with the owner rather than restoring Formspree silently.

#### D-2: Page URL policy

- **Context:** Embeddings uses slashless document URLs; all four siblings use a final slash.
- **Options:** (a) retain slashless URLs and redirect slash variants; (b) adopt slash URLs and redirect old addresses.
- **Decision:** (b), owner; departed from the recommendation; the owner specifies “2 + add redirects from no-slash to slash”.
- **Why:** Match the sibling Astro URL convention while preserving access through existing links.
- **Why not (a):** Does not match the owner-selected URL policy.
- **Assumptions:** Use Astro directory output and forced trailing-slash handling; verify actual HTTP redirects, query preservation and browser fragment navigation.
- **Reconsider when:** The owner changes the preferred URL convention; existing-link redirects remain a compatibility requirement.

#### D-3: Markdown responses for AI readers

- **Context:** All four siblings select HTML or generated Markdown at one address; Embeddings currently has only HTML and fixed discovery files.
- **Options:** (a) adopt the repository-owned selector; (b) serve assets-only HTML and discovery files.
- **Decision:** (a), owner; followed the recommendation; no further reason given.
- **Why:** Follow the named sibling baseline using an existing narrow, documented capability.
- **Why not (b):** Omits same-URL Markdown and Markdown recovery at the original missing URL.
- **Assumptions:** Every document request, including HTML, executes the Worker. Fixed assets bypass it. The verified Workers Paid subscription is reused, not changed; request/CPU usage still applies.
- **Reconsider when:** The owner changes representation scope or measured deployment constraints invalidate the selector. An assets-only fallback cannot remove the independently selected contact runtime.

#### D-4: Project location and package manager

- **Context:** Two sibling applications use `site/`; two use the repository root. Embeddings has one root application and npm authority.
- **Options:** (a) migrate in the root with npm; (b) add a permanent `site/` application; (c) migrate to pnpm.
- **Decision:** (a), plan writer; no departure from recommendation.
- **Why:** Preserve checkout, command and dependency ownership without adding a lasting second app.
- **Why not (b), (c):** Adds package/path migration unrelated to hosting or introduces a second package-manager change.
- **Reconsider when:** The owner requests a monorepo boundary or package-manager migration.

#### D-5: Browser architecture and visual parity

- **Context:** Most current content and protected visuals are static or CSS-driven; menu and form state need browser code.
- **Options:** (a) Astro markup and focused TypeScript controllers; (b) React islands; (c) one React application shell.
- **Decision:** (a), plan writer; no departure from recommendation.
- **Why:** Follow the sibling architecture while preserving the named interactions and animation design.
- **Why not (b), (c):** Hydration is not required by the inspected flows; a whole application shell adds avoidable runtime and coordination.
- **Reconsider when:** A concrete interaction cannot preserve parity through native markup and a processed script. Protected animation behaviour remains binding under either approach.

#### D-6: Release and preview controller

- **Context:** Current GitHub Actions publishes Pages; all four siblings use Workers Builds with isolated preview identities.
- **Options:** (a) Workers Builds with separate production/preview targets; (b) deploy Workers from GitHub Actions.
- **Decision:** (a), plan writer; no departure from recommendation.
- **Why:** Reuse the requested proven baseline and eliminate competing release controllers.
- **Why not (b):** Duplicates account credentials and release ownership without an observed requirement.
- **Reconsider when:** A verified Git integration limitation prevents private-repository builds.

#### D-7: Styling and asset delivery

- **Context:** Embeddings already has Tailwind 3, calibrated Mona Sans fonts, responsive process images and CSS animation ownership.
- **Options:** (a) retain styling/font owners and asset appearance; (b) upgrade Tailwind and replace font/visual delivery wholesale.
- **Decision:** (a), plan writer; no departure from recommendation.
- **Why:** Reduce parity risk. Use small route CSS inline, with external processed scripts, following the compatible Shoppa/Tax Genie pattern.
- **Why not (b):** Adds reset, utility, metric and animation changes without serving the requested migration.
- **Assumptions:** Explicit `vite.build.assetsInlineLimit: 0` and `build.inlineStylesheets: 'always'` are coupled; retain manual font faces unless a justified Font API migration preserves the exact required metrics and files.
- **Reconsider when:** Measured output or a compatible Astro requirement makes the retained approach fail a documented outcome.

#### D-8: Repository privacy and retirement

- **Context:** The owner explicitly requests privacy after cutover, and the old site depends on GitHub Pages.
- **Options:** (a) verify Cloudflare, retire Pages, then privatise; (b) privatise first; (c) retain a public repository.
- **Decision:** (a), owner’s chosen outcome with plan-writer sequencing; no departure from recommendation.
- **Why:** Keep the public site available and prove the private build path.
- **Why not (b), (c):** Risks premature loss of the current site or contradicts the owner’s instruction.
- **Reconsider when:** Cutover acceptance fails; retain the public source and old host until recovery succeeds, without changing the intended final visibility.

#### D-9: Search notifications and irreversible HTTPS policy

- **Context:** Siblings include IndexNow release notifications and defer HSTS. Hosting gains a header policy; URL/content changes must not notify from previews.
- **Options:** (a) prepare the sibling notification pattern, activate only after canonical cutover, and leave HSTS absent; (b) notify during pre-cutover builds; (c) add HSTS during migration.
- **Decision:** (a), plan writer; no departure from recommendation.
- **Why:** Notify only actually published canonical changes and preserve a reversible HTTPS cutover.
- **Why not (b), (c):** Reports an unpublished origin or adds a persistent browser policy outside the authorised need.
- **Assumptions:** No notification on a pure unchanged release. Any initial migration batch is explicitly identified and submitted only under external-release authority.
- **Reconsider when:** The owner separately authorises HSTS after an audit of affected hosts, or selects a different search-notification scope.

#### D-10: Destination inbox

- **Context:** The public business address is visible, but the frontend does not reveal the current Formspree destination.
- **Options:** (a) deliver to published `solutions@embeddings.au`; (b) use a different owner-supplied inbox.
- **Decision:** (a), owner; followed the recommendation; no further reason given.
- **Why:** The owner selects the published business inbox as the new recipient.
- **Why not (b):** No alternate inbox is requested.
- **Reconsider when:** The owner changes enquiry routing. Actual mailbox delivery remains an implementation gate, not an assumed fact.

#### D-11: Turnstile and script-unavailable fallback

- **Context:** The chosen sibling mail pattern verifies a browser-generated challenge token, which is unavailable when its script cannot run.
- **Options:** (a) require Turnstile and offer an email-link fallback; (b) use server checks/throttling alone and support form delivery with all JavaScript disabled.
- **Decision:** (a), owner; followed the recommendation; no further reason given.
- **Why:** The owner selects Tax Genie’s bot-check baseline and accepts the email fallback.
- **Why not (b):** Does not provide the selected challenge boundary.
- **Assumptions:** Reuse the managed `Genie sites contact form` widget after authorised hostname configuration; preview uses official test keys with separate secret scope and no production delivery.
- **Reconsider when:** Widget compatibility or measured visitor failures prevent the selected flow. Do not silently drop the challenge.

#### D-12: Contact implementation boundaries

- **Context:** The new handler must bound input, preserve inline feedback and make retry safe without storing enquiries.
- **Options:** (a) bounded form schema, native 303 plus enhanced JSON, and provider idempotency; (b) unbounded input or redirect-only feedback; (c) add submission storage.
- **Decision:** (a), plan writer; no departure from recommendation.
- **Why:** Preserve the existing UI states and protect the new external-delivery boundary with the smallest system.
- **Why not (b), (c):** Misses safe input/feedback requirements or adds a data-retention system outside the task.
- **Assumptions:** Section 3.3 owns proposed length limits, response codes and retry behaviour; test those before implementation.
- **Reconsider when:** Existing real enquiry evidence needs a larger message limit or current Resend constraints require a different safe retry key.

### 4.3 Blindspot pass findings and dependency map

| Finding | Evidence | Consequence incorporated in the draft |
| --- | --- | --- |
| Native form and backend migration are separate | Current Formspree action; sibling handler differences | D-1 must precede any adapter, secret or contact endpoint choice |
| Current slash variants are not compatible | Direct `/about/` and `/contact/` requests return 404 | D-2 controls canonical and hosting behaviour together |
| Markdown adds compute to ordinary page delivery | Sibling `run_worker_first` and selector code; Cloudflare billing documentation | D-3 selects the runtime, quota boundary and cache evidence |
| IPv6 can keep traffic on the old host | Four live apex AAAA records | Snapshot and replace both address families |
| `www` HTTPS fails today | Certificate validation failure on the exact `www` request | Valid `www` certificate and apex redirect are explicit cutover gates |
| A premature main push can run the old publisher | Current workflow calls root build and publishes `out/` | Disable Pages publishing before the first pushed migration change that repoints root commands |
| An early IndexNow wrapper verifies the old origin | Apex continues to serve GitHub Pages until DNS cutover | Pre-cutover release uses a non-notifying deploy; switch the production trigger only after canonical proof |
| Bundled notification code assumes pnpm and directory-style pages | Skill notifier invokes `pnpm` and maps slash paths to `index.html` | Adapt the launcher/recovery commands to npm; preserve the now-selected directory mapping and use the adapter-generated deploy configuration |
| Preview upload can target the wrong Worker | FinTrace hosting guide records an earlier sibling trigger/tag defect | Two triggers bind to their own Worker identities; preview never uses the production script tag |
| Source privacy is independent of website privacy | Private sibling repositories with public sites; GitHub visibility documentation | Check GitHub App access, public site reachability and private rebuild separately |
| Current tests contain framework-specific assumptions | Node tests and evolving local test maintenance | Re-inventory before migration; preserve meaningful outcomes rather than re-pin JSX or private Next.js file shapes |
| Current instruction files still describe Next.js/Pages | Root `AGENTS.md` and README | Explicit documentation step replaces obsolete technology statements without weakening product rules |

D-1 to D-3 and the resulting D-10/D-11 frontier are resolved and integrated. Read-only inspection finds no verified Embeddings sender in the accessible Resend account, so the plan provisions and verifies an Embeddings-owned sending subdomain instead of borrowing Tax Genie’s identity. The existing managed widget has spare capacity but lacks `embeddings.au`; its approved future hostname addition is explicit. Cold-read checks of both question rounds report no blocking ambiguity after separating planning choices from future delivery/configuration proof. A final scan finds no remaining owner decision: sender/domain availability, certificate readiness, private Git access and actual mailbox delivery are named implementation verification gates. The BSP is complete; no implementation or external mutation has occurred.

### 4.4 Required references for implementation

Use the skill entrypoint in section 1.2 and read each triggered reference before its governed implementation. The selected branches are project structure; components/styles; site configuration; metadata and structured data/trust; accessibility; agent readiness and selected HTTP representation; sitemap; robots; llms; contact form; fonts; images; third-party scripts; security headers; performance/caching; and IndexNow when a changed canonical publication is notified.

Use [good-css](/Users/sacino/.agents/skills/good-css/SKILL.md) for delivery and rendered parity. Use [dev-browser](/Users/sacino/.agents/skills/dev-browser/SKILL.md) for browser acceptance. Worker implementation also follows [workers-best-practices](/Users/sacino/.agents/skills/workers-best-practices/SKILL.md) and [wrangler](/Users/sacino/.agents/skills/wrangler/SKILL.md), within the narrower static-site contract. Their generic Node compatibility, observability, framework and test-runner advice does not justify extra features in this site.

Current official references support the selected architecture and must be rechecked for version-sensitive work:

- [Astro on Cloudflare](https://docs.astro.build/en/guides/deploy/cloudflare/): static deployments need no Astro adapter; on-demand endpoints do.
- [Workers Builds configuration](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/) and [GitHub integration](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/github-integration/): connected builds, command authority and repository access.
- [Static Assets HTML handling](https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/): slashless versus slash document delivery.
- [Static Assets headers](https://developers.cloudflare.com/workers/static-assets/headers/): header owner and runtime verification.
- [Static Assets billing](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/): direct asset requests versus Worker execution; `run_worker_first` has no free-tier quota fallback.
- [Worker custom domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/): DNS/certificate creation and existing-CNAME constraints.
- [GitHub repository visibility](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility): Pages availability can change, and public forks remain public.
- [IndexNow protocol](https://www.indexnow.org/documentation): ownership proof and acceptance distinct from indexing.
- [Resend subdomain guidance](https://resend.com/docs/knowledge-base/is-it-better-to-send-emails-from-a-subdomain-or-the-root-domain), [sending API](https://resend.com/docs/api-reference/emails/send-email) and [idempotency keys](https://resend.com/docs/dashboard/emails/idempotency-keys): verified sender identity, delivery acceptance and safe retry constraints.
- [Turnstile widget](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/) and [server-side validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/): browser token creation, mandatory validation, expiry and replay rejection.

## 5. Implementation plan

### Step 1: Resolve the draft and preserve the execution baseline

**Objective:** Start from current evidence, accepted choices and a recoverable old release.

**Approach:** Preserve the selected decisions and recheck the implementation gates without reopening settled preferences. Read current root/nested instructions, package/lock files, all staged/unstaged changes, route owners and sibling references. Record the current source revision, Pages build/revision, publishing settings and exact current deployment workflow. Keep a copy of the existing static export in ignored task output before any migration build can replace it. Capture source-rendered desktop/mobile views and observable navigation/form/animation states.

**Success Criteria:**

- The decision frontier is empty and this plan records accepted options or explicit approved assumptions.
- An independently identified current Pages artefact and reconstruction command are available before the publishing path changes.
- The baseline distinguishes current local content from hosted content and identifies all out-of-scope collaborative changes.
- Baseline evidence exists for the scenarios in section 6; raw output is ignored, not in project documents.

### Step 2: Define migration checks before changing their protected behaviour

**Objective:** Preserve meaningful coverage across the framework change.

**Approach:** Inventory the actual retained `test/*.test.mjs` suite and `scripts/validate-static-export.mjs` after other maintenance settles. Prepare updates to generated-route, metadata, discovery, native form and delivered-output checks before replacing the corresponding owners. Use independent requirements and actual emitted HTML, not new Astro syntax, as expectations. Add isolated cases only under the exceptions in section 6.2, before editing the corresponding contact/selector/notifier/metadata logic. Preserve current browser navigation coverage through the existing dev-browser script.

**Success Criteria:**

- Each affected test has a stated protected failure and independent expected outcome; incidental Next.js source assumptions do not become Astro requirements.
- New or extended isolated checks are written before the behaviour they cover.
- No useful unique coverage is silently deleted; section 6 identifies the retained evidence or the explicit gap.

### Step 3: Add the root Astro build alongside the retained Next.js reference

**Objective:** Build the replacement without changing the live host.

**Approach:** Add compatible locked Astro, TypeScript, Astro check, Cloudflare adapter and Wrangler dependencies to the existing npm package. Use strict TypeScript and ESM for new modules. Add `astro.config.mjs`, `tsconfig.json`, Astro environment declarations and temporary `dev:astro`, `check:astro` and `build:astro` scripts. Keep the current Next.js dev/build commands until parity and release safety are established. Serve the candidate on an explicitly free port, proposed `3003`, while the existing reference remains on `3002`; do not adopt or stop another task’s server. Configure static output, canonical origin, D-2 directory/slash policy and the coupled CSS/script delivery settings in D-7. Extend Tailwind 3 scanning to actual `.astro` and TypeScript consumers without scanning generated output or dormant reference content. The adapter is justified solely by the contact POST endpoint; disable sessions and keep every document prerendered. Emit the generated server bundle outside public `dist/`, following Tax Genie’s `.astro-server/` separation.

**Success Criteria:**

- The locked candidate builds to ignored `dist/`, with no source-framework or request-time page requirement.
- Root npm commands and the current Node preflight remain coherent; `.nvmrc` is not silently upgraded.
- Current Pages artefacts and the Next.js reference remain available.
- The candidate server uses the verified owned port/configuration and follows the project lifecycle rules.

### Step 4: Port the shell, pages and browser interactions

**Objective:** Preserve what visitors see and can do.

**Approach:** Create `src/layouts/BaseLayout.astro`, shared shell/primitives and the routes in section 2.2. Port current page content and visual markup; replace Next.js links with anchors and React icon imports with equivalent static SVG. Keep the exact CSS animation declarations, sequences, responsive framing and decorative output. Use stable unique SVG IDs. Retain source images in `src/images/` under the project’s asset rules; use Astro Image/Picture when that preserves the selected image behaviour, and preserve stable public image URLs. Keep current Mona Sans files and calibrated faces.

Create a guarded `src/scripts/site-entry.ts`, `navigation.ts` and `contact-form.ts`. The menu retains modal semantics, focus containment/restoration, Escape, inert background, scroll-lock restoration, current-route state, interrupted open/close transitions and same-page/cross-page anchor behaviour. The form retains validation, pending, success, failure, retry and send-another transitions; preserve manual WebMCP preparation annotations and never add automatic submission. Post to `/api/contact/`, retain the six business fields and a server-checked honeypot, and retire Formspree-only `_subject`/`_next` transport inputs after the new native redirect is proven. Leave protected dormant JSX and disabled blog/work code unchanged and unrouted. Do not introduce the client router or React integration without the recorded exception in D-5.

**Success Criteria:**

- The route, shell, anchor and responsive checks in section 6.1 establish retained content and visible interaction outcomes.
- Browser checks confirm protected animation timing and appearance at matching baseline widths and phases, including below-fold targets scrolled into view.
- Native submission with Turnstile available works without the project enhancement; all-script/challenge failure uses the selected visible email fallback and never bypasses validation.
- No hidden desktop navigation, dormant section or disabled page becomes a new public feature.

### Step 5: Migrate public facts, metadata and discovery

**Objective:** Keep human pages and machine-readable output coherent.

**Approach:** Create `src/config/site.ts` for repeated public facts, `src/lib/metadata.ts` and `src/lib/structured-data.ts`, and one head component rendered from the base layout. Keep route titles/descriptions with their page inputs, preserving current public values and title punctuation. Use Astro’s canonical `site` as the origin authority; do not add an independent environment-derived origin. Preserve stable truthful graph identities, current service nodes, `en-AU`, `en_AU`, social assets and existing official profiles. Omit unverified optional identity facts; do not invent a postal address to satisfy a scanner. Report any broader identity-completeness gap separately from migration parity.

Reconcile existing public-artifact generation into one owner per file. Generate the sitemap from authoritative indexable route data; keep it a direct `/sitemap.xml` for this small site. Preserve crawler policy. Curate llms guidance from existing supported consulting capabilities and canonical action links; do not expose private Markdown paths or add new business claims. Exclude thank-you, debug and error documents from sitemap/llms. Maintain `/llms.txt` discovery relations. If moving generation to prerendered Astro endpoints, retire conflicting public files only after replacement output is proven.

**Success Criteria:**

- Generated-output and HTTP scenarios in section 6 establish metadata uniqueness, truth, canonical consistency and exact discovery membership.
- Current titles/descriptions and required contact copy remain preserved; intentional protocol/URL updates are traceable to D-2.
- Discovery files return the intended UTF-8 content types through the Worker runtime, with no preview origin or private output prefix.
- There is one public-data, graph and file-generation owner; no second SEO package or content collection is introduced.

### Step 6: Port analytics and verify the contact boundary

**Objective:** Retain tracking and enquiry behaviour without exposing private input or polluting production accounts.

**Approach:** Port the project-owned deferred Mixpanel and referral modules to guarded browser code. Map the current public build variables to Astro-compatible names only where necessary; keep credentials server-only and document each public identifier. Preserve current disabled recording/heatmap defaults, loader selection and intent-driven startup. Native document navigation must record one page view rather than duplicating Next.js lifecycle hooks. Keep enquiry event names/identities and existing payload semantics; never add raw email, phone, name or message to events. Preview/local builds use disabled analytics or a separate test sink.

Implement the section 3.3 contact contract in `src/pages/api/contact.ts` with `prerender = false`, backed by `src/lib/contact/handler.ts`. Adapt Tax Genie’s bounded input, timeout, safe response and generated Worker boundary to Embeddings’ six required fields; do not copy its `practice` field, sender or private credentials. Prepare tests before this handler. Configure `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `TURNSTILE_SECRET_KEY` as separately scoped runtime secrets; local files are ignored and preview cannot send to the production inbox. `PUBLIC_TURNSTILE_SITE_KEY` is the sole public challenge key. Request-time provider fetches never appear as browser Resend calls. The preview/contact fixtures use fake mail transport and official test challenge keys, not shared live resources. Record complete DNS before-state before provisioning/verifying `notifications.embeddings.au`, and add only its required sender records. Reuse the managed shared widget by adding the production hostname only under exact authority; preserve every existing hostname/settings value. Verify the required origin, hostname and action on the server. Neither provider acceptance nor fixture success proves mailbox delivery; an authorised test must confirm receipt at the selected inbox before retiring Formspree.

**Success Criteria:**

- Controlled scenarios establish validation refusal, pending protection, success, failure, retained input, retry and fresh enquiry outcomes.
- Analytics interception shows one event for its intended outcome, no preview/production cross-contamination, and no submitted personal content.
- No provider secret is present in source, public environment fields, generated output or browser network/log captures.
- Any untested real mail-delivery boundary is named accurately and is not counted as passed.

### Step 7: Add the selected Worker, headers and HTTP contract

**Objective:** Prove Cloudflare-specific behaviour locally before hosting changes.

**Approach:** Add `wrangler.jsonc` with the verified account, `dist/`, custom 404 handling and D-2 HTML handling. Keep production custom-domain attachment absent during pre-cutover provisioning. Under D-3 A, use current skill selector assets and compatible sibling adaptations for `src/worker.ts` and `src/lib/agent-readable-http/`; generate private Markdown after static HTML. Set the required `ASSETS` binding and document-first routing while fixed assets bypass execution. Do not exclude `.md` from private-prefix blocking. Generate binding types with the installed Wrangler. Add no Node compatibility, storage, sessions, runtime API or service without a requirement.

The entrypoint dispatches only `/api/contact[/]` to Astro’s handler; every other request uses prebuilt assets/representation selection. Generate production `.astro-server/wrangler.json` and isolated preview `.astro-server/wrangler.preview.json` from the source build, adapting Tax Genie’s `scripts/generate-worker-configs.mjs` and safe generated-directory cleanup. The request-time bundle stays outside `dist/`. Deploy and run the generated configuration, never source `wrangler.jsonc`, because Astro virtual imports exist only after bundling. Preview explicitly sets its own Worker name, no routes, preview URLs and trusted preview mode; flattened generated configs must not rely on named-environment inheritance. Before document selection, issue a permanent 308 for the known old no-slash document paths, preserving the query; the native `/api/contact/` POST must never be passed through an HTML redirect or Markdown selector. Test fragment preservation through browser navigation.

Create one `public/_headers` policy owner for CSP, frame restrictions, MIME safeguards, referrer/permissions policy, UTF-8 discovery types and immutable caching only on genuinely fingerprinted `/_astro/` assets. Remove Formspree origins from the final policy; retain only inspected Mixpanel and documented Turnstile browser origins, with `form-action 'self'`. Resend is a server-only fetch and needs no browser CSP allowlist. Keep processed project scripts external and include the literal external Turnstile loader only on contact. Preserve the necessary inline-style policy. Apply the same policy explicitly to Worker-generated contact/error responses because Static Assets `_headers` does not cover them; retain no-store on contact responses. Verify normal, negotiated and handler paths. Keep HSTS absent. Add `worker:dev`, `worker:types` and `test:http` scripts targeting the generated configuration on the owned proposed port `8794`.

**Success Criteria:**

- The real Wrangler scenarios in section 6 establish status, redirects, MIME, security policy, cache rules and selected representation behaviour.
- Types and installed Wrangler schema match the configuration and code; no unnecessary adapter/binding is present.
- The browser operates the menu, animations, analytics test sink and enquiry states under the actual CSP without violations.
- Selector HTML is byte-identical to prerendered output, and private paths remain denied independently of client headers.

### Step 8: Establish local release acceptance and update operating documentation

**Objective:** Make the replacement and its operating rules reviewable before external actions.

**Approach:** Run the single final local gate in section 6.5. Inspect the full scoped diff. Make Astro the root `dev`, `lint`/check and `build` owner only after parity passes, retaining equivalent npm command names. Use a compatible ESLint/Astro configuration instead of `next lint`; keep npm’s targeted Node test discovery. Update README, editor launch settings and `AGENTS.md` for the root Astro application, port `3002`, `dist/`, browser lifecycle, selected Worker responsibilities and Workers Builds authority. Add `documents/cloudflare-workers-hosting.md` for hosting, before-state, release authority, rollback and privacy checks. Merge missing project-local ownership guidance from the skill’s `assets/project-instructions/` into the existing instruction system; preserve local product/animation rules rather than replacing the root instructions wholesale.

Update `documents/site-positioning.md` only for moved owners/route references, preserving approved messaging. Update animation documentation where implementation references become inaccurate; keep the dormant-state explanation. Leave `documents/agentic-shopping-positioning.md` unchanged. Before any authorised push of repointed root commands, disable the old GitHub Pages publishing workflow and manual publisher. The existing `gh-pages` artefact keeps serving without rebuilding; the saved workflow/revision remains the pre-retirement rollback source.

Check the retained privacy notice against the new provider boundary. Its current wording already covers hosting, enquiry delivery and security providers and an email alternative; preserve it unless a verified new fact makes it inaccurate. Do not invent retention, location or legal assurances. Document the actual provider configuration in the hosting reference without putting enquiry contents or secrets there.

**Success Criteria:**

- Local gates in section 6.5 pass against the final Astro root scripts, and documentation matches actual commands and boundaries.
- A future main push cannot accidentally publish stale `out/` or compete with Workers Builds.
- The retained old Pages artefact remains retrievable and no rollback source is deleted before canonical acceptance.
- Generated output and task evidence remain ignored; intended source/configuration/lockfile changes are reviewed and scoped.

### Step 9: Provision isolated Workers Builds under external authority

**Objective:** Verify Git-connected Cloudflare delivery without changing the apex domain.

**Approach:** Resolve authority for account `213ab3604485056376263d22fa242742`, repository `Culpable/embeddings` and Workers `embeddings`/`embeddings-preview`. Recheck names, GitHub App installation/access and existing account resources before writes. Create separate production and preview build triggers bound to their respective Worker script identities. Use root `/`, locked npm installation and pinned Wrangler. Configure the build command to run lint, Astro/type checks, the complete build and Node tests in that order, stopping at the first failure; built-output tests need fresh output. Deploy/upload only after every check passes. Production matches only `main` and targets generated `.astro-server/wrangler.json`; preview excludes `main` and uploads an inactive version from generated `.astro-server/wrangler.preview.json`. Verify distinct runtime secret scopes and public site keys; neither preview configuration nor its trigger contains production domains or recipient delivery. Do not replace version uploads with a current platform preview command that changes isolation semantics.

The initial production deploy must not run IndexNow or require the apex to match the new bytes before cutover. Use the explicit non-notifying deployment script until Step 11 proves canonical delivery. Preview responses must emit noindex, including unknown routes and both representations; public marketing previews contain no secrets. Prefer repository permission scopes already proven by the siblings, granting only the required private repository access. Do not add a second deployment workflow to GitHub Actions.

**Success Criteria:**

- Build metadata identifies the intended commit, root, account, Worker identity, branch filters, environment values and locked commands.
- An authorised preview upload produces the expected isolated version URL and leaves the production version/domain untouched.
- Hosted read-only scenarios in section 6 pass on the preview, with apex canonical metadata and noindex response policy.
- Trigger/Worker identity mismatch is a failure, not something bypassed with a name override.

### Step 10: Prepare the exact DNS and rollback packet

**Objective:** Make production cutover concrete and recoverable.

**Approach:** Read the live zone again. Save complete apex A/AAAA and `www` CNAME state, affected redirect rules, TLS settings and certificate status in the hosting document before any DNS write. Record an unchanged-record comparison for mail, Microsoft discovery/identity, SPF/DKIM, MX, SRV and verification records. Prepare exact mutations for only the verified web targets: attach the apex Worker custom domain using Cloudflare-managed DNS/certificate provisioning; replace the conflicting `www` CNAME as needed with a proxied redirect-only record; use an edge redirect to canonical HTTPS apex with path/query preserved. Handle both old address families and account for certificate readiness before detaching the old delivery path.

The contact setup has its own narrowly scoped external packet: complete before-state for each Resend sender DNS record, the verified provider domain, and the shared Turnstile widget’s full settings/hostname list before adding `embeddings.au`. Keep existing widget hosts and all Microsoft inbound-mail records intact. Preserve the post-provisioning sender records during the web cutover comparison; do not mistake them for unexpected drift or restore the older inventory over them. Never include widget secrets or provider credentials in the packet.

Review HTTPS settings against every affected proxied host. Prefer a targeted edge redirect for the two marketing hosts; do not force unrelated subdomains to the apex. Worker-host HTTPS must be verified even if a zone’s old origin SSL mode is irrelevant to the new origin. Change shared zone settings only when necessary and within their exact approved scope. Do not add HSTS. Record expected DNS after-state and restoration payloads, the frozen Pages artefact, the candidate Worker version and the serving revision. Obtain the exact production cutover authority only after this packet and hosted preview evidence exist.

**Success Criteria:**

- The packet restores every affected record field and rule/setting without relying on sibling snapshots or guessed IDs.
- Planned writes name only approved web records and resources; unrelated record comparison is available.
- Valid apex/`www` TLS, redirect outcomes and rollback prerequisites are explicit in the packet.
- No production record, rule, custom domain or setting changes before the concrete cutover authority is resolved.

### Step 11: Cut over and verify the public canonical release

**Objective:** Serve the intended Astro revision from Cloudflare without losing enquiries or discovery.

**Approach:** Under the exact production authority, apply the prepared changes, stop at any unexpected error and verify actual before/after state. Wait for custom-domain certificates and serving readiness. Run the read-only canonical scenarios in section 6 over apex and `www`, including IPv4/IPv6 resolution, HTTP-to-HTTPS, selected URL variants, unknown routes, fixed files, headers, cache order, desktop/mobile rendering and crawler responses. Confirm the deployed version/revision and built-byte parity. Recheck untouched DNS records. With exact mail-test authority, send one clearly identified synthetic enquiry through the canonical form to `solutions@embeddings.au` and confirm actual mailbox receipt and Reply-To through authorised read-only inbox access or the owner’s receipt confirmation. Use no customer data. Provider acceptance alone does not pass this gate. If mail-test authority or inbox access is unavailable, record the gap and keep canonical acceptance and Formspree retirement incomplete.

On a failed acceptance condition, restore the recorded pre-cutover web state while the preserved GitHub Pages site is still available, or publish a reviewed prior Worker version if appropriate. A failed DNS/HTTPS result is not fixed by disabling certificate validation. Keep the repository public and Pages available until acceptance succeeds.

**Success Criteria:**

- The canonical production origin serves the intended Astro release and passes section 6’s hosted acceptance conditions.
- Both address families and `www` lead to the correct site; the old host does not remain an alternate live destination through stale AAAA records.
- Mail/service records match their recorded before-state, and failure recovery uses the exact packet.
- The approved synthetic enquiry reaches the selected mailbox with all six fields and the intended Reply-To; no provider-only result is counted as receipt.
- No production-private data is generated, logged or sent by acceptance checks.

### Step 12: Activate canonical search notifications when applicable

**Objective:** Notify actual published migration changes without treating previews or builds as releases.

**Approach:** Prepare a unique host-owned public IndexNow code and the bounded notifier for the selected canonical URL changes, with test-first fake transport/deployment checks. Adapt the bundled pnpm launcher/recovery instructions to npm. Preserve directory/index mapping so `/about/` selects `dist/about/index.html`. Production deploy arguments must target the generated `.astro-server/wrangler.json`, never the source config. Keep origin, Worker identity and arguments validated against their owners. Keep the public code stable. After Step 11 passes, verify the canonical proof file and eligible sitemap, then enable the production-only wrapper in Workers Builds. The first pre-cutover deployment remains non-notifying. For initial cutover, use an authorised post-publication submission rather than redeploying to demonstrate notification. Include the new slash canonicals and pass formerly published no-slash URLs through the notifier’s removed/redirected URL input, verifying their redirect rather than looking for a second output file. Exclude noindex, private, API, query, preview and unrelated product URLs. A notification failure remains separate from successful publication.

**Success Criteria:**

- Production-only guards and local injected-transport checks prevent submissions during build, test, preview, failed deployment or stale publication.
- Notification evidence distinguishes accepted status, pending ownership validation and indexing; no ranking claim is made.
- A failed notification leaves the successful website deployment intact and has a bounded, authorised retry path without an unnecessary redeploy.
- If nothing public changed or notification authority is absent, the record accurately states the unexecuted scope instead of claiming submission.

### Step 13: Retire GitHub Pages, privatise and prove the private release path

**Objective:** Complete the owner’s requested source privacy without changing public site availability.

**Approach:** After canonical acceptance, disable Pages publishing/settings and detach its old custom-domain association using the recorded authority; retain any useful ownership-verification TXT claim. Verify DNS no longer points at GitHub Pages before unpublishing. Keep the old export/revision privately recoverable; do not delete `gh-pages` or rewrite history. Retire remaining Formspree transport/configuration only after confirmed new-mail receipt; retain the old service access until acceptance, and do not cancel a provider subscription without exact authority. Remove replaced Next.js runtime/deployment dependencies and source only after their replacement is proven; preserve protected dormant/reference components and out-of-scope collaborative edits through recoverable handling.

Verify that the Cloudflare GitHub App has access to the target repository when it becomes private. Resolve authority for the exact visibility operation and make `Culpable/embeddings` private. Check authenticated GitHub metadata says private and unauthenticated source access is denied. Confirm the public website remains readable. Trigger an authorised rebuild of the existing revision from the private repository without manufacturing an empty commit; verify fetch, locked installation, checks and intended deployment/version outcome. Keep preview isolation, release branch controls and collaborator access working. GitHub Pages rollback after this point is conditional on plan/visibility availability; immediate rollback uses a preserved Worker version, not making the repository public.

**Success Criteria:**

- Pages is disabled, its workflow/manual publisher is inactive, and web DNS does not reference the old host.
- The source repository is private, authorised collaborators and Workers Builds retain access, and the marketing site remains public.
- A build actually fetches the private repository and completes its intended release flow, rather than relying on an already-uploaded Worker.
- Privacy verification records that public forks and earlier copies remain outside this visibility change; obsolete runtime cleanup leaves no unrelated deletion or generated untracked file.

### Step 14: Record final acceptance and close the migration

**Objective:** Leave a self-contained operating system and evidence of the delivered outcome.

**Approach:** Complete the final gates once, rerunning only checks invalidated by later changes. Write `documents/evidence/astro_cloudflare_workers_migration/acceptance.md` after runs finish. Update hosting/instruction documents with the actual Worker/trigger identities, serving revision, private-build result, rollback commands and any unavailable boundary. Update this plan’s statuses and final solution record without retroactively marking skipped checks passed. Review the full migration diff and make only scoped local commits under the project’s ownership rules. Push only under explicit release authority. Trash task-owned raw output only after the owner accepts the work.

**Success Criteria:**

- Every Done means item maps to recorded acceptance evidence in section 6, with unavailable checks and risks stated.
- Documentation describes the final Astro/Workers/private-repository system and a recoverable release failure path.
- Scoped commits preserve all out-of-scope worktree/index changes; no source history rewrite occurs.

## 6. Testing plan

### 6.1 Verification scenarios

| Requirement or failure | Input or state | Observable expected result | Evidence |
| --- | --- | --- | --- |
| REQ-1/2; Done 1/2 | Retained pages, baseline/candidate at matching widths | Current offer, sections, images and responsive appearance remain; useful initial HTML is present | Built-output validation plus dev-browser inspection of every retained route; zero new durable presentation tests because incidental spacing/copy is not a new behavioural contract |
| REQ-1/15; protected motion | Fresh home load, later animation phases, e-commerce section scrolled into view | Staggered reveals, caret and publish/live phases preserve baseline timing/appearance; no dormant section appears | Matching desktop/mobile browser phase inspection; existing CSS/source reference is context, not proof of rendering |
| REQ-1/2; navigation | `/contact` to menu to `/about`; keyboard open, Tab/Shift-Tab, Escape; rapid open/close; home anchors | Destination loads, focus remains correct, background cannot be operated while modal is open, scroll restores, anchors resolve | Reuse and port `scripts/browser/contact-about-navigation.dev-browser.js`; inspect additional material menu states with dev-browser |
| REQ-3; invalid form | Empty form, malformed email, missing budget | No delivery request; errors are connected/announced and focus reaches the invalid field | Controlled dev-browser form flow with external request capture, not source-token matching |
| REQ-3; asynchronous form truth | Valid six-field enquiry; hold response, return success; fresh enquiry, fail delivery then retry with a fresh challenge | Pending prevents duplicate submit; success follows acceptance; failure retains input; retry reuses the enquiry identifier; send-another resets state | One core dev-browser scenario with intercepted `/api/contact/` responses and zero real leads |
| REQ-3; native fallback/manual boundary | Block the project enhancement while allowing Turnstile, then disable all scripts or block the challenge | Native same-origin POST carries six fields and a token, respects required validation and redirects 303; script/challenge failure provides a usable email link without bypassing checks; no automatic submission | dev-browser native POST/redirect flow with local provider fixtures; retain meaningful contact/WebMCP transport/safety guards |
| REQ-3; server enforcement/provider faults | Real handler Requests with valid fields; missing/invalid/overlong fields, unsupported method, foreign origin, oversized streamed body, filled honeypot; invalid/expired/replayed/wrong-host/action challenge; provider timeout/error; enhanced retry | Invalid requests send no mail; valid requests map six fields to the fixed sender/recipient and visitor Reply-To; response codes/redirects and no-store match section 3.3; safe failure retains input; matching enhanced retries reuse the provider key with a fresh token; logs contain no submitted data | Test-first `test/contact-handler.test.mjs` executes the full handler with injected provider transport under section 6.2; Wrangler HTTP/browser cases confirm routing and emitted response behaviour |
| REQ-3; actual enquiry delivery | One separately authorised synthetic canonical enquiry to `solutions@embeddings.au` | Mailbox receives all six values, sender and Reply-To are correct; provider acceptance is distinguished from receipt | Canonical form plus authorised inbox inspection or owner receipt confirmation; Step 11 cannot pass from a fake/provider-only result |
| REQ-4/5/6; Done 4 | All built routes, titles, head output, sitemap/robots/llms | One selected canonical policy; one metadata set; valid JSON-LD; correct indexability and discovery membership | Adapt retained Node/output checks before owner changes; execute `scripts/validate-static-export.mjs` against the Astro output through its updated package command |
| REQ-5; metadata failure paths | Fixture with empty/doubled title, conflicting canonical or script-breaking graph data | Build rejects invalid metadata; serialized JSON-LD remains data | Existing coverage where sufficient; otherwise test-first isolated extension under section 6.2 |
| REQ-6; public/crawler parity | Built indexable pages with JS disabled and configured retrieval agents | Direct successful HTML, substantive main content and equivalent status/meaning; no login or challenge shell | Local HTTP and browser checks; authorised preview/canonical reads; preserve exact crawler protocol names without adding a ranking gate |
| REQ-6/9; UTF-8 discovery | GET and HEAD of discovery/proof files | Correct fixed type/status, curly apostrophes decode correctly; no HTML fallback | Actual Wrangler/hosted HTTP responses, with `/llms.txt` exactly `text/plain; charset=utf-8` |
| REQ-7/9; selected negotiation | Default/wildcard, explicit Markdown, quality values, rejected media, GET/HEAD, known/unknown routes | Correct HTML/Markdown selection, 406 when both are rejected, real 404 recovery, empty HEAD body and complete `Vary: Accept` | Adapt existing sibling/skill HTTP contract and run against Wrangler, then authorised hosts; no duplicate hand-built parser tests |
| REQ-7; exposure/cache failures | Direct private prefix with arbitrary headers; HTML-first and Markdown-first repeats at the same URL | Private requests remain 404; variants never contaminate cache; HTML remains built-byte-identical | Real Worker HTTP contract plus authorised hosted byte/variant-order checks |
| REQ-9; CSP/cache correctness | Menu/form states, local analytics sink, hashed and stable assets | Browser scripts execute without CSP/network/page errors; immutable cache only covers fingerprints; mutable files revalidate | Wrangler-backed browser inspection and emitted-path/header comparison; warm/cold waterfall checks |
| REQ-13; delivered-output regression | Baseline/candidate first visits and actual selected process image/font requests | Required asset quality/metrics remain; no new blocking script; resource limits reflect actual delivered bytes | Adapt existing budget script without relaxing protective ceilings; browser cold/warm resource comparison; no arbitrary Lighthouse score target |
| REQ-8; Done 5 | Production main trigger and a non-main preview trigger | Correct root/revision/Worker; preview upload never promotes production and has noindex with apex metadata | Trigger inspection plus exact authorised build/version records; no unnecessary commit created to provoke a build |
| REQ-10/11; Done 6/7 | Snapshot packet, approved DNS changes, apex/`www`, both address families | Correct serving origin, valid TLS, canonical path/query-preserving redirect; unrelated DNS unchanged; exact restoration is possible | DNS/API comparison, strict-TLS HTTP reads, release/version identity and packet review; destructive rollback is executed only when required and authorised |
| REQ-12; Done 8 | Cutover accepted, Pages retired, repository made private | Authenticated repository reports private; unauthenticated source is inaccessible; public pages remain accessible; private fetch/build succeeds | GitHub API/access checks and an authorised rebuild from the existing revision |
| D-9; notification boundary | Preview/build/failed deploy, changed/unchanged/removed URLs, timeout/error/success | Only verified canonical publication can notify; bounded recovery; acceptance is not claimed as indexing | Test-first skill notifier cases with fake transport/deploy; authorised post-cutover proof and submission evidence |
| REQ-14; Done 9 | Final diff, instructions, acceptance record | Actual commands/owners and rollback documented; no mixed-task loss or false pass | Scoped diff and plan hygiene review; one final Markdown record |

### 6.2 Automated checks and isolation exceptions

Keep npm and the Node.js runner. Do not install a new Playwright suite for this plan merely because the sibling sites have one: the project explicitly prescribes dev-browser and permits Playwright only when browser automation is explicitly requested. Browser acceptance can run compatible axe checks through the prescribed browser. Use the canonical rule list from the Astro skill for all retained routes and material navigation/form states, rather than disabling failing rules or making a screenshot stand in for an accessibility check.

Retain sufficient current Node tests unchanged. When moving from JSX to Astro, prepare equivalent generated-output assertions before the corresponding owner moves. Extend isolated tests only where a real failure cannot be exposed safely/reliably through the system scenarios:

| Isolated exception | Why browser/E2E alone is insufficient | Independent outcome source | Test-first step |
| --- | --- | --- | --- |
| Metadata validation/serialization failures not already covered | Invalid fixture states must fail a build and cannot be safely published to demonstrate rejection | Existing public metadata contracts and safe JSON serialization rules | Step 2, before Step 5 |
| Contact provider denial/timeout/replay and input boundaries | Real mail, shared live challenges and production logs cannot safely serve as fault fixtures; a UI interception does not prove server enforcement | Section 3.3 six-field schema, HTTP responses, fixed mail identity, Turnstile host/action policy and current Resend retry contract | Step 2 prepares `test/contact-handler.test.mjs` before Step 6; use actual Request parsing and a narrow injected provider fetch, asserting final responses, sent payload/key and redacted log events |
| Selector private-path/source-fetch failure and media parsing cases absent from the runtime contract | A missing internal response or malformed media boundary requires controlled fault injection; do not damage a deployed asset to test it | HTTP negotiation/private-prefix contract in the skill | Step 2, before Step 7; reuse skill cases before adding any |
| IndexNow release/order/retry guards | Production deployment and external submission cannot be used as test fixtures | Published-only notification contract and protocol response meanings | Step 2, before adapting notifier code for Step 12 |

The notifier exception also covers the npm deployment launcher and selected file/directory route mapping: a browser rendering a valid page cannot reveal that a release notifier reads the wrong local file or launches a missing package manager. Under D-2, independently require `/` to select `dist/index.html` and `/about/` to select `dist/about/index.html`; the old `/about` is a redirect input, not a second output file. Failed deployment, failed local inventory and foreign-host input must prevent submission.

Expected results come from requirements/protocols, never the function under test. Zero new durable tests for presentation and unchanged protected CSS animation geometry: inspect the actual matching rendered states instead. The test inventory is scoped to the migration, not another cleanup project.

Keep existing delivered-output limits until evidence justifies an explicit change. The inspected budget script sets initial JavaScript gzip ceilings of 175,000 bytes on contact and 165,000 elsewhere, CSS gzip 15,000, HTML gzip 40,000, raw HTML 220 KiB, combined Mona Sans file bytes 100,000, process-image budgets and first-view totals. Re-read the script at execution because it is under collaborative maintenance. If CSS becomes inline, account for its bytes once in the appropriate combined HTML/CSS metric rather than creating a false HTML regression or dropping the protection. No source-shape or numeric assertion becomes a product requirement merely because an old test contains it.

### 6.3 Browser and runtime procedure

Use [dev-browser](/Users/sacino/.agents/skills/dev-browser/SKILL.md), at desktop `1440x900` and mobile `390x900`. First verify the current listener on `3002`. Use a separate verified candidate port for side-by-side migration acceptance until the root command switches. Then verify Astro through the project’s `npm run dev` lifecycle on `3002`. Port availability alone does not prove the right repository/runtime; correlate launch identity, process ownership and a route-specific response. Do not stop the pre-existing listener owned by another task.

Inspect `/`, `/about/`, `/process/`, `/contact/`, `/privacy/`, `/thank-you/`, `/test-mixpanel/` and an unknown route, plus the old no-slash redirect inputs. Compare each candidate with its current no-slash baseline route. For every affected context compare computed font family, width axis, weight, size, colour and alignment with the reference at the same viewport. Scroll lazy/reveal/offscreen targets into view; compare animation phases and responsive visual framing, not merely element existence. Check horizontal overflow, clipping, missing assets, console/page errors, focus, keyboard, zoom/text resize and touch operation.

Run the transport/state scenarios with synthetic input and local provider fixtures. Block real Formspree baseline delivery, Resend delivery, shared production Turnstile calls and Mixpanel mutations during local verification; use official test keys in the isolated challenge environment. Record both the request payload and observable state so a source scan cannot be mistaken for a successful submission. Inspect native submission with Turnstile available separately from the all-scripts/challenge-blocked email fallback, and preserve visible/manual WebMCP preparation. Only the separately authorised Step 11 mail test uses the production inbox. Run compatible accessibility rules against initial and material dynamic states and inspect the browser accessibility tree; include a practical screen-reader navigation/form check when its local tool is available, otherwise name that gap.

The Cloudflare checks use built `dist/` through the owned `worker:dev` command and the installed Wrangler configuration, not Astro dev/preview. Header, cache, redirect and CSP claims require this runtime. Repeat the relevant HTTP and rendered checks on the exact authorised preview and canonical origins; local results are not hosted proof.

For final acceptance, put raw output under the absolute directory `/Users/sacino/embeddings/.artifacts/astro_cloudflare_workers_migration/final-acceptance/`. Set browser screenshot/report destinations there explicitly; pass absolute paths to screenshot calls. Capture bounded command stdout/stderr there using the runner’s output option, and save HTTP headers/body/observations there with explicit absolute output paths. Never put screenshots, traces, logs or result JSON under `documents/`. Inspect retained raw output before reporting.

After the checks finish, write `/Users/sacino/embeddings/documents/evidence/astro_cloudflare_workers_migration/acceptance.md` with command, source revision and serving version, setup, independently expected and actual outcomes, result, replay steps and absolute raw-output paths. This is the single final acceptance record; routine iteration checks receive only a concise reply line. If a defect is actually fixed, add its failing-before/passing-after reproduction to the same task record. Stop only task-owned foreground runtimes/browsers and confirm their processes and ports close; preserve the reference server. Trash this task’s raw output after owner acceptance.

### 6.4 Source-of-truth cutover regression

The exact request `https://www.embeddings.au/about?migration=check` currently produces a hostname-mismatch certificate error. The live GitHub Pages metadata covers only `embeddings.au`. During execution retain a strict-TLS reproduction under the ignored baseline output path before changing DNS/certificates. After cutover the same request must complete TLS and resolve through canonical redirects to `https://embeddings.au/about/?migration=check`. Do not replace this real-host evidence with a local synthetic certificate test or an insecure HTTP client.

### 6.5 Completion gates

Run the current lint, Node tests and build once before changing application owners, keeping outputs out of tracked files. Run focused scenarios during iteration. After final application/configuration changes, run the project gate once through equivalent retained commands:

- `npm --prefix /Users/sacino/embeddings run lint`: compatible Astro/TypeScript ESLint, zero errors.
- `npm --prefix /Users/sacino/embeddings run check`: Astro/type/config checks, with generated Worker types when selected.
- `npm --prefix /Users/sacino/embeddings run build`: complete static output, generated discovery/selected Markdown, valid headers and delivered-output checks.
- `npm --prefix /Users/sacino/embeddings test`: the site’s meaningful `test/*.test.mjs` suite, with the fresh output available for any built-output cases.
- `npm --prefix /Users/sacino/embeddings run test:http -- http://127.0.0.1:8794`: the production-shaped contract against the verified owned Worker URL; update the argument if the lifecycle selects a different explicit free port.
- The browser scenarios in section 6.3, including the retained contact-to-about navigation script, native form fallback and material states.
- The authorised preview, canonical cutover, DNS preservation, repository-privacy and private-build scenarios in section 6.1.
- Full scoped diff, secret/output review, updated operating documentation and final evidence review.

Repeat only checks invalidated by a later relevant change. Distinguish pre-existing collaborator/harness failures from migration failures; fix only requested in-scope defects and never weaken a failing meaningful check. Unauthorised or unavailable hosted/mail/screen-reader checks remain explicitly unavailable with their residual risk. Local acceptance and canonical acceptance are separate milestones; do not report the whole migration complete until every required authorised milestone passes.
