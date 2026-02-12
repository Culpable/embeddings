import Link from 'next/link'
import Script from 'next/script'
import { organizationSchema } from '@/schemas/organization-schema'
import { pageMetadata } from '@/lib/metadata'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { SectionIntro } from '@/components/SectionIntro'
import { Testimonial } from '@/components/Testimonial'
import { HeroDataFlow } from '@/components/HeroDataFlow'
import { CatalogueTransformation } from '@/components/CatalogueTransformation'
import { AnimatedStat } from '@/components/AnimatedStat'
import { NoiseOverlay } from '@/components/NoiseOverlay'

import { loadCaseStudies } from '@/lib/mdx'
import { Button } from '@/components/Button'

// ---------------------------------------------------------------------------
// Agentic Shopping Timeline — Horizontal stat-led cards with urgency gradient
// ---------------------------------------------------------------------------

const timelineItems = [
  {
    date: 'Sep 2025',
    stat: '700M+',
    statLabel: 'weekly users',
    text: 'OpenAI launches Instant Checkout in ChatGPT',
    // Brand mark: OpenAI
    brandSvg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
      </svg>
    ),
  },
  {
    date: 'Jan 2026',
    stat: 'UCP',
    statLabel: 'protocol launched',
    text: 'Google launches Universal Commerce Protocol',
    // Brand marks: Google, Walmart, Target, Shopify
    brandLogos: ['Google', 'Walmart', 'Target', 'Shopify'],
  },
  {
    date: '2026',
    stat: '81%',
    statLabel: 'of retail executives',
    text: 'say AI will weaken brand loyalty (Deloitte)',
  },
  {
    date: '2030',
    stat: '$3–5T',
    statLabel: 'agentic commerce',
    text: 'McKinsey projects $3–5 trillion globally',
    // Trend line SVG
    trendLine: true,
  },
]

// Urgency gradient colours mapped to card index (cool → warm)
// Urgency gradient colours mapped to card index (cool → warm)
const urgencyGradients = [
  'from-blue-400/80 to-blue-500/80',       // cool — early signal
  'from-blue-400/80 to-violet-500/80',      // transitioning
  'from-amber-400/80 to-orange-500/80',     // warming — urgency building
  'from-orange-500/80 to-red-500/80',       // hot — act now
]

// Coloured glow shadows matching each card's urgency gradient (Enhancement 7)
const urgencyGlows = [
  'shadow-[0_4px_12px_rgba(96,165,250,0.15)]',   // blue glow
  'shadow-[0_4px_12px_rgba(139,92,246,0.15)]',    // violet glow
  'shadow-[0_4px_12px_rgba(251,191,36,0.15)]',    // amber glow
  'shadow-[0_4px_12px_rgba(239,68,68,0.15)]',     // red glow
]

// Scale-up reveal variants for card materialisation effect (Enhancement 9)
const scaleUpVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
}

