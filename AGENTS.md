<project_details>

<description>
These rules apply specifically to this repository and should be used for all code within this project scope.
</description>

<site_positioning>
- Current state (since 13 October 2026): Embeddings is positioned as broad, implementation-first AI consulting for organisations. The offer is knowledge assistants, customer chatbots, workflow automation, system integration and agent orchestration, plus deploying, operating and improving what is built.
- E-commerce is one specialism, shown in the homepage `#ecommerce` section with the shopping demo. Shoppa (shoppa.au) is a separate packaged product, mentioned only through `ShoppaCard.jsx`; never make Embeddings read as the Shoppa product or add Shoppa feature, setup or pricing claims.
- Read `documents/site-positioning.md` before changing messaging, page structure or metadata. It holds the page-by-page structure, messaging rules and the evidence rule for claims. `documents/agentic-shopping-positioning.md` is superseded history.
</site_positioning>

<content_rules>
- All text must be in British English
- Use ’ instead of ' as an apostrophe on any frontend words (words that display to the user). e.g. Let’s, not Let's, businesses’, not businesses'
- Main navigation and footer link labels are intentionally lowercase. Preserve this stylistic choice unless the user explicitly requests a label casing change.
</content_rules>

<navigation_rules>
- The global header is intentionally minimal on every viewport: logo, Contact us CTA, and menu trigger only. Do not add inline desktop navigation unless explicitly requested; route discovery belongs in `src/components/site/NavigationPanel.astro` and `src/components/site/Footer.astro`, keeping first-viewport hero chrome focused.
</navigation_rules>

<contact_form_rules>
- Preserve the contact form field contract unless the user explicitly requests a field model change.
- The business enquiry form fields are: name, email, company, phone, message, and budget.
- Frontend improvements may change layout, styling, focus states, loading states, error states, success states, and fallback behaviour, but must not replace the field contract with catalogue-readiness, SKU, platform, feed source, or priority fields without explicit approval.
- Keep the contact route and contact form helper copy broad and concise. Do not add catalogue-readiness-specific form guidance or contact side-panel "what happens next" workflow content unless the user explicitly requests that messaging change.
- Preserve the stable contact page copy unless the user explicitly requests copy changes. The contact metadata description must stay "Contact us to learn how we can integrate AI into your business.", the contact PageIntro title must stay "Your AI advantage starts here", and the PageIntro body must stay "Ready to put AI to work in your business? Tell us about the work and the systems behind it, and we’ll map a practical path to a live system."
- Preserve the existing contact details side panel copy and structure unless the user explicitly requests copy changes. Keep "our offices", "We’re based in Perth and Melbourne, and work with clients all over Australia.", "email us", and "business enquiries"; do not add new trust, process, readiness, workflow, or "what we handle" copy to that side panel without explicit approval.
- Preserve the intentionally empty trailing `Border` placeholder in `src/components/site/contact-ContactDetails.astro` unless the user explicitly requests its removal.
</contact_form_rules>

<code_standards>
- Give fully coded solutions to each problem without skipping lines.
- You must separate distinct functions and classes by two new lines.
- Database identifiers (tables, columns, indexes, constraints, enums) MUST be camelCase; never introduce snake_case/underscores, even in migrations or raw SQL literals.
- Any retained React/Next.js reference edits MUST follow the `vercel-react-best-practices` skill. Read this before writing any such code.

<animation_standards>
**NEVER add `prefers-reduced-motion` checks or similar accessibility media query conditionals to animation code.** Animations must work consistently for all users, so do not gate/short-circuit IntersectionObserver setup with accessibility or timing conditionals (including `requestAnimationFrame` wrappers).
**Do not replace, simplify, remove, or rewrite existing frontpage animations unless the user explicitly asks for that exact animation change.** This includes `HeroAssistantConversation.jsx` (staggered reveal), `AgentConversationShowcase.jsx` (staggered conversation reveal, edit caret, and publish/live crossfade), and the unrendered `HeroDataFlow.jsx`, `CatalogueTransformation.jsx` and service timeline animations. The `ContactSection.jsx` floating snippets were removed at the owner’s request in October 2026. These animations are essential to the site experience; performance work must preserve the existing animation design.
</animation_standards>

Read the below only when asked to create git commit messages:
<git_commit_guidelines>
git commit guidelines are documented in `.cursor/rules/git-commit-message-format.mdc`
</git_commit_guidelines>

<commenting_standards>
- Write **clear, thorough comments** to explain the purpose and function of all code sections.
- Provide context so that both humans and language models can understand the logic and rationale.
- Code must be well-commented using the imperative mood (e.g., "Return", "Compute", "Find", etc.).
- ALWAYS document critical logic, especially complex algorithms, business rules, and edge cases.
</commenting_standards>

<code_architecture>
Split distinct functionalities into separate modules and files, keeping code modular and focused
</code_architecture>

</code_standards>

