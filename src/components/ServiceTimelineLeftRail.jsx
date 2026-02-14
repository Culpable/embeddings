// ---------------------------------------------------------------------------
// ServiceTimelineLeftRail — Approach B
// Left-rail timeline: vertical line runs along the left edge with numbered
// step circles. Text is indented to the right of the rail, and animation
// SVGs render full-width below each text block — no column constraint.
// ---------------------------------------------------------------------------

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { AuditXRayScanner } from '@/components/AuditXRayScanner'
import { FreshnessPipelineFlow } from '@/components/FreshnessPipelineFlow'
import { EnrichmentTypewriter } from '@/components/EnrichmentTypewriter'
import { OptimisationRipple } from '@/components/OptimisationRipple'

// ---------------------------------------------------------------------------
// Service data — shared across all timeline approaches
// ---------------------------------------------------------------------------

const services = [
  {
    step: 1,
    eyebrow: 'catalogue audit',
    title: 'See every gap before your competitors exploit it',
    body: 'We analyse your entire product catalogue against Google Merchant Centre specifications and agentic commerce standards. The audit identifies missing descriptions, malformed GTINs, inconsistent taxonomy, and thin data \u2014 then produces a prioritised remediation plan ranked by revenue impact.',
    Animation: AuditXRayScanner,
  },
  {
    step: 2,
    eyebrow: 'catalogue freshness',
    title: 'Fresh data keeps you in the recommendation set',
    body: 'AI agents penalise outdated catalogues. We build real-time integrations from your ERP, POS, and inventory systems so stock levels, pricing, and product status are always current. A fresh catalogue means your products stay in the recommendation set.',
    Animation: FreshnessPipelineFlow,
  },
  {
    step: 3,
    eyebrow: 'catalogue enrichment',
    title: 'From thin listings to rich, AI-readable content',
    body: 'Our LLM pipelines transform sparse product data into rich, brand-aligned descriptions, categories, and attributes. Thousands of SKUs enriched in hours, not months. If an AI agent can\u2019t understand your product data, your products don\u2019t exist in agentic commerce.',
    Animation: EnrichmentTypewriter,
  },
  {
    step: 4,
    eyebrow: 'contextual optimisation',
    title: 'A living catalogue that captures demand as it shifts',
    body: 'We connect your catalogue to live trend signals \u2014 Google Trends, social platforms, news cycles \u2014 so product descriptions evolve with what consumers are searching for right now. When cultural moments create demand spikes, your products are positioned to capture that intent before competitors.',
    Animation: OptimisationRipple,
  },
]

// ---------------------------------------------------------------------------
// Main export — renders the full left-rail timeline
// ---------------------------------------------------------------------------

export function ServiceTimelineLeftRail() {
  return (
    <Container className="mt-16">
      {/* Wrapper with absolutely-positioned vertical line along the left */}
      <div className="relative">
        {/* Vertical connecting line — sits at the horizontal centre of the step circles */}
        <div
          className="absolute top-5 bottom-0 left-5 w-px bg-neutral-200 lg:left-5"
          aria-hidden="true"
        />

        <div className="space-y-16">
          {services.map(({ step, eyebrow, title, body, Animation }) => (
            <FadeIn key={step}>
              <div>
                {/* Step header — circle + text indented to the right */}
                <div className="relative grid grid-cols-[auto_1fr] gap-x-4 pl-0 lg:gap-x-6">
                  {/* Step circle — sits on top of the vertical line */}
                  <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-950 text-sm font-semibold text-white">
                    {step}
                  </span>

                  {/* Text content — indented right of the rail */}
                  <div className="max-w-2xl pt-1">
                    <p className="font-display text-base font-semibold text-neutral-950">
                      {eyebrow}
                    </p>
                    <h3 className="mt-6 font-display text-4xl font-medium tracking-tight text-neutral-950 sm:text-5xl">
                      {title}
                    </h3>
                    <p className="mt-6 text-xl text-neutral-600">
                      {body}
                    </p>
                  </div>
                </div>

                {/* Animation SVG — full-width below, offset to clear the rail */}
                <div className="mt-8 pl-12 lg:pl-16">
                  <Animation />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </Container>
  )
}
