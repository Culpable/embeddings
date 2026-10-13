# E-commerce page and homepage diagrams plan

<important_note>
> **IMPORTANT NOTE:** Start this plan only after `documents/todo/astro_cloudflare_workers_migration_plan.md` is marked complete. The owner does not want landing-page changes while the Astro and Cloudflare Workers migration is running, because that migration must reproduce the current site without redesigning pages. Every file path below assumes the finished Astro site in this repository.
</important_note>

## 1. Goal

### 1.1 End goal

Bring back the agentic shopping visuals that the site lost when the homepage moved to broad AI consulting, without making Embeddings read as a shopping-agent company again. The owner described the old homepage as "a lot longer" with "various steps and really beautiful UIs regarding agenticness", and said "we lost some of that in the transition". Retail visitors must get a full, visual explanation of how Embeddings builds shopping agents. All other visitors must keep the broad homepage, now with the old agent diagram that the owner called "still relevant".

The old visuals must come back as they were. The owner said they "should be recreated or reused precisely" from Git history. New diagrams can enrich the story, but only in the same visual language.

### 1.2 Chosen approach and deliverable

The owner chose:

- a dedicated e-commerce page at `/ecommerce/` that brings back all the old shopping diagrams, including the "Taylor Swift blue dress" story (D-1)
- the Shoppa card on the e-commerce page only (D-2)
- implementation after the Astro migration completes (D-3)
- the Taylor Swift wording kept unchanged (D-4)
- the market statistics rechecked and updated to the latest comparable figures (D-5)
- all three old hero tags kept (D-6)
- old diagrams reused or recreated precisely from Git history (D-7)
- the old retail quote on the e-commerce page, and a generic quote on the homepage (D-8)

This plan delivers the new page, the homepage additions, the navigation and discovery changes, and the documentation updates.

### 1.3 What would not count as success

- A homepage that again reads as a shopping-agent business. The broad positioning in `documents/site-positioning.md` stays the homepage's message.
- Old diagrams that are redrawn, simplified, retimed or restyled. "Inspired by" versions do not count.
- An e-commerce page that looks like the Shoppa product. This includes Shoppa's own headline "The shopping agent that’s actually yours", or any Shoppa feature, setup or pricing claim.
- Market figures copied unchanged from the old page. The owner said "OpenAI number is much bigger than that now".
- Landing-page edits made before the migration completes.

### 1.4 Done means

1. `/ecommerce/` is live in the Astro build. It shows every old shopping section from revision `934e324` with matching appearance and animation, plus the two new e-commerce diagrams.
2. The homepage shows the generalised agent flow diagram and the generic quote. Its e-commerce section links to `/ecommerce/` and no longer shows the Shoppa card.
3. The menu and footer "e-commerce" link opens `/ecommerce/`. The sitemap, `llms.txt`, metadata and Markdown responses include the new page.
4. Every market figure on the page has a current primary source. The source and its date are recorded in the acceptance record.
5. Lint, tests and the static build pass. Browser acceptance at 1440x900 and 390x900 is recorded.
6. The positioning, animation and project documentation describe the new structure.

---

## 2. Current State Analysis

### 2.1 Current implementation overview

The homepage (`src/pages/index.astro` → `src/components/site/app-Home.astro`) has five parts in this order:

1. Hero: "AI that works inside your organisation", with `HeroAssistantConversation.astro`.
2. What we build (`#services`): `CapabilityBento.astro`, a grid of five capabilities.
3. E-commerce (`#ecommerce`): `app-Ecommerce.astro`, with the section intro "Custom shopping assistants, built on your catalogue", the shopping demo `AgentConversationShowcase.astro` and `ShoppaCard.astro`.
4. How we work (`#how-we-work`): `EngagementTimeline.astro`.
5. Closing panel: `ContactSection.astro`.

The menu (`NavigationPanel.astro`) and footer (`Navigation.astro`, rendered by `Footer.astro`) link "e-commerce" to `/#ecommerce`.

### 2.2 The old shopping homepage

Revision `934e324` holds the last shopping-agent homepage in `src/app/page.jsx`. It is the source of truth for every restored section. In order, it showed:

