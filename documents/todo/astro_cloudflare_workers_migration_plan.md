# Astro and Cloudflare Workers migration plan

**Plan status:** Draft. The technical proposal and blindspot findings are recorded. The three owner preferences in D-1 to D-3 remain unanswered; their recommended options are drafting assumptions, not accepted decisions. No migration implementation or external change is authorised by this document alone.

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
- A contact form that looks correct but changes its six fields, loses its native submission path or reports success after a rejected request.
- An apex cutover that leaves GitHub Pages IPv6 records behind or leaves `www` unable to complete HTTPS.
- Making the marketing site private, assuming repository privacy removes public forks or previously downloaded source, or assuming old public builds become private automatically.

### 1.4 Done means

1. Every retained route, discovery file and asset works from the production Astro build and the authorised Cloudflare release.
2. The real interface preserves current content, responsive appearance, animation sequences and interactive states at the project’s desktop and mobile viewports.
3. The business enquiry flow preserves its contract, truthful success/failure states, keyboard flow and native fallback.
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
| Contact delivery | Formspree `https://formspree.io/f/xrbgdgwq` | External POST | Preserve by default, pending D-1 |
| Analytics | Deferred Mixpanel, referral attribution, enquiry events | Browser modules | Preserve through a guarded Astro browser entry |
| HTML/Markdown selection | No current selector | Unavailable on plain GitHub Pages | Proposed narrow Worker selector, pending D-3 |

No database, authenticated product, API application or CMS belongs to this migration. Disabled blog/work pages are reference material, not new public routes.

### 2.3 Content, appearance and interaction authority

- `documents/site-positioning.md` owns the broad, implementation-first AI consulting positioning. E-commerce is one specialism. Shoppa remains a separate product, mentioned only through the homepage Shoppa card.
- Preserve the homepage anchors `#services`, `#ecommerce` and `#how-we-work`, and the process stage anchors. Preserve the minimal header: logo, Contact us and menu trigger. Main navigation and footer labels remain lowercase.
- The contact fields remain `name`, `email`, `company`, `phone`, `message` and `budget`, with the existing required-field rules and submitted budget values. Preserve `_subject`, `_next` and the empty `_gotcha` transport fields when Formspree remains selected. The current native confirmation URL is `https://embeddings.au/thank-you`.
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
| `/Users/sacino/taxgenie-root` | Root Astro static with a narrow contact endpoint, Cloudflare adapter, Resend/Turnstile, negotiated Markdown | Root project layout; conditional contact design if D-1 changes | Adapter, generated server configs, secrets and challenge infrastructure without the contact requirement |
| `/Users/sacino/shoppa-root` | Root Astro static, plain browser code, negotiated Markdown | Root layout, inline CSS with external scripts, simple Worker and header policy | Shoppa branding/copy, absence of enquiry delivery, historical helper/report files |

All four source repositories are private and use Workers Builds for production, with separate preview Workers. Current package manifests show Astro 7 and Wrangler 4. npm registry inspection reports stable Astro `7.3.8` requiring Node `>=22.12.0`, and Wrangler `4.149.0` requiring Node `>=22.0.0`. These are research observations, not permanent version pins; confirm compatible stable versions at execution and lock them then.

Primary local reuse paths include each sibling’s `astro.config.mjs`, `wrangler.jsonc`, base layout, `src/worker.ts`, `src/lib/agent-readable-http/`, header owner, and `scripts/run-http-contract.mjs`. Prefer current skill assets for portable code and use sibling code to identify proven adaptations. Do not create a cross-repository shared package.

## 3. Desired state

### 3.1 Requirements

