# Opportunity

Build an out-of-the-box AI shopping agent for online retailers. The agent helps customers find products, make purchase decisions, complete transactions, and access post-sale support.

The platform would provide an equivalent or better experience than Bunnings’ Buddy and Google’s retail shopping agent, with faster implementation, lower costs, more retailer control, and broader integrations.

## Core Thesis

The opening is organisational, not technical. Building a shopping agent is not the hard part: a retailer mainly needs a product catalogue (fundamentally a structured table of product data), a search index, and a lightweight website integration such as a JavaScript widget. Much of the remaining work (prompts, UI, and retailer-specific behaviour) can be generated or configured quickly rather than hand-coded by engineers.

The incumbent constraint is Google’s delivery model: organisational process, product lock-in, pricing, ownership boundaries, and the need for Google engineers to implement every customer-specific change. A smaller team could deliver an equivalent or better experience faster, at lower cost, and with more customer control.

Supporting points:

- Retailers want conversational shopping experiences because they can improve conversion, average order value, and customer confidence.
- Google has validated demand, but its current product and operating model leave gaps in speed, control, cost, integrations, user experience, and retailer independence.
- Retail executives value rapid visible delivery, even when the implementation is service-heavy behind the scenes.
- The incumbent’s integration and checkout limitations appear to be driven by internal ownership and support boundaries rather than technical difficulty.

## Market Validation

Retail shopping agents reportedly improve:

- Online conversion rates
- Average order value
- Customer confidence in purchase decisions
- In-store purchases
- Product return rates

The transcript cites reported conversion and average-order-value improvements of approximately 2x to 4x. The effects on in-store purchases and returns are anecdotal.