| Old section | Source at `934e324` | What it shows |
| --- | --- | --- |
| Hero | `page.jsx` `Home()` and `HeroProofSignals()`; `HeroDataFlow.jsx`, `HeroDesktopDataFlow.jsx` | Headline, body, two buttons, three tags ("Sold / in one conversation", "Yours / not rented", "Live / in weeks") with coloured top bars, then the animated flow diagram "Your catalogue → AI agent → Your customer" with flowing particles and a neural-mesh agent centre |
| The agent (`#agent`) | `AgentShowcase()`; `AgentConversationShowcase.jsx` | The shopping demo: conversation from discovery to checkout to order status, the rule edit that goes live, and analytics tiles |
| Why now (`#why-now`) | `AgenticTimeline()` | Dark band titled "Agentic shopping isn’t coming. It’s here." with four dated cards (OpenAI Instant Checkout 700M+ weekly users; Google UCP; Deloitte 81% of retail executives; McKinsey $3–5T by 2030), cool-to-hot gradient bars, brand marks, a trend line, source links and the closing line "Retailers who own the conversation keep the customer." |
| The shift | `WhyNow()` | "Your customers will talk to an AI agent. Make sure it’s yours." with three cards: Disintermediation, The data foundation (Adobe 393% stat) and The race is on, each with a source link |
| Proof (`#proof`) | `Testimonial` (dark variant) | The retail quote: "We had no idea where to start with agentic shopping. Embeddings audited our catalogue in days and transformed it from a static spreadsheet into a living, AI-ready asset." |
| Services (`#services`) | `Services()`; `CatalogueTransformation.jsx`, `ServiceTimelineLeftRail.jsx`, `ResponsiveServiceAnimation.jsx` and four animations | "Your catalogue is your agent’s brain. We make it complete." The before/after product card (thin "Blue Dress" → enriched "Sapphire Blue, Taylor Swift-inspired" midi), then a four-step left-rail timeline: Audit (`AuditXRayScanner.jsx`), Freshness (`FreshnessPipelineFlow.jsx`), Enrichment (`EnrichmentTypewriter.jsx`), Optimisation (`OptimisationRipple.jsx`, with the "Taylor Swift blue dress" trend ripple) |

`documents/service-section-animations.md` documents the four service animations and their responsive framing. `documents/ai-agent-animation-variants.md` documents the agent-centre animation in the hero flow.

Revision `0494105` holds the last homepage with a generic quote, in the light `Testimonial` variant:

> Working with Embeddings transformed our business processes. Their deep technical expertise in AI implementation helped us achieve unprecedented efficiency gains, enabling our team to do less whilst achieving significantly more.

It is attributed to `client={{ name: 'TechForward' }}`.

### 2.3 The core problem

The broad rebuild removed every shopping diagram except the demo. Retail visitors now see one demo and a Shoppa card. The old catalogue story, the market case and the agent flow diagram are gone, although their React files still sit unrendered in `src/components/`. The Astro migration ports only rendered components, so these visuals have no Astro version.

### 2.4 Affected visitor scenarios

| Visitor | Today | After this plan |
| --- | --- | --- |
| Retailer exploring AI | Sees one short homepage section and a demo | Opens `/ecommerce/` and sees the full story: agent, systems behind it, market case, catalogue work, results loop, quote |
| Organisation exploring AI in general | Sees the broad homepage with no diagram of how an agent works | Sees the old flow diagram, generalised to business systems, and a generic quote |
| Retailer who wants a ready-made product | Sees the Shoppa card on the homepage | Sees the Shoppa card at the end of `/ecommerce/` |

### 2.5 Technical constraints

- **Project rules (`AGENTS.md`):** British English. Use ’ for apostrophes in visible text. Navigation and footer labels stay lowercase. The header keeps only the logo, Contact us and the menu trigger.
- **Animation standards (`AGENTS.md`):** never add `prefers-reduced-motion` checks or similar conditions to animation code. Never replace, simplify or rewrite protected animations. The rule names `HeroDataFlow.jsx`, `CatalogueTransformation.jsx` and the service timeline animations.
- **Migration decisions (`astro_cloudflare_workers_migration_plan.md`):** use Astro markup with focused TypeScript controllers and no React islands (its D-5). Pages use trailing-slash URLs (its D-2). Keep Tailwind 3 and the existing CSS animation owners (its D-7).
- **Client-only behaviour in the old components:** `HeroDataFlow.jsx` and `ResponsiveServiceAnimation.jsx` are React client components. They load the large desktop SVGs only at widths of 640px and up, and only as each one nears the viewport (600px vertical root margin, one shared `IntersectionObserver`). This keeps hidden desktop SVG markup out of mobile HTML. Below 640px, the services timeline shows `MobileServiceStoryboard` cards instead of the SVGs.
- **`AnimatedStat`:** it renders the final sourced value immediately and never counts through intermediate numbers. Keep that rule.
- **Contact rules:** the closing panel and contact page copy stay unchanged.

