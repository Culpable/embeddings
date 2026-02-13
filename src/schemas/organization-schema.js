/**
 * Organization Schema.org structured data
 * This template follows the Organization schema from schema.org
 * Reference: https://schema.org/Organization
 */

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Embeddings",
  "alternateName": "Embeddings: Generative AI for Australian Businesses",
  "url": "https://embeddings.au",
  "logo": "https://embeddings.au/images/embeddings-logo.png",
  "image": "https://embeddings.au/images/embeddings-agentic-shopping.png",
  "description": "AI embeddings experts and consultants specialising in machine learning solutions.",
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
