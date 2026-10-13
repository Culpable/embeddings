# Site Positioning: Broad AI Consulting and Implementation

> **Status:** Current since 13 October 2026. Read this before changing site messaging, copy, page structure or metadata.
>
> **Supersedes:** `documents/agentic-shopping-positioning.md` (retailer-owned shopping agent positioning, August 2026). That document and `documents/reference/ai_shopping_agent.md` are kept as history only.
>
> **Background:** the owner's brief that triggered this change is archived at `documents/learnings/todo_archive/broad_ai_consulting_positioning_context.md`. It records the full chronology, the Shoppa overlap and the open factual checks.

---

## What Embeddings is

Embeddings is an Australian AI consultancy that designs, builds and runs AI systems inside organisations' existing software, documents and data. It is implementation-first: it builds, deploys, operates and improves what it recommends, rather than stopping at advice.

The offer covers five kinds of work, in this order everywhere they are listed:

1. Knowledge assistants
2. Customer chatbots
3. Workflow automation
4. System integration
5. Agent orchestration

E-commerce is **one specialism**, not the whole offer. For retailers, Embeddings builds custom shopping assistants on the retailer's catalogue and systems.

## The Shoppa boundary

Shoppa ([shoppa.au](https://shoppa.au/)) is a separate, packaged AI shopping agent product with its own site. The two must never look like the same offer:

- **Embeddings:** bespoke consulting and hands-on implementation, including custom retail builds.
- **Shoppa:** a ready-made product for retailers who want a product rather than a custom build.

Embeddings mentions Shoppa in exactly one place: the Shoppa-branded card (`ShoppaCard.jsx`) after the shopping demo on the homepage. It uses Shoppa's own mark and colours so visitors see a different brand. Keep its copy to that distinction only: no Shoppa feature, setup or pricing claims on the Embeddings site.

## Current page structure

| Route | Heading | Structure |
| --- | --- | --- |
| `/` | AI that works inside your organisation | Hero with a general assistant conversation (96rem wide on large screens) → what we build (`#services`, five-capability bento grid) → e-commerce (`#ecommerce`, shopping demo + Shoppa card) → how we work (`#how-we-work`, Discover / Build / Deploy / Operate timeline) → closing panel |
| `/about` | Solutions, not slideshows | Implementation-first intro and founding story → what sets us apart → our expertise (pipeline engineering, data infrastructure, e-commerce expertise) → closing panel |
| `/process` | How we work | Four stages matching the homepage: Discover, Build, Deploy, Operate, each with a "You get" deliverable → our values → closing panel |
| `/contact` | Your AI advantage starts here | Contact form (field contract unchanged) and office details |
| `/thank-you` | We’ll review your enquiry | Broad next-step copy, no catalogue-specific wording |

The closing panel (`ContactSection.jsx`) is shared by the homepage, about and process pages: a light split panel asking "Where could AI take work off your team?" with "Tell us how your team works today. We’ll come back with a practical first step."

Navigation and footer "offer" links point to `/#services`, `/#ecommerce` and `/#how-we-work`, with lowercase labels.

## Messaging rules

- **Lead with the work, not the technology.** Describe what the visitor's team gets done, in plain words. Examples stay industry-neutral unless they sit in the e-commerce section.
- **Show implementation.** Every description of the offer must include building and running, not only advising.
- **Keep e-commerce in its place.** Shopping and catalogue language belongs in the e-commerce section and the about page's e-commerce expertise card, not in headings or metadata that describe the whole business.
- **Evidence before claims.** Do not publish productivity figures, client names, testimonials or sector expertise without evidence and permission. The pre-2026 site's "10x productivity", "80% task automation", "ASX20" and "70% reduction" claims, and its sector list, are unverified and must not be reused. Retail market statistics (Adobe, McKinsey, Deloitte) were removed because they only argued the retail case.
- **Illustrative interfaces carry no labels.** The hero conversation and shopping demo are recognisable product illustrations; do not add "Illustrative example" tags.

## Metadata and machine-readable identity

Route titles, descriptions, the organisation description and the AI crawler summary live in `src/lib/site-config.mjs` and `src/lib/public-artifacts.mjs`. The homepage title is "Embeddings: Practical AI for Australian Businesses". Process stage service nodes in `src/lib/structured-data.mjs` mirror the four process stages and link to their anchors (`/process#discover` and so on). Run `npm run generate-public-artifacts` after changing any of these. The static export check verifies visible content, metadata, canonical URLs and linked structured data without pinning heading wording or prose length. Review messaging against this document on the rendered page.

## Components kept but not rendered

`HeroDataFlow.jsx`, `CatalogueTransformation.jsx`, `ServiceTimelineLeftRail.jsx` and the service animations described in `documents/service-section-animations.md` are no longer rendered by any route. They are kept unchanged for possible reuse in the e-commerce specialism. The `ContactSection.jsx` floating snippets were removed at the owner's request.
