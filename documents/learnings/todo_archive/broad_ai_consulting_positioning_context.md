# Embeddings: broad AI consulting and implementation context

Status: owner-confirmed direction, saved for future agents on 13 October 2026.

This is a context brief, not an implementation plan, approved homepage draft, completed migration or permission to change the website. The owner approved the positioning playback and requested that its full context be documented in this directory. Only this document was authorised for this task. No site changes, deployments, settings changes, commits or pushes were authorised.

## 1. The owner’s goal and why this document exists

Embeddings began as a general AI consulting and implementation business. Its marketing later concentrated on e-commerce, first through catalogue readiness and then through a retailer-owned shopping-agent offer. Before Shoppa existed as a separate product and marketing project, Embeddings temporarily carried that product direction.

Shoppa now has its own product repository and marketing site. Embeddings still uses much of the same positioning. This makes it difficult for a prospective consulting client to understand the broader work Embeddings can undertake and difficult to distinguish the two offers.

The owner wants Embeddings to return to, and augment, the broader AI consulting SERVICES direction. E-commerce remains a credible specialism, but it must not define the entire audience or be the only problem the site appears to solve. Shoppa keeps its specific packaged shopping-agent product.

The owner used the word “revert” conceptually. This is not an instruction to run a Git revert, restore old files, roll back a deployment or undo subsequent engineering improvements. Historical material establishes the original direction; it is not a ready-to-publish replacement.

## 2. Confirmed owner intent

These points are confirmed by the owner’s original explanation and subsequent approval of the playback:

- Present Embeddings as bespoke AI consulting with hands-on implementation across organisations.
- Attract work that embeds AI into an organisation’s existing software, information and operating processes.
- Include internal assistants and knowledge chatbots, customer-facing chatbots, workflow automation, business-system integration and agent orchestration.
- Include coordinating agents across departments, business functions and multiple custom software suites, rather than presenting every agent as a shopping assistant.
- Describe a delivery relationship that can include deploying, operating and improving AI systems. The exact commercial packaging remains undecided.
- Retain e-commerce as a useful area of expertise and consulting work, without making retail catalogues the universal starting point.
- Keep Shoppa’s specific packaged shopping-agent offering on Shoppa’s marketing site.
- Preserve useful design and technical improvements from the intervening work.
- Understand and document the direction before implementation. Approval of this direction is not approval of final wording, page structure, animation changes or a delivery plan.

This describes the work Embeddings wants to attract. It does not establish that every example has already been delivered, that every capability is a current packaged service, or that any result can be guaranteed.

## 3. How to interpret the screenshot

The owner supplied a recruitment screenshot as an example of the type of AI work Embeddings wants to undertake. In the parent conversation, the actual image was inspected. Its relevant meaning was organisation-wide AI work for a Western Australian construction business: embedding AI across custom software suites and business functions, including organising fleets of agents.

Use the image as capability and engagement context. It supports the idea of working with an organisation’s real systems and coordinating AI across its operations.

Do not turn it into:

- A job application or an offer to recruit or supply a named executive role.
- A recruitment service or a claim that Embeddings provides that exact advertised position.
- A salary, pricing or budget anchor.
- A copied advertisement or public quotation from the recruiter.
- A construction-only target market.
- Evidence that Embeddings has already completed the advertised work.

Do not reproduce the recruiter’s private identity or compensation. The screenshot does not need to be embedded in the website or this brief. Construction is one illustrative setting, not a confirmed exclusive industry focus.

## 4. Verified project identities and boundaries

The actual brand and repository name is Shoppa. “Shopper” in the dictated request refers to Shoppa in this context.

| Project | Verified local path | Role |
| --- | --- | --- |
| Embeddings | `/Users/sacino/embeddings` | Consulting marketing and business-enquiry site at `embeddings.au`; a Next.js static export |
| Shoppa Root | `/Users/sacino/shoppa-root` | Public Shoppa marketing site at `shoppa.au`; an Astro static export |
| Shoppa | `/Users/sacino/shoppa` | Shopping-agent platform, embeddable widget, demo store, administration console and backend |

