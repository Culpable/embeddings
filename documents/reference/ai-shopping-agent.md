# Opportunity

Build an out-of-the-box AI shopping agent for online retailers. The agent helps customers find products, make purchase decisions, complete transactions, and access post-sale support.

The platform would provide an equivalent or better experience than Bunnings’ Buddy and Google’s retail shopping agent, with faster implementation, lower costs, more retailer control, and broader integrations.

## Problem Context

Retail shopping agents reportedly improve:

- Online conversion rates
- Average order value
- Customer confidence in purchase decisions
- In-store purchases
- Product return rates

The transcript cites reported conversion and average-order-value improvements of approximately 2x to 4x. The effects on in-store purchases and returns are anecdotal.

Demand appears significant. Google reportedly has a $260 million annual recurring revenue target for retail shopping agents.

Retailers want these agents, but they struggle to build them internally because:

- Their engineering capacity is limited.
- Internal development is slow.
- Organisational policies restrict rapid AI-assisted development.
- Integrations cross several teams and create ownership disputes.
- Building and maintaining a reliable retail AI system requires specialist knowledge.

## Existing Google Solution

Google provides a shopping agent through a JavaScript widget added to the retailer’s website. Its implementation depends on Google engineers who manually customise and deploy each retailer’s agent.

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
- It cannot use other search providers such as Coveo or internal search systems.
- It cannot call retailer APIs.
- It cannot answer post-sale questions such as order or return status.
- It cannot complete checkout within the chat session.
- It can only add products to the customer’s cart.
- Pricing is approximately $0.50 per session or interaction, as described in the transcript.

## Proposed Product

Create a configurable, retailer-controlled shopping agent platform with:

- A JavaScript widget for simple website installation
- Product search and discovery
- Integration with existing product catalogues
- Support for multiple search providers
- Support for retailer-owned and home-grown search systems
- Self-service prompt management
- Self-service canned-response management
- Custom branding and interface design
- Reliable reporting and analytics
- PII detection and scrubbing
- Custom API and tool integrations
- Order-status and return-status queries
- In-session checkout
- Flexible deployment and scaling
- Retailer-controlled commercial and operational settings

The agent could be generated and configured through an internal AI development agent. This could reduce implementation time from approximately six weeks to an afternoon or several days, depending on the retailer’s integrations.

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
    

## Commercial Model

Possible pricing models include:

- Charge retailers per customer session while operating on lower token and infrastructure costs.
- Charge based on usage, tokens, requests, or concurrent capacity.
- Offer a platform subscription plus usage charges.
- Charge separately for implementation and custom integrations.
- Provide premium features such as checkout, analytics, post-sale support, and advanced customisation.

The central margin opportunity is to charge less than Google’s session price while maintaining attractive margins through cheaper underlying infrastructure.

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
5. Sell the complete system as one integrated package.

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