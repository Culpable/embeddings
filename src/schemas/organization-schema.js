/**
 * Organization Schema.org structured data
 * This template follows the Organization schema from schema.org
 * Reference: https://schema.org/Organization
 */

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Embeddings",
  "alternateName": "Embeddings: AI Shopping Agents for Australian Retailers",
  "url": "https://embeddings.au",
  "logo": "https://embeddings.au/images/embeddings-logo.png",
  "image": "https://embeddings.au/images/embeddings-agentic-shopping.png",
  "description": "Australian consultancy that builds retailer-owned AI shopping agents and the enriched product catalogues that power them.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "PO Box 155",
    "addressLocality": "Northlands",
    "postOfficeBoxNumber": "155",
    "postalCode": "6905",
    "addressRegion": "WA",
    "addressCountry": "AU"
  }
} 
