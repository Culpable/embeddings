<project_details>

<description>
These rules apply specifically to this repository and should be used for all code within this project scope.
</description>

<content_rules>
- All text must be in British English
- Use ’ instead of ' as an apostrophe on any frontend words (words that display to the user). e.g. Let’s, not Let's, businesses’, not businesses'
</content_rules>

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

</project_details>