Read each repository’s current `AGENTS.md` before working there. The review found root instructions in all three repositories and no nested `AGENTS.md` files. Recheck if the repository has changed.

Embeddings’ marketing repository has no internal product backend. Broadening its service description does not authorise adding agents, databases, a SaaS platform or other product runtime to this static site. Consulting delivery refers to work undertaken for clients, not necessarily software hosted inside this repository.

Shoppa Root is explicitly marketing-only. Shoppa’s product repository owns the product capabilities. Shared organisational contact arrangements do not collapse these repository or offering boundaries.

Local revisions during the context review:

- Embeddings: `934e324893c795dde8481997cf11d417123cd540`.
- Shoppa Root: `8f6981d9278b7d88f19a73276a788c3505ff353a`.
- Shoppa: `8194955bd259f94139d79dc9c78d44666676376b`.

These are review snapshots, not deployment confirmations. The context investigation inspected local sources and history, not live-site parity. Shoppa Root also contained pre-existing documentation, input and prototype changes belonging to other work. Future agents must inspect current status and preserve unrelated changes.

## 5. Verified chronology

Dates below follow the dates recorded by the relevant commits. Commit hashes are provided in full to make historical inspection unambiguous.

| Date | Repository and commit | What the evidence establishes |
| --- | --- | --- |
| 3 December 2024 | Embeddings `1e52bdd09adbbfa6bafef8421a0db587094bea2d` | Branding and content were updated around enterprise AI. |
| 6 December 2024 | Embeddings `252676ec3be4d6d3b87b36ad3fbe84a034cc70e0` | Site content emphasised implementation. |
| Before 12 February 2026 | Embeddings `2c38ca4e47d938814f3b058c01c74610310783d7`, the parent of the next commit | Inspected home, about and process sources still described broad enterprise AI implementation. |
| 12 February 2026 | Embeddings `5c3890e73268c9dfd6769cbc203f7fb72f8af5af` | Repositioned the site for agentic shopping, introducing catalogue/agent visual storytelling and related marketing changes. |
| 27 June 2026 | Embeddings `fcb12bf6fc894604c3bf51118781269a33161b4d` | Further aligned marketing with agentic-commerce catalogue readiness and added engineering improvements. |
| 14 August 2026 | Embeddings `adcd1b7f9b6fc653e5c7c15771daf9f54d07dc32` | Repositioned the site around retailer-owned shopping agents, with a showcase, route-wide copy migration and tests. |
| 17 August 2026 | Embeddings `f9068f6bdc9d0a9388c06a19016642bf65b09b54` | Added the Shoppa product proof-of-concept plan inside Embeddings, naming a new repository at `/Users/sacino/shoppa`. |
| 17 August 2026 | Embeddings `8584139dde3ab2c880d9f034ebbe1a9cdbaa1a8c` | Removed that product plan from Embeddings. The current product plan is in Shoppa’s archive. |
| 17 August 2026 | Shoppa `7aff07f83e60facb8e568be76a2a73bfba616cd6` | Began the separate product repository with the embedded shopping agent and Harlow demo store. |
| 18 August 2026 | Shoppa Root `0ca699520701274179b37b31cd14d26a79b9dae8` | Scaffolded the separate marketing repository. |
| 18 August 2026 | Shoppa Root `b2445a7581a214915849d74f67ef5e40402413f4` | Launched the separate Shoppa marketing implementation. |
| 13 October 2026 | Owner-confirmed direction recorded here | Embeddings should again represent broad AI consulting and implementation; Shoppa retains its distinct product. No repositioning implementation occurred in this documentation task. |

### The original consulting direction

At the pre-February revision, the homepage headline was “embeddings: generative AI for enterprise”. Services included AI-powered chatbots on internal knowledge, end-to-end workflow automation, agentic workflows and process optimisation. Retail appeared alongside mining, professional services, financial services, healthcare and manufacturing.

