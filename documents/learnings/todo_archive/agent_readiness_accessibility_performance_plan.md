# Agent Readiness, Accessibility, and Performance Plan ✅ **COMPLETED**

> **Implemented status (verified 2026-08-31):** Implemented and ready to archive from documents/todo. Evidence: `src/lib/site-config.mjs`, `src/app/privacy/page.jsx`, `src/components/StructuredData.jsx`, `scripts/validate-static-export.mjs`, `scripts/check-static-budgets.mjs`, `test/site-config.test.mjs`, `test/static-export-readiness.test.mjs`, `test/static-output-budgets.test.mjs`, and passing `npm test`, `npm run lint`, and `npm run build`.

<critical_warning>
> **CRITICAL WARNING:** Embeddings MUST remain a Next.js static-export site on GitHub Pages. This plan MUST NOT convert the repository to Astro, introduce a server runtime, add a proxy, or move deployment away from GitHub Pages.
</critical_warning>

<important_note>
> **IMPORTANT NOTE:** The requested Astro skill is used only as a source of platform-neutral principles. Astro-specific routing, middleware, content negotiation, image services, adapters, and server-header techniques are deliberately translated into Next.js static-export equivalents or recorded as unavailable on GitHub Pages.
</important_note>

## 1. Goal

Make Embeddings easier for search engines, AI retrieval systems, browser agents, assistive technology, and human visitors to discover, understand, navigate, and use, while reducing first-load work and preserving the existing visual design.

The implementation is complete when:

- The application remains Next.js with `output: 'export'`, deploys through the existing GitHub Pages workflow, and continues to build into `out/`.
- `/llms.txt`, `/robots.txt`, and `/sitemap.xml` are generated from one route and site configuration, contain only current public routes, and are validated during the build.
- Every indexable page has unique metadata, a self-canonical URL, linked structured data, server-rendered primary content, and a path from both human navigation and agent discovery files.
- A reviewed `/privacy` page uses owner-approved general wording to explain personal-information categories, business enquiries, purposes, service-provider roles, retention, choices, and contact details without invented claims.
- The navigation, footer, process imagery, and contact form expose correct names, roles, relationships, states, validation, and no-JavaScript fallbacks.
- The contact form includes safe declarative WebMCP annotations for agent-assisted completion but never includes `toolautosubmit` or any other automatic submission path.
- Protected frontpage animations retain their current design, timing, triggers, content, and responsive behaviour.
- Static output budgets and readiness checks fail the build when metadata, discovery files, accessibility contracts, or asset sizes regress.
- Required automated checks pass, browser verification passes at `1440x900` and `390x900`, and production verification confirms the GitHub Pages artefacts after an authorised deployment.

---

## 2. Current State Analysis

### 2.1 Application and Hosting

- The installed application framework is Next.js `15.5.10` with React `18.2.0`.
- `AGENTS.md`, comments in `src/scripts/generate-sitemap.js`, `@next/mdx`, and `eslint-config-next` still refer to or use Next.js `14`, so the documented and supporting-tool versions do not match the installed framework.
- `next.config.mjs` uses `output: 'export'` and `images.unoptimized: true`.
- GitHub Actions builds `out/` and deploys it to the `gh-pages` branch with the custom domain `embeddings.au`.
- GitHub Pages serves static files and owns the response headers. The application cannot implement request-time content negotiation, custom `Vary` behaviour, custom status selection, CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, frame controls, or immutable cache headers without changing hosting architecture.
- `package.json` and `.github/workflows/deploy.yml` both run recursive `rm -rf` clean commands. The workflow clean is redundant because `npm run build` repeats it, and both conflict with the workspace deletion policy.

### 2.2 Route and Indexing Inventory

| Route or artefact | Current state | Required disposition |
| --- | --- | --- |
| `/` | Indexable, substantive HTML, shared homepage social metadata | Keep indexable; add self-canonical metadata and linked structured data |
| `/about` | Indexable, substantive HTML, route title and description | Keep indexable; add route-specific canonical, social metadata, and structured data |
| `/process` | Indexable, substantive HTML, route title and description | Keep indexable; add route-specific canonical, social metadata, structured data, and responsive process images |
| `/contact` | Indexable, stable protected copy, Formspree form | Keep indexable; preserve copy and six-field contract; add metadata, form resilience, and agent annotations |
| `/privacy` | Missing | Add only with fact-checked, owner-reviewed privacy content |
| `/thank-you` | Included in the sitemap and inherits general indexing | Keep reachable after Formspree submission; add `noindex, nofollow`; remove from sitemap and `llms.txt` |
| `/test-mixpanel` | Public debug route with `noindex, nofollow` | Keep excluded from discovery; add a unique document title |
| Unknown route | Custom 404 content exists but inherits the homepage document title | Preserve recovery links; add distinct noindex metadata and verify a real `404` response |
| `/robots.txt` | Allows all crawlers and points at the sitemap | Generate from the crawler policy and retain ordinary search indexing |
| `/sitemap.xml` | Includes `/thank-you`, build-date `lastmod`, `changefreq`, and `priority` | Generate only canonical indexable routes; omit unsupported or invented freshness fields |
| `/llms.txt` | Missing | Add a curated file-only llms.txt v2 profile with canonical HTML links |

The exported `.txt` files beside Next.js pages are React Server Component payloads. They are framework artefacts, not curated Markdown representations, and MUST NOT be linked from `llms.txt` or advertised as agent documentation.

### 2.3 Agent Discovery and Trust

- `public/robots.txt` and `public/sitemap.xml` exist, but `src/lib/sitemap.js` and `src/scripts/generate-sitemap.js` split route ownership between a manual list and source-tree discovery.
- The sitemap stamps every route with the build date. This presents build time as content modification time even when page content did not change.
- Root metadata has no `metadataBase` or canonical URLs.
- Internal routes inherit the homepage Open Graph URL, social title, social description, and social image details.
- The shared social image declares `1200x630`, but the current file is `1528x800`.
- `<html lang="en">` conflicts with the site’s Australian English positioning and `en-AU` metadata.
- `src/lib/metadata.js`, `src/lib/images.ts`, and `src/schemas/organization-schema.js` duplicate site identity facts.
- Only the homepage emits `Organization` JSON-LD, and it inserts raw `JSON.stringify` output without escaping characters that can terminate or alter an inline script.
- Existing structured data contains a postal address but no verified contact point or social profiles. Placeholder social URLs MUST NOT become `sameAs` values.
- `/about` and `/contact` already provide useful public identity and contact content.
- A privacy page is missing even though the site sends business enquiry data to Formspree and can load Mixpanel with local-storage persistence, session recording, and heatmap settings.

### 2.4 Accessibility and Agent Interaction

Existing strengths that MUST be preserved:

- A skip link targets the single shared `<main id="main-content">`.
- Public pages render one primary H1 and substantive content in the initial server HTML.
- The navigation uses a native button, reports `aria-expanded`, traps focus while open, closes with Escape, and restores focus after closing.
- The contact form uses native controls, visible labels, stable `name` attributes, autocomplete tokens, required attributes, an error summary, field errors, live status output, and focus transfer after successful submission.
- Touch targets and focus-visible styles are already present on primary controls.
- The 404 page provides named recovery links.

Confirmed defects and gaps:

1. `src/components/NavigationButton.jsx` always emits `aria-controls`, but `src/components/RootNavigation.jsx` does not mount that referenced ID until the panel opens. The initial accessibility tree therefore contains a dangling relationship.
2. `src/app/contact/ContactForm.jsx` renders `novalidate` in server HTML. When JavaScript is unavailable, the required controls no longer receive native browser validation before the Formspree fallback submits.
3. Footer group labels are unassociated `<div>` elements, so the grouped link lists do not have programmatic labels.
4. `src/components/StylizedImage.jsx` forces `alt=""` inside an SVG wrapper without declaring the overall process photograph decorative.
5. There is no deterministic static-export gate for landmarks, headings, labels, canonical links, structured data, hidden interactive content, or ARIA target relationships.
6. There is no declarative agent interface for preparing the business enquiry form.

### 2.5 Performance Baseline

The current checked-in `out/` artefacts provide the following baseline snapshot. Implementation MUST regenerate and record a fresh baseline before changing runtime code, because these values describe an existing build rather than a permanent contract.

| Route | HTML gzip | Initial JavaScript gzip | Shared CSS gzip |
| --- | ---: | ---: | ---: |
| `/` | approximately 36 KB | approximately 196 KB | approximately 12.4 KB |
| `/process` | approximately 24 KB | approximately 192 KB | approximately 12.4 KB |
| `/contact` | approximately 12 KB | approximately 191 KB | approximately 12.4 KB |
| `/about` | approximately 16 KB | approximately 186 KB | approximately 12.4 KB |
| `/thank-you` | approximately 10 KB | approximately 186 KB | approximately 12.4 KB |

Additional findings:

- `NavigationButton.jsx` imports Framer Motion for one 300 ms menu-to-close icon crossfade. This places an approximately 34 KB gzip Framer chunk on every active route.
- `ContactForm.jsx` imports Framer Motion for error and status transitions, keeping the same library on the contact route even after the shared navigation import is removed.
- `GrayscaleTransitionImage.jsx` also imports Framer Motion, but it is only reachable through disabled MDX page infrastructure and does not need to be changed to remove Framer from active route bundles.
- Mona Sans is one `133,748` byte WOFF2 file. It uses `font-display: swap` but has no metric-compatible fallback overrides.
- The process page serves one unoptimised `1440px` WebP per photograph because global image optimisation is disabled for static export. The first photograph is about `236 KB`; all three source WebPs total about `436 KB`.
- `instrumentation-client.js` defers Mixpanel until interaction or a 12-second fallback, but a scroll starts the dynamic import immediately. The installed full Mixpanel build includes recording code even when recording and heatmaps are disabled.
- The installed Mixpanel package contains a core build of about `66 KB` gzip before application bundling, compared with about `168 KB` gzip for its full CommonJS build.
- `HeroDataFlow.jsx`, `ResponsiveServiceAnimation.jsx`, and the CSS reveal system already defer expensive or offscreen work. These patterns MUST be preserved.
- Existing CSS uses `content-visibility: auto` and intrinsic sizes on relevant offscreen regions. These declarations MUST be preserved unless measurements prove a defect.

### 2.6 Binding Constraints

- Do not migrate to Astro or adopt Astro-specific file conventions.
- Do not move from GitHub Pages or add a proxy, edge worker, server, or API.
- Do not add inert `_headers`, Next.js middleware, `headers()`, or configuration that the static host cannot apply.
- Do not claim that same-URL Markdown negotiation, `Vary: Accept`, a Markdown-specific `404`, or a `406` representation response exists.
- Do not add inline desktop navigation. Keep the global header limited to the logo, Contact us CTA, and menu trigger.
- Preserve the contact route, all six business enquiry fields, stable contact metadata, PageIntro copy, side-panel copy, and trailing empty `Border` placeholder.
- Preserve lowercase navigation and footer labels.
- Do not add `prefers-reduced-motion`, timing gates, or `requestAnimationFrame` wrappers to animation code.
- Do not replace or alter the animation design in `HeroDataFlow.jsx`, `CatalogueTransformation.jsx`, service timeline components, `AgentConversationShowcase.jsx`, or `ContactSection.jsx`.
- Do not update `documents/agentic-shopping-positioning.md` from these code changes.
- Update `documents/service-section-animations.md` only if implementation unexpectedly changes service animation timing, triggers, or behaviour. The intended implementation does not touch those animations.
- Do not send a real Formspree submission during automated or browser verification.

---

## 3. Desired State

### 3.1 Agent Discovery Requirements

- **AGENT-1 (MUST):** One shared site configuration must own the production origin, organisation identity, languages, social image details, public route inventory, indexability, canonical paths, discovery descriptions, structured-data types, and crawler policy.
- **AGENT-2 (MUST):** `/llms.txt` must follow the current llms.txt v2 ordering: one H1, one blockquote summary, concise usage guidance, then H2 link groups containing canonical HTML URLs and descriptions.
- **AGENT-3 (MUST):** `llms.txt` must explain when to use the site, when not to use it, and how to use linked pages. It must not link React Server Component `.txt` files, invented Markdown pages, `llms-full.txt`, `/thank-you`, `/test-mixpanel`, or disabled routes.
- **AGENT-4 (MUST):** Every HTML document must advertise `/llms.txt` with `<link rel="describedby" href="/llms.txt" type="text/plain">`.
- **AGENT-5 (MUST):** `robots.txt` must allow ordinary indexing and named search or user-requested retrieval agents while blocking the named model-training or bulk-dataset agents in the adopted policy.
- **AGENT-6 (MUST):** `robots.txt` must not be presented as an authentication, confidentiality, or security mechanism.
- **AGENT-7 (MUST):** `sitemap.xml` must contain exactly `/`, `/about`, `/process`, `/contact`, and `/privacy`, expressed as canonical production URLs with no duplicate paths, `changefreq`, `priority`, or fabricated `lastmod` values.
- **AGENT-8 (MUST):** `/thank-you`, `/test-mixpanel`, and the 404 document must emit `noindex, nofollow` metadata and remain accessible to crawlers so those meta directives can be read.
- **AGENT-9 (MUST):** Every indexable route must return substantive server-rendered HTML without requiring JavaScript for its primary text, links, headings, or contact fields.
- **AGENT-10 (MUST):** Unknown URLs must return HTTP `404` and retain clear links to home, process, and contact.
- **AGENT-11 (MUST):** Each indexable route must expose between `500` and `100,000` Unicode characters of visible main content plus route-specific expected markers. Login shells, challenge pages, redirect stubs, and meta-refresh documents must fail validation.
- **AGENT-12 (MUST):** Production requests using the normal browser agent and each configured search or retrieval user-agent must agree on final status, content type, H1, canonical URL, and route-specific main-content markers.
- **AGENT-13 (MUST):** A bounded scanner must inspect hidden or offscreen content and the `aria-label`, `alt`, and `title` attributes for instruction-injection phrases. It must report route, selector, source, and exact match and fail on every unreviewed result.

### 3.2 Metadata, Identity, and Trust Requirements

- **TRUST-1 (MUST):** `<html>` must use `lang="en-AU"`; Open Graph locale must use the corresponding `en_AU` syntax.
- **TRUST-2 (MUST):** Each indexable route must have one unique title, one route-specific description, an absolute self-canonical URL, a route-specific Open Graph URL, and matching Twitter metadata.
- **TRUST-3 (MUST):** Social image metadata must reference a real `1200x630` image and declare its actual MIME type, dimensions, and useful alternative text.
- **TRUST-4 (MUST):** Each indexable route must emit one safely serialised JSON-LD graph linking stable `Organization`, `WebSite`, and route `WebPage` identifiers.
- **TRUST-5 (MUST):** The about and contact pages must use the `AboutPage` and `ContactPage` subtypes. The process page must link only to service nodes whose names and descriptions are supported by visible process content.
- **TRUST-6 (MUST):** JSON-LD serialisation must escape `<`, `</script`, U+2028, and U+2029 before insertion into an inline script.
- **TRUST-7 (MUST NOT):** Structured data must not include unverified people, clients, awards, review ratings, addresses, telephone numbers, social profiles, service regions, or performance claims.
- **TRUST-8 (MUST):** The existing postal address and the public `solutions@embeddings.au` contact point must receive owner approval before they remain in or enter the shared graph. `sameAs` must be omitted unless exact official profile URLs are supplied and verified.
- **TRUST-9 (MUST):** `/privacy` must use owner-approved general wording for information categories, browser storage, business enquiries, purposes, service-provider roles, retention, contact method, and user choices. It must not publish unverified provider-specific settings.
- **TRUST-10 (MUST):** Privacy content must receive owner or legal approval before release. The owner approved a general-policy approach on 30 August 2026 and directed the implementation to omit provider-specific retention details.

### 3.3 Accessibility and Agent Interaction Requirements

- **ACCESS-1 (MUST):** Every public HTML route must contain one visible H1, one shared main landmark, a working skip link, labelled navigation landmarks, and a logical heading order.
- **ACCESS-2 (MUST):** `aria-controls` must be absent when the navigation panel ID is absent and present with a valid target throughout the mounted open and closing states.
- **ACCESS-3 (MUST):** The open navigation must retain its dialog name, focus trap, Escape handling, link activation, scroll behaviour, closing transition, and focus restoration.
- **ACCESS-4 (MUST):** Footer link groups must use headings and `aria-labelledby` relationships without changing their lowercase visible labels.
- **ACCESS-5 (MUST):** Process photographs must have one explicit accessibility treatment. Because the adjacent heading, body, and signal list contain all information, the clipped photograph wrapper must be hidden from the accessibility tree as decorative.
- **ACCESS-6 (MUST):** Server-rendered contact HTML must retain native required and type validation when JavaScript is absent. Hydrated JavaScript must retain the existing custom validation, error summary, focus movement, loading state, errors, success state, and Formspree fallback.
- **ACCESS-7 (MUST):** The contact form’s public fields must retain the exact names `name`, `email`, `company`, `phone`, `message`, and `budget`.
- **ACCESS-8 (MUST):** Declarative WebMCP attributes must expose a stable `prepare_business_enquiry` form tool and useful parameter descriptions for the six public fields.
- **ACCESS-9 (MUST NOT):** The form must not expose `_subject`, `_next`, `_gotcha`, analytics values, or submission as agent parameters. It must not contain `toolautosubmit`.
- **ACCESS-10 (MUST):** Hidden, inert, offscreen, `aria-hidden`, and transition states must not contain focusable controls that remain exposed or reachable incorrectly.
- **ACCESS-11 (MUST):** The site must retain functional content, route links, native validation, and recovery paths when client JavaScript fails.

### 3.4 Performance Budgets