### 2.6 Existing infrastructure that can be reused

- Astro primitives in `src/components/site/`: `Container`, `SectionIntro`, `FadeIn`, `FadeInStagger`, `NoiseOverlay`, `Button`, `DressThumbnail`, `PaidOrderBadge`, `AgentConversationShowcase` (already ported), `ShoppaCard`, `ContactSection`.
- The route registry in `src/lib/site-config.mjs` (`routes`). It drives titles, descriptions, sitemap, `llms.txt` and Markdown responses.
- The HTTP contract in `test/http-contract.json` and its runner `scripts/run-http-contract.mjs`.
- Shared CSS in `src/styles/components.css`, including `.service-timeline-step` (`content-visibility: auto`) and `.agent-beat`.

---

## 3. Desired State

### 3.1 Desired state requirements

**E-commerce page**

- **REQ-1 (MUST):** `/ecommerce/` renders these sections in this order. Restored sections match revision `934e324` in markup, geometry, colours, timing and copy, except where a later requirement names a change.
  1. Hero: the headline "Custom shopping agents, built on your catalogue" (D-10), the old body copy adapted to "custom" wording, Contact us and "Learn how it works" buttons, the three old tags (D-6), and the old hero flow diagram.
  2. The agent (`#agent`): the old section intro and `AgentConversationShowcase`.
  3. New: behind one conversation (`#behind-the-conversation`), described in REQ-5.
  4. Why now (`#why-now`): the dark band with updated figures (REQ-3).
  5. The shift: the three cards with updated figures (REQ-3).
  6. Proof (`#proof`): the dark retail quote (D-8).
  7. Catalogue (`#catalogue`): the old services intro, `CatalogueTransformation` and the four-step timeline with its four animations.
  8. New: after launch (`#after-launch`), described in REQ-5.
  9. `ShoppaCard`.
  10. `ContactSection`.
- **REQ-2 (MUST):** the Taylor Swift wording in `CatalogueTransformation`, `EnrichmentTypewriter` and `OptimisationRipple` stays exactly as at `934e324` (D-4).
- **REQ-3 (MUST):** every market figure uses the latest comparable figure from a primary source. Each card keeps its topic: AI assistant checkout reach, agent checkout standard, retail executive sentiment, market size projection, and AI-driven retail traffic growth. If an event no longer stands, the card uses a current comparable event. Card dates and source links match the new sources (D-5).
- **REQ-4 (MUST):** desktop SVGs load only at widths of 640px and up and only as they near the viewport, as in the old components. Mobile widths show the old mobile layouts: the connected flow cards and the `MobileServiceStoryboard` cards (D-11).
- **REQ-5 (MUST):** the two new e-commerce diagrams use the service-animation conventions in `documents/service-section-animations.md`. That means a `0 0 960 320` viewBox, the neutral-950 palette with red, amber and green status colours, the uppercase 11px display labels, and pure CSS keyframes with SVG particles. Each also has a stacked-card mobile layout below 640px.
  - **Behind one conversation:** each step of the demo (discovery, recommendation, checkout, order status) links to the system it uses: search index, catalogue and stock, payments, and the order system.
  - **After launch:** a loop in which questions the agent couldn’t answer become flagged gaps, the gaps become catalogue fixes, and the fixes give better answers.
- **REQ-6 (MUST NOT):** the page must not use "The shopping agent that’s actually yours" or any Shoppa feature, setup or pricing claim.

**Homepage**

- **REQ-7 (MUST):** a new "how it works" section (`#how-it-works`) sits after `#services`. It recreates the old hero flow diagram with identical geometry, particle paths, agent centre and timings. Only the outer panels change: "Your catalogue" becomes the organisation’s systems (documents, CRM, finance, inbox), and "Your customer" becomes a staff or customer question answered from those systems. The content stays industry-neutral and consistent with `HeroAssistantConversation.astro` (D-7, D-9).
- **REQ-8 (MUST):** a light generic quote, the `0494105` TechForward quote, sits after `#how-it-works` (D-8).
- **REQ-9 (MUST):** `#ecommerce` keeps its intro and the shopping demo. It removes `ShoppaCard` and adds a link "See how we build shopping agents" to `/ecommerce/` (D-2, D-9).
- **REQ-10 (MUST NOT):** the homepage hero, `#services`, `#how-we-work` and the closing panel must not change.