The process page used Discover, Build and Deliver, with explicit production deployment, system integration and production support. The about page used “Solutions, not slideshows” and emphasised implementation rather than strategy decks alone.

These sources closely match the owner’s desired direction. Their exact wording, statistics and industry claims have not been approved for reuse by this request.

### The intermediate catalogue-services direction

The completed owned-agent migration report records the preceding offer as catalogue readiness: improve retailer product data so third-party AI agents can understand and recommend products. Its recorded earlier headline was “Be the brand AI agents recommend first”.

Catalogue audit, freshness, enrichment and optimisation were the main services. Agentic-commerce market developments and the risk of losing direct customer relationships supplied the narrative.

### The shopping-agent overlap and separation

The August Embeddings migration deliberately made the owned shopping agent the headline offer on every principal route. Catalogue services became the foundation and entry offer; external-agent visibility became a supporting benefit.

The Shoppa Root launch report explicitly says all preceding marketing existed on the sibling Embeddings agency site. It also distinguishes agency delivery claims from capabilities of the packaged Shoppa product. The separate Shoppa marketing project therefore grew from this overlap; it was not always an independent offer with entirely unrelated copy.

The archived launch report is historical. Its original hosting instructions and product exclusions must not be treated as current authority. Shoppa Root now documents Cloudflare Workers hosting. Shoppa has gained capabilities since launch.

## 6. Current overlap that future positioning work must understand

This inventory describes inspected local source, not confirmed current production output.

| Surface and source | Current message or behaviour | Why it conflicts with the broader direction |
| --- | --- | --- |
| `src/app/page.jsx` hero | “The shopping agent that’s actually yours”; shopping agents for Australian retailers, from question to checkout and after-sale support | It leads with the same specific product category and exact headline as Shoppa Root. |
| Homepage proof signals | Sold in one conversation; Yours, not rented; Live in weeks | The first impression is a shopping-agent product promise. |
| `AgentConversationShowcase.jsx` and homepage agent section | Discovery, product recommendation, payment, order follow-ups, returns, prompt controls and reporting | The central demonstration reinforces a single retail product rather than broader consulting work. |
| `HeroDataFlow.jsx` and `HeroDesktopDataFlow.jsx` | Catalogue-to-agent-to-customer flow and shopping chat | Visuals can preserve the retail-only impression even after text changes. |
| Homepage timeline and “the shift” section | Agentic-commerce events, retail market statistics and ownership of shopper relationships | The whole reason to engage Embeddings is framed around retail commerce. |
| `ServiceTimelineLeftRail.jsx` and `CatalogueTransformation.jsx` | Catalogue audit, freshness, enrichment and contextual optimisation | These can remain e-commerce services, but they currently stand in for the full service range. |
| `src/app/about/page.jsx` | “Built for retail conversations, not generic AI consulting”; team and founding story centred on retailer-owned agents | This actively excludes the broad direction and retrospectively presents the later pivot as the founding purpose. |
| `src/app/process/page.jsx` | “How we take you from catalogue to live agent”; Foundation, Deploy, Operate all assume commerce data | A non-retail client cannot recognise their engagement. |
| `src/app/contact/page.jsx` | “Your agent starts here”; asks about catalogue and commerce stack | The enquiry invitation narrows the visitor before the conversation starts. |
| `src/app/thank-you/page.jsx` | Next step for improving catalogue data | Even a broad enquiry receives a retail-specific confirmation. |
| `ContactSection.jsx` | “Put your own agent in the conversation”, retailer shopping-agent urgency and floating catalogue snippets | The repeated call to action returns visitors to the product frame. |
| `Footer.jsx` and `RootNavigationPanel.jsx` | “the agent” as an offer destination, plus shopping-specific navigation helper copy | Discovery of the offer reinforces the current narrow identity. |
| Homepage and process proof | Anonymous retail/catalogue testimonials | Proof is limited to retail, and publication rights and evidence need confirmation. |
| `src/lib/site-config.mjs`, `metadata.js`, `images.ts` and `StructuredData.jsx` | Shopping-agent titles, descriptions, organisation description, social imagery and summaries for agent readers | Search, social sharing and machine-readable identity remain narrow even if visible page text changes. |