Static byte budgets are measured from a production `out/` build. JavaScript and CSS counts must deduplicate shared files referenced by each HTML document. Transfer budgets use gzip size unless the row says otherwise.

| Budget | Required ceiling or target |
| --- | ---: |
| Initial JavaScript for `/`, `/about`, `/process`, `/privacy`, `/thank-you` | 165 KB per route |
| Initial JavaScript for `/contact` | 175 KB |
| Any active route initial JavaScript | 180 KB |
| Shared render-blocking CSS | 15 KB and one stylesheet |
| HTML | 40 KB gzip and 220 KB raw per page |
| Initial Mona Sans font transfer | 100 KB |
| Homepage cold first-view transfer, excluding deferred analytics and offscreen media | 330 KB |
| Process page cold first-view transfer on desktop | 450 KB |
| Process page cold first-view transfer on mobile | 350 KB |
| All process raster variants selected during one full-page session | 300 KB |
| Desktop process LCP image candidate | 150 KB |
| Mobile process LCP image candidate | 90 KB |
| Deferred Mixpanel core chunk when recording and heatmaps are disabled | 70 KB |
| Lab LCP at the median of three mobile runs | 2.0 seconds |
| Lab CLS at the median of three mobile runs | 0.05 |
| Lab total blocking time at the median of three mobile runs | 200 ms |
| Field p75 LCP target after release | 2.5 seconds |
| Field p75 INP target after release | 200 ms |
| Field p75 CLS target after release | 0.1 |

Further performance contracts:

- **PERF-1 (MUST):** Active route bundles must not load Framer Motion solely for the navigation icon or contact form state transitions.
- **PERF-2 (MUST):** Replacing Framer Motion must reproduce the current icon, error, and status animation properties and durations without changing protected homepage animations.
- **PERF-3 (MUST):** The process page must use generated AVIF and WebP `srcset` candidates with explicit dimensions and an accurate `sizes` value.
- **PERF-4 (MUST):** Only the first process image may be eager and high priority. Later process images must be lazy and asynchronously decoded.
- **PERF-5 (MUST):** The LCP preload must identify the same responsive image candidates and sizes used by the rendered `<picture>`.
- **PERF-6 (MUST):** Mona Sans must keep `font-display: swap`; fallback metrics must be derived from the actual font rather than guessed.
- **PERF-7 (MUST):** Mixpanel must be scheduled for an idle period after the first qualifying trigger, not imported synchronously during a scroll event.
- **PERF-8 (MUST):** When session recording and heatmaps are both disabled at build time, the application must load the installed core Mixpanel build and omit recorder options. When either feature is enabled, it must retain the configured full-build behaviour.
- **PERF-9 (MUST):** No synchronous third-party script, preconnect, or DNS hint may be added to the initial document without a measured critical-path benefit.
- **PERF-10 (MUST):** Existing viewport-based loading, `content-visibility`, intrinsic sizing, and protected animation behaviour must remain intact.

### 3.5 Public Artefact Matrix

| URL | Index | Sitemap | llms.txt | JSON-LD | Notes |
| --- | --- | --- | --- | --- | --- |
| `/` | Yes | Yes | Yes | Organization + WebSite + WebPage + supported services | Absolute homepage title remains unchanged |
| `/about` | Yes | Yes | Yes | Organization + WebSite + AboutPage | Identity claims must match visible content |
| `/process` | Yes | Yes | Yes | Organization + WebSite + WebPage + supported services | Foundation, Deploy, and Operate remain visible process phases |
| `/contact` | Yes | Yes | Yes | Organization + WebSite + ContactPage | Stable metadata and PageIntro copy remain exact |
| `/privacy` | Yes | Yes | Yes | Organization + WebSite + WebPage | Release requires reviewed factual content |
| `/thank-you` | No | No | No | None | Keep as Formspree fallback destination |
| `/test-mixpanel` | No | No | No | None | Keep internal debug route distinct and noindex |
| Unknown route | No | No | No | None | Return HTTP 404 with recovery links |

---

## 4. Additional Context

### 4.1 Adopted Decisions

The interactive decision prompt returned without selections twice. To keep the plan executable, it adopts the labelled recommended defaults:

1. **Crawler policy:** Allow ordinary search indexing, named AI search crawlers, and user-requested retrieval agents. Block named model-training and bulk-dataset crawlers.
2. **Agent form interface:** Add declarative WebMCP annotations to support form discovery and completion, but require a human-controlled submit action.
3. **Regression gate:** Add deterministic source and static-export checks, then use the project’s required `dev-browser` workflow and Lighthouse for rendered verification. Do not add Playwright.

The initial crawler registry must contain:

| Access class | User-agent tokens | Rule |
| --- | --- | --- |
| General indexing | `*` | `Allow: /` |
| OpenAI search and user retrieval | `OAI-SearchBot`, `ChatGPT-User` | `Allow: /` |
| Anthropic search and user retrieval | `Claude-SearchBot`, `Claude-User` | `Allow: /` |
| Perplexity search and user retrieval | `PerplexityBot`, `Perplexity-User` | `Allow: /` |
| Model training or extended model use | `GPTBot`, `ClaudeBot`, `Google-Extended` | `Disallow: /` |
| Bulk public dataset collection | `CCBot` | `Disallow: /` |

Each named token must live in the shared crawler registry with its access class and an authoritative provider-document URL. Implementation must re-check those provider pages before shipping because crawler names and stated purposes can change.

The named `*-User` entries document the site owner’s retrieval preference, but they do not guarantee enforcement. Provider-controlled, user-initiated fetchers may apply robots rules differently from autonomous crawlers. Completion reporting must distinguish the declared policy from verified provider behaviour.

### 4.2 GitHub Pages Translation Boundary

| Principle from the Astro skill | GitHub Pages implementation |
| --- | --- |
| Root `llms.txt` | Generate and deploy `public/llms.txt` |
| Markdown alternatives | Do not add; canonical HTML is the only supported representation |
| `Vary: Accept` and `406` selection | Unavailable without a server or proxy; record as intentionally unsupported |
| Markdown-specific 404 recovery | Unavailable; preserve the HTML 404 recovery page |
| Root `robots.txt` and sitemap | Generate deterministic static files before `next build` |
| Canonical and social metadata | Use the Next.js Metadata API at build time |
| Response security headers | Unavailable on the current host; do not add inert configuration |
| Immutable caching | Unavailable as an application-controlled header; keep content-hashed Next.js assets and measure within host behaviour |
| Server image optimisation | Generate responsive image files with Sharp before the static build |
| Agent-readable forms | Use semantic HTML, no-JavaScript resilience, and safe WebMCP attributes |

Moving hosting, adding a fronting Cloudflare service, or introducing server behaviour is out of scope. These missing server capabilities must be reported accurately rather than simulated.

### 4.3 Authoritative References