**Site-wide**

- **REQ-11 (MUST):** the "e-commerce" link in the menu and footer points to `/ecommerce/`. The label stays lowercase.
- **REQ-12 (MUST):** `src/lib/site-config.mjs` registers an indexable `ecommerce` route. The sitemap, `llms.txt`, canonical URL, structured data and Markdown response include it, under the same rules as `/process/`.
- **REQ-13 (MUST):** the restored animations keep working without any motion-preference condition.

### 3.2 Defaults and fallbacks

- **Page metadata defaults:** title "Custom AI Shopping Agents"; description "We build custom AI shopping agents on your catalogue and systems, from the first question to checkout and after-sales support."; `llmsGroup: 'Offer and process'`; `pageType: 'WebPage'`.
- **Market figure fallback:** if no current primary source confirms a figure, use a comparable sourced figure on the same topic. If none exists, drop that card, and the band shows fewer cards.
- **Quote fallback:** if the owner later supplies a different generic quote, it replaces the TechForward text with no layout change.

---

## 4. Additional Context

### 4.1 User-provided context

- "We're currently migrating the site to Astro, so we don't actually want to make changes to the landing page yet."
- "If you look at the landing page before the changes we just made, it was a lot longer and had various steps and really beautiful UIs regarding agenticness. We lost some of that in the transition. Some of them were actually still relevant, especially the old one… that we used to have above the hero." The plan reads this as the hero flow diagram.
- "Given that we're still serving the e-commerce platform, I'm thinking that we can have some kind of dedicated e-commerce page/section which brings back all of the old diagrams that we had around the old multi-step process where we talked about Taylor Swift, etc."
- "Think of a way that we can enrich the current design to use the existing previous designs as well as enrich it further."
- On the diagrams: "These will be easily accessible in the Git history and should be recreated or reused precisely."
- On quotes: "We want to bring back the quote on the e-commerce page and bring back a new generic quote that's not specific to e-commerce on the home page."
- On statistics: "Recheck and update them to reflect latest/comparable figures. e.g. OpenAI number is much bigger than that now."

### 4.2 Decision record

#### D-1: Where the full shopping story lives

- **Context:** the old shopping sections need a home without turning the broad homepage back into a retail page.
- **Options:** (a) a dedicated `/ecommerce/` page, with a short homepage section linking to it; (b) a longer homepage e-commerce section.
- **Decision:** (a). The owner chose it, following the recommendation.
- **Why:** the homepage stays broad, and retailers get a page that search engines can index.
- **Why not (b):** about half the homepage would be about shopping.
- **Reconsider when:** the owner narrows Embeddings back to retail.

#### D-2: Shoppa card placement

- **Context:** `documents/site-positioning.md` allows Shoppa in exactly one place.
- **Options:** (a) e-commerce page only; (b) both pages; (c) homepage only.
- **Decision:** (a). The owner chose it, following the recommendation.
- **Why:** retailers choose between a custom build and a ready-made product at the end of the full story.
- **Why not (b), (c):** (b) shows Shoppa twice and blurs the brands; (c) hides the option from retailers who read the full page.
- **Reconsider when:** analytics show homepage visitors looking for a ready-made product.

#### D-3: Timing

- **Context:** the Astro migration must reproduce the current site without redesigning pages.
- **Options:** (a) implement after the migration completes; (b) prototype now in the Next.js site.
- **Decision:** (a). The owner chose it, following the recommendation.
- **Why:** this avoids colliding with the migration’s edits to the same files.
- **Why not (b):** the Next.js files are being replaced.
- **Reconsider when:** the migration stalls and the owner wants the page sooner.

#### D-4: Taylor Swift wording

- **Context:** a real celebrity’s name in marketing can suggest she endorses the business.
- **Options:** (a) keep the wording; (b) use a generic trend name.
- **Decision:** (a). The owner chose it, against the recommendation of (b). No further reason given.
- **Reconsider when:** the owner or an adviser raises an endorsement concern.