The current homepage and Shoppa Root both use the exact headline “The shopping agent that’s actually yours”. Embeddings says “We build”; Shoppa says it drops into a site with two lines of code. This is a real service/product distinction, but it is obscured by the duplicated category, headline and shopping journey.

Future work must consider the entire visitor journey. Updating only a homepage slogan would leave about, services, process, enquiry, confirmation and metadata contradicting it.

## 7. Useful assets and progress to preserve

The owner wants the broader direction with the benefit of subsequent work, not the old website wholesale.

Useful existing assets include:

- Embeddings’ brand identity, logo, typography, responsive layouts, dark/light section treatments and reusable page components.
- The deliberately minimal header: logo, Contact us button and menu trigger. Lowercase navigation/footer labels are an existing style choice.
- Contact infrastructure and its broad business-enquiry fields: name, email, company, phone, message and budget.
- Static hosting, build, performance, accessibility, privacy, analytics and navigation improvements.
- Central route metadata, structured data and generated public discovery artefacts. Their content can be reconsidered without discarding the infrastructure.
- Data engineering, LLM pipelines, enrichment and connections to existing systems as relevant consulting capabilities. Catalogue work remains useful within the e-commerce specialism.
- Reusable animation and visual components where they serve the intended story.
- Older implementation-first concepts: knowledge access, workflow automation, agentic workflows, deployment, integration and ongoing support.

Do not assume every shopping-specific component must remain prominent. Equally, do not delete or rewrite it just because the direction has broadened. The owner has not yet selected which visuals to retain, relabel, move, replace or redesign.

Current `AGENTS.md` explicitly protects existing frontpage animation designs. It also protects the contact field contract and specific current contact copy against unsolicited edits. Read those rules in context and obtain the appropriate implementation scope from a later owner request; this context document does not grant an exception.

The older `src/app/embeddings-description.md` is a useful historical description, identified by the migration report as legacy and unreferenced. Disabled work/blog routes also exist. Their presence is not permission to re-enable them or evidence that every client, article or result is authentic.

## 8. Recommendations, separate from owner decisions

The following recommendations follow from the evidence and confirmed direction. They are not final owner-approved wording or layout choices.

1. Lead with practical AI implementation for organisations, making it clear what Embeddings helps people do in their existing operations.
2. Express consulting through concrete delivery: connect knowledge and systems, build assistants, automate workflows, coordinate agents, deploy and improve the result.
3. Use business problems and outcomes rather than making a particular model, agent interface or retail catalogue the universal starting point.
4. Present e-commerce as a specialism or use-case family. Custom retail consulting can coexist with Shoppa without presenting the packaged product as Embeddings’ entire offer.
5. Keep the distinction explicit if Shoppa is mentioned: Embeddings provides bespoke consulting and implementation; Shoppa provides the packaged shopping-agent product.
6. Preserve the implementation-first character found in the older material. Broadening should not make the offer sound like advisory work without delivery.
7. Review claims, testimonials and demonstrations against evidence before publishing. Illustrative work and interface mock-ups must remain distinguishable from verified client results.

Working distinction for agents, not final public copy:

- **Embeddings:** bespoke AI consulting and hands-on implementation within organisations and their existing systems, including e-commerce.
- **Shoppa:** a distinct packaged AI shopping agent for retailers, marketed on its own site.

The owner has not requested a merger, renaming or technical separation project. The current work is about the clarity of Embeddings’ positioning.

## 9. Unresolved decisions and factual checks