- [llms.txt v2 specification](https://llmstxt.org/)
- [Chrome agentic browsing audit model](https://developer.chrome.com/docs/lighthouse/agentic-browsing/scoring)
- [Chrome declarative WebMCP form annotations](https://developer.chrome.com/docs/ai/webmcp/declarative-api)
- [OpenAI crawler and user-agent documentation](https://developers.openai.com/api/docs/bots)
- [Anthropic crawler controls](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- [Perplexity crawler documentation](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)
- [Google-Extended crawler token documentation](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers#google-extended)
- [Common Crawl CCBot controls](https://commoncrawl.org/ccbot)
- [Robots Exclusion Protocol RFC 9309](https://www.rfc-editor.org/rfc/rfc9309)
- [Next.js static export guide](https://nextjs.org/docs/app/guides/static-exports)
- [Next.js Metadata API](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
- [FontTools 4.63.0 package record](https://pypi.org/project/fonttools/4.63.0/)

### 4.4 Reused Project Infrastructure

- `src/components/RootLayout.jsx` for the shared main landmark.
- `src/components/RootHeader.jsx` for the skip link and minimal header.
- `src/components/RootNavigation.jsx` and `RootNavigationPanel.jsx` for the existing dialog and focus model.
- `src/app/contact/ContactForm.jsx` for the six-field Formspree contract and client validation.
- `src/lib/metadata.js`, `src/lib/images.ts`, and `src/schemas/organization-schema.js` as migration inputs for the new site configuration.
- Sharp `0.33.1`, which is already installed, for build-time process and social image generation.
- Existing Node tests in `test/*.test.mjs` for component source contracts.
- Existing responsive and reveal primitives, including `HeroDataFlow`, `ResponsiveServiceAnimation`, `FadeIn`, and `content-visibility` CSS.
- The required `npm run lint`, `npm test`, and `npm run build` validation commands.

---

## 5. Implementation Plan

### ~~Step 1: Establish a Reproducible Baseline and Align the Next.js Toolchain~~ ✅ **COMPLETED**

**Objective:** Record current output accurately, remove build-command ambiguity, and make supporting Next.js packages match the installed framework before behaviour changes.

#### 1.1 High-Level Approach

- Generate a fresh static export without using the destructive `rm -rf` wrapper.
- Add `scripts/measure-static-output.mjs` to parse each exported HTML document, deduplicate its referenced JavaScript, CSS, font, and eager image assets, and report raw, gzip, and Brotli sizes.
- Record the fresh results in the implementation notes and compare them with the baseline in Section 2.5.
- Align `@next/mdx` and `eslint-config-next` to the installed Next.js `15.5.10` major and update the stale Next.js version references in `AGENTS.md` and sitemap comments. Do not upgrade Next.js beyond `15.5.10` as part of this work.
- Replace the build’s shell deletion with a Node orchestration path that runs generators, `next build`, export validation, and budget validation sequentially and stops on the first non-zero result.
- Remove the duplicate `.next` and `out` deletion from `.github/workflows/deploy.yml`.
- Prove that Next.js itself replaces stale output by placing a named sentinel in `out/`, running the new build, and confirming the sentinel is absent. If the framework leaves the sentinel, use the workspace-approved `trash` command on that exact generated directory before the build rather than reintroducing `rm`.

**Files:**

- `package.json`
- `package-lock.json`
- `AGENTS.md`
- `.github/workflows/deploy.yml`
- `src/scripts/generate-sitemap.js`
- `scripts/measure-static-output.mjs` (new)
- `scripts/build-static-site.mjs` (new)

**Success Criteria:**

- `package-lock.json` resolves `next`, `@next/mdx`, and `eslint-config-next` on the Next.js `15.5.10` major with no unrelated dependency upgrade.
- `AGENTS.md` and active sitemap comments no longer identify the installed application as Next.js 14.
- `package.json` and `.github/workflows/deploy.yml` contain no `rm -rf`, `/bin/rm`, `/usr/bin/rm`, or equivalent recursive deletion command.
- The build orchestrator uses explicit repository paths, executes each build stage in order, and exits immediately when one stage fails.
- A stale sentinel placed in `out/` is absent after the build, proving that generated output does not leak between builds.
- `measure-static-output.mjs` reports one row per active HTML route and deduplicates repeated asset URLs before summing bytes.
- The unoptimised baseline is saved in the implementation record before Steps 6 through 8 change active bundles or media.
- `npm run lint`, `npm test`, and `npm run build` still exit with code `0` before feature work begins.

### ~~Step 2: Create One Site, Route, Identity, and Crawler Configuration~~ ✅ **COMPLETED**

**Objective:** Eliminate conflicting metadata, sitemap, schema, and crawler facts by making one importable configuration the source of truth.

#### 2.1 High-Level Approach

- Create `src/lib/site-config.mjs` with:
  - production origin and site name;
  - `htmlLang: 'en-AU'` and `openGraphLocale: 'en_AU'`;
  - default title, description, and the real social image record;
  - stable IDs for the organisation and website;
  - a route manifest for `/`, `/about`, `/process`, `/contact`, `/privacy`, `/thank-you`, `/test-mixpanel`, and the 404 document;
  - title, description, canonical path, indexability, sitemap inclusion, llms inclusion, page subtype, and llms description for each route;
  - the adopted crawler registry and authoritative provider links.
- Refactor `src/lib/metadata.js`, `src/lib/images.ts`, `src/lib/sitemap.js`, and `src/schemas/organization-schema.js` consumers onto this configuration.
- Keep asset-specific TypeScript types in `src/lib/images.ts` only when they add compile-time value; do not duplicate URLs or dimensions there.
- Audit the existing postal address, organisation description, logo, public email, provider settings, and service statements against visible pages and live service configuration.
- Obtain owner approval for the structured-data identity record and privacy facts before they are marked publishable.
- Omit `sameAs` by default. Add it later only when exact official social profile URLs are supplied and verified.

**Files:**

- `src/lib/site-config.mjs` (new)
- `src/lib/metadata.js`
- `src/lib/images.ts`
- `src/lib/sitemap.js`
- `src/schemas/organization-schema.js`
- `test/site-config.test.mjs` (new)

**Success Criteria:**

- One configuration owns every route path, canonical URL, indexability flag, discovery description, language, social image field, and crawler rule.
- No active source file outside that configuration hard-codes `https://embeddings.au` except external form fallbacks or tests that explicitly verify the production origin.
- The route manifest contains exactly five indexable routes: `/`, `/about`, `/process`, `/contact`, and `/privacy`.
- `/thank-you`, `/test-mixpanel`, and 404 entries are explicitly non-indexable and excluded from sitemap and llms output.
- The crawler registry contains every token and access class in Section 4.1, plus one authoritative documentation URL per provider.
- A source test fails for duplicate paths, duplicate canonical URLs, missing titles or descriptions, conflicting route flags, an unverified `sameAs`, or an indexable route omitted from sitemap or llms output.
- The implementation record identifies the reviewer who approved the postal address, public contact point, service descriptions, and privacy facts. Unapproved fields remain omitted.

### ~~Step 3: Add a Fact-Checked Privacy Route and Trust Navigation~~ ✅ **COMPLETED**

**Objective:** Publish the minimum complete privacy information needed to understand the site’s real data flows without changing protected contact content.

#### 3.1 High-Level Approach

- Create `src/app/privacy/page.jsx` as a Server Component.
- Follow the owner-approved general policy structure modelled on Shoppa Root.
- Cover information categories, browser storage, business enquiries, purposes,
  service-provider roles, reasonable retention, user choices, access or deletion
  requests, and a privacy contact method.
- Omit provider names, analytics configuration, recording and heatmap settings,
  hidden form values, and account-specific retention details.
- Keep legal assertions within owner-approved language. Do not infer compliance, lawful basis, cross-border safeguards, or retention periods.
- Add a lowercase `privacy` link to the footer’s final row or company navigation without altering the minimal header.
- Preserve all contact PageIntro, helper, side-panel, and field copy exactly.

**Files:**

- `src/app/privacy/page.jsx` (new)
- `src/components/Footer.jsx`
- `src/lib/site-config.mjs`
- `test/privacy-page-contract.test.mjs` (new)

**Success Criteria:**

- `/privacy` has one H1, substantive server-rendered text, a unique description, and no client component unless interaction is required.
- Every statement about information categories, browser storage, purposes, service-provider roles, retention, and user choices maps to visible site behaviour or owner-approved general policy wording.
- The page names a working privacy contact method and does not publish a placeholder value.
- The footer exposes one lowercase `privacy` link with a minimum 44px mobile target and a programmatic name.
- The header remains logo, Contact us CTA, and menu trigger only.
- `git diff` shows no change to protected contact metadata, PageIntro copy, helper copy, side-panel copy, form field names, or the empty trailing `Border` placeholder.
- Owner or legal approval is recorded before `/privacy` is included in the release build.

### ~~Step 4: Generate llms.txt, robots.txt, and sitemap.xml from the Shared Configuration~~ ✅ **COMPLETED**

**Objective:** Give crawlers and browser agents deterministic, accurate discovery files without pretending GitHub Pages supports negotiated Markdown.

#### 4.1 High-Level Approach

- Replace `src/scripts/generate-sitemap.js` with:
  - `src/lib/public-artifacts.mjs`, containing pure renderers for llms, robots, and sitemap strings;
  - `src/scripts/generate-public-artifacts.mjs`, which writes UTF-8 files to explicit paths in `public/`.
- Generate `public/llms.txt` with:
  - `# Embeddings`;
  - one factual blockquote summary;
  - concise `When to use`, `When not to use`, and `How to use` guidance;
  - task-oriented H2 groups for the offer and process, company and trust, and contact;
  - canonical HTML links to the five indexable routes, each with a specific description.
- Generate `public/robots.txt` from the adopted registry. Keep a general `Allow: /`, explicit allow groups for search and retrieval, explicit disallow groups for training or dataset collection, and one sitemap directive.
- Generate `public/sitemap.xml` as a direct `urlset` containing the five indexable routes in stable manifest order.
- Omit `lastmod` until a factual content-modification source exists. Omit `changefreq` and `priority`.
- Add the `rel="describedby"` llms link in the root layout so every exported HTML page advertises the file.
- Remove `src/lib/sitemap.js` after all consumers move to the shared manifest.

**Files:**

- `src/lib/public-artifacts.mjs` (new)
- `src/scripts/generate-public-artifacts.mjs` (new)
- `src/scripts/generate-sitemap.js` (remove after migration)
- `src/lib/sitemap.js` (remove after migration)
- `src/app/layout.jsx`
- `public/llms.txt` (new generated file)
- `public/robots.txt` (generated)
- `public/sitemap.xml` (generated)
- `package.json`
- `test/public-artifacts.test.mjs` (new)

**Success Criteria:**

- Running the generator twice with unchanged inputs produces byte-identical files.
- `llms.txt` is strict UTF-8, starts with one H1 and one blockquote, contains the three usage guidance labels, and links exactly the five canonical indexable URLs.
- `llms.txt` contains no `.txt` page payload link, `.md` link, `llms-full.txt`, disabled route, debug route, or thank-you route.
- `robots.txt` matches the policy table in Section 4.1 and contains one absolute sitemap URL.
- `sitemap.xml` contains exactly five unique `<loc>` values and no `lastmod`, `changefreq`, or `priority` elements.
- Every exported HTML document contains exactly one `rel="describedby"` link to `/llms.txt` with `type="text/plain"`.
- Unit tests compare pure renderer output with the checked-in files and fail when generated artefacts drift.
- Local and production checks return `200` for `/llms.txt`, `/robots.txt`, and `/sitemap.xml`. The plan accepts the GitHub Pages `Content-Type` and charset parameters as host-owned but requires correct text or XML media types and valid UTF-8 bytes.

### ~~Step 5: Complete Route Metadata and Safe Linked Structured Data~~ ✅ **COMPLETED**

**Objective:** Make each page self-describing and connect public identity, website, page, and service facts safely.

#### 5.1 High-Level Approach

- Add `metadataBase` to the root metadata and render `<html lang="en-AU">`.
- Add a `buildPageMetadata(routeKey)` helper that reads the shared manifest and emits:
  - title and description;
  - absolute self-canonical URL;
  - route-specific Open Graph title, description, URL, locale, site name, and correctly dimensioned image;
  - matching Twitter card fields and image alternative text;
  - `robots` settings from the route’s indexability.
- Refactor the homepage, about, process, contact, thank-you, test-mixpanel, privacy, and 404 metadata onto the helper.
- Preserve the exact contact metadata description: `Contact us to put your own AI shopping agent on your site.`
- Create `src/lib/structured-data.mjs` for graph construction and `src/components/StructuredData.jsx` for safe script output.
- Use stable identifiers:
  - `https://embeddings.au/#organisation`;
  - `https://embeddings.au/#website`;
  - each canonical page URL followed by `#webpage`;
  - service IDs under the process URL.
- Link each page to the website and organisation. Emit `AboutPage` and `ContactPage` subtypes where appropriate.
- Add stable IDs to the visible Foundation, Deploy, and Operate sections and derive service names and descriptions from their visible headings and paragraphs.
- Replace the homepage-only raw schema script with the safe shared component on all indexable routes.

**Files:**

- `src/app/layout.jsx`
- `src/app/page.jsx`
- `src/app/about/page.jsx`
- `src/app/process/page.jsx`
- `src/app/contact/page.jsx`
- `src/app/privacy/page.jsx`
- `src/app/thank-you/page.jsx`
- `src/app/test-mixpanel/layout.jsx`
- `src/app/not-found.jsx`
- `src/lib/metadata.js`
- `src/lib/structured-data.mjs` (new)
- `src/components/StructuredData.jsx` (new)
- `src/schemas/organization-schema.js` (remove after migration)
- `test/metadata-structured-data.test.mjs` (new)

**Success Criteria:**

- Every indexable exported HTML document has one unique title, one description, one absolute self-canonical URL, one route-specific `og:url`, and matching Twitter metadata.
- The contact title, metadata description, PageIntro title, PageIntro body, and contact side-panel copy remain byte-for-byte equivalent after HTML entity decoding.
- `/thank-you`, `/test-mixpanel`, and the 404 document emit `noindex, nofollow` and distinct titles.
- The social image file is actually `1200x630`, and metadata declares the same dimensions, actual MIME type, and one meaningful alternative text value.
- Every indexable route contains one parseable JSON-LD script with one linked graph and stable IDs.
- The graph contains no duplicate organisation or website node, no placeholder profile URL, and no unapproved identity field.
- Injecting a test value containing `<`, `</script>`, U+2028, and U+2029 into the serializer cannot terminate the script and still parses back to the original value.
- Process service nodes correspond to visible section IDs and visible service text.
- Structured-data tests parse the generated JSON rather than matching raw strings.

### ~~Step 6: Repair Accessibility Relationships and Add Safe Agent Form Semantics~~ ✅ **COMPLETED**

**Objective:** Make interactive state deterministic for accessibility trees and browser agents while preserving the current visual and form contracts.

#### 6.1 High-Level Approach

- Change the navigation toggle so `aria-controls` is supplied only while the panel is mounted. Keep it present during the closing transition because the target still exists.
- Retain the current `aria-expanded`, dialog name, modal state, focus trap, Escape handling, click handling, transition completion, and focus restoration.
- Give the footer navigation an explicit label. Convert each visible group label to a heading with a stable ID and connect its link list using `aria-labelledby`.
- Mark the complete `StylizedImage` SVG wrapper decorative with `aria-hidden="true"` and make the SVG unfocusable. Keep the adjacent process signal list available to the accessibility tree.
- Remove the server-rendered `noValidate` attribute from the contact form. Use a form ref and a hydration effect to set the DOM `noValidate` property only after the custom client validation is available.
- Add declarative WebMCP attributes:
  - form `toolname="prepare_business_enquiry"`;
  - a factual `tooldescription` that says the tool prepares an enquiry for review and manual submission;
  - `toolparamdescription` on the six public fields;
  - no tool attributes on hidden Formspree fields.
- Do not add `toolautosubmit`.
- Extend source and export checks for names, roles, H1 count, labels, required fields, hidden controls, ARIA references, and no-JavaScript fallback HTML.

**Files:**

- `src/components/NavigationButton.jsx`
- `src/components/RootNavigation.jsx`
- `src/components/RootNavigationPanel.jsx`
- `src/components/Footer.jsx`
- `src/components/StylizedImage.jsx`
- `src/app/contact/ContactForm.jsx`
- `test/root-navigation-loading-gap.test.mjs`
- `test/root-layout-inert-attribute.test.mjs`
- `test/contact-form-contract.test.mjs`
- `test/agent-accessibility-contract.test.mjs` (new)

**Success Criteria:**

- In the initial closed state, the toggle has `aria-expanded="false"` and no `aria-controls`; no absent target is referenced.
- In opening, open, and closing states, `aria-controls` resolves to the mounted panel ID. After exit completion it is removed with the panel.
- Keyboard focus cycles within the open navigation, Escape closes it, and the trigger regains focus after the exit transition.
- Footer groups have programmatic names matching their visible lowercase headings.
- Process photographs do not create unnamed image or graphics nodes, while the signal list and section text remain exposed.
- Server HTML contains all six named controls, correct types, `required`, autocomplete values, form action, and method, but no `novalidate`.
- After hydration, custom empty-field, invalid-email, 400, 429, network-error, loading, and success states behave as before and announce the correct messages.
- Exported contact HTML contains `prepare_business_enquiry` and parameter descriptions for exactly six public fields, with no `toolautosubmit` and no tool metadata on `_subject`, `_next`, or `_gotcha`.
- A no-JavaScript contact check triggers native required-field validation and retains the direct Formspree action.
- No real Formspree request is sent by verification.

### ~~Step 7: Remove Active-Route Framer Overhead and Defer Analytics Work~~ ✅ **COMPLETED**

**Objective:** Reduce shared and contact-route JavaScript without changing interaction timing, visual design, analytics events, or recording configuration.

#### 7.1 High-Level Approach

- Replace the Framer-powered menu and close icon with two always-mounted absolute spans whose CSS opacity, scale, blur, and visibility respond to `expanded`.
- Match the current `300 ms`, zero-bounce crossfade and preserve the button’s 44px mobile target, footprint, fill transition, label, and active state.
- Replace `AnimatePresence` and `motion` in `ContactForm.jsx` with a small focused transition-presence helper that:
  - keeps exiting content mounted until its CSS animation ends;
  - supports keyed error-summary and status transitions;
  - reproduces the current entry and exit opacity, translate, blur, scale, duration, easing, and error stagger;
  - does not use `requestAnimationFrame` or `prefers-reduced-motion`.
- Leave `GrayscaleTransitionImage.jsx` unchanged because it is outside active routes. Confirm that no active route references its Framer chunk.
- Change analytics triggers so pointer, keyboard, scroll, and the 12-second fallback schedule `startAnalytics` through the existing idle scheduler instead of importing during the triggering event.
- Select the installed Mixpanel core build when both recording and heatmaps are disabled. Select the full build when either feature is enabled, and pass recording-specific options only to that full build.
- Preserve page-view deduplication, referral tracking, contact event names, event properties, failure handling, and development disablement.
- Measure spontaneous Next.js RSC or link prefetch traffic on each tested route. If prefetch before hover, focus, or tap exceeds `25 KB` gzip, disable prefetch only on offscreen footer and low-intent links until the total is at or below `25 KB`; retain high-intent header and primary CTA behaviour.

**Files:**

- `src/components/NavigationButton.jsx`
- `src/components/TransitionPresence.jsx` (new, if the helper is shared)
- `src/app/contact/ContactForm.jsx`
- `src/instrumentation-client.js`
- `src/lib/mixpanelClient.js`
- `src/components/Footer.jsx` and other low-intent link owners only if measured prefetch crosses the threshold
- `test/ui-interaction-polish.test.mjs`
- `test/mixpanel-dynamic-loading.test.mjs`
- `test/active-route-bundle-contract.test.mjs` (new)

**Success Criteria:**

- No active route module imports Framer Motion, and the production bundle graph shows no Framer chunk referenced by `/`, `/about`, `/process`, `/contact`, `/privacy`, `/thank-you`, or 404 HTML.
- The navigation icon retains the current opacity, `0.25` to `1` scale, `4px` to `0px` blur, and 300 ms crossfade.
- Contact error, status, and icon transitions retain their current 300 ms entry, 150 ms exit, easing, and field-error stagger.
- All protected animation components remain byte-for-byte unchanged. If any protected animation file appears in the scoped diff, stop and remove that change unless the user explicitly expands scope.
- A scroll, pointer, or key event does not synchronously request the Mixpanel chunk. The request begins only inside the scheduled idle callback or its timeout.
- With recording `0` and heatmaps `false`, the built analytics path references the core Mixpanel build, contains no recorder chunk request, and stays at or below `70 KB` gzip.
- With recording or heatmaps enabled in a build fixture, the full build path initialises the configured recording options without changing event behaviour.
- Page views remain deduplicated across initial load, `pushState`, `replaceState`, and `popstate`.
- Cold-load network traces contain no synchronous third-party script and no more than `25 KB` gzip of speculative route payload before user intent.
- Route JavaScript meets every budget in Section 3.4.

### ~~Step 8: Generate Responsive Process Media and a Smaller Stable Font Path~~ ✅ **COMPLETED**

**Objective:** Reduce image and font transfer while preserving crop geometry, layout stability, social previews, and all existing animation behaviour.

#### 8.1 High-Level Approach

- Add a shared process-image manifest for whiteboard, laptop, and meeting sources.
- Add `src/scripts/generate-responsive-images.mjs` using the installed Sharp version to create deterministic AVIF and WebP candidates at `390`, `640`, `960`, and `1440` pixels wide under `public/images/process/`.
- Keep the existing sources in `src/images/process/` as the generation inputs. Do not delete unexpected or source assets.
- Replace the unoptimised Next `<Image>` inside `StylizedImage.jsx` with a semantic `<picture>` and an `<img>` fallback that preserve:
  - the existing SVG clip paths;
  - hover scale and grayscale treatment;
  - explicit rendered width and height;
  - layout breakpoint sizes;
  - decorative accessibility treatment.
- Make whiteboard eager with `fetchpriority="high"`; make laptop and meeting lazy with `decoding="async"`.
- Add a process-route preload whose `imagesrcset` and `imagesizes` exactly match the whiteboard candidates and rendered `sizes` value.
- Generate a true `1200x630` social image from the current approved artwork, keep it in `public/images/`, and update the shared metadata record to its actual format and dimensions.
- Add a reproducible font-subset script that invokes `pyftsubset` through `uvx` with FontTools pinned to `4.63.0`, explicit input and output paths, WOFF2 output, preserved variable-font layout features, and Unicode ranges covering Basic Latin, Latin-1 Supplement, Latin Extended-A, General Punctuation, currency symbols, and arrows.
- Create a Latin-focused Mona Sans variable WOFF2 from the existing source. Verify that its ranges cover every character in enabled pages, components, metadata, generated discovery files, form states, and British English punctuation used by the application.
- Retain the full source font for regeneration, but reference only the subset from active CSS.
- Commit the generated subset. Do not add Python or `uvx` to the production build path; regeneration is an explicit maintainer action and the Node export validator checks the committed result.
- Derive `size-adjust`, `ascent-override`, `descent-override`, and `line-gap-override` from Mona Sans and the selected system fallback. Do not guess these values.
- Keep `font-display: swap` and do not preload the font unless a measured three-run comparison shows that it improves LCP without increasing CLS or delaying the process LCP image.

**Files:**

- `src/lib/process-image-config.mjs` (new)
- `src/scripts/generate-responsive-images.mjs` (new)
- `src/components/StylizedImage.jsx`
- `src/app/process/page.jsx`
- `public/images/process/*` (generated)
- `public/images/embeddings-agentic-shopping-1200x630.*` (new generated social image)
- `src/lib/site-config.mjs`
- `src/fonts/Mona-Sans-latin.var.woff2` (new generated subset)
- `scripts/generate-font-subset.mjs` (new)
- `src/styles/base.css`
- `test/responsive-process-images.test.mjs` (new)
- `test/font-display-swap.test.mjs`

**Success Criteria:**

- Each process source produces AVIF and WebP files at exactly `390`, `640`, `960`, and `1440` pixels wide with preserved aspect ratio.
- Running image generation twice produces byte-identical outputs with the pinned Sharp version and settings.
- Browser network traces select an AVIF candidate when supported and fall back to WebP when AVIF is unavailable.
- The process `<picture>` has explicit dimensions and produces no image-driven layout shift.
- The whiteboard preload uses the same candidate URLs and `sizes` string as the rendered image.
- Laptop and meeting are not requested before they approach the viewport.
- The selected desktop whiteboard candidate is at or below `150 KB`; the selected mobile candidate is at or below `90 KB`; the three selected images for one full-page session total at or below `300 KB`.
- The process page meets the desktop and mobile first-view transfer budgets in Section 3.4.
- The social image is exactly `1200x630`, stays at or below `300 KB`, and metadata dimensions and MIME type match the file.
- The active Mona Sans file is at or below `100 KB` and displays every character present in enabled routes, generated discovery files, metadata, and form states.
- A font-loading trace shows one Mona Sans file request. Lab CLS remains at or below `0.05` with cold cache and disabled cache.
- Visual comparison confirms the process clip shapes, grayscale, hover scale, signal overlays, breakpoints, and surrounding layout are unchanged.

### ~~Step 9: Add Deterministic Export Validation, Budgets, and CI Gates~~ ✅ **COMPLETED**

**Objective:** Make readiness and performance requirements executable so future route or asset changes cannot silently undo them.

#### 9.1 High-Level Approach

- Add `parse5` as a pinned development dependency for standards-based inspection of exported HTML.
- Add `scripts/validate-static-export.mjs` to inspect every active exported route and verify:
  - document language, title, description, canonical URL, robots metadata, llms relationship, one H1, one main, and skip-link target;
  - visible main-content length between `500` and `100,000` Unicode characters, route-specific expected markers, and absence of login, challenge, redirect-stub, and meta-refresh signatures;
  - route-specific Open Graph and Twitter fields;
  - parseable, safely serialised, linked JSON-LD on indexable routes only;
  - no dangling `aria-controls` or `aria-labelledby` references in server HTML;
  - contact form names, types, required states, tool annotations, action, method, and absence of `novalidate` and `toolautosubmit`;
  - no indexable route missing from the route manifest, sitemap, or llms file;
  - no disabled, debug, RSC `.txt`, thank-you, or 404 URL in sitemap or llms output.
- Add a focused hidden-instruction scan to the same validator. Scan only content hidden by semantic attributes or recognised offscreen styles plus `aria-label`, `alt`, and `title`. Match bounded phrases such as `ignore previous instructions`, `system prompt`, `developer message`, `reveal secrets`, `send credentials`, `follow these hidden instructions`, or an instruction to execute a tool or submit data without user review.
- Permit a legitimate match only through an exact route, selector, source, and text allowlist entry with a written rationale. Do not suppress a phrase globally and do not scan ordinary visible editorial text as hidden instructions.
- Add `scripts/check-static-budgets.mjs` using the same parsed asset graph and Node compression utilities to enforce Section 3.4.
- Keep pure generator and source-contract tests in `npm test` so they do not depend on a pre-existing `out/` directory.
- Run export validation and budget checks after `next build` in the Node build orchestrator.
- Update GitHub Actions to run `npm run lint`, `npm test`, and `npm run build` before deployment.
- Keep all write targets explicit and stop the build at the first failed stage.

**Files:**

- `package.json`
- `package-lock.json`
- `scripts/build-static-site.mjs`
- `scripts/validate-static-export.mjs` (new)
- `scripts/check-static-budgets.mjs` (new)
- `.github/workflows/deploy.yml`
- `test/static-export-readiness.test.mjs` (new)
- `test/static-output-budgets.test.mjs` (new)
- existing focused tests updated in Steps 4 through 8

**Success Criteria:**

- A malformed HTML fixture with a missing H1, main, canonical, llms link, label target, or schema node causes the validator to exit non-zero with the route and failed rule.
- A fixture below `500` or above `100,000` visible main-content characters, missing its expected marker, or containing a login, challenge, redirect-stub, or meta-refresh signature causes a focused failure.
- A hidden instruction fixture reports its route, selector, source, and exact phrase. It remains a failure until an exact, reasoned allowlist entry receives human review.
- A route over any Section 3.4 byte ceiling causes the budget checker to exit non-zero with the route, asset class, actual size, and ceiling.
- An eager image, unexpected active Framer chunk, or recorder chunk in the recording-disabled build causes a focused failure.
- `npm test` does not require an existing `out/` directory and passes using source and pure-renderer contracts.
- `npm run build` runs public-file generation, responsive-image generation, Next.js static export, export validation, and budget validation in that order.
- The GitHub Actions deployment step cannot run unless lint, all Node tests, static export validation, and budgets have passed.
- The workflow contains no duplicate generator invocation or destructive clean command.
- The validated export contains `index.html`, `about.html`, `process.html`, `contact.html`, `privacy.html`, `thank-you.html`, `test-mixpanel.html`, `404.html`, `llms.txt`, `robots.txt`, and `sitemap.xml` in the paths produced by the current Next.js static-export configuration.

### ~~Step 10: Verify the Real Interface, Agent Paths, and Performance~~ ✅ **COMPLETED**

**Objective:** Prove the generated contracts in a browser and confirm that byte reductions did not alter user-facing behaviour.

#### 10.1 High-Level Approach

- Verify port `3002`; use the existing app if healthy or start `npm run dev` from the explicit repository path.
- Use `dev-browser` for desktop `1440x900` and mobile `390x900` checks on `/`, `/about`, `/process`, `/contact`, `/privacy`, `/thank-you`, `/test-mixpanel`, and an unknown route.
- Inspect accessibility trees and DOM state for:
  - skip-link movement;
  - single main and H1;
  - initial, opening, open, closing, and closed navigation states;
  - keyboard focus order, trap, Escape, and restoration;
  - footer labels and privacy link;
  - decorative process imagery and exposed signal text;
  - contact form labels, descriptions, required state, WebMCP annotations, error summary, and live status.
- Mock Formspree responses in the page for `200`, `400`, `429`, and network failure. Never transmit the sample enquiry.
- Check no-JavaScript server HTML separately for primary content, links, form fields, native constraints, and recovery navigation.
- Check horizontal overflow, console errors, page errors, failed requests, offscreen content, and changed elements at both viewports.
- Use the production static byte and dependency budgets as the pre-release performance gate. Do not treat a Next.js development-server Lighthouse score as production evidence.
- Treat Chrome’s agentic browsing audit as supporting evidence when the installed Chrome version exposes it. Do not make an experimental score or WebMCP browser implementation a release gate; the underlying deterministic DOM and export checks remain the gate.
- After an explicitly authorised push and successful GitHub Pages deployment, run three cold-cache mobile Lighthouse measurements per public route against `https://embeddings.au`. Use the median and record the LCP element, LCP resource, CLS sources, long tasks, total blocking time, transfer size, and request chain.

**Success Criteria:**

- All required routes render at both viewports with no horizontal overflow, uncaught console error, page error, or unexpected failed request.
- Navigation semantics and keyboard behaviour meet every criterion in Step 6 throughout enter and exit transitions.
- Contact validation and mocked result states meet every criterion in Step 6 without sending data to Formspree.
- With JavaScript unavailable, each indexable route retains its primary content and links, and the contact form retains native constraint validation and its direct action.
- Every initial and deferred network request is classified as required content, interaction code, responsive media, or delayed analytics; no unexplained eager chunk remains.
- After the authorised production deployment, the median Lighthouse results meet the lab LCP, CLS, and total blocking time ceilings in Section 3.4.
- Static output meets every byte budget in Section 3.4.
- Screenshots at `1440x900` and `390x900` show unchanged protected animations and layouts, the new privacy route, and correct contact and navigation states.
- Production returns `200` for the five indexable routes and three discovery files, `404` for an unknown route, and includes `noindex, nofollow` on thank-you, test-mixpanel, and 404 HTML.
- GitHub Pages header limitations are reported as host-owned facts. No unsupported header, cache, or content-negotiation claim appears in the completion report.
- The final scoped diff contains no unintended copy change, protected animation change, inline desktop navigation, host migration, API, or server runtime.

### ~~Step 11: Synchronise Documentation and Complete the Release Review~~ ✅ **COMPLETED**

**Objective:** Leave repository policy and implementation evidence consistent with the delivered static site.

#### 11.1 High-Level Approach

- Update the Next.js version statement in `AGENTS.md` to match `package-lock.json`.
- Document the new public artefact generator, static validation gate, and performance budgets in comments adjacent to the scripts and configuration rather than creating a competing architecture document.
- Do not update `documents/agentic-shopping-positioning.md`.
- Do not update `documents/service-section-animations.md` because the intended work does not change service animations. If the scoped diff shows a service animation behaviour change, update that document before completion or remove the unintended code change.
- Review the complete scoped diff, generated artefacts, lockfile changes, and CI workflow before requesting release.
- Preserve unrelated collaborator changes and do not stage, revert, or include them unless separately authorised by the git rules.
- Do not push or deploy until the user explicitly authorises the push.

**Success Criteria:**

- `AGENTS.md`, `package.json`, and `package-lock.json` agree on the active Next.js major.
- Generator, serializer, accessibility, image, font, analytics, and budget code contains clear imperative comments for critical logic and edge cases.
- `documents/agentic-shopping-positioning.md` is unchanged.
- `documents/service-section-animations.md` is unchanged when protected service animation behaviour is unchanged.
- `git diff --check` reports no whitespace errors.
- The complete scoped diff contains only files named by this plan or directly required focused tests.
- `npm run lint`, `npm test`, and `npm run build` all exit with code `0` after the final diff.
- The completion handoff reports changed files, exact automated results, browser scenarios, performance results, screenshots, production checks if authorised, and any host-owned limitation that remains.

---

## 6. Testing Plan

### 6.1 Focused Automated Tests

Run focused tests during each implementation step:

1. `node --test test/site-config.test.mjs`
   - Reject duplicate routes, missing discovery fields, conflicting indexability, and unverified social profiles.
2. `node --test test/public-artifacts.test.mjs`
   - Check deterministic llms, robots, and sitemap renderers and checked-in output parity.
3. `node --test test/metadata-structured-data.test.mjs`
   - Check route metadata, canonical URLs, schema graph links, and serializer escaping.
4. `node --test test/contact-form-contract.test.mjs test/agent-accessibility-contract.test.mjs`
   - Check the six-field contract, no-JavaScript constraints, WebMCP safety, and ARIA relationships.
5. `node --test test/mixpanel-dynamic-loading.test.mjs test/active-route-bundle-contract.test.mjs`
   - Check idle scheduling, core or full bundle selection, recorder exclusion, and active Framer references.
6. `node --test test/responsive-process-images.test.mjs test/font-display-swap.test.mjs`
   - Check image variants, priority or lazy attributes, preload parity, font swap, and font size.
7. `node --test test/static-export-readiness.test.mjs test/static-output-budgets.test.mjs`
   - Check validator and budget failure fixtures.

### 6.2 Required Repository Validation

Run each command from `/Users/sacino/embeddings` under Node.js `22.17.0` unless the separate runtime upgrade plan has already changed the repository contract:

- `npm run lint` must exit with code `0` and zero ESLint errors.
- `npm test` must exit with code `0` with every Node test passing.
- `npm run build` must exit with code `0`, generate the static site, validate all exported documents, and enforce all budgets.

If the Node runtime plan lands first, use its new exact runtime rather than weakening either plan’s version guard.

### 6.3 Static Artefact Verification

For each generated build:

- Parse the five indexable HTML documents and verify language, title, description, canonical, social metadata, one H1, one main, llms relationship, and JSON-LD graph.
- Count visible main-content Unicode characters, enforce the `500` to `100,000` range, and verify route-specific expected markers.
- Parse thank-you, test-mixpanel, and 404 HTML and verify distinct titles plus `noindex, nofollow`.
- Verify the contact form’s server HTML contract, native constraints, safe tool annotations, and hidden-field exclusion.
- Scan hidden or offscreen content and `aria-label`, `alt`, and `title` for bounded instruction-injection phrases and review every reported match.
- Parse `llms.txt`, `robots.txt`, and `sitemap.xml` against the route and crawler configuration.
- Verify strict UTF-8 and stable line endings.
- Verify that all canonical links and public artefact links resolve to generated routes or files.
- Measure raw, gzip, and Brotli sizes and enforce the budgets in Section 3.4.

### 6.4 Browser Scenarios

At both `1440x900` and `390x900`:

1. **Homepage**
   - Use the skip link.
   - Open and close the navigation with pointer and keyboard.
   - Check focus restoration and the accessibility tree.
   - Scroll through every protected animation and compare timing, triggers, content, and layout with the baseline.
2. **About**
   - Check H1 and heading order, source links, footer group labels, privacy link, and no overflow.
3. **Process**
   - Check the responsive image selected at each viewport.
   - Confirm only whiteboard is eager, later images load near the viewport, decorative images stay out of the accessibility tree, and signal lists remain exposed.
4. **Contact**
   - Check labels, descriptions, required state, autocomplete, WebMCP attributes, and keyboard order.
   - Trigger empty and invalid-email errors.
   - Mock loading, success, 400, 429, and network-failure outcomes.
   - Confirm error and status announcements and focus movement.
5. **Privacy**
   - Check all headings, links, public contact method, content width, and footer navigation.
6. **Thank-you and test-mixpanel**
   - Confirm unique titles and `noindex, nofollow`.
7. **Unknown route**
   - Confirm a 404 response, unique title, and working recovery links.

For every route, inspect console errors, page errors, request failures, horizontal overflow, and offscreen changed elements.

### 6.5 Performance Scenarios

- Run cold-cache and repeat-view traces.
- Run three mobile Lighthouse passes and use the median, not the best result.
- Record the LCP element and resource, CLS sources, long tasks, main-thread work, request chain depth, initial JavaScript, CSS, font, selected images, and deferred analytics.
- Trigger scroll before idle and prove the Mixpanel request waits for the scheduled idle callback.
- Test recording-disabled and recording-enabled build fixtures.
- Inspect RSC or route prefetch before hover, focus, or tap and enforce the `25 KB` threshold.
- Confirm repeat navigation does not duplicate page-view analytics or reload shared chunks unnecessarily.

### 6.6 Production Verification After Authorised Deployment

- Wait for the GitHub Actions deployment to complete and verify every required check.
- Verify `https://embeddings.au/`, `/about`, `/process`, `/contact`, and `/privacy` return `200`.
- Verify an unknown route returns `404`.
- Verify `/llms.txt`, `/robots.txt`, and `/sitemap.xml` return `200` and their deployed bytes match the build artefacts.
- Verify canonical URLs, social metadata, JSON-LD, and noindex directives in production HTML.
- Compare ordinary-browser requests with each configured search and retrieval user-agent. Require matching final status, content type, H1, canonical URL, and route-specific main-content markers.
- Run the final three-pass Lighthouse measurements against production.
- Check field Core Web Vitals when sufficient public data exists. Report “insufficient field data” when no reliable p75 dataset is available rather than treating lab data as field data.
- Report GitHub Pages cache and response-header behaviour as observed. Do not claim application control over those headers.

---

## 7. Explicitly Out of Scope

- Converting any route or component to Astro.
- Moving from GitHub Pages or adding Cloudflare, another CDN, a reverse proxy, an edge worker, or a server runtime.
- Same-URL Markdown content negotiation, Markdown page mirrors, `llms-full.txt`, `Vary: Accept`, `406` representation handling, or a Markdown-specific 404.
- Custom response security or caching headers that GitHub Pages cannot apply.
- API routes, databases, authentication, accounts, or server-side form handling.
- Changing contact form fields, contact copy, contact route, Formspree destination, or the empty trailing contact `Border` placeholder.
- Adding inline desktop navigation or changing lowercase navigation and footer labels.
- Rewriting marketing positioning, adding unsupported claims, or adding unverified social profiles, people, addresses, clients, testimonials, ratings, or performance claims.
- Replacing, simplifying, removing, or changing protected frontpage animations.
- Sending live contact submissions during testing.
- Pushing, deploying, or changing Git history without explicit user authority.

---

## 8. Implemented Solution

Completed and released on 30 August 2026 from `main` at commit `4d742d2`.

### 8.1 Implemented Locally

- Added one site, route, crawler, metadata, social-image, and JSON-LD source of
  truth. The active manifest contains five indexable routes and three explicit
  non-indexable documents.
- Added deterministic generators for `llms.txt`, `robots.txt`, `sitemap.xml`,
  process AVIF and WebP candidates, the social image, and the Mona Sans subset.
- Added the server-rendered `/privacy` route and footer link. At the owner’s
  direction, the final page follows Shoppa Root’s general policy structure. It
  describes information categories, business enquiries, purposes, service
  provider roles, reasonable retention, user choices, and the privacy contact
  without naming analytics or form providers or account-specific settings.
- Added route-specific metadata and linked `Organization`, `WebSite`, `WebPage`,
  `AboutPage`, `ContactPage`, and `Service` JSON-LD nodes. Unverified address,
  telephone, social-profile, people, rating, and performance fields remain
  omitted.
- Added safe WebMCP annotations to the six public contact fields. The form still
  requires manual submission and contains no `toolautosubmit` path.
- Repaired navigation, footer, process-image, contact validation, focus, and
  status semantics. The primary and footer navigation landmarks now have
  distinct programmatic names.
- Removed active-route Framer Motion use for the navigation and contact states.
  Deferred analytics starts through the idle scheduler, retains navigation
  events that occur before Mixpanel loads, and selects exactly one Mixpanel
  loader at build time.
- Added responsive process media, a shape-aware whiteboard `sizes` value, a true
  `1200x630` social image, separate `19,168` byte body and `21,224` byte display
  Mona Sans subsets, route-specific preloads, and derived Arial fallback metrics.
- Added export validation, hidden-instruction scanning, route and asset budgets,
  recorder exclusion, explicit sequential build orchestration, and deployment
  gates for lint, tests, build, and static validation.

### 8.2 Automated and Audit Evidence

- `npm run lint` passed with zero warnings and zero errors.
- `npm test` passed all `155` tests.
- `npm run build` generated the public files and responsive media, exported all
  eight HTML documents, validated the export, and passed every static budget.
- A separate recording-enabled build passed the full Mixpanel package budget.
  The final default build contains no `EMBEDDINGS_MIXPANEL_FULL_CHUNK` marker.
- The final independent accessibility, discovery, and performance sweep is
  consolidated in
  `documents/todo/bugs/codex/combined_bug_sweep_20260830_a7c92f10.xml` and passes
  the shared XML validator. Five technical findings were fixed. The remaining
  privacy finding was resolved on 30 August 2026 when the owner directed the
  page to omit provider-specific retention details and use general policy copy
  modelled on Shoppa Root.
- Current gzip JavaScript is `162,739` bytes on `/`, down from `196,437` bytes
  in the saved static baseline. `/process` is `158,240` bytes, down from
  `192,406` bytes. The current measured first-view transfer is `304,427` bytes
  on `/` and `338,932` bytes on `/process`, including the font and selected
  process image under the revised measurement model.

### 8.3 Browser Evidence

- Desktop `1440x900` and mobile `390x900` checks covered all eight routes and an
  unknown route. They found one H1 and one main on public pages, no horizontal
  overflow, no uncaught console error, and no page error.
- Navigation checks confirmed the `Primary navigation` landmark, the `Site
  navigation` dialog name, Escape handling, focus containment, and focus return
  to `Open navigation` after exit.
- Contact checks covered native server constraints, blank and invalid values,
  loading, success, `400`, `429`, and network-failure states without sending a
  Formspree submission.
- At `390x900`, the whiteboard slot rendered at `311.53` CSS pixels, selected the
  `390` AVIF candidate in the DPR 1 browser, and matched the shape-aware `sizes`
  value. Desktop rendered at `655.89` CSS pixels. Both viewports had zero
  horizontal overflow.
- Port `3002` was occupied by an unrelated HyperFrames process. The final local
  interface verification used the same application on port `3003` and closed
  its task-owned browser and development server afterward.
- Retained screenshots:
  - `/Users/sacino/.dev-browser/tmp/emb-agent-readiness-final-mobile-process.png`
  - `/Users/sacino/.dev-browser/tmp/emb-agent-readiness-final-mobile-navigation-open.png`
  - `/Users/sacino/.dev-browser/tmp/emb-privacy-final-mobile.png`
  - `/Users/sacino/.dev-browser/tmp/emb-privacy-final-desktop.png`

### 8.4 Production and Lighthouse Evidence

- Three production mobile Lighthouse baseline runs are stored under
  `/Users/sacino/Documents/codex/web-performance/embeddings/agent-readiness-20260830/before/`.
  Their median is Performance `96`, Accessibility `95`, Best Practices `100`,
  SEO `100`, LCP `2,558 ms`, CLS `0.0008`, TBT `31 ms`, and transfer
  `372,885` bytes.
- The final release contains three cold production mobile Lighthouse runs for
  each of `/`, `/about`, `/process`, `/contact`, and `/privacy`. The reports and
  median summary are stored under
  `/Users/sacino/Documents/codex/web-performance/embeddings/agent-readiness-20260830/after/`.
- Final medians are Performance `99` to `100`, Accessibility `100`, Best
  Practices `100`, SEO `100`, LCP `1,714` to `1,950 ms`, TBT `8` to `15 ms`,
  and no automated accessibility failures on any route.
- The homepage improved from Performance `96` to `99`, Accessibility `95` to
  `100`, FCP `1,658` to `1,201 ms`, LCP `2,558` to `1,908 ms`, TBT `31` to
  `8 ms`, and transfer `372,885` to `279,040` bytes.
- GitHub Actions run `33309614149` passed install, lint, tests, build, static
  validation, budgets, and deployment. Production smoke checks confirmed all
  five public routes and three discovery artefacts, the final font assets,
  canonical metadata, schema, crawler parity, and unknown-route `404` behaviour.
- GitHub Pages still owns response security and cache headers. The workflow also
  reports that three third-party actions target the deprecated Node.js 20 action
  runtime and are currently forced onto Node.js 24 by GitHub.