#### D-5: Market statistics

- **Context:** the old figures date from September 2025 to early 2026, and the positioning rule removed them because they only argued the retail case.
- **Options:** (a) recheck each one and use the latest comparable figure; (b) restore them unchanged; (c) leave them out.
- **Decision:** (a). The owner chose it, extending the recommendation from "recheck" to "recheck and update".
- **Why:** the owner said the "OpenAI number is much bigger than that now", so unchanged figures would be wrong.
- **Why not (b), (c):** (b) publishes outdated numbers; (c) loses the page’s "why now" case.
- **Assumptions:** these figures appear on `/ecommerce/` only, never on the homepage.
- **Reconsider when:** a figure goes more than 12 months without a newer source. Refresh it then.

#### D-6: Hero tags

- **Context:** "Live in weeks" is a delivery promise.
- **Options:** (a) keep all three tags; (b) drop "Live in weeks".
- **Decision:** (a). The owner chose it, following the recommendation.
- **Reconsider when:** delivery timelines change.

#### D-7: Precise reuse of old diagrams

- **Context:** the old diagrams could be ported, recreated in the same style, or redesigned.
- **Options:** (a) port or recreate them exactly from Git history; (b) redesign them in a new style.
- **Decision:** (a). The owner chose it.
- **Why:** the owner called them "really beautiful" and asked for them to be "recreated or reused precisely".
- **Assumptions:** the source of truth is revision `934e324`, even if the migration later deletes the dormant React files.
- **Reconsider when:** never for the restored diagrams. New diagrams follow REQ-5.

#### D-8: Quotes

- **Context:** the owner asked to bring back the e-commerce quote and to add a generic quote to the homepage. The positioning rule bans testimonials without evidence and permission.
- **Options for the e-commerce quote:** (a) the shortened version from `934e324`; (b) the longer original from `c6439e7`.
- **Options for the homepage quote:** (a) the TechForward quote from `0494105`; (b) a new quote written by the owner.
- **Decision:** (a) for both. The plan writer chose them, based on the owner’s words "bring back".
- **Why:** the owner shortened the retail quote on purpose in commit `9f694a6`. TechForward is the only generic quote in the site’s history.
- **Assumptions:** the owner’s instruction counts as approval to publish both quotes. The positioning document must record that approval.
- **Reconsider when:** the owner supplies a different quote or withdraws permission.

#### D-9: Homepage e-commerce section content

- **Context:** the homepage now gets the generalised flow diagram. Showing the shopping flow diagram as well would put two near-identical diagrams on one page.
- **Options:** (a) keep the demo and add a link to `/ecommerce/`; (b) add the shopping flow diagram as well.
- **Decision:** (a). The plan writer chose it.
- **Why:** each diagram appears once per page.
- **Why not (b):** it repeats the same diagram twice on one page.
- **Reconsider when:** the owner wants a shopping diagram on the homepage. In that case, use `CatalogueTransformation` rather than the flow diagram.

#### D-10: E-commerce page headline

- **Context:** the old headline "The shopping agent that’s actually yours" is Shoppa’s current hero headline (`/Users/sacino/shoppa-root/src/pages/index.astro`).
- **Options:** (a) "Custom shopping agents, built on your catalogue", adapted from the current homepage section title; (b) the old headline.
- **Decision:** (a). The plan writer chose it.
- **Why:** it keeps the custom-build message and stays separate from Shoppa.
- **Why not (b):** it breaks the Shoppa boundary.
- **Reconsider when:** the owner supplies other wording.

#### D-11: Loading desktop SVGs in Astro

- **Context:** the old React client components load desktop SVGs only on wide screens and only near the viewport. The migration forbids React islands.
- **Options:** (a) render each desktop SVG inside a `<template>`, with one small TypeScript controller that inserts it at 640px and up, near the viewport, using one shared observer; (b) render every SVG inline and hide it on mobile with CSS; (c) use a React island.
- **Decision:** (a). The plan writer chose it.
- **Why:** it keeps the old loading behaviour and mobile HTML size within the migration’s architecture.
- **Why not (b), (c):** (b) sends hidden SVG markup to phones; (c) breaks migration D-5.
- **Reconsider when:** measured mobile output shows that inline SVGs cost nothing that matters.

#### D-12: New diagrams

