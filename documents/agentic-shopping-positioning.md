# Owned-Agent Positioning: Site Messaging & Business Context

> **Purpose**: This document provides full context on what Embeddings does, the market problem we address, and why the home page is structured the way it is. Read this before making any changes to site messaging, copy, or structure.
>
> **Product source of truth**: `documents/reference/ai_shopping_agent.md`. That document defines the product and its capability ceiling. Nothing may be shown or claimed on the site unless it appears in its § Proposed Product or § Longer-Term Product Scope.

---

## The positioning hierarchy (read this first)

Embeddings builds **AI shopping agents that retailers own**: the agent runs on the retailer's own site, in the retailer's own brand, grounded in the retailer's own enriched catalogue, and connected to the retailer's own commerce systems.

Three layers, in strict order of prominence:

1. **The owned agent leads.** It is the headline product on every page. Conversational discovery, in-conversation checkout, order and returns support, self-service retailer control, revenue analytics, and a pluggable search layer.
2. **Catalogue enrichment is the credibility foundation and the entry product.** Everything the agent says starts with the product data. The four catalogue services are still sold, and they are still the way most engagements begin, but they are framed as the agent's brain rather than as the whole offer.
3. **External-agent readiness is a supporting benefit, never the headline.** The same enriched data that makes an owned agent accurate also keeps a retailer visible when ChatGPT or a commerce agent shops on a customer's behalf. This appears exactly once, as a supporting clause in the services section.

The old site inverted this: it sold only layer 2, framed by layer 3, and never mentioned layer 1. That framing is superseded.

### Product naming

The product is referred to **descriptively only**: "your shopping agent", "your AI shopping agent", "your agent". There is no invented product name and no brand mark for the agent anywhere on the site.

---

## Claims policy (binding)

This policy exists because `documents/reference/ai_shopping_agent.md` is an internal opportunity assessment whose competitive figures are hedged ("reportedly", "as described in the transcript"). Those figures are not publishable claims.

**Never on the site:**

- Naming Google, Bunnings, or Buddy as a competitor or incumbent agent vendor.
- Any performance or pricing figure taken from the internal guide: uplift multipliers, per-session pricing, ARR targets, or incumbent build-time claims.
- Pricing of any kind. No figures, no pricing-model descriptions (no "per session", "platform fee", "usage-based", no tiers), and no "cheaper" or "lower cost" claims. Pricing is value-based and deliberately non-prescriptive; the contact CTA is the enquiry path.
- The incumbent's operating model as a marketing message.

**Allowed:**

- Sourced third-party market evidence with its source link: the McKinsey, Deloitte, Adobe, OpenAI, and UCP timeline and stat cards. Google and OpenAI may be named there because that is ecosystem reporting, not competitor positioning.
- Naming supported **search platforms** as integrations: Algolia, Coveo, Elasticsearch, Google Retail Search, and retailer-owned indexes. The exact phrase `Google Retail Search` in an integration list is an ecosystem mention. It appears only in the homepage agent section body and the process page Deploy stage, and never inside `AgentConversationShowcase.jsx`.
- Qualitative statements about speed and flexibility of delivery ("weeks", "without waiting on anyone").
- Demo product-interface values inside the agent showcase (sample session counts, conversion rate, assisted revenue). These must read as interface mockup, never as promised results: no "up to", no ROI framing, no uplift multipliers.

**Contrast with the incumbent is implicit only**: "live in weeks", "change your own prompts", "no search lock-in". Never named.

---

## Messaging Priority Matrix (binding for all site copy)

The incumbent-problem areas in `documents/reference/ai_shopping_agent.md` § Customer Problems are **not** equal-weight marketing messages. This matrix is the settled priority policy.