- **REQ-1 (MUST):** Preserve the current website’s content, page structure, visual design and animations under the authorities in section 2.3. Framework syntax changes do not authorise a redesign.
- **REQ-2 (MUST):** Prerender every retained document in Astro with `output: 'static'`, canonical `site: 'https://embeddings.au'` and no `base` subpath. Ordinary navigation uses anchors and document loads.
- **REQ-3 (MUST):** Preserve the existing enquiry field and feedback contracts, native fallback, manual submission boundary and mailto alternative. Contact-provider selection remains D-1.
- **REQ-4 (MUST):** Apply the selected URL policy consistently to built paths, redirects, links, form confirmation, canonicals, JSON-LD, sitemap and discovery. The drafting default is slashless under D-2.
- **REQ-5 (MUST):** Render one metadata system, meaningful initial HTML and truthful structured data; preserve current public title/description values unless an explicitly selected URL change requires a path update.
- **REQ-6 (MUST):** Retain deliberate search/retrieval versus training crawler policy, public discovery and noindex utility routes. Preview URLs and generated private paths never enter discovery.
- **REQ-7 (MUST):** If D-3 selects Markdown, use only a prebuilt representation selector with cache-safe negotiation and private-path blocking. No primary document is server-rendered.
- **REQ-8 (MUST):** Use Workers Builds as the sole new production release controller, with separate production and preview Worker identities, branch filters and target checks.
- **REQ-9 (MUST):** Verify response headers and caching through Wrangler and the authorised hosted deployment, including browser execution under the Content Security Policy.
- **REQ-10 (MUST):** Cut over apex IPv4/IPv6 and `www` safely, with valid HTTPS, canonical redirects, complete recorded before-state and unchanged unrelated DNS.
- **REQ-11 (MUST):** Preserve working rollback before retirement, and use a prior Worker version after GitHub Pages becomes unavailable.
- **REQ-12 (MUST):** Make `Culpable/embeddings` private only after cutover acceptance; prove private-repository build access and continued public website access.
- **REQ-13 (MUST):** Keep npm, the current Node pin and Tailwind major unless a verified compatibility requirement or separate owner instruction changes them. Keep existing checks meaningful during migration.
- **REQ-14 (MUST):** Update local architecture and operating instructions, keep the plan’s step statuses current during implementation, and write the final acceptance evidence after the checks finish.
- **REQ-15 (MUST NOT):** Introduce a database, sessions, CMS, Starlight, client router, new tracking provider or unrelated product features. Do not add reduced-motion conditions or animation setup gates.

### 3.2 Defaults and fallbacks

- Draft against D-1 A, D-2 A and D-3 A while those preferences remain open. Do not call them owner-approved or start dependent implementation from this draft.
- Use Astro components, existing Tailwind utilities and native browser controls. A processed TypeScript module owns each required interaction; one guarded entry imports or lazily loads those modules. Add a React island only if a concrete parity requirement cannot be met this way, with its cost and boundary recorded before installation.
- Keep useful content and navigation in initial HTML. With JavaScript unavailable, footer links still provide route discovery and the enquiry form uses its native POST path. Only enable custom `novalidate` after the enhancing script has mounted.
- If an optional analytics dependency fails, navigation and enquiries remain usable. If a contact request fails, retain the input and show the existing recovery/error state rather than a success message.
- If a generated Markdown representation cannot be fetched, use the selector’s explicit HTML fallback with the source status; direct private-path access remains denied. If selection itself needs emergency removal, publish the reviewed assets-only configuration under release authority.

## 4. Additional context

### 4.1 Scope and authority

This task produces a plan. It does not connect repositories, create Workers, upload previews, deploy, push, change DNS, submit search notifications or change repository visibility now. Later execution must resolve authority for each exact external target. The owner has selected private repository visibility after cutover; do not reopen that outcome as a design choice.

Use the existing checkout. Do not create a worktree or change branches without explicit consent. Preserve other tasks’ worktree and staged changes and apply the project’s whole-file ownership rule for commits. Remove obsolete task-owned files through recoverable Trash. Never delete or recreate `gh-pages`, rewrite Git history or make the repository public again as an automatic rollback.

### 4.2 Decision record

#### D-1: Contact delivery

- **Context:** The current form and two siblings use Formspree; Tax Genie proves a different mail boundary.
- **Options:** (a) keep Formspree; (b) replace it with a Cloudflare contact handler and Resend.
- **Decision:** Unanswered. Plan writer recommends (a); the question tool returned no selection.
- **Why:** Preserve the existing delivery path and keep the requested migration focused.
- **Why not (b):** Adds provider setup, credentials, abuse controls and mail-delivery verification.
- **Assumptions:** Steps 4 and 6 draft against the current endpoint and six fields.
- **Reconsider when:** The owner selects (b), or verified evidence shows the current endpoint cannot meet the retained flow. Selecting (b) unlocks mail-identity, recipient and preview/abuse-control decisions before the plan is finalised.

