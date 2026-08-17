// ---------------------------------------------------------------------------
// AgentConversationShowcase — Demonstrates the retailer-owned shopping agent
// instead of describing it. The section has three parts:
//
//   1. Conversation storyboard (customer facing): discovery, recommendation,
//      and in-conversation checkout, then a "3 days later" time divider that
//      sets up the post-sale order-status follow-up, all rendered inside a
//      mock retailer-branded window.
//   2. Control strip (retailer facing): a canned-response rule mid-edit that
//      publishes straight to live, showing self-service control and change
//      velocity rather than claiming them.
//   3. Analytics tiles: sample product-interface reporting values.
//
// Static Server Component. Every reveal is CSS-only (see .agent-beat and the
// control-strip keyframes in src/styles/components.css), so this section adds
// no client JavaScript to the homepage bundle.
// ---------------------------------------------------------------------------

import clsx from 'clsx'

import { DressThumbnail } from '@/components/DressThumbnail'
import { NoiseOverlay } from '@/components/NoiseOverlay'
import { PaidOrderBadge } from '@/components/PaidOrderBadge'

// ---------------------------------------------------------------------------
// Demo data — kept consistent with the catalogue demo product used by
// CatalogueTransformation and the ContactSection floating snippets so the
// site's fictional product universe stays coherent.
// ---------------------------------------------------------------------------

// Card prices drop the trailing .00 to keep the subtext light; the order
// summary below keeps full cents ($189.00) so it lines up with the $9.95
// delivery fee.
const recommendedProducts = [
  {
    name: 'Sapphire Blue A-Line Midi Dress',
    price: '$189',
    detail: 'size 10 · in stock',
    gtin: '0614141123456',
    dress: 'sapphire',
  },
  {
    name: 'Blush Crepe Wrap Midi Dress',
    price: '$159',
    detail: 'size 10 · 3 left',
    gtin: '0614141123791',
    dress: 'blush',
  },
]

// Sample reporting values. These illustrate the reporting surface only. They
// are never presented as promised or achievable results, so they carry no
// multiplier, percentage-gain, or return-on-investment framing.
const analyticsTiles = [
  { label: 'sessions', value: '1,284' },
  { label: 'conversion', value: '4.8%' },
  { label: 'assisted revenue', value: '$42k' },
]

// Capability chips carry a short mobile label and the full label from `sm` up.
// The full wording wraps to one chip per row on a 390px screen, which reads as
// a stacked list rather than a chip row, so the short label keeps the group to
// two or three compact rows without dropping the capability itself.
const capabilityChips = [
  { short: 'discovery', full: 'conversational discovery' },
  { short: 'in-chat checkout', full: 'checkout in the chat' },
  { short: 'order support', full: 'order & returns support' },
  { short: 'your own search', full: 'bring your own search' },
  { short: 'self-service', full: 'self-service control' },
  { short: 'analytics', full: 'revenue analytics' },
]

// ---------------------------------------------------------------------------
// Reveal helper — every showcase element uses the same staggered CSS keyframe
// and only varies its delay.
//
// Delays are derived rather than hard-coded so a beat can be added, removed, or
// reordered without renumbering the whole sequence. The conversation reveals on
// a 260ms cadence; the retailer-facing panels and the capability chips follow on
// a tighter 160ms cadence so the tail of the sequence does not drag.
// ---------------------------------------------------------------------------

const CONVERSATION_BEAT_COUNT = 7
const BEAT_STEP_MS = 260
const TRAILING_STEP_MS = 160

function beatDelay(index) {
  // Return the reveal delay for the nth conversation beat.
  return index * BEAT_STEP_MS
}

function trailingDelay(index) {
  // Return the reveal delay for the nth element after the conversation.
  return CONVERSATION_BEAT_COUNT * BEAT_STEP_MS + index * TRAILING_STEP_MS
}