Bunnings’ agent, Buddy (https://www.bunnings.com.au/), is described as commercially successful, with higher conversion rates, larger average order values, more confident purchase decisions, fewer returns, and possible increases in in-store sales.

Demand appears significant. Google reportedly has a US$260 million annual recurring revenue target for retail shopping agents.

Retailers want these agents, but they struggle to build them internally because:

- Their engineering capacity is limited.
- Internal development is slow.
- Organisational policies restrict rapid AI-assisted development.
- Integrations cross several teams and create ownership disputes.
- Building and maintaining a reliable retail AI system requires specialist knowledge.

An out-of-the-box product would let these retailers deploy quickly and capture value sooner.

## Existing Google Solution

Google provides a shopping agent through a JavaScript widget added to the retailer’s website. Its implementation depends on Google engineers who manually customise and deploy each retailer’s agent. Even minor changes must pass through Google’s CI/CD pipeline, so retailers have very limited control over the experience.

The transcript identifies these limitations:

- Implementations take approximately six weeks.
- Customer changes require Google engineers.
- Updates can take 24 to 72 hours to deploy.
- The product is not self-service.
- Retailers have little control over prompts and canned responses.
- Reporting is limited and unreliable.
- PII detection and scrubbing are inadequate.
- The interface is a fixed pop-out chat that retailers cannot meaningfully customise.
- The agent only supports product search and discovery.
- It depends on Google Retail Search.
- It cannot use other search providers such as Algolia, Coveo, or internal search systems.
- It cannot call retailer APIs.
- It cannot answer post-sale questions such as order or return status.
- It cannot complete checkout within the chat session.
- It can only add products to the customer’s cart, so customers must leave the agent to finish the purchase and retailers remain exposed to normal cart-abandonment rates.
- Pricing is approximately US$0.50 per session or interaction, as described in the transcript.

Per-session pricing becomes expensive at scale. Worked example:

- Bunnings has roughly 20 million monthly active users. A 2% interaction rate gives 400,000 sessions per month, which is approximately US$200,000 per month at US$0.50 per session.

### Customer Problems With the Incumbent Approach

| Area | Observed problem |
| --- | --- |
| Implementation | Customer-specific builds rely heavily on Google software engineers, creating a services bottleneck. |
| Change velocity | Even minor prompt, policy, or response changes may require an engineering request and deployment cycle. |
| Customer control | Retailers cannot independently manage prompts, canned responses, policies, or much of the user experience. Every change goes through a full change process. |
| Search lock-in | The solution is tied to Google Retail Search rather than integrating broadly with existing search platforms. |
| Integrations | Custom APIs, order tracking, returns, and other business systems are not readily supported. |
| Checkout | The agent can add items to cart but cannot complete checkout inside the conversation. |
| Analytics | Retailers receive limited, unreliable, or difficult-to-use performance data. |
| User experience | The UI is a generic pop-out chat widget with little brand or layout customisation. |
| Pricing | Per-session pricing becomes expensive at high traffic volumes. |
| Post-sales support | The product focuses on discovery and does not cover order status, returns, and similar service journeys. |
| Operating model | Cross-team ownership and support boundaries slow product expansion and custom work. |

## Proposed Product

Create a configurable, retailer-controlled shopping-agent platform that deploys rapidly and connects to the retailer’s existing catalogue, search, commerce, and service systems:

- Catalogue ingestion and enrichment
- Conversational product discovery and recommendation
- A pluggable, search-model-agnostic search layer supporting Google Retail Search, Coveo, Algolia, Elasticsearch/OpenSearch, and retailer-owned or home-grown indexes
- Embeddable JavaScript or web-component integration for simple website installation
- Custom branding and interface design, including placement and interaction patterns beyond a pop-out chat box
- Self-service prompt, policy, canned-response, and terms management
- Custom tool and API integrations for inventory, order tracking, returns, loyalty, delivery estimates, and store availability
- Order-status and return-status queries
- In-session cart and checkout orchestration where the retailer’s commerce stack permits it
- Analytics for sessions, conversion, assisted revenue, average order value, search success, drop-off, containment, and escalation
- PII detection, redaction, audit logs, approvals, and governance controls
- Versioning, testing, staged rollout, and rollback for retailer-made changes
- Flexible deployment and scaling
- Retailer-controlled commercial and operational settings

The agent could be generated and configured through an internal AI development agent. Reusable components and AI-assisted implementation could move a retailer from catalogue to pilot in days to a few weeks, compared with a bespoke six-week engineering engagement.

## Customer Value Proposition

The product would compete on four main advantages:

1. **Faster implementation**

    Launch a retailer-specific shopping agent substantially faster than Google or an internal engineering team.

2. **Lower cost**

    Use container, request, and token-based infrastructure instead of Google’s high per-session cost.

3. **More control**

    Let retailers update prompts, legal responses, branding, behaviour, and configuration without waiting for an external engineer.

4. **More capability**

    Support custom search systems, retailer APIs, post-sale support, and in-session checkout.

### Differentiation

The four advantages expand into seven differentiation axes:

- **Faster:** Use reusable components and AI-assisted implementation to move from catalogue to pilot in days to a few weeks rather than a bespoke six-week engineering engagement.
- **Cheaper:** Offer infrastructure- and token-aware pricing rather than a rigid high per-session fee.
- **More flexible:** Integrate with the retailer’s existing search, commerce, and service stack.
- **More controllable:** Give business, legal, and ecommerce teams safe self-service configuration.
- **More complete:** Cover both pre-sales discovery and post-sales service workflows.
- **Better branded:** Provide an experience that can be embedded naturally into the retailer’s website and design system.
- **Better measured:** Make value visible through reliable revenue, conversion, and operational analytics.

## Commercial Model

Possible pricing models include:

- **Platform fee plus usage:** a fixed monthly licence with model, infrastructure, or request-based usage above an allowance.
- **Tiered sessions:** lower marginal pricing as volume increases, avoiding a flat high cost at scale.
- **Outcome-linked component:** optional pricing tied to assisted revenue or measurable conversion uplift, with careful attribution rules.
- **Implementation package:** a fixed-fee launch covering catalogue ingestion, design, integrations, and initial optimisation.
- **Enterprise add-ons:** governance, private deployment, advanced analytics, SLA, dedicated environments, and premium integrations.

The key commercial advantage is flexibility: internal infrastructure costs can be modelled at the container, request, and token level, while customer pricing can be designed around value rather than mirroring raw cost. This allows the product to charge less than Google’s session price while maintaining attractive margins through cheaper underlying infrastructure.

## Target Customers

The initial customers would be medium-to-large online retailers that:

- Have an established product catalogue
- Want to improve conversion and average order value
- Cannot build a shopping agent quickly in-house
- Use a non-Google search provider
- Need custom legal or customer-service responses
- Want order, return, checkout, or other API integrations
- Need greater control over the customer experience

## Go-to-Market Positioning

The core positioning is:

> A customisable retail shopping agent that launches faster, costs less, works with your existing systems, and supports the complete shopping journey.
> 

The sales proposition is easy for an internal buyer to communicate:

- Launch quickly.
- Demonstrate measurable conversion impact.
- Avoid a large internal engineering project.
- Retain control after launch.
- Integrate with the retailer’s existing technology.
- Pay less than Google’s offering.

## Connection to the Existing Embeddings Business

This product fits the current catalogue-enrichment positioning:

1. Enrich the retailer’s catalogue.
2. Index the enriched catalogue for product discovery.
3. Add a shopping agent that uses the catalogue.
4. Connect the agent to checkout, order, return, and other retailer APIs.
5. Sell the complete system as one integrated, easy-to-integrate package.

Catalogue enrichment can therefore become the entry product, with the shopping agent as the higher-value application built on top of it.

## Longer-Term Product Scope

The initial product could focus on search and discovery. It could then expand into:

- Product comparison and recommendations
- Guided shopping
- Cart management
- In-session checkout
- Order tracking
- Returns management
- Customer-service automation
- Omnichannel and in-store support
- Retail analytics and conversation intelligence

The broader opportunity is an AI commerce layer that manages the customer journey from product discovery through post-sale support.
