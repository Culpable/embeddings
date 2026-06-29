import Link from 'next/link'
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
import { ServiceTimelineLeftRail } from '@/components/ServiceTimelineLeftRail'

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
    source: {
      label: 'OpenAI Instant Checkout',
      href: 'https://openai.com/index/buy-it-in-chatgpt/',
    },
    // Brand mark: OpenAI
    brandSvg: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
      </svg>
    ),
  },
  {
    date: 'Jan 2026',
    stat: 'UCP',
    statLabel: 'protocol launched',
    text: 'Google launches Universal Commerce Protocol',
    source: {
      label: 'Google UCP',
      href: 'https://blog.google/products/ads-commerce/agentic-commerce-ai-tools-protocol-retailers-platforms/',
    },
    // Brand marks: Google, Walmart, Target, Shopify
    brandLogos: ['Google', 'Walmart', 'Target', 'Shopify'],
  },
  {
    date: '2026',
    stat: '81%',
    statLabel: 'of retail executives',
    text: 'say AI will weaken brand loyalty (Deloitte)',
    source: {
      label: 'Deloitte 2026 outlook',
      href: 'https://www.deloitte.com/us/en/insights/industry/retail-distribution/retail-distribution-industry-outlook.html',
    },
  },
  {
    date: '2030',
    stat: '$3–5T',
    statLabel: 'agentic commerce',
    text: 'McKinsey projects $3–5 trillion globally',
    source: {
      label: 'McKinsey',
      href: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-automation-curve-in-agentic-commerce',
    },
    // Trend line SVG
    trendLine: true,
  },
]

// Urgency gradient colours mapped to card index (cool → warm)
// Urgency gradient colours mapped to card index (cool → warm)
const urgencyGradients = [
  'from-blue-400/80 to-blue-500/80', // cool — early signal
  'from-blue-400/80 to-violet-500/80', // transitioning
  'from-amber-400/80 to-orange-500/80', // warming — urgency building
  'from-orange-500/80 to-red-500/80', // hot — act now
]

// Coloured glow shadows matching each card's urgency gradient (Enhancement 7)
const urgencyGlows = [
  'shadow-[0_4px_12px_rgba(96,165,250,0.15)]', // blue glow
  'shadow-[0_4px_12px_rgba(139,92,246,0.15)]', // violet glow
  'shadow-[0_4px_12px_rgba(251,191,36,0.15)]', // amber glow
  'shadow-[0_4px_12px_rgba(239,68,68,0.15)]', // red glow
]

const heroProofSignals = [
  {
    stat: '700M+',
    label: 'weekly users',
    source: {
      label: 'OpenAI',
      href: 'https://openai.com/index/buy-it-in-chatgpt/',
    },
  },
  {
    stat: 'UCP',
    label: 'protocol live',
    source: {
      label: 'Google',
      href: 'https://blog.google/products/ads-commerce/agentic-commerce-ai-tools-protocol-retailers-platforms/',
    },
  },
  {
    stat: '$3–5T',
    label: 'by 2030',
    source: {
      label: 'McKinsey',
      href: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-automation-curve-in-agentic-commerce',
    },
  },
]

// Scale-up reveal variants for card materialisation effect (Enhancement 9)
const scaleUpVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
}

function SourceLink({ href, label, invert = false }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={
        invert
          ? 'mt-5 inline-flex min-h-8 w-fit items-center rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 text-xs font-semibold text-white/65 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition hover:border-white/25 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950'
          : 'mt-5 inline-flex min-h-8 w-fit items-center rounded-full border border-neutral-950/10 bg-white px-3 py-1 text-xs font-semibold text-neutral-600 shadow-[0_1px_0_rgba(23,23,23,0.04)] transition hover:border-neutral-950/20 hover:text-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2'
      }
    >
      Source · {label}
      <span className="ml-1 text-[0.65rem]" aria-hidden="true">
        ↗
      </span>
    </a>
  )
}