| Issue | What is known | What remains open |
| --- | --- | --- |
| Engagement packaging | Bespoke consulting and hands-on delivery are confirmed. Deployment, operation and improvement fit the desired direction. | Projects, retainers, ongoing operations, training/adoption and advisory packages; names, boundaries and pricing. |
| Shoppa relationship on Embeddings | The packaged product keeps its own marketing offer. | Whether to mention or link it, where, and how prominently; do not assume it becomes a homepage centrepiece or disappears entirely. |
| Industry examples | E-commerce remains included; organisational breadth is confirmed; construction is illustrative. | Which other sectors to feature and what evidence supports sector-specific expertise. |
| Client proof and performance | Older material contains claims such as 10x productivity, 80% task automation and 70% time savings. | Evidence, attribution, publication permission and current relevance. Do not reuse them as guarantees. |
| Services and delivery capability | Desired work categories are confirmed; historical content is relevant. | Which capabilities have verified delivery examples and which are future aspirations. |
| Shopping-specific visuals | Existing components are valuable and protected by repository rules. | Exact decisions about reuse, relabelling, placement, removal from rendered pages or redesign. |
| Page wording and structure | The owner approved the direction and its distinction from Shoppa. | Final hero, service names, process labels, section order, calls to action and public copy. |
| Product capability claims | Shoppa has evolved since its launch. Current product instructions confirm later additions such as administration, analytics and document retrieval. | Verify each proposed claim against current product evidence. Current marketing mentions native platform apps and payment, while product instructions still exclude real payments; this review did not resolve that discrepancy. |

Do not import Shoppa’s historical limitations into current product copy without checking. Do not import its marketing promises into Embeddings as established consulting capability either.

## 10. Instructions for a future agent

Start by reading the owner’s new task, this brief and the current repository instructions. Establish whether that task authorises discovery, copy proposals, planning, implementation or publication. Those are separate scopes.

Use this brief as the confirmed direction. Use the archived documents as evidence of history and past decisions. Where an older positioning document says the owned shopping agent must lead every page, that describes the prior direction; it must not silently override the owner’s newly confirmed broad direction. Do not edit that older document merely by reading this brief.

Inspect current source and Git status before making any authorised changes. Preserve other work. Recheck the cited files because future work may have changed them.

Before writing final public claims, identify what is evidenced and what is merely illustrative. Obtain only the decisions necessary for the authorised stage. Do not repeatedly ask the owner to reconfirm the already-approved broad positioning.

If implementation is later authorised:

- Read applicable skills and repository constraints before coding.
- Consider all relevant routes, demonstrations, navigation, confirmation copy, metadata, social previews, structured data and public agent-readable descriptions.
- Preserve unrelated technical progress and the contact field contract.
- Resolve any specifically protected animation or contact-copy changes within the owner’s actual scope; approval of this brief alone does not authorise them.
- Follow the project’s validation and browser-verification requirements for the changes made. Inspect desktop and mobile output.
- Update durable positioning/technical instructions where the later authorised task requires it, without rewriting historical evidence as though the old direction never existed.
- Treat committing, pushing and deploying according to the later owner instruction and current repository policy. This document authorises none of those actions.

## 11. Acceptance principles for future positioning work

These are principles for judging a later proposal or implementation, not an executable checklist for this documentation task.

- A visitor can immediately recognise Embeddings as an AI consulting and implementation business serving organisations beyond retail.
- The visitor understands concrete work such as knowledge assistants, chatbots, workflow automation, connections to business systems and agent coordination.
- E-commerce remains a credible, discoverable specialism without dominating every description of the offer.
- Shoppa’s product identity is distinct. Embeddings does not look like a duplicate storefront for the same packaged shopping agent.
- About, services, process, demonstrations, enquiry, confirmation and metadata tell a consistent story.
- The screenshot’s organisational ambition informs the offer without copying recruitment content or narrowing the business to construction.
- Claims and proof are supported; examples do not masquerade as delivered client results or performance guarantees.
- Existing useful design and engineering work remains intact unless a later task explicitly authorises a particular change.
- No blanket rollback, old-file restoration, product-runtime expansion or unrelated repository work is used to achieve the repositioning.
- The owner can review the actual proposed wording and visual decisions before they are treated as final approval.

