<project_details>

<description>
These rules apply specifically to this repository and should be used for all code within this project scope.
</description>

<content_rules>
- All text must be in British English
- Use ’ instead of ' as an apostrophe on any frontend words (words that display to the user). e.g. Let’s, not Let's, businesses’, not businesses'
</content_rules>

<contact_form_rules>
- Preserve the contact form field contract unless the user explicitly requests a field model change.
- The business enquiry form fields are: name, email, company, phone, message, and budget.
- Frontend improvements may change layout, styling, focus states, loading states, error states, success states, and fallback behaviour, but must not replace the field contract with catalogue-readiness, SKU, platform, feed source, or priority fields without explicit approval.
</contact_form_rules>

<code_standards>
- Give fully coded solutions to each problem without skipping lines.
- You must separate distinct functions and classes by two new lines.
- Database identifiers (tables, columns, indexes, constraints, enums) MUST be camelCase; never introduce snake_case/underscores, even in migrations or raw SQL literals.
- All new React and Next.js work MUST follow the `vercel-react-best-practices` skill. Read this before writing any such code.

<animation_standards>
**NEVER add `prefers-reduced-motion` checks or similar accessibility media query conditionals to animation code.** Animations must work consistently for all users, so do not gate/short-circuit IntersectionObserver setup with accessibility or timing conditionals (including `requestAnimationFrame` wrappers).
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
│   │   └── Header(): Contact button and mobile menu
│   ├── HeroDataFlow.jsx: Animated SVG showing catalogue → AI agent → consumer flow
│   ├── CatalogueTransformation.jsx: Before/after catalogue cards with a four-step service pipeline
│   ├── ContactSection.jsx: Homepage call-to-action section with floating catalogue data snippets
│   ├── Testimonial.jsx: Testimonial section with light and dark variants
│   ├── Footer.jsx: Footer structure and links
│   │   └── navigation[]: Footer sections and links
│   ├── Logo.jsx: Site logo and hover states
│   │   └── socialMediaProfiles[]: Social platform links
│   └── Offices.jsx: Office location information
├── lib/
│   └── images.ts: Featured image configuration for social sharing/meta tags
├── app/
│   ├── page.jsx: Homepage with hero flow, timeline, service transformation, and CTA sections
│   ├── about/
│   │   └── page.jsx: About page content and team info
│   ├── process/
│   │   └── page.jsx: Process page methodology
│   ├── contact/
│   │   ├── page.jsx: Contact page layout and static content
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
- Next.js 14 with App Router
- Tailwind CSS for styling
- Node.js v22.11.0 required
- Automatic deployment via GitHub Actions on push to main branch
- Static site deployment to GitHub Pages:
  - Builds to `/out` directory
  - Deploys to `gh-pages` branch
  - Custom domain: embeddings.au
  - No server-side functionality available
  - All API endpoints must be external services
- Image Handling:
  - Featured image must be in public/images/ for direct URL mapping
  - All other images must be in src/images/ for optimization
  - Featured image configuration in src/lib/images.ts
  - Image paths must use forward slashes (/)
- Component Architecture:
  - Use Server Components by default (no 'use client' directive)
  - Only use Client Components when needed for:
    - React hooks (useState, useEffect, etc.)
    - Browser APIs
    - Interactive features
    - Event listeners
  - Split interactive components into separate files
  - Mark Client Components with 'use client' directive
</technical_requirements>

<environments>
- Development: Next.js App Router via `npm run dev` on the default local port `3002` (loads `.env.local`)
  - Dev URL: `http://localhost:3002` (for `dev-browser` and `agent-browser`)
  - Runtime: Local Next.js server only (no internal database or backend service)
  - Build output: `npm run build` generates the static export in `out/`
- Production: GitHub Pages deployment at `embeddings.au`, built from pushes to `main`
  - Hosting: GitHub Actions workflow `/.github/workflows/deploy.yml`
  - Publish target: `out/` deployed to `gh-pages` using `peaceiris/actions-gh-pages`
  - Domain: `embeddings.au` (configured via workflow `cname`)
  - Runtime: Static export only (no server-side runtime)
</environments>

System architecture documentation (IMPORTANT):
<system_architecture_documentation>

These are the only system documentation files for this repository. Read the relevant file when working in that area.

- `documents/service-section-animations.md`: Technical reference for how the service section animations work (timing, triggers, and implementation behaviour).
- `documents/agentic-shopping-positioning.md`: Marketing positioning reference for the agentic shopping narrative and messaging direction.

Documentation update rules:
- Update `documents/service-section-animations.md` whenever code changes affect the service section animations.
- Do not update `documents/agentic-shopping-positioning.md` based on code changes; it is marketing/positioning documentation only.

</system_architecture_documentation>

<testing_rules>

<validation_commands>
Required validation before reporting completion:
- `npm run lint` - ESLint checks (must pass with zero errors)
- `npm run build` - static export build (must complete without errors)
- `npm test` - all Node.js tests in `test/*.test.mjs`
- `node --test test/<file>.test.mjs` - run a specific test file
</validation_commands>

<dev_server_policy>
LOCAL DEV SERVER POLICY (CRITICAL):
- Assume the app is already running on `http://localhost:3002`.
- Always verify port `3002` before any `dev-browser`, `agent-browser`, or manual browser testing.
- If it is not running, start it exactly like `.vscode/launch.json`: run `npm run dev` from the repo root.
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
- Capture screenshots using absolute paths.
- Check for horizontal overflow, console errors, page errors, and offscreen changed elements.

IMPORTANT:
- This project currently has no configured Playwright suite or Playwright npm script.
- Keep browser verification focused on `http://localhost:3002` and document which pages and interactions were checked.
</ui_verification>

</testing_rules>

</project_details>