- **Context:** the owner asked to "enrich it further" beyond the old designs.
- **Options:** (a) two new e-commerce diagrams (behind one conversation, after launch) in the old visual language; (b) no new diagrams.
- **Decision:** (a). The plan writer proposed it, and the owner raised no objection.
- **Assumptions:** an "agents working together" homepage diagram was proposed but is left out. The owner asked for homepage diagrams recreated from the old page, and that one has no old source.
- **Reconsider when:** the owner asks for the orchestration diagram.

### 4.3 Background

- Shoppa ([shoppa.au](https://shoppa.au/)) is the owner’s separate, packaged shopping-agent product. Embeddings sells custom builds.
- The old React components still exist in `src/components/`. Retrieve any file from Git with `git -C /Users/sacino/embeddings show 934e324:src/components/HeroDesktopDataFlow.jsx` (change the path for other files) if the migration has removed it.
- The reference render (see 6.3) needs the old Next.js site. Export it outside the workspace with `git -C /Users/sacino/embeddings archive 934e324 | tar -x -C /tmp/embeddings-reference-934e324`, then run `npm ci` and `npx next dev -p 3012` in that folder under Node 22.17.0. Stop that server when the comparison is finished.

---

## 5. Implementation Plan

### Step 1: Confirm the starting point

**Objective:** start from a finished migration and a working reference render.

#### 1.1 High-level approach

- Confirm that the migration plan is marked complete, and that the Astro site is the production source.
- Re-read `AGENTS.md`, `documents/site-positioning.md` and `documents/service-section-animations.md`, which the migration will have updated.
- Start the reference render on port 3012 (see 4.3), and start the Astro site with `npm run dev` (port 3002), as `AGENTS.md` documents after the migration.

#### 1.2 Success criteria

- The migration plan’s status line reads complete. If it does not, stop and report.
- `http://localhost:3012/` shows the old shopping homepage with the headline "The shopping agent that’s actually yours".

### Step 2: Write the route contract first

**Objective:** make the new page’s public contract fail before the page exists.

#### 2.1 High-level approach

- Extend `test/http-contract.json` with `/ecommerce/` entries copied from the `/process/` pattern: the HTML document, the Markdown response, the slash redirect from `/ecommerce` and sitemap membership.
- Run the contract and confirm the new entries fail because the route is missing.

#### 2.2 Success criteria

- Before Step 6, the HTTP contract run fails only on the new `/ecommerce/` entries.

### Step 3: Port the restored components to Astro

**Objective:** produce exact Astro versions of every old visual.

#### 3.1 High-level approach

- Port these to `src/components/site/`, copying SVG markup, `<style>` keyframes, class lists and inline styles unchanged: `HeroDesktopDataFlow`, the mobile flow from `HeroDataFlow`, `CatalogueTransformation`, `ServiceTimelineLeftRail` (including `MobileServiceStoryboard`), `AuditXRayScanner`, `FreshnessPipelineFlow`, `EnrichmentTypewriter`, `OptimisationRipple`, `AnimatedStat` and `Testimonial` (light and dark).
- Replace `HeroDataFlow` and `ResponsiveServiceAnimation` client logic with one TypeScript controller in `src/scripts/` under D-11. Keep the 640px breakpoint, the 600px root margin, the single shared observer and the stable placeholder frame. Load the controller from `src/scripts/site-entry.ts` with its existing guard pattern.
- Give every SVG gradient, filter and path ID a unique prefix, so two diagrams on one page cannot clash.
- Port the `Testimonial` logo through Astro’s image handling under the project’s image rules.

#### 3.2 Success criteria

- No ported component contains a `prefers-reduced-motion` check.
- In a side-by-side browser check against port 3012 at 1440x900 and 390x900, each ported visual matches in layout, colours, text and animation phases (see 6.3).
- At 390x900, the network panel shows no desktop SVG markup inserted. At 1440x900, each desktop SVG appears only after its section nears the viewport.

### Step 4: Update the market figures

**Objective:** replace outdated statistics with current, sourced figures (D-5).

#### 4.1 High-level approach

- For each figure, find the latest comparable number from the primary publisher: OpenAI weekly users, Google UCP adoption, Deloitte retail executive sentiment, McKinsey agentic commerce projection and Adobe AI-driven retail traffic growth.
- Confirm that each event still stands. For example, check that ChatGPT checkout is still offered.
- Update the card date, figure, label, source link and `AnimatedStat` value together.

#### 4.2 Success criteria

- Every source link opens the cited figure on the publisher’s own page.
- The acceptance record lists each old figure, new figure, source URL and publication date.
- No card shows a figure older than the newest available comparable figure from the same publisher.

### Step 5: Build the two new e-commerce diagrams

**Objective:** add "behind one conversation" and "after launch" under REQ-5 and D-12.

#### 5.1 High-level approach

- Create `src/components/site/BehindConversationFlow.astro` and `src/components/site/AfterLaunchLoop.astro`, with desktop SVGs and mobile stacked cards.
- Reuse the demo’s product universe: the Sapphire Blue Midi dress, the $189.00 price and the order-status step.
- Load the desktop SVGs through the Step 3 controller.

#### 5.2 Success criteria

- Both diagrams use the `0 0 960 320` viewBox, the palette and label style from `documents/service-section-animations.md`, and CSS-only animation.
- At 390x900, both show readable stacked cards with no horizontal overflow.

### Step 6: Assemble `/ecommerce/`

**Objective:** publish the page in the REQ-1 order.

#### 6.1 High-level approach

- Create `src/pages/ecommerce.astro` and `src/components/site/ecommerce-*.astro` section components, following the `app-*` and `process-*` naming pattern.
- Copy the section copy from `934e324` `page.jsx`. Apply only these changes: the D-10 headline, "custom" wording in the hero body, and the Step 4 figures.
- Add the `ecommerce` route to `src/lib/site-config.mjs` with the 3.2 defaults. Run `npm run generate-public-artifacts`.

#### 6.2 Success criteria

- The Step 2 HTTP contract entries pass.
- `/ecommerce/` shows sections 1 to 10 of REQ-1 in order, and the anchors `#agent`, `#behind-the-conversation`, `#why-now`, `#proof`, `#catalogue` and `#after-launch` scroll to their sections.
- The page text contains no "actually yours" and no Shoppa claims beyond the card.

### Step 7: Update the homepage and navigation

**Objective:** apply REQ-7 to REQ-11.

#### 7.1 High-level approach

- Create `src/components/site/app-HowItWorks.astro` with the generalised flow diagram (REQ-7). Copy the old diagram and change only the text and icons inside the outer panels.
- Add the light TechForward quote after it (REQ-8).
- In `app-Ecommerce.astro`, remove `ShoppaCard` and add the link to `/ecommerce/` (REQ-9).
- Change the "e-commerce" link to `/ecommerce/` in `Navigation.astro` and `NavigationPanel.astro`.

#### 7.2 Success criteria

- The homepage order is: hero, `#services`, `#how-it-works`, quote, `#ecommerce`, `#how-we-work`, closing panel.
- The generalised diagram matches the reference hero flow in geometry and animation phases at 1440x900 (see 6.3).
- Clicking "e-commerce" in the menu, from the homepage and from `/contact/`, opens `/ecommerce/`.

### Step 8: Update documentation

**Objective:** keep the project documents accurate.

#### 8.1 High-level approach

- `documents/site-positioning.md`: update the page table and the Shoppa boundary location (now `/ecommerce/`). Extend "Keep e-commerce in its place" to include `/ecommerce/`. Amend "Evidence before claims" to record the owner’s approval of the two quotes and the dated market figures on `/ecommerce/` only. Update "Components kept but not rendered".
- `documents/service-section-animations.md`: state that the animations now render on `/ecommerce/`, and describe the Astro loading controller.
- `AGENTS.md`: update `<site_positioning>`, the Shoppa card path, `<key_templates>` (new page and components) and the animation standards list (protected animations now render on `/ecommerce/`, plus the generalised flow on the homepage).
- Do not change `documents/agentic-shopping-positioning.md`.
- Mark this plan complete and move it to `documents/learnings/todo_archive/`.

#### 8.2 Success criteria

- A search for `/#ecommerce` and `ShoppaCard.jsx` in `AGENTS.md` and `documents/site-positioning.md` returns no outdated references.

---

## 6. Testing Plan

### 6.1 Verification scenarios

| Requirement or failure | Input or state | Expected result | Evidence |
| --- | --- | --- | --- |
| REQ-12, Done 3: the new route is public and discoverable | Built site through the Worker | `/ecommerce/` returns HTML; Markdown response and slash redirect work; the sitemap lists the page | Extend `test/http-contract.json` in Step 2, before the route exists |
| REQ-12: discovery files stay consistent | `npm test` | The existing public-artifact and metadata tests pass with the new route | Reuse `test/public-artifacts.test.mjs` and `test/metadata-structured-data.test.mjs` unchanged |
| REQ-1, REQ-2, REQ-13, D-7: restored visuals match exactly | `/ecommerce/` beside `localhost:3012/` | Same layout, text and animation phases at 1440x900 and 390x900 | Browser comparison (6.3); zero new durable tests, because exactness is visual and is proven only on the rendered page |
| REQ-4, D-11: desktop SVGs stay off phones | `/ecommerce/` at 390x900, scrolled to the bottom | No desktop SVG nodes in the DOM; mobile cards show | Browser DOM check (6.3) |
| REQ-4: desktop SVGs load near the viewport | `/ecommerce/` at 1440x900 | Each service SVG appears only as its step nears the viewport | Browser DOM check while scrolling (6.3) |
| REQ-3, Done 4: figures are current | Each card’s source link | The linked page shows the stated figure and date | Manual source check recorded in the acceptance record |
| REQ-5: new diagrams follow the old conventions | Both new diagrams at both widths | Matching palette, labels and motion; readable cards on mobile; no overflow | Browser inspection (6.3) |
| REQ-6: Shoppa boundary | `/ecommerce/` text | No "actually yours" and no Shoppa claims beyond the card | Browser text search during acceptance |
| REQ-7 to REQ-10: homepage changes | `/` at both widths | New section and quote in order; no Shoppa card; link opens `/ecommerce/`; other sections unchanged | Browser inspection (6.3) |
| Done 6: documentation is accurate | `AGENTS.md`, `documents/site-positioning.md`, `documents/service-section-animations.md` | No outdated `/#ecommerce` or `ShoppaCard.jsx` references; page table matches the rendered pages | Text search plus a read-through against the rendered pages |
| REQ-11: navigation | Menu from `/` and `/contact/`; footer link | "e-commerce" opens `/ecommerce/`; the menu keeps focus and Escape behaviour | Run `scripts/browser/contact-about-navigation.dev-browser.js`, as `AGENTS.md` requires for navigation changes, plus a manual click on the new link |

### 6.2 Automated checks

- The only extended test is the HTTP contract (Step 2). It checks public protocol values: status, redirect and sitemap membership. Write it before the route exists and confirm that it fails.
- Run the contract with `npm run build` then `npm run test:http`, which serves the built Worker and checks every entry.

### 6.3 Browser acceptance

This is the plan’s final acceptance check. Use dev-browser (`/Users/sacino/.agents/skills/dev-browser/SKILL.md`), as `AGENTS.md` prescribes.

1. Run the reference render on port 3012 and the Astro site with `npm run dev` on port 3002.
2. At 1440x900 and 390x900, open `/ecommerce/` and `localhost:3012/` side by side. For each restored section, scroll it into view and capture screenshots at the start, middle and end of its animation cycle. Compare text, layout, colours and phases. Map the old homepage’s hero flow, `#agent`, `#why-now`, the shift, `#proof` and `#services` to the new page’s hero, `#agent`, `#why-now`, the shift, `#proof` and `#catalogue`.
3. Compare the homepage `#how-it-works` diagram with the reference hero flow at 1440x900 and 390x900. Only the outer panel content may differ.
4. Check the DOM for desktop SVG nodes at 390x900, and for delayed insertion at 1440x900.
5. On both pages and at both widths, check for horizontal overflow, console errors, page errors and off-screen changed elements.
6. Save screenshots to `.artifacts/ecommerce_page_and_homepage_diagrams/<run>/`. Inspect them before reporting.
7. Write the record to `documents/evidence/ecommerce_page_and_homepage_diagrams/acceptance.md`. Include the commands, revision, setup, expected and actual outcomes, the market-figure table from Step 4, the result, replay steps and the raw-output path.
8. Stop the port 3012 server and any server you started, and confirm that both ports close.

### 6.4 Completion gates

- `npm run lint` passes with zero errors.
- `npm test` passes.
- `npm run build` completes.
- `npm run test:http` passes against the built Worker.
- The navigation browser script passes.
- Browser acceptance (6.3) is recorded.

A blocked check counts as blocked, not passed, and must be reported as such.
