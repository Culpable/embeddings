import Link from 'next/link'
import { organizationSchema } from '@/schemas/organization-schema'
import { pageMetadata } from '@/lib/metadata'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { SectionIntro } from '@/components/SectionIntro'
import { Testimonial } from '@/components/Testimonial'
import { HeroDataFlow } from '@/components/HeroDataFlow'
import { AgentConversationShowcase } from '@/components/AgentConversationShowcase'
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
    statLabel: 'agent checkout standard',
    text: 'Google launches UCP, an open standard for agent checkout',
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

// Gradient colours mapped to card index (cool → warm). The timeline cards use
// the ramp to escalate urgency; the hero proof pills reuse the same palette
// purely for visual progression.
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

// Hero proof pills state the product promise in three beats: the sale happens
// in one conversation, the agent is owned rather than rented, and it goes live
// in weeks. Entries omit `source` because these are product signals, not
// third-party claims.
const heroProofSignals = [
  {
    stat: 'Sold',
    label: 'in one conversation',
  },
  {
    stat: 'Yours',
    label: 'not rented',
  },
  {
    stat: 'Live',
    label: 'in weeks',
  },
]

// Scale-up reveal variants for card materialisation effect (Enhancement 9)
const scaleUpVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
}

function SourceLink({ href, label, invert = false }) {
  // Dark timeline cards keep the original full-height pill: it sits beside
  // oversized display type, so its scale is proportionate there.
  if (invert) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex min-h-11 w-fit items-center rounded-full border border-white/15 bg-white/[0.03] pl-3 pr-2.5 text-xs font-semibold text-white/65 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-[transform,border-color,background-color,color,box-shadow] duration-200 ease-out hover:border-white/25 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 active:scale-[0.96] sm:min-h-10"
      >
        Source · {label}
        <span
          className="ml-1 inline-flex -translate-y-px items-center text-[0.65rem]"
          aria-hidden="true"
        >
          ↗
        </span>
      </a>
    )
  }

  // Light cards pair the pill with smaller supporting copy, so keep the
  // 44px/40px responsive tap target on the link while rendering a compact
  // visual pill inside it.
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group/source mt-3 inline-flex min-h-11 w-fit items-center transition-transform duration-200 ease-out focus-visible:outline-none active:scale-[0.96] sm:min-h-10"
    >
      <span className="inline-flex items-center rounded-full border border-neutral-950/10 bg-white py-1 pl-3 pr-2.5 text-xs font-semibold leading-4 text-neutral-600 shadow-[0_1px_0_rgba(23,23,23,0.04)] transition-[border-color,color] duration-200 ease-out group-hover/source:border-neutral-950/20 group-hover/source:text-neutral-950 group-focus-visible/source:ring-2 group-focus-visible/source:ring-neutral-950 group-focus-visible/source:ring-offset-2">
        Source · {label}
        <span
          className="ml-1 inline-flex -translate-y-px items-center text-[0.65rem]"
          aria-hidden="true"
        >
          ↗
        </span>
      </span>
    </a>
  )
}