| Message area | Policy | Where it lands on the site |
| --- | --- | --- |
| Customer control (incl. change velocity) | Highlight AND show. Change velocity folds into control ("Change it yourself. Live in seconds.") | Hero pill `Yours`; agent showcase control strip; process Operate |
| In-conversation checkout | Highlight prominently; hardest to build, strongest differentiator | Hero pill `Sold`; showcase checkout beat; capability chip; process Deploy |
| Post-sales support | Highlight; easy to understand, high customer value | Showcase order-status beat; `order & returns support` chip; process Operate |
| User experience / branding | Highlight; easy to understand, high customer value | Hero H1 and subhead; showcase rendered in retailer brand; process Deploy |
| Search openness (anti lock-in) | Highlight; name supported platforms once; flavour: open, flexible, never tied to one search index | Agent section body and process Deploy named-platform line; `bring your own search` chip |
| Integrations | Highlight (orders, returns, inventory, commerce APIs) | Showcase beats; process Deploy |
| Analytics | Highlight; straightforward, high value | Showcase control-strip stat tiles; `revenue analytics` chip; process Operate |
| Speed/flexibility of delivery | Qualitative only ("weeks", "without waiting"); never present "implementation" as a feature in itself | Hero pill `Live`; process page framing |
| Pricing | OFF copy entirely: no figures, no pricing-model descriptions, no "cheaper" claim. Pricing is value-based and deliberately non-prescriptive; the contact CTA is the enquiry path | Nothing to write; enforced by the claims policy above |
| Operating model | Not a marketing message at all | Absent from all copy |
| Implementation mechanics | Not highlighted directly | Absent except as speed/flexibility above |

---

## What is agentic shopping?

Agentic shopping is a paradigm shift in e-commerce where AI agents — not humans — research, compare, and purchase products on behalf of consumers. Instead of a person browsing a retailer's website, an AI agent (such as ChatGPT or Google's shopping agent) receives a natural-language instruction like "find me the best running shoes under $200", then autonomously:

1. Scans product catalogues across multiple retailers
2. Compares attributes (price, availability, specifications, reviews)
3. Recommends or purchases the best match — without ever visiting a traditional website

The consumer never sees your brand, your website, or your marketing. The AI agent is the storefront.

**This is why owning the agent matters.** If the agent belongs to a platform, the customer relationship, the loyalty activation, and the first-party data belong to the platform too. An agent the retailer owns keeps discovery, checkout, and after-sales support on the retailer's own site, in the retailer's own brand, answering from the retailer's own catalogue. The market shift below is real, and it argues for owning the conversation rather than only feeding someone else's.

### Key milestones

| Date | Event |
|------|-------|
| Sep 2025 | OpenAI launches Instant Checkout in ChatGPT (700M+ weekly users) |
| Jan 2026 | Google launches Universal Commerce Protocol (UCP) with Walmart, Target, Shopify |
| 2026 | 81% of retail executives say AI will weaken brand loyalty (Deloitte) |
| 2026 | AI-driven retail traffic grew 393% year-on-year in Q1 (Adobe) |
| 2030 | McKinsey projects $3–5 trillion in agentic commerce globally |

---

## Visual storytelling priorities

### The owned agent (primary visual)

The single most important visual on the site is the `#agent` section on the home page (`src/components/AgentConversationShowcase.jsx`). It **shows** the product instead of describing it, in three parts:

1. **Conversation storyboard** — one continuous, retailer-branded conversation: a customer asks for a dress for a spring wedding, the agent recommends from the enriched catalogue with stock and price, the customer pays inside the chat, and later asks where the order is and gets a real answer. Discovery, checkout, and post-sales support in a single thread.
2. **Control strip** — a canned-response rule being edited by the retailer's own team, publishing straight to live. This shows customer control and change velocity rather than claiming them: "Change it yourself. Live in seconds."
3. **Analytics tiles** — sample sessions, conversion, and assisted-revenue reporting, framed as product interface, not as promised results.

The rule for this section: every capability shown must map to `documents/reference/ai_shopping_agent.md` § Proposed Product. Show, do not tell.