<key_templates>
src/
├── components/
│   ├── RootLayout.jsx: Main navigation and site structure
│   │   └── Navigation(): Main nav items
│   │   └── Header(): Minimal logo, Contact us CTA, and menu trigger; no inline desktop nav by design
│   ├── HeroAssistantConversation.jsx: Homepage hero visual — a general assistant answering from business systems, then completing follow-up work (CSS-only staggered reveal)
│   ├── CapabilityBento.jsx: Homepage "what we build" grid of the five AI capabilities
│   ├── EngagementTimeline.jsx: Homepage "how we work" timeline (Discover, Build, Deploy, Operate)
│   ├── ShoppaCard.jsx: Shoppa-branded pointer to shoppa.au for retailers who want a ready-made product
│   ├── HeroDataFlow.jsx: Animated SVG showing catalogue → your agent → your customer flow (not currently rendered; kept for reuse)
│   ├── AgentConversationShowcase.jsx: Shopping demo in the homepage e-commerce section — branded conversation storyboard (discovery → checkout → order status), self-service control strip, analytics tiles, and capability chips
│   ├── CatalogueTransformation.jsx: Before/after catalogue cards with a four-step service pipeline (not currently rendered; kept for reuse)
│   ├── ContactSection.jsx: Closing call to action shared by the homepage, about and process pages — light split panel asking "Where could AI take work off your team?"
│   ├── Testimonial.jsx: Testimonial section with light and dark variants
│   ├── Footer.jsx: Footer structure and links
│   │   └── navigation[]: Footer sections and links
│   ├── Logo.jsx: Site logo and hover states
│   │   └── socialMediaProfiles[]: Social platform links
│   └── Offices.jsx: Office location information
├── lib/
│   └── images.ts: Featured image configuration for social sharing/meta tags
├── app/
│   ├── page.jsx: Homepage for broad AI consulting: hero with assistant conversation, what we build (`#services`), e-commerce specialism with the shopping demo and Shoppa card (`#ecommerce`), how we work (`#how-we-work`), and CTA
│   ├── about/
│   │   └── page.jsx: About page — "Solutions, not slideshows" implementation-first story, what sets us apart, and expertise cards
│   ├── process/
│   │   └── page.jsx: Process page — Discover, Build, Deploy, Operate stages (matching the homepage timeline), each with a "You get" deliverable, then values
│   ├── contact/
│   │   ├── page.jsx: Contact page layout and static content ("Your AI advantage starts here")
│   │   ├── ContactForm.jsx: Interactive contact form (Client Component)
│   │   └── ContactDetails.jsx: Office locations and contact info
│   └── test-mixpanel/
│       └── page.jsx: Internal Mixpanel debug page for analytics checks
└── images/
    ├── clients/: Client logos and case studies
    └── team/: Team member photos

<disabled_pages>
src/app/_disabled_pages/
├── work/: Case studies and portfolio (currently disabled)
└── blog/: Blog posts and articles (currently disabled)
</disabled_pages>

</key_templates>

<technical_requirements>
- Astro 7.3.8 with prerendered documents and the narrow Cloudflare contact endpoint
- Tailwind CSS for styling
- Node.js v22.17.0 required
- Cloudflare Workers Builds is the selected sole release controller; hosted setup and cutover remain pending acceptance.
- Static documents build to `dist/`; the request-time bundle stays outside public assets in `.astro-server/`.
- Deploy only the adapter-generated `.astro-server/wrangler.json`, with isolated inactive previews from `.astro-server/wrangler.preview.json`.
- The Worker owns `/api/contact/`, old no-slash redirects, and selection between prebuilt HTML/Markdown; no document is server-rendered.
- The old Pages artefact and Next source remain as rollback references until canonical and mailbox acceptance. Never republish Pages from the migrated root commands.
- Image Handling:
  - Featured image must be in public/images/ for direct URL mapping
  - All other images must be in src/images/ for optimization
  - Featured image configuration in src/lib/images.ts
  - Image paths must use forward slashes (/)
- Component architecture: use Astro markup and native controls; processed TypeScript owns the menu, contact state and guarded analytics. Do not add a hydrated application shell.
- Read `documents/AGENTS/code-standards.md`, `metadata.md`, `site-configuration.md`, `third-party-scripts.md`, `agent-readiness.md` and `testing.md` when changing their corresponding owners.

</technical_requirements>

<environments>
- Development: `npm run dev` starts foreground Astro at `http://localhost:3002`. Verify listener ownership first. `--ignore-lock` prevents automatic agent backgrounding; stop only the foreground process you start.
- Candidate comparison: `npm run dev:astro` at explicit free port `3003`.
- Production-shaped local review: `npm run build`, then foreground `npm run worker:dev` at `http://127.0.0.1:8794`. Its `.astro-local/` provider fixtures are isolated from hosted configs and cannot send real mail.
- Selected production: Cloudflare Workers `embeddings`, account `213ab3604485056376263d22fa242742`, domain `embeddings.au`; setup and DNS cutover require the recorded acceptance/authority gates.
- Current live production remains GitHub Pages until cutover acceptance. Read `documents/cloudflare-workers-hosting.md` for actual identities, before-state and rollback.
</environments>

System architecture documentation (IMPORTANT):
<system_architecture_documentation>

Read the relevant system or operating guide before changing its area.