#### D-2: Page URL policy

- **Context:** Embeddings uses slashless document URLs; all four siblings use a final slash.
- **Options:** (a) retain slashless URLs and redirect slash variants; (b) adopt slash URLs and redirect old addresses.
- **Decision:** Unanswered. Plan writer recommends (a); the question tool returned no selection.
- **Why:** Preserve established search and linked URLs during the hosting change.
- **Why not (b):** Combines a canonical-URL migration with the framework/hosting migration.
- **Assumptions:** Use Astro `trailingSlash: 'never'`, `build.format: 'file'` and Workers `assets.html_handling: 'drop-trailing-slash'`; prove behaviour through the actual runtime.
- **Reconsider when:** The owner selects sibling URL consistency. Then update the route table, internal links, confirmation URL, discovery, HTTP scenarios and changed-URL notifications together.

#### D-3: Markdown responses for AI readers

- **Context:** All four siblings select HTML or generated Markdown at one address; Embeddings currently has only HTML and fixed discovery files.
- **Options:** (a) adopt the repository-owned selector; (b) serve assets-only HTML and discovery files.
- **Decision:** Unanswered. Plan writer recommends (a); the question tool returned no selection.
- **Why:** Follow the named sibling baseline using an existing narrow, documented capability.
- **Why not (b):** Omits same-URL Markdown and Markdown recovery at the original missing URL.
- **Assumptions:** Every document request, including HTML, executes the Worker. Fixed assets bypass it. The verified Workers Paid subscription is reused, not changed; request/CPU usage still applies.
- **Reconsider when:** The owner selects (b), or measured deployment constraints invalidate the selector. Then remove the Worker entry, `ASSETS` binding, routing exceptions and generated Markdown as a coherent change.

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
| Bundled notification code assumes pnpm and directory-style pages | Skill notifier invokes `pnpm` and maps slash paths to `index.html` | Adapt its deploy launcher, recovery commands and local URL-to-file mapping to npm and D-2 before use; never copy it unchanged into the slashless root build |
| Preview upload can target the wrong Worker | FinTrace hosting guide records an earlier sibling trigger/tag defect | Two triggers bind to their own Worker identities; preview never uses the production script tag |
| Source privacy is independent of website privacy | Private sibling repositories with public sites; GitHub visibility documentation | Check GitHub App access, public site reachability and private rebuild separately |
| Current tests contain framework-specific assumptions | Node tests and evolving local test maintenance | Re-inventory before migration; preserve meaningful outcomes rather than re-pin JSX or private Next.js file shapes |
| Current instruction files still describe Next.js/Pages | Root `AGENTS.md` and README | Explicit documentation step replaces obsolete technology statements without weakening product rules |

D-1, D-2 and D-3 are independent owner preferences. Only D-1 B creates a further frontier: mail sender/recipient authority, safe preview recipients and abuse-control resources. No decision about making the source private remains open. The cold-read checks of the brief and question payload pass after clarifying that HTML page requests also execute the selector and confirming the existing paid account. The BSP is not closed until D-1 to D-3 are answered or explicitly accepted as assumptions.

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

## 5. Implementation plan

### Step 1: Resolve the draft and preserve the execution baseline

**Objective:** Start from current evidence, accepted choices and a recoverable old release.

**Approach:** Resolve D-1 to D-3 and any D-1 B follow-up choices, then update every dependent section before execution. Read current root/nested instructions, package/lock files, all staged/unstaged changes, route owners and sibling references. Record the current source revision, Pages build/revision, publishing settings and exact current deployment workflow. Keep a copy of the existing static export in ignored task output before any migration build can replace it. Capture source-rendered desktop/mobile views and observable navigation/form/animation states.

**Success Criteria:**