### Agentic shopping experience

The website must feature rich, unique, captivating visuals that demonstrate the agentic shopping experience in practice. The goal is to show — not just tell — how AI agents are fundamentally changing the shopping journey.

**Key visual moments to illustrate:**

- **The consumer input**: A person giving a natural-language instruction to an AI agent ("find me the best running shoes under $200")
- **The autonomous scanning**: The AI agent scanning product catalogues across multiple retailers simultaneously, invisible to the consumer
- **The comparison layer**: The AI agent evaluating attributes — price, specifications, reviews, availability — without human intervention
- **The recommendation or purchase**: The AI agent presenting options or completing a transaction, with the retailer's brand and website never entering the equation

The consumer experience is frictionless. The retailer is disintermediated. These visuals must make this paradigm shift immediately graspable to retail executives who may not yet understand they're being cut out of the customer relationship.

### Catalogue services visualisation

Each of the four catalogue services requires compelling visual representation to illustrate the technical value proposition:

1. **Catalogue Audit**: Visual representation of gaps — missing data fields, thin descriptions, malformed identifiers
2. **Catalogue Freshness**: Real-time data pipelines flowing from ERP/inventory systems to the catalogue
3. **Catalogue Enrichment**: Before/after comparison of product listings, showing transformation from sparse data to rich, AI-readable content
4. **Contextual Catalogue Optimisation**: Real-time trending signals (Google Trends, social media, news) feeding into catalogue descriptions, with examples of products being dynamically enriched to capture search intent

---

## The problem Australian retailers face

### 1. Disintermediation

AI agents become the new storefront. When a customer delegates shopping to an AI agent, the retailer loses:

- **Direct customer relationships** — the AI platform owns the interaction, not the retailer
- **Loyalty programme activation** — there's no opportunity to incentivise repeat purchases through traditional loyalty mechanics
- **First-party data** — the behavioural and preference data that powers personalisation flows to the AI platform instead

The retailer becomes a commodity supplier behind an AI intermediary. The answer is not to fight the shift, it is to own an agent of your own so the conversation, and everything that flows from it, stays with the retailer.

### 2. The catalogue data foundation

An agent is only as good as the catalogue behind it, and that is true whether the agent belongs to the retailer or to a platform. Most Australian retail catalogues have critical data quality problems:

- **Missing or thin descriptions** — products with no meaningful text for an AI agent to parse
- **Outdated inventory and pricing** — stale data that causes AI agents to deprioritise or exclude products
- **Inconsistent taxonomy** — categories, attributes, and naming conventions that don't align with industry standards (e.g. Google Merchant Centre specifications)
- **Malformed identifiers** — incorrect or missing GTINs, MPNs, and other machine-readable product identifiers
- **No trend alignment** — product descriptions that don't reflect current consumer search language and purchasing patterns

Missing descriptions, stale inventory, and inconsistent taxonomy produce wrong answers. A retailer's own agent that recommends an out-of-stock product or misdescribes a garment damages trust faster than no agent at all. This is why catalogue enrichment is the foundation and the entry product rather than an optional extra.

### 3. The competitive race

Early movers are already putting branded agents in front of their customers. Every month without one is a month of conversations, and conversions, happening somewhere else. Retailers who move gain a compounding advantage: better conversations produce better data, which produces better answers.

---

## What Embeddings does

Embeddings builds **AI shopping agents that Australian retailers own**, and enriches the product catalogues those agents run on. We have a unique combination of **LLM pipeline expertise** (to build the agent and enrich catalogues at scale using large language models) and **data engineering capability** (to keep catalogues fresh and connected to live commerce systems) that no other consultancy in Australia offers.

### The agent

The headline product is a configurable, retailer-controlled shopping agent covering conversational discovery and recommendation, a pluggable search layer, custom branding and interface design, self-service prompt and policy management, custom API integrations for orders, returns, loyalty, and inventory, in-conversation cart and checkout, analytics, and governance. The full capability list, and the ceiling on what may be claimed, is `documents/reference/ai_shopping_agent.md` § Proposed Product.