- `documents/service-section-animations.md`: Technical reference for how the service section animations work (timing, triggers, and implementation behaviour).
- `documents/cloudflare-workers-hosting.md`: Worker routing, contact providers, release controls, DNS snapshots and rollback.
- `documents/AGENTS/`: Astro owner and lifecycle guidance routed above.
- `documents/site-positioning.md`: Current marketing positioning, page-by-page structure, Shoppa boundary and messaging rules.
- `documents/agentic-shopping-positioning.md`: Superseded owned-shopping-agent positioning, kept as history only.

Documentation update rules:
- Update `documents/service-section-animations.md` whenever code changes affect the service section animations.
- Update `documents/site-positioning.md` whenever page structure, headings, section anchors or site-wide messaging change.
- Do not update `documents/agentic-shopping-positioning.md`; it is historical.

</system_architecture_documentation>

<testing_rules>

<test_selection>
- Run the existing lint, Node tests and static build once for each change. `npm test` discovers only this site's `test/*.test.mjs`; ignored video projects use their own checks.
- Prefer a few E2E tests for core flows or bugs likely to recur. Do not add a test unless it catches a concrete defect that an existing check misses.
- Never write unit tests after the implementation or fix they cover. When isolation is necessary, first document failure modes, why E2E cannot expose them and independent expected outcomes; write the tests before implementation.
- Preserve exact values only when changing them harms a user, operator or external consumer, such as protocol values, computed amounts, legal commitments or accessibility minimums. Design documents do not make wording, classes, colours, geometry or private source names a contract.
- When an intentional copy, layout or refactor change breaks an incidental assertion, remove it or narrow it to observable meaning. Never re-pin the new literal. Inspect presentation on the affected rendered page.
- The remaining source guards each have a specific defect recorded in `documents/learnings/remove-superfluous-tests.md`; they do not authorise new source-shape checks.
- Run `scripts/browser/contact-about-navigation.dev-browser.js` for navigation changes and runtime upgrades. It checks the real contact-to-about menu flow and request/page errors without pinning copy. Inspect only the changed surface for other UI work, using the relevant responsive viewports below.
- Keep a run record only for a bug reproduction or a plan's final acceptance check. Summarise other checks in the reply; keep raw output Git-ignored or in browser-tool temp storage, inspect it before reporting, and Trash task-owned output after acceptance.
</test_selection>

<validation_commands>
Required validation before reporting completion:
- `npm run lint` - Astro/TypeScript ESLint checks (must pass with zero errors)
- `npm run build` - Astro static output, Worker packaging and byte budgets (must complete without errors)
- `npm run check` - generated Worker bindings and Astro/type checks
- `npm run test:http -- http://127.0.0.1:8794` - actual Worker HTTP contract
- `npm test` - all Node.js tests in `test/*.test.mjs`
- `node --test test/<file>.test.mjs` - run a specific test file
</validation_commands>

<dev_server_policy>
LOCAL DEV SERVER POLICY (CRITICAL):
- Assume the app is already running on `http://localhost:3002`.
- Always verify port `3002` before any `dev-browser`, `agent-browser`, or manual browser testing.
- If it is not running, start it exactly like `.vscode/launch.json`: run `npm --prefix /Users/sacino/embeddings run dev`; stop only its owned foreground process.
- Wait for `http://localhost:3002` to respond, then proceed.
- For frontend UI verification, use `dev-browser` by default. Use Playwright only if browser automation is explicitly requested.
</dev_server_policy>

<ui_verification>
VALIDATION GATE (CRITICAL):
- Frontend behaviour changes (rendering, animation, scroll, loading/error/empty states, interaction timing, conditional visibility) REQUIRE browser verification via `dev-browser` or `agent-browser`, unless the user explicitly says they will test UI themselves.
- A task is not complete until required automated tests and required browser checks pass.
- If a required browser check is skipped, the final response MUST state: skipped check, reason, and residual risk.
- Final response MUST include a Validation Summary: automated checks run, browser scenarios run, and outcomes.

Responsive verification viewports:
- Desktop: 1440x900
- Mobile: 390x900
- Save screenshots and other raw browser output to `.artifacts/<task>/<run>/` in the repo root, which Git ignores, or leave them in dev-browser's `~/.dev-browser/tmp/`. Record their absolute paths. Never save them in a folder Git can see; the old root `artifacts/` folder now lives at `.artifacts/ui-audits/`.
- Check for horizontal overflow, console errors, page errors, and offscreen changed elements.

IMPORTANT:
- This project currently has no configured Playwright suite or Playwright npm script.
- Keep browser verification focused on `http://localhost:3002` and document which pages and interactions were checked.
</ui_verification>

</testing_rules>

</project_details>

## Migration ownership

The active application is `src/pages/`, `src/layouts/`, `src/components/site/` and `src/scripts/`. The earlier `src/app/` and root JSX components are temporary rollback/reference owners, except protected dormant animations which stay preserved. The existing `<key_templates>` tree above describes that retained reference; consult the active Astro paths for implementation. Preserve all current product, contact-copy, lowercase-label and animation requirements during either framework’s maintenance.