function AgenticTimeline() {
  return (
    <div className="relative mt-24 rounded-4xl bg-neutral-950 py-20 sm:mt-32 sm:py-32 lg:mt-56">
      {/* Noise texture overlay for visual depth */}
      <NoiseOverlay id="timeline" />
      <Container>
        {/* Section header */}
        <FadeIn className="flex items-center gap-x-8">
          <h2 className="text-center font-display text-sm font-semibold tracking-wider text-white sm:text-left">
            Agentic shopping isn&rsquo;t coming &mdash; it&rsquo;s here
          </h2>
          <div className="h-px flex-auto bg-neutral-800" />
        </FadeIn>

        {/* Timeline cards */}
        <FadeInStagger faster>
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {timelineItems.map(({ date, stat, statLabel, text, brandSvg, brandLogos, trendLine }, index) => (
              <FadeIn key={date} variants={scaleUpVariants}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.1] bg-white/[0.05] shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.08] hover:shadow-xl">
                  {/* Top gradient accent bar — urgency escalation with coloured glow */}
                  <div
                    className={`h-1 w-full bg-gradient-to-r ${urgencyGradients[index]} ${urgencyGlows[index]}`}
                    aria-hidden="true"
                  />

                  <div className="flex flex-1 flex-col p-6">
                    {/* Date */}
                    <span className="font-display text-xs font-semibold tracking-widest text-white/50 uppercase">
                      {date}
                    </span>

                    {/* Oversized stat — animated count-up for numeric values */}
                    <p className="mt-3 font-display text-4xl font-medium tracking-tight text-white lg:text-5xl">
                      {/* "700M+" → prefix="", value=700, suffix="M+" */}
                      {/* "UCP" and "$3–5T" stay static (not purely numeric) */}
                      {/* "81%" → value=81, suffix="%" */}
                      {stat === '700M+' ? (
                        <AnimatedStat value={700} suffix="M+" />
                      ) : stat === '81%' && index === 2 ? (
                        <AnimatedStat value={81} suffix="%" />
                      ) : (
                        stat
                      )}
                    </p>
                    <p className="mt-1 text-xs text-white/40">
                      {statLabel}
                    </p>

                    {/* Brand mark / trend line (optional) */}
                    {brandSvg && (
                      <div className="mt-4 text-white/30">
                        {brandSvg}
                      </div>
                    )}
                    {brandLogos && (
                      <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
                        {brandLogos.map((name) => (
                          <span key={name} className="text-xs font-medium text-white/30">
                            {name}
                          </span>
                        ))}
                      </div>
                    )}
                    {trendLine && (
                      <div className="mt-4" aria-hidden="true">
                        <svg viewBox="0 0 100 24" className="h-6 w-full text-white/20" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M 0 20 C 20 18, 40 16, 55 12 S 80 4, 100 2" strokeLinecap="round" />
                        </svg>
                      </div>
                    )}

                    {/* Description */}
                    <p className="mt-auto pt-4 text-sm leading-relaxed text-neutral-400">
                      {text}
                    </p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </FadeInStagger>

        {/* Closing statement */}
        <FadeIn>
          <div className="mt-16 border-t border-white/10 pt-10 text-center">
            <p className="font-display text-base font-medium tracking-tight text-white sm:text-lg">
              Retailers who aren&rsquo;t agentic-ready risk becoming invisible.
            </p>
            <p className="mt-2 text-sm text-neutral-500">
              Your catalogue is your competitive moat.
            </p>
          </div>
        </FadeIn>
      </Container>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Why Now — Stat-led impact cards with oversized statistics
// ---------------------------------------------------------------------------

const whyNowCards = [
  {
    stat: '0',
    statLabel: 'customer touchpoints when an AI agent shops for your customer',
    title: 'Disintermediation',
    body: 'AI agents become the storefront. Retailers lose direct customer relationships, loyalty programme activation, and the data that powers personalisation.',
  },
  {
    stat: '758%',
    statLabel: 'YoY growth in AI-driven e-commerce traffic',
    title: 'The data quality gap',
    body: 'Most retail catalogues have missing descriptions, outdated inventory, inconsistent taxonomy, and no trend-aligned content. AI agents can\u2019t recommend what they can\u2019t understand.',
  },
  {
    stat: '81%',
    statLabel: 'of retail executives say AI will weaken brand loyalty',
    title: 'The race is on',
    body: 'Your competitors are already preparing their catalogues for Google\u2019s Universal Commerce Protocol. Every day without action is market share lost to retailers with richer product data.',
  },
]

function WhyNow() {
  return (
    <>
      <SectionIntro
        eyebrow="the shift"
        title="Your customers are about to stop shopping &mdash; their AI agents will do it for them"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          When a customer asks ChatGPT to &ldquo;find me the best running shoes under $200&rdquo;,
          the AI agent scans product catalogues, compares attributes, and recommends &mdash; all without
          visiting your website. If your catalogue data is incomplete, inconsistent, or stale, your
          products won&rsquo;t be recommended. You become invisible.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {whyNowCards.map(({ stat, statLabel, title, body }) => (
            <FadeIn key={title} className="flex" variants={scaleUpVariants}>
              <article className="group relative flex h-full w-full flex-col overflow-hidden rounded-3xl bg-white p-8 shadow-sm ring-1 ring-neutral-950/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-neutral-950/10 sm:p-10">
                {/* Top accent bar — animated gradient shimmer on hover */}
                <div
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-neutral-300 via-neutral-950 to-neutral-300 bg-[length:200%_100%] opacity-30 transition-all duration-300 group-hover:h-0.5 group-hover:opacity-60 group-hover:animate-[shimmerBorder_1.5s_ease-in-out_infinite]"
                  aria-hidden="true"
                />

                {/* Oversized stat — animated count-up for numeric values */}
                <p className="font-display text-6xl font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-neutral-950 to-neutral-950/60 sm:text-7xl">
                  {/* "0" stays static (already at target), "758%" and "81%" animate */}
                  {stat === '758%' ? (
                    <AnimatedStat value={758} suffix="%" />
                  ) : stat === '81%' ? (
                    <AnimatedStat value={81} suffix="%" />
                  ) : (
                    stat
                  )}
                </p>
                <p className="mt-2 min-h-[2.5rem] text-sm leading-snug text-neutral-500">
                  {statLabel}
                </p>

                {/* Title */}
                <h3 className="mt-8 font-display text-xl font-semibold tracking-tight text-neutral-950 sm:text-2xl">
                  {title}
                </h3>

                {/* Divider */}
                <div className="mt-4 h-px w-10 bg-neutral-200 transition-all duration-300 group-hover:w-16 group-hover:bg-neutral-950/30" aria-hidden="true" />

                {/* Body */}
                <p className="mt-4 flex-1 text-base leading-7 text-neutral-600">{body}</p>
              </article>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </>
  )
}

// ---------------------------------------------------------------------------
// Services — Before/after catalogue transformation visual
// ---------------------------------------------------------------------------

function Services() {
  return (
    <>
      <SectionIntro
        eyebrow="services"
        title="Four services to make your catalogue agentic-ready"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          We combine deep expertise in LLM pipelines and data engineering at scale to prepare your
          product catalogue for AI-driven commerce. No other consultancy on the market has this
          combination of skills and context.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <CatalogueTransformation />
      </Container>
    </>
  )
}

// ---------------------------------------------------------------------------
// Page metadata & default export
// ---------------------------------------------------------------------------

export const metadata = {
  title: {
    absolute: pageMetadata.home.title,
  },
  description: pageMetadata.home.description,
}

export default async function Home() {
  // Case studies data retained for future use
  let caseStudies = (await loadCaseStudies()).slice(0, 3)

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />

      {/* Hero — headline + animated data flow SVG */}
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <FadeIn className="max-w-3xl">
          <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
            The $3 trillion agentic shopping revolution starts with your catalogue
          </h1>
          <p className="mt-6 text-xl text-neutral-600">
            AI agents from Google and OpenAI are already shopping on behalf of your customers. We
            help Australian retailers become the brands these agents recommend first.
          </p>
          <div className="mt-8 flex gap-4">
            <Button href="/contact">Contact us</Button>
            <Link
              href="/process"
              className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold text-neutral-950 ring-1 ring-neutral-950/10 transition hover:bg-neutral-50 hover:ring-neutral-950/20"
            >
              <span className="relative top-px">Learn how it works</span>
            </Link>
          </div>
        </FadeIn>
        {/* Animated SVG data flow: Catalogue → AI Agent → Consumer */}
        <FadeIn>
          <HeroDataFlow />
        </FadeIn>
      </Container>

      {/* Agentic Shopping Timeline */}
      <AgenticTimeline />

      {/* Why Now — stat-led impact cards */}
      <WhyNow />

      {/* Testimonial — dark editorial pull-quote variant */}
      <Testimonial
        className="mt-24 sm:mt-32 lg:mt-40"
        client={{
          name: 'Australian retail executive',
          role: 'Head of Digital, National Retailer',
        }}
        dark
      >
        We knew agentic shopping was coming but had no idea where to start. Embeddings{' '}
        <span className="underline decoration-white/30 decoration-2 underline-offset-4">
          audited our entire product catalogue in days
        </span>{' '}
        and showed us exactly where we were falling short &mdash; missing descriptions, stale
        inventory data, zero trend alignment. Their{' '}
        <span className="underline decoration-white/30 decoration-2 underline-offset-4">
          enrichment pipeline
        </span>{' '}
        transformed our catalogue from a static spreadsheet into a{' '}
        <span className="underline decoration-white/30 decoration-2 underline-offset-4">
          living, AI-ready asset
        </span>.
      </Testimonial>

      {/* Services — before/after catalogue transformation */}
      <Services />

      {/* Contact CTA — dark section with floating catalogue data */}
      <ContactSection />
    </>
  )
}