function HeroProofSignals() {
  return (
    <ul
      role="list"
      className="mt-8 grid max-w-3xl grid-cols-3 gap-1.5 rounded-2xl border border-neutral-950/10 bg-white/75 p-1.5 shadow-[0_1px_0_rgba(23,23,23,0.04)] sm:gap-3 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none"
      aria-label="Agentic commerce proof points"
    >
      {heroProofSignals.map(({ stat, label, source }, index) => (
        <li
          key={stat}
          className="group relative overflow-hidden rounded-xl px-2 py-2 transition duration-300 hover:-translate-y-0.5 hover:bg-white sm:rounded-2xl sm:border sm:border-neutral-950/10 sm:bg-white/70 sm:px-4 sm:py-3 sm:shadow-[0_1px_0_rgba(23,23,23,0.04)] sm:hover:border-neutral-950/20 sm:hover:shadow-lg"
        >
          <div
            className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${urgencyGradients[index]}`}
            aria-hidden="true"
          />
          <p className="font-display text-sm font-semibold tracking-tight text-neutral-950 sm:text-lg">
            {stat}
          </p>
          <p className="mt-1 text-[0.625rem] leading-3 text-neutral-500 sm:text-xs sm:leading-5">
            {label}
          </p>
          <a
            href={source.href}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex min-h-7 max-w-full items-center rounded-full border border-neutral-950/10 bg-white px-2.5 text-[0.625rem] font-semibold text-neutral-500 shadow-[0_1px_0_rgba(23,23,23,0.04)] transition hover:border-neutral-950/20 hover:text-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 sm:text-xs"
          >
            Source · {source.label}
            <span className="ml-1 text-[0.6rem]" aria-hidden="true">
              ↗
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}

function AgenticTimeline() {
  return (
    <div
      id="why-now"
      className="relative mt-24 scroll-mt-24 rounded-4xl bg-neutral-950 py-20 sm:mt-32 sm:py-32 lg:mt-56"
    >
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
            {timelineItems.map(
              (
                {
                  date,
                  stat,
                  statLabel,
                  text,
                  source,
                  brandSvg,
                  brandLogos,
                  trendLine,
                },
                index,
              ) => (
                <FadeIn key={date} variants={scaleUpVariants}>
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.1] bg-white/[0.05] shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.08] hover:shadow-xl">
                    {/* Top gradient accent bar — urgency escalation with coloured glow */}
                    <div
                      className={`h-1 w-full bg-gradient-to-r ${urgencyGradients[index]} ${urgencyGlows[index]}`}
                      aria-hidden="true"
                    />

                    <div className="flex flex-1 flex-col p-6">
                      {/* Date */}
                      <span className="font-display text-xs font-semibold uppercase tracking-widest text-white/50">
                        {date}
                      </span>

                      {/* Oversized stat — render final sourced values immediately */}
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
                      <p className="mt-1 text-xs text-white/40">{statLabel}</p>

                      {/* Brand mark / trend line (optional) */}
                      {brandSvg && (
                        <div className="mt-4 text-white/30">{brandSvg}</div>
                      )}
                      {brandLogos && (
                        <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
                          {brandLogos.map((name) => (
                            <span
                              key={name}
                              className="text-xs font-medium text-white/30"
                            >
                              {name}
                            </span>
                          ))}
                        </div>
                      )}
                      {trendLine && (
                        <div className="mt-4" aria-hidden="true">
                          <svg
                            viewBox="0 0 100 24"
                            className="h-6 w-full text-white/20"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <path
                              d="M 0 20 C 20 18, 40 16, 55 12 S 80 4, 100 2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                      )}

                      {/* Description */}
                      <p className="mt-auto pt-4 text-sm leading-relaxed text-neutral-400">
                        {text}
                      </p>
                      <SourceLink
                        invert
                        href={source.href}
                        label={source.label}
                      />
                    </div>
                  </article>
                </FadeIn>
              ),
            )}
          </div>
        </FadeInStagger>

        {/* Closing statement */}
        <FadeIn>
          <div className="mt-16 border-t border-white/10 pt-10 text-center">
            <p className="font-display text-base font-medium tracking-tight text-white sm:text-lg">
              Retailers who aren&rsquo;t agentic-ready risk falling behind.
            </p>
            <p className="mt-2 text-sm text-neutral-500">
              The ones who are? They&rsquo;re capturing market share right now.
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
    stat: '$5T',
    statLabel: 'in commerce AI agents could mediate by 2030',
    title: 'Disintermediation',
    body: 'AI agents become the storefront. Retailers lose direct customer relationships, loyalty programme activation, and the data that powers personalisation.',
    source: {
      label: 'McKinsey',
      href: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-automation-curve-in-agentic-commerce',
    },
  },
  {
    stat: '393%',
    statLabel: 'YoY growth in AI-driven retail traffic in Q1 2026',
    title: 'The data quality gap',
    body: 'Most retail catalogues have missing descriptions, outdated inventory, inconsistent taxonomy, and no trend-aligned content. AI agents can\u2019t recommend what they can\u2019t understand.',
    source: {
      label: 'Adobe Digital Insights',
      href: 'https://business.adobe.com/blog/ai-traffic-surge-retail-sites-not-machine-readable',
    },
  },
  {
    stat: '81%',
    statLabel: 'of retail executives say AI will weaken brand loyalty',
    title: 'The race is on',
    body: 'Your competitors are already preparing their catalogues for Google\u2019s Universal Commerce Protocol. Every day without action is market share lost to retailers with richer product data.',
    source: {
      label: 'Deloitte 2026 outlook',
      href: 'https://www.deloitte.com/us/en/insights/industry/retail-distribution/retail-distribution-industry-outlook.html',
    },
  },
]

function WhyNow() {
  return (
    <>
      <SectionIntro
        eyebrow="the shift"
        title="Your customers aren&rsquo;t shopping anymore &mdash; their AI agents are"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          When a customer asks ChatGPT to &ldquo;find me the best running shoes
          under $200&rdquo;, the AI agent scans product catalogues, compares
          attributes, and recommends &mdash; all without visiting your website.
          If your catalogue data is incomplete, inconsistent, or stale, your
          products won&rsquo;t be recommended. You become invisible.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {whyNowCards.map(({ stat, statLabel, title, body, source }) => (
            <FadeIn key={title} className="flex" variants={scaleUpVariants}>
              <article className="group relative flex h-full w-full flex-col overflow-hidden rounded-3xl bg-white p-8 shadow-sm ring-1 ring-neutral-950/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-neutral-950/10 sm:p-10">
                {/* Top accent bar — animated gradient shimmer on hover */}
                <div
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-neutral-300 via-neutral-950 to-neutral-300 bg-[length:200%_100%] opacity-30 transition-all duration-300 group-hover:h-0.5 group-hover:animate-[shimmerBorder_1.5s_ease-in-out_infinite] group-hover:opacity-60"
                  aria-hidden="true"
                />

                {/* Oversized stat — render final sourced values immediately */}
                <p className="bg-gradient-to-b from-neutral-950 to-neutral-950/60 bg-clip-text font-display text-6xl font-medium tracking-tight text-transparent sm:text-7xl">
                  {/* Animate all three numeric stats: $5T, 393%, 81% */}
                  {stat === '$5T' ? (
                    <AnimatedStat value={5} prefix="$" suffix="T" />
                  ) : stat === '393%' ? (
                    <AnimatedStat value={393} suffix="%" />
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
                <div
                  className="mt-4 h-px w-10 bg-neutral-200 transition-all duration-300 group-hover:w-16 group-hover:bg-neutral-950/30"
                  aria-hidden="true"
                />

                {/* Body */}
                <p className="mt-4 flex-1 text-base leading-7 text-neutral-600">
                  {body}
                </p>
                <SourceLink href={source.href} label={source.label} />
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
    <section id="services" className="scroll-mt-24">
      <SectionIntro
        eyebrow="services"
        title="Your catalogue is your competitive moat &mdash; we make it unassailable"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          From audit to real-time optimisation, our four services transform your
          product catalogue into an asset AI agents can read, trust, and
          recommend. No other consultancy in Australia has this combination of
          LLM pipeline expertise and data engineering capability.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <CatalogueTransformation />
      </Container>
      <ServiceTimelineLeftRail />
    </section>
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

export default function Home() {
  return (
    <>
      <script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      {/* Hero — headline + animated data flow SVG */}
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <FadeIn className="max-w-3xl">
          <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
            Be the brand AI agents recommend first
          </h1>
          <p className="mt-6 text-xl text-neutral-600">
            Google and OpenAI agents already shop for 700 million consumers. We
            help Australian retailers win that recommendation, starting with
            your catalogue.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            <Button href="/contact">Contact us</Button>
            <Link
              href="/process"
              className="inline-flex min-h-11 items-center rounded-full px-5 py-2 text-sm font-semibold text-neutral-950 ring-1 ring-neutral-950/10 transition hover:bg-neutral-50 hover:ring-neutral-950/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
            >
              <span className="relative top-px">Learn how it works</span>
            </Link>
          </div>
          <HeroProofSignals />
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
      <div id="proof" className="scroll-mt-24">
        <Testimonial
          className="mt-24 sm:mt-32 lg:mt-40"
          client={{
            name: 'Australian retail executive',
            role: 'Head of Digital, National Retailer',
          }}
          dark
        >
          We knew agentic shopping was coming but had no idea where to start.
          Embeddings{' '}
          <span className="underline decoration-white/30 decoration-2 underline-offset-4">
            audited our entire product catalogue in days
          </span>{' '}
          and showed us exactly where we were falling short &mdash; missing
          descriptions, stale inventory data, zero trend alignment. Their{' '}
          <span className="underline decoration-white/30 decoration-2 underline-offset-4">
            enrichment pipeline
          </span>{' '}
          transformed our catalogue from a static spreadsheet into a{' '}
          <span className="underline decoration-white/30 decoration-2 underline-offset-4">
            living, AI-ready asset.
          </span>
        </Testimonial>
      </div>

      {/* Services — before/after catalogue transformation */}
      <Services />

      {/* Contact CTA — dark section with floating catalogue data */}
      <ContactSection />
    </>
  )
}
