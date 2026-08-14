// ---------------------------------------------------------------------------
// AgentConversationShowcase — Demonstrates the retailer-owned shopping agent
// instead of describing it. The section has three parts:
//
//   1. Conversation storyboard (customer facing): five beats covering
//      discovery, recommendation, in-conversation checkout, and a post-sale
//      order-status follow-up, rendered inside a mock retailer-branded window.
//   2. Control strip (retailer facing): a canned-response rule mid-edit that
//      publishes straight to live, showing self-service control and change
//      velocity rather than claiming them.
//   3. Analytics tiles: sample product-interface reporting values.
//
// Static Server Component. Every reveal is CSS-only (see .agent-beat and the
// control-strip keyframes in src/styles/components.css), so this section adds
// no client JavaScript to the homepage bundle.
// ---------------------------------------------------------------------------

import { NoiseOverlay } from '@/components/NoiseOverlay'

// ---------------------------------------------------------------------------
// Demo data — kept consistent with the catalogue demo product used by
// CatalogueTransformation and the ContactSection floating snippets so the
// site's fictional product universe stays coherent.
// ---------------------------------------------------------------------------

const recommendedProducts = [
  {
    name: 'Sapphire Blue A-Line Midi Dress',
    price: '$189.00',
    detail: 'size 10 · in stock',
    gtin: '0614141123456',
    swatch: 'from-blue-500 to-indigo-600',
  },
  {
    name: 'Blush Crepe Wrap Midi Dress',
    price: '$159.00',
    detail: 'size 10 · 3 left',
    gtin: '0614141123791',
    swatch: 'from-rose-300 to-rose-500',
  },
]

// Sample reporting values. These are product-interface mockup figures, not
// promised results, so they carry no uplift framing.
const analyticsTiles = [
  { label: 'sessions', value: '1,284' },
  { label: 'conversion', value: '4.8%' },
  { label: 'assisted revenue', value: '$42k' },
]

const capabilityChips = [
  'conversational discovery',
  'checkout in the chat',
  'order & returns support',
  'bring your own search',
  'self-service control',
  'revenue analytics',
]

// ---------------------------------------------------------------------------
// Reveal helper — every showcase element uses the same staggered CSS keyframe
// and only varies its delay.
// ---------------------------------------------------------------------------