Delivery runs in three stages, which is exactly how `/process` is structured:

1. **Foundation** — catalogue audit, LLM enrichment, and freshness pipelines.
2. **Deploy** — ground the agent on the enriched catalogue, integrate the retailer's existing search, brand the interface into their design system, configure prompts and guardrails, and connect cart, checkout, order-status, and returns APIs.
3. **Operate** — conversation and revenue analytics, trend-responsive catalogue optimisation, and self-service handover.

### Four catalogue services

These are the foundation layer. They remain a sold offer and the usual entry point, and they are what makes the agent trustworthy.

Australian retailers operate catalogues containing tens of thousands to hundreds of thousands of SKUs. These catalogues are the foundation of agentic commerce readiness, but most have significant data quality problems that prevent AI agents from understanding and recommending their products. Our four services address this systematically.

---

#### 1. Catalogue Audit

Analyses the retailer's entire product catalogue against Google Merchant Centre specifications and agentic commerce standards. The audit identifies two types of gaps:

**Literal gaps**: Missing data fields
- No product description
- Missing GTINs (Global Trade Item Numbers) or MPNs (Manufacturer Part Numbers)
- Absent specifications (dimensions, materials, compatibility)
- No images or insufficient image quality
- Missing category assignments

**Quality gaps**: Data exists but isn't fit for purpose
- Descriptions are present but thin, generic, or non-specific
- Existing text lacks the semantic richness AI agents need to understand product attributes
- Taxonomy is inconsistent or doesn't align with industry standards
- Product titles don't match how consumers actually search
- Attributes are malformed or use non-standard terminology

The audit produces a prioritised remediation plan that ranks SKUs by revenue impact and data quality severity, giving the retailer a clear roadmap for improvement.

---

#### 2. Catalogue Freshness

Builds integrations from the retailer's ERP and inventory management systems so the catalogue is always up to date. AI agents penalise stale data, so freshness is a direct ranking signal.

**Real-time data synchronisation:**
- Stock availability (in stock, low stock, out of stock)
- Pricing updates (base price, promotional pricing, dynamic pricing)
- Product status (active, discontinued, seasonal)
- Inventory location (warehouse availability, store-specific stock)

Fresh data ensures AI agents don't recommend products that are out of stock or mispriced, which would erode trust in the AI agent's recommendations and hurt the retailer's ranking in future queries.

---

#### 3. Catalogue Enrichment

Runs LLM pipelines across the catalogue to generate rich, brand-aligned descriptions, categories, and attributes from existing product images and data. Thousands of SKUs enriched in hours, not months.

**Filling missing data:**
- Generate product descriptions from images using vision-language models
- Extract specifications from manufacturer data sheets
- Infer categories and attributes from existing product information
- Create GTINs and MPNs where missing or malformed

**Enhancing existing data:**
- Transform thin, generic descriptions into rich, semantically structured content
- Expand product titles to include key search terms and attributes
- Generate attribute tags that AI agents use for filtering and comparison
- Restructure existing text to align with how AI agents parse product information

The goal is making products discoverable. If an AI agent can't understand your product data, your products don't exist in agentic commerce. Catalogue enrichment transforms sparse, human-oriented product listings into machine-readable, AI-optimised content that surfaces in recommendations.

---

#### 4. Contextual Catalogue Optimisation

Connects the catalogue to live trend signals — Google Trends, social platforms, news cycles, purchasing data — so product descriptions evolve with what consumers are actually searching for right now. A living catalogue that capitalises on demand as it shifts in real time.

This isn't static enrichment. It's dynamic, real-time alignment of product data with current search intent and consumer sentiment. When cultural moments, health scares, or trending topics create sudden demand spikes, Contextual Catalogue Optimisation ensures the retailer's products are positioned to capture that intent before competitors.