function HeroProofSignals() {
  return (
    <ul
      role="list"
      className="mt-8 grid max-w-3xl grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3"
      aria-label="Your shopping agent at a glance"
    >
      {heroProofSignals.map(({ stat, label, source }, index) => (
        // Mobile pads asymmetrically (14px top / 10px bottom) to optically
        // centre the text. The 18px stat sits in a 28px line box with no
        // descenders, so its ink rides ~3px above the box centre, and the 2px
        // gradient bar adds visual weight at the top. The 24px total keeps the
        // 52px card height identical. The sm: stacked layout resets to py-3.
        <li
          key={stat}
          className="surface-elevation-light surface-elevation-light-hover group relative grid grid-cols-[auto_1fr] items-center gap-x-3 overflow-hidden rounded-xl bg-white/70 px-3 pb-2.5 pt-3.5 transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-white sm:block sm:rounded-2xl sm:px-4 sm:py-3"
        >
          <div
            className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${urgencyGradients[index]}`}
            aria-hidden="true"
          />
          <p className="font-display text-lg font-semibold tracking-tight text-neutral-950 sm:text-xl">
            {stat}
          </p>
          <p className="text-xs leading-5 text-neutral-500 sm:mt-1 sm:text-xs">
            {label}
          </p>
          {/* Product-promise pills carry no third-party source. Render the
              source pill only for entries that still cite one, keeping the
              44px/40px responsive tap target on the link when present. */}
          {source ? (
            <a
              href={source.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Source: ${source.label}`}
              className="group/source inline-flex min-h-11 max-w-[8.5rem] shrink-0 items-center transition-transform duration-200 ease-out focus-visible:outline-none active:scale-[0.96] sm:mt-1.5 sm:min-h-10 sm:max-w-full"
            >
              <span className="inline-flex min-w-0 max-w-full items-center rounded-full border border-neutral-950/10 bg-white py-1 pl-2.5 pr-2 text-[0.625rem] font-semibold leading-4 text-neutral-500 shadow-[0_1px_0_rgba(23,23,23,0.04)] transition-[border-color,color] duration-200 ease-out group-hover/source:border-neutral-950/20 group-hover/source:text-neutral-950 group-focus-visible/source:ring-2 group-focus-visible/source:ring-neutral-950 group-focus-visible/source:ring-offset-2 sm:text-xs">
                <span className="truncate">Source · {source.label}</span>
                <span
                  className="ml-1 inline-flex -translate-y-px items-center text-[0.6rem]"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </span>
            </a>
          ) : null}
        </li>
      ))}
    </ul>
  )
}

// ---------------------------------------------------------------------------
// The agent — owned shopping agent showcase (conversation, controls, reporting)
// ---------------------------------------------------------------------------