function Reveal({ delay, className, children }) {
  return (
    <div
      className={clsx('agent-beat', className)}
      style={{ '--agent-beat-delay': `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Conversation beats
// ---------------------------------------------------------------------------

// Sighted users read the speaker from bubble alignment and colour. Name the
// speaker in screen-reader-only text so the exchange is still followable as a
// conversation rather than a run of unattributed sentences.
function CustomerBeat({ delay, children }) {
  return (
    <Reveal delay={delay} className="flex justify-end">
      <p className="max-w-[85%] rounded-2xl rounded-br-sm bg-neutral-950 px-4 py-2.5 text-sm leading-6 text-white">
        <span className="sr-only">Customer: </span>
        {children}
      </p>
    </Reveal>
  )
}

function AgentBeat({ delay, children }) {
  return (
    <Reveal delay={delay} className="flex items-end justify-start gap-2">
      {/* Brand-dark ✦ avatar names the agent visually, matching the avatar
          beside the agent bubble in the mobile hero chat so the agent carries
          one identity across both demo conversations. */}
      <span
        className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-neutral-950 text-[0.65rem] text-white"
        aria-hidden="true"
      >
        ✦
      </span>
      <div className="max-w-[92%] rounded-2xl rounded-bl-sm bg-neutral-100 px-4 py-3 text-sm leading-6 text-neutral-700">
        <span className="sr-only">Your agent: </span>
        {children}
      </div>
    </Reveal>
  )
}

// Time divider — a centred pill between hairlines, matching the day divider in
// the embeddings-shopping-agent video (videos/embeddings-shopping-agent). The
// jump in time is what makes the order-status follow-up read as post-sale
// support rather than an instant reply to the payment confirmation.
function TimeDivider({ delay, children }) {
  return (
    <Reveal delay={delay} className="flex items-center gap-3">
      <span className="h-px flex-1 bg-neutral-950/10" aria-hidden="true" />
      <p className="rounded-full bg-neutral-100 px-3 py-1 text-[0.65rem] font-semibold text-neutral-600 ring-1 ring-inset ring-neutral-950/10">
        {children}
      </p>
      <span className="h-px flex-1 bg-neutral-950/10" aria-hidden="true" />
    </Reveal>
  )
}

function ProductCard({ name, price, detail, dress }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-neutral-950/10 bg-white p-3">
      <DressThumbnail
        variant={dress}
        idPrefix={`showcase-${dress}`}
        className="h-11 w-9 rounded-lg"
      />
      <div className="min-w-0">
        <p className="text-xs font-semibold leading-snug text-neutral-950">
          {name}
        </p>
        {/* mt-1 plus leading-5 opens up the gap under the title so the price
            line reads as its own row rather than hugging the name. */}
        <p className="mt-1 text-xs leading-5 text-neutral-500">
          {price} · {detail}
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
        {/* White wordmark chip keeps the brand slot readable as site chrome:
            a black chip here reads as another customer bubble. The ✦ mark
            matches the hero's brand chip so the idiom stays consistent. */}
        <span className="ml-auto flex items-center gap-1 rounded-full border border-neutral-950/10 bg-white px-2.5 py-1 text-[0.65rem] font-semibold text-neutral-950">
          <span className="text-[0.6rem]">✦</span>
          your brand
        </span>
      </div>

      {/* Conversation beats: ask, recommend, pay, confirm, time jump, follow
          up. */}
      <div className="space-y-3 p-4 sm:p-6">
        {/* Tell assistive technology what this block is before it reads the
            dialogue, so the sample exchange is not mistaken for live content. */}
        <p className="sr-only">
          Example conversation showing a customer buying from a retailer’s own
          shopping agent, then asking about the order three days later.
        </p>

        <CustomerBeat delay={beatDelay(0)}>
          I need a dress for a spring wedding, size 10, under $200
        </CustomerBeat>

        <AgentBeat delay={beatDelay(1)}>
          <p>
            Lovely occasion. These two suit an outdoor spring wedding, and both
            are in your size right now:
          </p>
          <div className="mt-3 grid grid-cols-1 gap-2">
            {recommendedProducts.map((product) => (
              <ProductCard key={product.gtin} {...product} />
            ))}
          </div>
        </AgentBeat>

        {/* The customer asks for express delivery here so the $9.95 express
            line in the order summary below reads as requested, not padded on. */}
        <CustomerBeat delay={beatDelay(2)}>
          The sapphire one, with express delivery please. Can I pay here?
        </CustomerBeat>

        <AgentBeat delay={beatDelay(3)}>
          <p>Of course. Here’s your order:</p>
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
          {/* Shared with the hero data flow via PaidOrderBadge so the paid
              state looks identical wherever a demo conversation reaches
              checkout. The order number lives in the follow-up beat below,
              which keeps this pill on one line at 390px. */}
          <PaidOrderBadge className="mt-3" />
        </AgentBeat>

        {/* The time jump is what turns the follow-up into post-sale support.
            Without it, "Where’s my order?" reads as an instant reply to the
            payment confirmation directly above. */}
        <TimeDivider delay={beatDelay(4)}>3 days later</TimeDivider>

        <CustomerBeat delay={beatDelay(5)}>Where’s my order?</CustomerBeat>

        <AgentBeat delay={beatDelay(6)}>
          <p>
            Good news. Order #8412 is out for delivery and should be with you
            today.
          </p>
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
        <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-white/60">
          tone rule
        </p>
        <p className="mt-2 font-mono text-xs leading-6 text-white/85">
          Always offer the in-store pickup option.
          {/* Size the caret in em units and drop it slightly below the baseline
              so it tracks the text box instead of the line box. */}
          <span className="agent-caret ml-0.5 inline-block h-[1em] w-px bg-emerald-300 align-[-0.15em]" />
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
          <span className="sr-only">
            Publishing a rule takes it live in seconds.
          </span>
        </div>
      </div>

      {/* Promoted control message — this is the section's key claim, so it
          renders in display type rather than as fine print. */}
      <p className="mt-5 font-display text-lg font-medium tracking-tight text-white sm:text-xl">
        Change it yourself. Live in seconds.
      </p>
      <p className="mt-2 text-sm leading-6 text-neutral-400">
        Your team edits the agent’s prompts, tone, and rules directly.
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
        <span className="rounded-full border border-white/15 px-2 py-0.5 text-[0.6rem] font-medium uppercase tracking-widest text-white/60">
          sample
        </span>
      </div>

      {/* Keep each term before its definition in the DOM, as the description
          list contract requires, and flip the visual order with CSS so the
          figure still reads above its label. Matches ComparisonFact in
          CatalogueTransformation.jsx. */}
      <dl className="mt-5 grid grid-cols-3 gap-2">
        {analyticsTiles.map(({ label, value }) => (
          <div
            key={label}
            className="flex flex-col-reverse justify-end rounded-2xl border border-white/10 bg-neutral-950 px-3 py-3"
          >
            {/* `justify-end` packs a column-reverse tile toward its top edge,
                so every figure and the first line of every label sit on the
                same row. Without it the content packs to the bottom, and a
                label that wraps to two lines (`assisted revenue` at 390px)
                lifts its figure above the figures in the other tiles. */}
            <dt className="mt-1 text-xs leading-4 text-white/70">
              {label}
            </dt>
            <dd className="font-display text-base font-semibold tracking-tight text-white sm:text-lg">
              {value}
            </dd>
          </div>
        ))}
      </dl>

      {/* Promoted reporting message — actionability leads, so the headline
          gets display type and the numbers above stay one size step down. */}
      <p className="mt-5 font-display text-lg font-medium tracking-tight text-white sm:text-xl">
        Reporting your team can act on.
      </p>

      {/* Sample insight row — links a metric to the action it triggered, in
          the same product-UI register as the tiles above. Demo data only:
          never framed as a promised result. */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-white/15 px-2.5 py-1 text-xs text-white/70">
          drop-off: delivery questions
        </span>
        <span className="text-xs text-white/50" aria-hidden="true">
          →
        </span>
        <span className="rounded-full border border-white/15 px-2.5 py-1 text-xs text-emerald-300">
          reply updated · live
        </span>
        <span className="sr-only">
          Example insight: customers drop off at delivery questions, and the
          corrected reply is already live.
        </span>
      </div>
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
          <Reveal delay={trailingDelay(0)}>
            <ControlStrip />
          </Reveal>
          <Reveal delay={trailingDelay(1)}>
            <AnalyticsTiles />
          </Reveal>
        </div>
      </div>

      {/* Capability chips — the full product surface behind the storyboard. */}
      <Reveal delay={trailingDelay(2)}>
        <ul
          role="list"
          className="relative mt-8 flex flex-wrap gap-2"
          aria-label="What your agent does"
        >
          {capabilityChips.map(({ short, full }) => (
            <li
              key={full}
              className="rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-white/70 sm:px-3 sm:py-1.5 sm:text-xs"
            >
              {/* `display: none` also hides the unused label from assistive
                  technology, so only one wording is ever announced. */}
              <span className="sm:hidden">{short}</span>
              <span className="hidden sm:inline">{full}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  )
}