- The decision frontier is empty and this plan records accepted options or explicit approved assumptions.
- An independently identified current Pages artefact and reconstruction command are available before the publishing path changes.
- The baseline distinguishes current local content from hosted content and identifies all out-of-scope collaborative changes.
- Baseline evidence exists for the scenarios in section 6; raw output is ignored, not in project documents.

### Step 2: Define migration checks before changing their protected behaviour

**Objective:** Preserve meaningful coverage across the framework change.

**Approach:** Inventory the actual retained `test/*.test.mjs` suite and `scripts/validate-static-export.mjs` after other maintenance settles. Prepare updates to generated-route, metadata, discovery, native form and delivered-output checks before replacing the corresponding owners. Use independent requirements and actual emitted HTML, not new Astro syntax, as expectations. Add isolated cases only under the exceptions in section 6.2, before editing the corresponding selector/notifier/metadata logic. Preserve current browser navigation coverage through the existing dev-browser script.

**Success Criteria:**

- Each affected test has a stated protected failure and independent expected outcome; incidental Next.js source assumptions do not become Astro requirements.
- New or extended isolated checks are written before the behaviour they cover.
- No useful unique coverage is silently deleted; section 6 identifies the retained evidence or the explicit gap.

### Step 3: Add the root Astro build alongside the retained Next.js reference

**Objective:** Build the replacement without changing the live host.

**Approach:** Add compatible locked Astro, TypeScript, Astro check and Wrangler dependencies to the existing npm package. Use strict TypeScript and ESM for new modules. Add `astro.config.mjs`, `tsconfig.json`, Astro environment declarations and temporary `dev:astro`, `check:astro` and `build:astro` scripts. Keep the current Next.js dev/build commands until parity and release safety are established. Serve the candidate on an explicitly free port, proposed `3003`, while the existing reference remains on `3002`; do not adopt or stop another task’s server. Configure static output, canonical origin, D-2 URL policy and the coupled CSS/script delivery settings in D-7. Extend Tailwind 3 scanning to actual `.astro` and TypeScript consumers without scanning generated output or dormant reference content. Do not add an adapter under D-1 A.

**Success Criteria:**

- The locked candidate builds to ignored `dist/`, with no source-framework or request-time page requirement.
- Root npm commands and the current Node preflight remain coherent; `.nvmrc` is not silently upgraded.
- Current Pages artefacts and the Next.js reference remain available.
- The candidate server uses the verified owned port/configuration and follows the project lifecycle rules.

### Step 4: Port the shell, pages and browser interactions

**Objective:** Preserve what visitors see and can do.

**Approach:** Create `src/layouts/BaseLayout.astro`, shared shell/primitives and the routes in section 2.2. Port current page content and visual markup; replace Next.js links with anchors and React icon imports with equivalent static SVG. Keep the exact CSS animation declarations, sequences, responsive framing and decorative output. Use stable unique SVG IDs. Retain source images in `src/images/` under the project’s asset rules; use Astro Image/Picture when that preserves the selected image behaviour, and preserve stable public image URLs. Keep current Mona Sans files and calibrated faces.

Create a guarded `src/scripts/site-entry.ts`, `navigation.ts` and `contact-form.ts`. The menu retains modal semantics, focus containment/restoration, Escape, inert background, scroll-lock restoration, current-route state, interrupted open/close transitions and same-page/cross-page anchor behaviour. The form retains validation, pending, success, failure, retry and send-another transitions; preserve manual WebMCP preparation annotations and never add automatic submission. Under D-1 A, keep Formspree and its native transport fields. Leave protected dormant JSX and disabled blog/work code unchanged and unrouted. Do not introduce the client router or React integration without the recorded exception in D-5.

**Success Criteria:**

- The route, shell, anchor and responsive checks in section 6.1 establish retained content and visible interaction outcomes.
- Browser checks confirm protected animation timing and appearance at matching baseline widths and phases, including below-fold targets scrolled into view.
- Native no-JavaScript enquiry submission remains a usable transport path; enhancement does not disable native validation before it mounts.
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