**How it works:**

1. **Signal monitoring**: Continuous tracking of Google Trends, social media trending topics, news cycles, and purchasing pattern shifts
2. **Relevance mapping**: Identifying which products in the catalogue are relevant to emerging trends
3. **Real-time enrichment**: Dynamically updating product descriptions to align with current search language and consumer concerns
4. **Intent capture**: Ensuring products surface in AI agent recommendations when consumers search using trending terminology

---

### Real-world examples of Contextual Catalogue Optimisation

#### Example 1: Taylor Swift blue dress

**The cultural moment:**
Taylor Swift is photographed wearing a distinctive blue dress at a high-profile event. Within hours, searches for "Taylor Swift blue dress", "Taylor Swift dress", and related terms spike dramatically.

**The catalogue opportunity:**
Kmart sells blue dresses that share visual characteristics with the dress Taylor Swift wore — similar silhouette, colour palette, style details.

**The optimisation:**
Contextual Catalogue Optimisation detects the search spike and identifies relevant products in Kmart's catalogue. Product descriptions are dynamically enriched to include:
- "Taylor Swift-inspired blue dress"
- Style descriptors that match how people are searching ("midi length", "A-line silhouette", "sapphire blue")
- Context tags that connect the product to the trending moment

**The result:**
When consumers ask AI agents to "find me a dress like Taylor Swift's blue dress", Kmart's products surface in recommendations because the catalogue has been enriched to match current search intent. Competitors with static catalogues are invisible to the AI agent.

**The time window:**
This demand spike is time-limited — peak interest lasts days to weeks. Static catalogue enrichment processes (which take months) miss the window entirely. Contextual Catalogue Optimisation captures revenue in real time.

---

#### Example 2: Heavy metals in food products

**The consumer concern:**
Consumer Reports publishes investigations revealing elevated levels of lead and cadmium in dark chocolate and protein powders. The reports receive widespread media coverage and social media amplification.

**Search behaviour shift:**
Searches for "heavy metals in chocolate", "lead-free protein powder", "heavy metal testing", "safe protein powder", and related terms increase dramatically. Consumers are actively seeking products with verified safety testing.

**The catalogue opportunity:**
Retailers selling chocolate, protein powder, cacao products, and nutritional supplements have an opportunity to differentiate if they conduct rigorous heavy metal testing or source from low-contamination suppliers.

**The optimisation:**
Contextual Catalogue Optimisation detects the search spike and consumer sentiment shift. For relevant products, descriptions are enriched to highlight:
- Third-party heavy metal testing (if available)
- Low heavy metal content verification
- Sourcing from regions with lower soil contamination
- Compliance with Australian heavy metal limits for food products
- Independent lab certifications

**Product description transformation:**

**Before:**
"Premium organic cacao powder. Rich, smooth chocolate flavour. Perfect for smoothies and baking."

**After (contextually optimised):**
"Premium organic cacao powder. Independently tested for heavy metals with verified low lead and cadmium levels. Rich, smooth chocolate flavour. Perfect for smoothies and baking. Sourced from certified low-contamination regions."

**The result:**
When consumers ask AI agents to "find chocolate powder with low heavy metals" or "safe protein powder without lead", products with enriched descriptions surface in recommendations. Products without this contextual enrichment are deprioritised or excluded, even if they have identical safety profiles — because the AI agent can't understand what it can't read.

---

#### Example 3: SPF sunscreen scandal

**The regulatory event:**
Choice (Australian consumer advocacy organisation) publishes testing results showing multiple sunscreen brands fail to meet their claimed SPF levels. The Therapeutic Goods Administration (TGA) issues recalls for multiple sunscreen products with lower-than-claimed SPF protection.

