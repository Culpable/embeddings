# Agentic Shopping: Site Positioning & Business Context

> **Purpose**: This document provides full context on what Embeddings does, the market problem we address, and why the home page is structured the way it is. Read this before making any changes to site messaging, copy, or structure.

---

## What is agentic shopping?

Agentic shopping is a paradigm shift in e-commerce where AI agents — not humans — research, compare, and purchase products on behalf of consumers. Instead of a person browsing a retailer's website, an AI agent (such as ChatGPT or Google's shopping agent) receives a natural-language instruction like "find me the best running shoes under $200", then autonomously:

1. Scans product catalogues across multiple retailers
2. Compares attributes (price, availability, specifications, reviews)
3. Recommends or purchases the best match — without ever visiting a traditional website

The consumer never sees your brand, your website, or your marketing. The AI agent is the storefront.

### Key milestones

| Date | Event |
|------|-------|
| Sep 2025 | OpenAI launches Instant Checkout in ChatGPT (700M+ weekly users) |
| Jan 2026 | Google launches Universal Commerce Protocol (UCP) with Walmart, Target, Shopify |
| 2026 | 81% of retail executives say AI will weaken brand loyalty (Deloitte) |
| 2026 | AI-driven e-commerce traffic grew 758% year-on-year (Adobe) |
| 2030 | McKinsey projects $3–5 trillion in agentic commerce globally |

---

## Visual storytelling priorities

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

The retailer becomes a commodity supplier behind an AI intermediary.

### 2. The catalogue data quality gap

AI agents can only recommend products they can understand. Most Australian retail catalogues have critical data quality problems:

- **Missing or thin descriptions** — products with no meaningful text for an AI agent to parse
- **Outdated inventory and pricing** — stale data that causes AI agents to deprioritise or exclude products
- **Inconsistent taxonomy** — categories, attributes, and naming conventions that don't align with industry standards (e.g. Google Merchant Centre specifications)
- **Malformed identifiers** — incorrect or missing GTINs, MPNs, and other machine-readable product identifiers
- **No trend alignment** — product descriptions that don't reflect current consumer search language and purchasing patterns

If an AI agent can't parse your product data, your products don't exist in agentic commerce. You become invisible.

### 3. The competitive race

Retailers who prepare their catalogues for agentic commerce gain a compounding advantage — their products surface in AI recommendations, generating sales data that further improves their ranking. Retailers who delay fall further behind with every passing day. This is a winner-takes-most dynamic.

---

## What Embeddings does

Embeddings helps Australian retailers make their product catalogues agentic-ready. We have a unique combination of **LLM pipeline expertise** (to enrich catalogues at scale using large language models) and **data engineering capability** (to keep catalogues fresh and connected to live signals) that no other consultancy in Australia offers.

### Four services

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

The home page follows a narrative arc designed to move a retail executive from awareness to action:

1. **Hero** — leads with the $3T market size to establish scale, then immediately positions Embeddings as the solution for Australian retailers
2. **Agentic Timeline** — creates urgency by showing this isn't a future problem; it's happening now, with real products from Google and OpenAI already in market
3. **Why Now (The Shift)** — explains the three risks (disintermediation, data quality gap, competitive race) so the reader understands the consequences of inaction
4. **Testimonial** — social proof from a retail executive who has been through the process
5. **Services** — the four concrete services Embeddings offers, structured as a clear path from audit to ongoing optimisation
6. **Contact CTA** — direct call to action

### Key messaging principles

- **Catalogue is the moat**: The central thesis is that catalogue data quality is the single most important factor in agentic commerce readiness. Everything on the page reinforces this.
- **Urgency without fear-mongering**: The timeline and statistics create urgency, but the tone is consultative and authoritative, not alarmist.
- **Specificity over generality**: We name Google UCP, OpenAI Instant Checkout, McKinsey, Deloitte, and Adobe by name. Specificity builds credibility.
- **Australian focus**: We are explicitly positioned for Australian retailers. This is a deliberate market constraint that builds trust and relevance.
- **Real-world examples**: The Taylor Swift dress, heavy metals scandal, and SPF sunscreen recall are concrete, recent examples that Australian retail executives will recognise. Specificity builds urgency.

---

## Copy conventions

- All text uses **British English** (analyse, organisation, capitalise, programme, catalogue, etc.)
- Apostrophes in user-facing text use the **right single quotation mark** (`'`, U+2019), not the typewriter apostrophe (`'`, U+0027). e.g. "isn't", "won't", "Google's"
- Em dashes are used for parenthetical breaks and list separators

---

## Market statistics (sources)

These statistics are referenced on the home page and should be kept current:

- **$3–5 trillion by 2030**: McKinsey, agentic commerce market projection
- **758% YoY growth**: Adobe, AI-driven e-commerce traffic
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