function Reveal({ delay, className = '', children }) {
  return (
    <div
      className={`agent-beat ${className}`}
      style={{ '--agent-beat-delay': `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Conversation beats
// ---------------------------------------------------------------------------

function CustomerBeat({ delay, children }) {
  return (
    <Reveal delay={delay} className="flex justify-end">
      <p className="max-w-[85%] rounded-2xl rounded-br-md bg-neutral-950 px-4 py-2.5 text-sm leading-6 text-white">
        {children}
      </p>
    </Reveal>
  )
}

function AgentBeat({ delay, children }) {
  return (
    <Reveal delay={delay} className="flex justify-start">
      <div className="max-w-[92%] rounded-2xl rounded-bl-md bg-neutral-100 px-4 py-3 text-sm leading-6 text-neutral-700">
        {children}
      </div>
    </Reveal>
  )
}

function ProductCard({ name, price, detail, gtin, swatch }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-neutral-950/10 bg-white p-2.5">
      <div
        className={`h-11 w-9 flex-none rounded-lg bg-gradient-to-b ${swatch}`}
        aria-hidden="true"
      />
      <div className="min-w-0">
        <p className="text-xs font-semibold leading-snug text-neutral-950">
          {name}
        </p>
        <p className="mt-0.5 text-xs text-neutral-500">
          {price} · {detail}
        </p>
        <p className="mt-0.5 font-mono text-[0.625rem] text-neutral-400">
          GTIN {gtin}
        </p>
      </div>
    </div>
  )
}

function ConversationStoryboard() {
  return (
    <div className="surface-elevation-light overflow-hidden rounded-3xl bg-white">
      {/* Mock browser chrome — frames the conversation as the retailer's own
          site rather than a third-party chat window. */}
      <div
        className="flex items-center gap-3 border-b border-neutral-950/10 bg-neutral-50 px-4 py-3"
        aria-hidden="true"
      >
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-950/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-950/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-950/15" />
        </div>
        <span className="truncate rounded-full border border-neutral-950/10 bg-white px-3 py-1 text-[0.65rem] text-neutral-500">
          yourstore.com.au
        </span>
        <span className="ml-auto rounded-full bg-neutral-950 px-2.5 py-1 text-[0.65rem] font-semibold text-white">
          your brand
        </span>
      </div>

      {/* Five conversation beats: ask, recommend, pay, confirm, follow up. */}
      <div className="space-y-3 p-4 sm:p-6">
        <CustomerBeat delay={0}>
          I need a dress for a spring wedding, size 10, under $200
        </CustomerBeat>

        <AgentBeat delay={260}>
          <p>
            Two that suit an outdoor spring wedding and are in your size right
            now.
          </p>
          <div className="mt-3 grid grid-cols-1 gap-2">
            {recommendedProducts.map((product) => (
              <ProductCard key={product.gtin} {...product} />
            ))}
          </div>
        </AgentBeat>

        <CustomerBeat delay={520}>
          The sapphire one. Can I pay here?
        </CustomerBeat>

        <AgentBeat delay={780}>
          <p>Yes. Here is your order.</p>
          <dl className="mt-3 space-y-1.5 rounded-xl border border-neutral-950/10 bg-white p-3 text-xs">
            <div className="flex justify-between gap-3">
              <dt className="text-neutral-500">Sapphire Blue A-Line Midi</dt>
              <dd className="font-semibold text-neutral-950">$189.00</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-neutral-500">Express delivery</dt>
              <dd className="font-semibold text-neutral-950">$9.95</dd>
            </div>
            <div className="flex justify-between gap-3 border-t border-neutral-950/10 pt-1.5">
              <dt className="font-semibold text-neutral-950">Total</dt>
              <dd className="font-semibold text-neutral-950">$198.95</dd>
            </div>
          </dl>
          <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Paid · order #8412 confirmed
          </p>
        </AgentBeat>

        <CustomerBeat delay={1040}>Where’s my order?</CustomerBeat>

        <AgentBeat delay={1300}>
          <p>Order #8412 left the warehouse this morning.</p>
        </AgentBeat>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Control strip — retailer-facing self-service control and reporting
// ---------------------------------------------------------------------------

function ControlStrip() {
  return (
    <div className="surface-elevation-dark rounded-3xl bg-white/[0.04] p-5 sm:p-6">
      <p className="font-display text-xs font-semibold uppercase tracking-widest text-white/50">
        your controls
      </p>

      {/* Canned-response rule mid-edit, with a live caret to show the field is
          being typed by the retailer's own team. */}
      <div className="mt-5 rounded-2xl border border-white/10 bg-neutral-950 p-4">
        <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-white/35">
          tone rule
        </p>
        <p className="mt-2 font-mono text-xs leading-6 text-white/85">
          Always offer the in-store pickup option
          <span className="agent-caret ml-0.5 inline-block h-4 w-px translate-y-0.5 bg-emerald-300 align-middle" />
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {/* Publish flips to Live on a loop. The pair is decorative, so the
              accessible equivalent is provided as screen-reader text below. */}
          <span
            className="relative inline-flex h-7 items-center rounded-full bg-white px-3 text-xs font-semibold text-neutral-950"
            aria-hidden="true"
          >
            <span className="agent-publish-label">Publish</span>
            <span className="agent-live-label absolute inset-0 inline-flex items-center justify-center gap-1.5 rounded-full bg-emerald-400 text-neutral-950">
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-950" />
              Live
            </span>
          </span>
          <span
            className="rounded-full border border-white/15 px-2.5 py-1 text-[0.65rem] font-medium text-white/60"
            aria-hidden="true"
          >
            live in seconds
          </span>
          <span className="sr-only">
            Publishing a rule takes it live in seconds.
          </span>
        </div>
      </div>

      <p className="mt-5 text-sm leading-6 text-neutral-400">
        No ticket. No release cycle. Your team changes the agent’s prompts,
        tone, and rules directly.
      </p>
    </div>
  )
}

function AnalyticsTiles() {
  return (
    <div className="surface-elevation-dark rounded-3xl bg-white/[0.04] p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="font-display text-xs font-semibold uppercase tracking-widest text-white/50">
          your reporting
        </p>
        <span className="rounded-full border border-white/15 px-2 py-0.5 text-[0.6rem] font-medium uppercase tracking-widest text-white/40">
          sample
        </span>
      </div>

      <dl className="mt-5 grid grid-cols-3 gap-2">
        {analyticsTiles.map(({ label, value }) => (
          <div
            key={label}
            className="rounded-2xl border border-white/10 bg-neutral-950 px-3 py-3"
          >
            <dd className="font-display text-lg font-semibold tracking-tight text-white sm:text-xl">
              {value}
            </dd>
            <dt className="mt-1 text-[0.65rem] leading-4 text-white/45">
              {label}
            </dt>
          </div>
        ))}
      </dl>

      <p className="mt-5 text-sm leading-6 text-neutral-400">
        Reporting your team can act on.
      </p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export function AgentConversationShowcase() {
  return (
    <div className="relative overflow-hidden rounded-4xl bg-neutral-950 px-5 py-10 sm:px-10 sm:py-14">
      <NoiseOverlay id="agent-showcase" />

      {/* Keep both columns at their natural height. Stretching the two
          retailer-facing panels to match the taller conversation leaves visible
          voids inside each card, which reads worse than trailing panel space. */}
      <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-start">
        {/* The storyboard reveals beat by beat, so it needs no wrapper fade. */}
        <ConversationStoryboard />

        <div className="grid grid-cols-1 gap-6">
          <Reveal delay={1560}>
            <ControlStrip />
          </Reveal>
          <Reveal delay={1720}>
            <AnalyticsTiles />
          </Reveal>
        </div>
      </div>

      {/* Capability chips — the full product surface behind the storyboard. */}
      <Reveal delay={1880}>
        <ul
          role="list"
          className="relative mt-8 flex flex-wrap gap-2"
          aria-label="What your agent does"
        >
          {capabilityChips.map((chip) => (
            <li
              key={chip}
              className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/70"
            >
              {chip}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  )
}