**Consumer reaction:**
Trust in sunscreen brands erodes. Searches for "TGA approved sunscreen", "third-party tested SPF", "sunscreen recalls", "safe sunscreen Australia", and related terms spike. Consumers are actively seeking verified, trustworthy products.

**The catalogue opportunity:**
Sunscreen retailers who conduct third-party SPF testing or have products that weren't part of the recalls have a significant competitive advantage — but only if their catalogue data communicates this to AI agents.

**The optimisation:**
Contextual Catalogue Optimisation detects the search spike and sentiment shift around sunscreen trust. For relevant products, descriptions are enriched to highlight:
- TGA approval and compliance
- Third-party SPF testing and verification
- Independent laboratory certifications
- Not part of recent recalls
- Transparent testing methodology

**Product description transformation:**

**Before:**
"SPF 50+ broad spectrum sunscreen. Water resistant for 4 hours. Non-greasy formula suitable for sensitive skin."

**After (contextually optimised):**
"SPF 50+ broad spectrum sunscreen. Independently tested and TGA verified to meet claimed SPF levels. Third-party laboratory certified. Water resistant for 4 hours. Non-greasy formula suitable for sensitive skin. Not subject to TGA recalls."

**The result:**
When consumers ask AI agents to "find trustworthy sunscreen" or "sunscreen with verified SPF", products with enriched descriptions surface prominently. Products without this contextual enrichment are passed over, regardless of actual quality — the AI agent prioritises products it can verify meet consumer concerns.

**The compounding advantage:**
Products that surface in these high-intent searches generate sales. Those sales become signals that further improve ranking in AI recommendations. Retailers who capture the initial demand spike gain a compounding advantage that persists beyond the news cycle.

---

## The strategic value of Contextual Catalogue Optimisation

Traditional catalogue enrichment is a one-time or periodic exercise. Contextual Catalogue Optimisation is continuous and responsive. It transforms the catalogue from a static repository into a dynamic asset that:

1. **Captures time-sensitive demand**: Cultural moments, health scares, and trending topics create temporary demand spikes. Static catalogues miss the window. Dynamic enrichment captures revenue in real time.

2. **Adapts to evolving search language**: How consumers search for products changes constantly. Search terms that worked six months ago may be obsolete. Contextual optimisation keeps the catalogue aligned with current language.

3. **Responds to competitive dynamics**: When competitors fail (recalls, scandals, quality issues), there's an opportunity to differentiate. Contextual optimisation ensures your products surface when consumers search for alternatives.

4. **Builds compounding ranking advantages**: Products that surface in AI recommendations generate sales. Sales data improves future ranking. Early movers gain advantages that compound over time.

This is the difference between being reactive and being positioned. Reactive retailers wait for sales to decline before investigating. Positioned retailers capture demand as it emerges.

---

## Home page structure rationale

The home page follows a narrative arc designed to move a retail executive from awareness to action. The offer comes first, the market argument second:

1. **Hero** — states the owned-agent offer directly ("The shopping agent that's actually yours") with three product-promise pills: `Sold` (in one conversation), `Yours` (not rented), `Live` (in weeks). The hero diagram shows catalogue → your agent → your customer.
2. **The agent (`#agent`)** — the showcase described above. It sits immediately after the hero because a visitor must be able to discover the headline product in the first two viewports.
3. **Agentic Timeline** — creates urgency by showing this isn't a future problem; it's happening now, with real products already in market. Closes on ownership: retailers who own the conversation keep the customer.
4. **Why Now (The Shift)** — "Your customers will talk to an AI agent. Make sure it's yours." Explains the three arguments (disintermediation, the data foundation, the race) so the reader understands the consequences of inaction.
5. **Testimonial** — social proof from a retail executive. This remains a catalogue audit and enrichment story, which is the correct proof for the entry product. Do not invent agent-deployment testimony; no such client exists.
6. **Services** — the four catalogue services, framed as the agent's brain, with external-agent readiness as the single supporting benefit clause.
7. **Contact CTA** — "Put your own agent in the conversation."

