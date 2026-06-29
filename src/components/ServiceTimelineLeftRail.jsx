// ---------------------------------------------------------------------------
// ServiceTimelineLeftRail — Approach B
// Left-rail timeline: vertical line runs along the left edge with numbered
// step circles. Text is indented to the right of the rail, and animation
// SVGs render full-width below each text block — no column constraint.
// ---------------------------------------------------------------------------

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { ResponsiveServiceAnimation } from '@/components/ResponsiveServiceAnimation'

// ---------------------------------------------------------------------------
// Service data — shared across all timeline approaches
// ---------------------------------------------------------------------------

const services = [
  {
    step: 1,
    eyebrow: 'catalogue audit',
    title: 'See every gap before your competitors exploit it',
    body: 'We analyse your entire product catalogue against Google Merchant Centre specifications and agentic commerce standards. The audit identifies missing descriptions, malformed GTINs, inconsistent taxonomy, and thin data \u2014 then produces a prioritised remediation plan ranked by revenue impact.',
    proof: ['gap map', 'feed risk', 'revenue priority'],
    mobileSummary:
      'Find missing identifiers, thin content, stale data, and feed risks before agents rank the catalogue.',
    animationKey: 'audit',
  },
  {
    step: 2,
    eyebrow: 'catalogue freshness',
    title: 'Fresh data keeps you in the recommendation set',
    body: 'AI agents penalise outdated catalogues. We build real-time integrations from your ERP, POS, and inventory systems so stock levels, pricing, and product status are always current. A fresh catalogue means your products stay in the recommendation set.',
    proof: ['stock updates', 'price sync', 'status freshness'],
    mobileSummary:
      'Connect ERP, POS, and inventory changes so product truth reaches commerce surfaces quickly.',
    animationKey: 'freshness',
  },
  {
    step: 3,
    eyebrow: 'catalogue enrichment',
    title: 'From thin listings to rich, AI-readable content',
    body: 'Our LLM pipelines transform sparse product data into rich, brand-aligned descriptions, categories, and attributes. Thousands of SKUs enriched in hours, not months. If an AI agent can\u2019t understand your product data, your products don\u2019t exist in agentic commerce.',
    proof: ['richer attributes', 'brand-safe copy', 'agent taxonomy'],
    mobileSummary:
      'Turn sparse records into complete attributes, clearer descriptions, and agent-readable taxonomy.',
    animationKey: 'enrichment',
  },
  {
    step: 4,
    eyebrow: 'contextual optimisation',
    title: 'A living catalogue that captures demand as it shifts',
    body: 'We connect your catalogue to live trend signals \u2014 Google Trends, social platforms, news cycles \u2014 so product descriptions evolve with what consumers are searching for right now. When cultural moments create demand spikes, your products are positioned to capture that intent before competitors.',
    proof: ['trend signals', 'seasonal updates', 'demand capture'],
    mobileSummary:
      'Fold trend signals back into product content while demand is still active.',
    animationKey: 'optimisation',
  },
]

// ---------------------------------------------------------------------------
// Main export — renders the full left-rail timeline
// ---------------------------------------------------------------------------

function MobileServiceStoryboard({ step, eyebrow, proof, mobileSummary }) {
  return (
    <div className="rounded-2xl border border-neutral-950/10 bg-white p-4 shadow-[0_1px_0_rgba(23,23,23,0.04)] sm:hidden">
      <div className="flex items-center justify-between gap-3">
        <p className="font-display text-xs font-semibold uppercase tracking-wider text-neutral-950">
          {eyebrow}
        </p>
        <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-neutral-950 text-xs font-semibold text-white">
          {step}
        </span>
      </div>
      <p className="mt-4 text-sm leading-6 text-neutral-600">{mobileSummary}</p>
      <ul role="list" className="mt-4 grid grid-cols-1 gap-2">
        {proof.map((item) => (
          <li
            key={item}
            className="rounded-xl border border-neutral-950/10 bg-neutral-50 px-3 py-2 text-sm font-medium text-neutral-700"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}


function ServiceLoopOverview() {
  return (
    <FadeIn>
      <ol
        className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
        aria-label="Service stages"
      >
        {services.map(({ step, eyebrow, proof, mobileSummary }) => (
          <li
            key={step}
            className="group relative overflow-hidden rounded-2xl border border-neutral-950/10 bg-white p-5 shadow-[0_1px_0_rgba(23,23,23,0.04)] transition duration-300 hover:-translate-y-1 hover:border-neutral-950/20 hover:shadow-xl"
          >
            <div
              className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-neutral-950/70 via-blue-400/70 to-emerald-400/70 opacity-80"
              aria-hidden="true"
            />
            <div className="flex items-center justify-between gap-4">
              <p className="font-display text-xs font-semibold uppercase tracking-wider text-neutral-500">
                {eyebrow}
              </p>
              <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-neutral-950 text-xs font-semibold text-white transition group-hover:scale-105">
                {step}
              </span>
            </div>
            <p className="mt-5 text-sm leading-6 text-neutral-600">
              {mobileSummary}
            </p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              proof
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {proof.slice(0, 2).map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-neutral-950/[0.06] px-2.5 py-1 text-xs font-medium text-neutral-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </FadeIn>
  )
}


export function ServiceTimelineLeftRail() {
  return (
    <Container className="mt-16">
      <div className="max-w-2xl">
        <p className="font-display text-base font-semibold text-neutral-950">
          implementation loop
        </p>
        <h3 className="mt-4 font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
          The before-and-after shift is delivered in four connected stages
        </h3>
        <p className="mt-5 text-base leading-7 text-neutral-600">
          The overview above shows the catalogue outcome. This loop shows how we
          move the data from audit evidence to live optimisation without turning
          the work into a generic AI programme.
        </p>
      </div>

      <ServiceLoopOverview />

      {/* Wrapper with absolutely-positioned vertical line along the left */}
      <div className="relative mt-12">
        {/* Vertical connecting line — sits at the horizontal centre of the step circles */}
        <div
          className="absolute bottom-0 left-5 top-5 w-px bg-neutral-200 lg:left-5"
          aria-hidden="true"
        />

        <div className="space-y-16">
          {services.map(
            ({
              step,
              eyebrow,
              title,
              body,
              proof,
              mobileSummary,
              animationKey,
            }) => (
              <FadeIn key={step}>
                <div className="service-timeline-step">
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
                      <p className="mt-6 text-xl text-neutral-600">{body}</p>
                    </div>
                  </div>

                  {/* Animation SVG — full-width below, offset to clear the rail */}
                  <div className="mt-8 pl-12 lg:pl-16">
                    <MobileServiceStoryboard
                      step={step}
                      eyebrow={eyebrow}
                      proof={proof}
                      mobileSummary={mobileSummary}
                    />
                    <div className="hidden sm:block">
                      <ResponsiveServiceAnimation animationKey={animationKey} />
                    </div>
                    <ul
                      role="list"
                      aria-label={`${eyebrow} proof points`}
                      className="mt-4 hidden grid-cols-1 gap-2 sm:grid sm:grid-cols-3"
                    >
                      {proof.map((item) => (
                        <li
                          key={item}
                          className="rounded-xl border border-neutral-950/10 bg-white px-3 py-2 text-sm font-medium text-neutral-700 shadow-[0_1px_0_rgba(23,23,23,0.04)]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            ),
          )}
        </div>
      </div>
    </Container>
  )
}