function AgentShowcase() {
  return (
    <section id="agent" className="scroll-mt-24">
      <SectionIntro
        eyebrow="the agent"
        title="One conversation from ‘I’m looking for…’ to ‘it’s on its way’"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          Your agent greets customers on your site, answers from your
          catalogue, takes payment in the chat, and handles the follow-ups,
          from ‘where’s my order?’ to returns.
        </p>
        <p className="mt-4 text-base text-neutral-600">
          It plugs into the search you already run:
          Algolia, Coveo, Elasticsearch, Google Retail Search, or your own
          index.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <AgentConversationShowcase />
      </Container>
    </section>
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
            Agentic shopping isn&rsquo;t coming. It&rsquo;s here.
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
                  <article className="surface-elevation-dark surface-elevation-dark-hover group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white/[0.05] backdrop-blur-xl transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-1 hover:bg-white/[0.08]">
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
              Retailers who own the conversation keep the customer.
            </p>
            <p className="mt-2 text-sm text-neutral-500">
              The rest are handing their relationships to someone else&rsquo;s
              agent.
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
    // Title-led card: the McKinsey $3–5T figure already renders on the
    // timeline above, so this card leads with its title instead of
    // duplicating the stat one viewport apart.
    title: 'Disintermediation',
    body: 'AI agents become the storefront. If the agent belongs to a platform, the customer relationship, loyalty activation, and first-party data go with it. Your own agent keeps them.',
    source: {
      label: 'McKinsey',
      href: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-automation-curve-in-agentic-commerce',
    },
  },
  {
    stat: '393%',
    statLabel: 'YoY growth in AI-driven retail traffic in Q1 2026',
    title: 'The data foundation',
    body: 'An agent is only as good as the catalogue behind it. Missing descriptions, stale inventory, and inconsistent taxonomy produce wrong answers, whether the agent is yours or a platform\u2019s.',
    source: {
      label: 'Adobe Digital Insights',
      href: 'https://business.adobe.com/blog/ai-traffic-surge-retail-sites-not-machine-readable',
    },
  },
  {
    // Title-led card: the Deloitte 81% figure already renders on the
    // timeline above, so this card leads with its title instead of
    // duplicating the stat one viewport apart.
    title: 'The race is on',
    body: 'Early movers are already putting branded agents in front of their customers. Every month without one is a month of conversations, and conversions, happening somewhere else.',
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
        title="Your customers will talk to an AI agent. Make sure it’s yours."
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          When shopping moves into a third-party chat, the platform owns the
          relationship, the data, and the follow-up sale. A shopping agent you
          own keeps discovery, checkout, and after-sales support on your site,
          in your brand, answering from your catalogue.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {whyNowCards.map(({ stat, statLabel, title, body, source }) => (
            <FadeIn key={title} className="flex" variants={scaleUpVariants}>
              <article className="surface-elevation-light surface-elevation-light-hover group relative flex h-full w-full flex-col overflow-hidden rounded-3xl bg-white p-8 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 sm:p-10">
                {/* Top accent bar — animated gradient shimmer on hover */}
                <div
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-neutral-300 via-neutral-950 to-neutral-300 bg-[length:200%_100%] opacity-30 transition-[height,opacity,background-position] duration-300 group-hover:h-0.5 group-hover:animate-[shimmerBorder_1.5s_ease-in-out_infinite] group-hover:opacity-60"
                  aria-hidden="true"
                />

                {/* Cards with a unique sourced stat keep the oversized figure
                    ahead of the title; the remaining cards lead with their
                    title at display scale so no market claim renders twice on
                    the homepage. */}
                {stat ? (
                  <>
                    {/* Oversized stat — render final sourced values as server text */}
                    <p className="bg-gradient-to-b from-neutral-950 to-neutral-950/60 bg-clip-text font-display text-6xl font-medium tracking-tight text-transparent sm:text-7xl">
                      {stat}
                    </p>
                    <p className="mt-2 min-h-[2.5rem] text-sm leading-snug text-neutral-500">
                      {statLabel}
                    </p>

                    {/* Title */}
                    <h3 className="mt-8 font-display text-xl font-semibold tracking-tight text-neutral-950 sm:text-2xl">
                      {title}
                    </h3>
                  </>
                ) : (
                  // Title-led card — the title takes the leading slot at
                  // display scale, with no stat block above it.
                  <h3 className="font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
                    {title}
                  </h3>
                )}

                {/* Divider */}
                <div
                  className="mt-4 h-px w-10 bg-neutral-200 transition-[width,background-color] duration-300 group-hover:w-16 group-hover:bg-neutral-950/30"
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
        title="Your catalogue is your agent’s brain. We make it complete."
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          Everything your agent says starts with your product data. Our four
          services turn the catalogue into an asset an agent can read, trust,
          and sell from. The same enriched data keeps you visible wherever
          external AI agents shop.
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

      {/* Hero — headline + animated data flow SVG. The mobile top margin is
          deliberately tighter than desktop so the first flow card crests the
          390px-tall fold and cues the visitor to scroll. */}
      <Container className="mt-12 sm:mt-28 md:mt-40 lg:mt-44">
        <FadeIn className="max-w-3xl">
          <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
            The shopping agent that’s actually yours
          </h1>
          <p className="mt-6 text-lg text-neutral-600 sm:text-xl">
            We build shopping agents that Australian retailers own. Your agent
            takes customers from first question to checkout, and
            keeps helping after the sale.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            <Button href="/contact">Contact us</Button>
            <Link
              href="/process"
              className="inline-flex min-h-11 items-center rounded-full px-5 py-2 text-sm font-semibold text-neutral-950 ring-1 ring-neutral-950/10 transition-[transform,background-color,box-shadow] duration-200 ease-out hover:bg-neutral-50 hover:ring-neutral-950/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 active:scale-[0.96]"
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

      {/* The agent — conversation storyboard, controls, and reporting */}
      <AgentShowcase />

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
          We had no idea where to start with agentic shopping. Embeddings{' '}
          <span className="underline decoration-white/30 decoration-2 underline-offset-4">
            audited our catalogue in days
          </span>{' '}
          and transformed it from a static spreadsheet into a{' '}
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