For D-1 A, maintain the exact Formspree action and submitted field values. Browser tests intercept the external service and supply local responses. They prove the browser’s transport and state, not real email delivery. A live delivery check requires separate explicit authority and a designated test destination; never send an unsolicited production enquiry. D-1 B requires an amended plan covering the narrow handler, adapter-generated server bundle, secrets, provider identities and safe failure/abuse scenarios before implementation.

**Success Criteria:**

- Controlled scenarios establish validation refusal, pending protection, success, failure, retained input, retry and fresh enquiry outcomes.
- Analytics interception shows one event for its intended outcome, no preview/production cross-contamination, and no submitted personal content.
- No provider secret is present in source, public environment fields, generated output or browser network/log captures.
- Any untested real mail-delivery boundary is named accurately and is not counted as passed.

### Step 7: Add the selected Worker, headers and HTTP contract

**Objective:** Prove Cloudflare-specific behaviour locally before hosting changes.

**Approach:** Add `wrangler.jsonc` with the verified account, `dist/`, custom 404 handling and D-2 HTML handling. Keep production custom-domain attachment absent during pre-cutover provisioning. Under D-3 A, use current skill selector assets and compatible sibling adaptations for `src/worker.ts` and `src/lib/agent-readable-http/`; generate private Markdown after static HTML. Set the required `ASSETS` binding and document-first routing while fixed assets bypass execution. Do not exclude `.md` from private-prefix blocking. Generate binding types with the installed Wrangler. Add no Node compatibility, storage, sessions, runtime API or service without a requirement.

Create one `public/_headers` owner for CSP, frame restrictions, MIME safeguards, referrer/permissions policy, UTF-8 discovery types and immutable caching only on genuinely fingerprinted `/_astro/` assets. Allow only the inspected Formspree and Mixpanel origins needed by the retained implementation. Keep executable scripts external; preserve the necessary inline-style policy. Document copied policy application to selector responses and verify both normal and error paths. Keep HSTS absent. Add `worker:dev`, `worker:types` and `test:http` package scripts with an explicit free local Worker port, proposed `8794`, using owned foreground runtime lifecycle.

**Success Criteria:**

- The real Wrangler scenarios in section 6 establish status, redirects, MIME, security policy, cache rules and selected representation behaviour.
- Types and installed Wrangler schema match the configuration and code; no unnecessary adapter/binding is present.
- The browser operates the menu, animations, analytics test sink and enquiry states under the actual CSP without violations.
- Selector HTML is byte-identical to prerendered output, and private paths remain denied independently of client headers.

### Step 8: Establish local release acceptance and update operating documentation

**Objective:** Make the replacement and its operating rules reviewable before external actions.

**Approach:** Run the single final local gate in section 6.5. Inspect the full scoped diff. Make Astro the root `dev`, `lint`/check and `build` owner only after parity passes, retaining equivalent npm command names. Use a compatible ESLint/Astro configuration instead of `next lint`; keep npm’s targeted Node test discovery. Update README, editor launch settings and `AGENTS.md` for the root Astro application, port `3002`, `dist/`, browser lifecycle, selected Worker responsibilities and Workers Builds authority. Add `documents/cloudflare-workers-hosting.md` for hosting, before-state, release authority, rollback and privacy checks. Merge missing project-local ownership guidance from the skill’s `assets/project-instructions/` into the existing instruction system; preserve local product/animation rules rather than replacing the root instructions wholesale.

Update `documents/site-positioning.md` only for moved owners/route references, preserving approved messaging. Update animation documentation where implementation references become inaccurate; keep the dormant-state explanation. Leave `documents/agentic-shopping-positioning.md` unchanged. Before any authorised push of repointed root commands, disable the old GitHub Pages publishing workflow and manual publisher. The existing `gh-pages` artefact keeps serving without rebuilding; the saved workflow/revision remains the pre-retirement rollback source.

**Success Criteria:**

- Local gates in section 6.5 pass against the final Astro root scripts, and documentation matches actual commands and boundaries.
- A future main push cannot accidentally publish stale `out/` or compete with Workers Builds.
- The retained old Pages artefact remains retrievable and no rollback source is deleted before canonical acceptance.
- Generated output and task evidence remain ignored; intended source/configuration/lockfile changes are reviewed and scoped.