## 12. Sources and reproducible historical inspection

### Embeddings sources

- [Repository instructions](../../../AGENTS.md).
- [Current homepage](../../../src/app/page.jsx), [about](../../../src/app/about/page.jsx), [process](../../../src/app/process/page.jsx), [contact](../../../src/app/contact/page.jsx) and [thank-you](../../../src/app/thank-you/page.jsx).
- [Current site identity and route metadata](../../../src/lib/site-config.mjs), [metadata builder](../../../src/lib/metadata.js), [social-image compatibility export](../../../src/lib/images.ts) and [structured-data component](../../../src/components/StructuredData.jsx).
- [Owned-agent copy migration report](./owned_agent_site_copy_migration_plan.md), especially the goal, preceding-state inventory and owner decision record.
- [Homepage copy refinement report](./homepage_copy_refinement_plan.md).
- [Prior owned-agent positioning](../../agentic-shopping-positioning.md), [shopping-agent opportunity reference](../../reference/ai_shopping_agent.md) and [service animation documentation](../../service-section-animations.md).
- [Legacy broad description](../../../src/app/embeddings-description.md).
- [Navigation](../../../src/components/RootNavigationPanel.jsx), [footer](../../../src/components/Footer.jsx), [shopping demonstration](../../../src/components/AgentConversationShowcase.jsx), [service timeline](../../../src/components/ServiceTimelineLeftRail.jsx), [catalogue transformation](../../../src/components/CatalogueTransformation.jsx) and [contact section](../../../src/components/ContactSection.jsx).
- Existing tests include `test/homepage-owned-agent-positioning.test.mjs`, `test/process-page-catalogue-positioning.test.mjs`, `test/contact-form-contract.test.mjs` and `test/site-config.test.mjs`. Some enforce prior wording and policies. Inspect rather than blindly preserve or delete them during a later authorised migration.

### Sibling project sources

- `/Users/sacino/shoppa-root/AGENTS.md` and `README.md`: current marketing/product boundary and hosting.
- `/Users/sacino/shoppa-root/documents/learnings/todo_archive/shoppa_landing_site_plan.md`: launch history, porting decisions and the agency/product distinction at that time.
- `/Users/sacino/shoppa-root/src/pages/index.astro`: current matching headline and packaged offer.
- `/Users/sacino/shoppa-root/src/config/site.ts`: current brand identity.
- `/Users/sacino/shoppa/AGENTS.md` and `README.md`: current product description and scope boundaries.
- `/Users/sacino/shoppa/documents/learnings/todo_archive/shoppa_mvp_plan.md`: original naming/location decisions, simulated MVP journey and subsequent progress notes.

Use read-only historical inspection. For example:

```sh
git -C /Users/sacino/embeddings show 2c38ca4e47d938814f3b058c01c74610310783d7:src/app/page.jsx
git -C /Users/sacino/embeddings show 2c38ca4e47d938814f3b058c01c74610310783d7:src/app/about/page.jsx
git -C /Users/sacino/embeddings show 2c38ca4e47d938814f3b058c01c74610310783d7:src/app/process/page.jsx
git -C /Users/sacino/embeddings show --stat adcd1b7f9b6fc653e5c7c15771daf9f54d07dc32
git -C /Users/sacino/embeddings show f9068f6bdc9d0a9388c06a19016642bf65b09b54:documents/todo/shoppa_mvp_plan.md
git -C /Users/sacino/shoppa-root show --stat b2445a7581a214915849d74f67ef5e40402413f4
```

Do not check out old revisions, reset branches or restore historical files merely to inspect them. The verified history explains the direction; the owner’s confirmed current intent determines the next authorised work.