### Key messaging principles

- **Own the conversation**: The central thesis is that the retailer should own the agent, not merely be visible to someone else's. Catalogue quality is what makes that agent trustworthy, so it is the foundation, not the headline.
- **Show, don't tell**: Differentiators that are easy to claim and hard to build (in-conversation checkout, self-service control, post-sales support) are demonstrated in the agent showcase rather than asserted in prose.
- **Urgency without fear-mongering**: The timeline and statistics create urgency, but the tone is consultative and authoritative, not alarmist.
- **Specificity over generality, within the claims policy**: We name UCP, Instant Checkout, McKinsey, Deloitte, and Adobe as sourced market evidence, and we name supported search platforms as integrations. We never name a competitor or an incumbent agent vendor.
- **Australian focus**: We are explicitly positioned for Australian retailers. This is a deliberate market constraint that builds trust and relevance.
- **Real-world examples**: The Taylor Swift dress, heavy metals scandal, and SPF sunscreen recall are concrete, recent examples that Australian retail executives will recognise. Specificity builds urgency.
- **One coherent product universe**: The Sapphire Blue A-Line Midi Dress (GTIN 0614141123456, $189.00 AUD) is the shared demo product across the catalogue before/after visual, the agent conversation, and the floating CTA snippets. Reuse it rather than inventing new demo data.

---

## Copy conventions

- All text uses **British English** (analyse, organisation, capitalise, programme, catalogue, etc.)
- Apostrophes in user-facing text use the **right single quotation mark** (`'`, U+2019), not the typewriter apostrophe (`'`, U+0027). e.g. "isn't", "won't", "Google's"
- New body copy avoids em dashes; use commas or full stops instead. Existing untouched strings keep their current punctuation
- Main navigation and footer link labels are intentionally lowercase
- The product is named descriptively only ("your shopping agent", "your agent"); never invent a product name

---

## Market statistics (sources)

These statistics are referenced on the home page and should be kept current:

- **$3–5 trillion by 2030**: McKinsey, agentic commerce market projection
- **393% YoY growth**: Adobe, AI-driven retail traffic in Q1 2026
- **81% of retail executives**: Deloitte, belief that generative AI will weaken brand loyalty by 2027
- **700M+ weekly users**: OpenAI, ChatGPT active user base at time of Instant Checkout launch
- **Google UCP partners**: Walmart, Target, Shopify (launch partners, January 2026)

---

## References

### Heavy metals in food products

**Consumer Reports: Lead and cadmium in dark chocolate**
- [Lead and Cadmium in Dark Chocolate](https://www.consumerreports.org/health/food-safety/lead-and-cadmium-in-dark-chocolate-a8480295550/)
- Investigation revealing elevated heavy metal levels in popular chocolate brands
- Published: December 2022

**Consumer Reports: Lead in protein powders**
- [Protein Powders and Shakes Contain High Levels of Lead](https://www.consumerreports.org/lead/protein-powders-and-shakes-contain-high-levels-of-lead-a4206364640/)
- Testing revealing heavy metal contamination in protein supplements
- Published: March 2023

### Sunscreen SPF scandal (Australia)

**Choice: Sunscreen testing failures**
- [Sunscreen Test Results](https://www.choice.com.au/health-and-body/beauty-and-personal-care/skin-care-and-cosmetics/articles/sunscreen-test)
- Independent testing showing multiple sunscreens fail to meet claimed SPF levels
- Australian consumer advocacy investigation

**TGA: Multiple sunscreen recalls**
- [Multiple Sunscreens Recall - Lower Than Claimed SPF Levels](https://www.tga.gov.au/safety/recalls-and-other-market-actions/market-actions/multiple-sunscreens-recall-lower-claimed-spf-levels)
- Official regulatory action by Australia's Therapeutic Goods Administration
- Multiple products recalled for lower-than-claimed sun protection