### Step 9: Provision isolated Workers Builds under external authority

**Objective:** Verify Git-connected Cloudflare delivery without changing the apex domain.

**Approach:** Resolve authority for account `213ab3604485056376263d22fa242742`, repository `Culpable/embeddings` and Workers `embeddings`/`embeddings-preview`. Recheck names, GitHub App installation/access and existing account resources before writes. Create separate production and preview build triggers bound to their respective Worker script identities. Use root `/`, locked npm installation, the project’s validated build command and the pinned local Wrangler. Production matches only `main`; preview excludes `main` and uploads an inactive version with the preview environment. Neither preview configuration nor its trigger contains production domains. Do not replace version uploads with a current platform preview command that silently changes isolation semantics.

The initial production deploy must not run IndexNow or require the apex to match the new bytes before cutover. Use the explicit non-notifying deployment script until Step 11 proves canonical delivery. Preview responses must emit noindex, including unknown routes and both representations; public marketing previews contain no secrets. Prefer repository permission scopes already proven by the siblings, granting only the required private repository access. Do not add a second deployment workflow to GitHub Actions.

**Success Criteria:**

- Build metadata identifies the intended commit, root, account, Worker identity, branch filters, environment values and locked commands.
- An authorised preview upload produces the expected isolated version URL and leaves the production version/domain untouched.
- Hosted read-only scenarios in section 6 pass on the preview, with apex canonical metadata and noindex response policy.
- Trigger/Worker identity mismatch is a failure, not something bypassed with a name override.

### Step 10: Prepare the exact DNS and rollback packet

**Objective:** Make production cutover concrete and recoverable.

**Approach:** Read the live zone again. Save complete apex A/AAAA and `www` CNAME state, affected redirect rules, TLS settings and certificate status in the hosting document before any DNS write. Record an unchanged-record comparison for mail, Microsoft discovery/identity, SPF/DKIM, MX, SRV and verification records. Prepare exact mutations for only the verified web targets: attach the apex Worker custom domain using Cloudflare-managed DNS/certificate provisioning; replace the conflicting `www` CNAME as needed with a proxied redirect-only record; use an edge redirect to canonical HTTPS apex with path/query preserved. Handle both old address families and account for certificate readiness before detaching the old delivery path.

Review HTTPS settings against every affected proxied host. Prefer a targeted edge redirect for the two marketing hosts; do not force unrelated subdomains to the apex. Worker-host HTTPS must be verified even if a zone’s old origin SSL mode is irrelevant to the new origin. Change shared zone settings only when necessary and within their exact approved scope. Do not add HSTS. Record expected DNS after-state and restoration payloads, the frozen Pages artefact, the candidate Worker version and the serving revision. Obtain the exact production cutover authority only after this packet and hosted preview evidence exist.

**Success Criteria:**

- The packet restores every affected record field and rule/setting without relying on sibling snapshots or guessed IDs.
- Planned writes name only approved web records and resources; unrelated record comparison is available.
- Valid apex/`www` TLS, redirect outcomes and rollback prerequisites are explicit in the packet.
- No production record, rule, custom domain or setting changes before the concrete cutover authority is resolved.

### Step 11: Cut over and verify the public canonical release

**Objective:** Serve the intended Astro revision from Cloudflare without losing enquiries or discovery.

**Approach:** Under the exact production authority, apply the prepared changes, stop at any unexpected error and verify actual before/after state. Wait for custom-domain certificates and serving readiness. Run the read-only canonical scenarios in section 6 over apex and `www`, including IPv4/IPv6 resolution, HTTP-to-HTTPS, selected URL variants, unknown routes, fixed files, headers, cache order, desktop/mobile rendering and crawler responses. Confirm the deployed version/revision and built-byte parity. Recheck untouched DNS records. Do not submit a real enquiry without separate mail-test authority.

On a failed acceptance condition, restore the recorded pre-cutover web state while the preserved GitHub Pages site is still available, or publish a reviewed prior Worker version if appropriate. A failed DNS/HTTPS result is not fixed by disabling certificate validation. Keep the repository public and Pages available until acceptance succeeds.

**Success Criteria:**

- The canonical production origin serves the intended Astro release and passes section 6’s hosted acceptance conditions.
- Both address families and `www` lead to the correct site; the old host does not remain an alternate live destination through stale AAAA records.
- Mail/service records match their recorded before-state, and failure recovery uses the exact packet.
- No production-private data is generated, logged or sent by acceptance checks.

### Step 12: Activate canonical search notifications when applicable

**Objective:** Notify actual published migration changes without treating previews or builds as releases.

**Approach:** If the selected URL/representation/content migration warrants notification, prepare a unique host-owned public IndexNow code and the skill’s bounded notifier during local work, with test-first fake transport/deployment checks. Adapt `scripts/indexnow.mjs` and its deployment configuration to npm: the bundled launcher currently invokes pnpm. Under D-2 A, resolve `/about` to `dist/about.html`, not a directory or extensionless file; cover the root and every eligible file-style page before adapting the notifier. Under D-2 B, preserve the directory/index mapping. Keep origin, Worker identity and deployment arguments validated against their owning configurations. Update recovery instructions to the actual npm commands. Keep the public code stable; it is ownership proof, not a secret. After Step 11 passes, verify canonical proof-file and eligible sitemap output, then enable the production-only wrapper in Workers Builds. The first pre-cutover deployment must remain non-notifying. For the initial cutover, use an explicitly authorised post-publication submission or controlled subsequent release; do not redeploy merely to demonstrate notification. Exclude noindex, private, query, preview and unrelated product URLs. Retain removed/redirected canonical URLs if D-2 changes them.

**Success Criteria:**

- Production-only guards and local injected-transport checks prevent submissions during build, test, preview, failed deployment or stale publication.
- Notification evidence distinguishes accepted status, pending ownership validation and indexing; no ranking claim is made.
- A failed notification leaves the successful website deployment intact and has a bounded, authorised retry path without an unnecessary redeploy.
- If nothing public changed or notification authority is absent, the record accurately states the unexecuted scope instead of claiming submission.

### Step 13: Retire GitHub Pages, privatise and prove the private release path

**Objective:** Complete the owner’s requested source privacy without changing public site availability.

**Approach:** After canonical acceptance, disable Pages publishing/settings and detach its old custom-domain association using the recorded authority; retain any useful ownership-verification TXT claim. Verify DNS no longer points at GitHub Pages before unpublishing. Keep the old export/revision privately recoverable; do not delete `gh-pages` or rewrite history. Remove replaced Next.js runtime/deployment dependencies and source only after their replacement is proven; preserve protected dormant/reference components and out-of-scope collaborative edits through recoverable handling.

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
| REQ-3; asynchronous form truth | Valid six-field enquiry; hold response, return success; fresh enquiry, reject response then retry | Pending prevents a duplicate submit, success follows acceptance, failure preserves input, retry and send-another reset state correctly | One core browser scenario with local intercepted Formspree responses and zero real leads |
| REQ-3; native fallback/manual boundary | JavaScript disabled or enhancement blocked, populated form, manual submit | Correct external POST payload and canonical `_next`; native required validation still works; no automatic agent submission | Browser interception of the native POST; existing contact/WebMCP guards retained where they enforce real transport/safety values |
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
| Selector private-path/source-fetch failure and media parsing cases absent from the runtime contract | A missing internal response or malformed media boundary requires controlled fault injection; do not damage a deployed asset to test it | HTTP negotiation/private-prefix contract in the skill | Step 2, before Step 7; reuse skill cases before adding any |
| IndexNow release/order/retry guards | Production deployment and external submission cannot be used as test fixtures | Published-only notification contract and protocol response meanings | Step 2, before adapting notifier code for Step 12 |

The notifier exception also covers the npm deployment launcher and selected file/directory route mapping: a browser rendering a valid page cannot reveal that a release notifier reads the wrong local file or launches a missing package manager. Independently require `/` to select `dist/index.html`, slashless `/about` to select `dist/about.html` under D-2 A, and the alternative slash policy to select its built directory index under D-2 B. Failed deployment, failed local inventory and foreign-host input must prevent submission.

Expected results come from requirements/protocols, never the function under test. Zero new durable tests for presentation and unchanged protected CSS animation geometry: inspect the actual matching rendered states instead. The test inventory is scoped to the migration, not another cleanup project.

Keep existing delivered-output limits until evidence justifies an explicit change. The inspected budget script sets initial JavaScript gzip ceilings of 175,000 bytes on contact and 165,000 elsewhere, CSS gzip 15,000, HTML gzip 40,000, raw HTML 220 KiB, combined Mona Sans file bytes 100,000, process-image budgets and first-view totals. Re-read the script at execution because it is under collaborative maintenance. If CSS becomes inline, account for its bytes once in the appropriate combined HTML/CSS metric rather than creating a false HTML regression or dropping the protection. No source-shape or numeric assertion becomes a product requirement merely because an old test contains it.

### 6.3 Browser and runtime procedure

Use [dev-browser](/Users/sacino/.agents/skills/dev-browser/SKILL.md), at desktop `1440x900` and mobile `390x900`. First verify the current listener on `3002`. Use a separate verified candidate port for side-by-side migration acceptance until the root command switches. Then verify Astro through the project’s `npm run dev` lifecycle on `3002`. Port availability alone does not prove the right repository/runtime; correlate launch identity, process ownership and a route-specific response. Do not stop the pre-existing listener owned by another task.

Inspect `/`, `/about`, `/process`, `/contact`, `/privacy`, `/thank-you`, the retained debug route and an unknown route. For every affected context compare computed font family, width axis, weight, size, colour and alignment with the reference at the same viewport. Scroll lazy/reveal/offscreen targets into view; compare animation phases and responsive visual framing, not merely element existence. Check horizontal overflow, clipping, missing assets, console/page errors, focus, keyboard, zoom/text resize and touch operation.

Run the transport/state scenarios with synthetic input and locally intercepted responses. Block real Formspree/Mixpanel mutations during verification. Record both the request payload and observable state so a source scan cannot be mistaken for a successful submission. Inspect native no-JavaScript behaviour and preserve visible/manual WebMCP preparation. Run compatible accessibility rules against initial and material dynamic states and inspect the browser accessibility tree; include a practical screen-reader navigation/form check when its local tool is available, otherwise name that gap.

The Cloudflare checks use built `dist/` through the owned `worker:dev` command and the installed Wrangler configuration, not Astro dev/preview. Header, cache, redirect and CSP claims require this runtime. Repeat the relevant HTTP and rendered checks on the exact authorised preview and canonical origins; local results are not hosted proof.

For final acceptance, put raw output under the absolute directory `/Users/sacino/embeddings/.artifacts/astro_cloudflare_workers_migration/final-acceptance/`. Set browser screenshot/report destinations there explicitly; pass absolute paths to screenshot calls. Capture bounded command stdout/stderr there using the runner’s output option, and save HTTP headers/body/observations there with explicit absolute output paths. Never put screenshots, traces, logs or result JSON under `documents/`. Inspect retained raw output before reporting.

After the checks finish, write `/Users/sacino/embeddings/documents/evidence/astro_cloudflare_workers_migration/acceptance.md` with command, source revision and serving version, setup, independently expected and actual outcomes, result, replay steps and absolute raw-output paths. This is the single final acceptance record; routine iteration checks receive only a concise reply line. If a defect is actually fixed, add its failing-before/passing-after reproduction to the same task record. Stop only task-owned foreground runtimes/browsers and confirm their processes and ports close; preserve the reference server. Trash this task’s raw output after owner acceptance.

### 6.4 Source-of-truth cutover regression

The exact request `https://www.embeddings.au/about?migration=check` currently produces a hostname-mismatch certificate error. The live GitHub Pages metadata covers only `embeddings.au`. During execution retain a strict-TLS reproduction under the ignored baseline output path before changing DNS/certificates. After cutover the same request must complete TLS and redirect to the selected apex `/about` address with `migration=check` preserved. Do not replace this real-host evidence with a local synthetic certificate test or an insecure HTTP client.

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
