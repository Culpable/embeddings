// ---------------------------------------------------------------------------
// PaidOrderBadge — the single "payment settled" state used everywhere a demo
// conversation reaches checkout (the hero data flow and the agent conversation
// showcase). Both surfaces previously drew their own emerald pill, which drifted
// apart in border, icon, and type scale; keeping one component means the paid
// state can only ever look one way.
//
// A tick, not a pulsing dot: the badge marks a settled outcome, so a static
// confirmation mark is truer to the state than a "live" indicator, and it holds
// up against the white card and the grey agent bubble alike.
//
// The label carries no order number. The showcase's agent bubble is capped at
// 92% of its row, which is ~7px too narrow at 390px for "Paid · order #8412
// confirmed" — the number wrapped the pill onto two lines there and made the
// two surfaces read differently again. The showcase's follow-up beat still
// names order #8412, so the reference is not lost.
//
// No hooks and no 'use client' directive, so the badge renders inside Server
// Components (AgentConversationShowcase) and Client Components (HeroDataFlow)
// without pulling either across the boundary.
//
// Vertical rhythm (see test/paid-order-badge-tick-alignment.test.mjs). Both
// reported faults — a tick below the label, then a label riding high in the
// pill — come from the same place: a line box is not the same shape as the ink
// inside it. Glyphs sit between the cap top and the baseline, but the line box
// also carries the font's ascent, descent, and half-leading. Anything centred
// on the line box therefore lands off the type, and by a different amount in
// each engine. Measured baseline position inside the same 16px line box:
// Chromium 12.00px, desktop WebKit 11.80px, iOS Safari ~10.95px.
//
// Three fixes, in order of how much they matter:
//
//   1. The tick was drawn low inside its own viewBox. Its ink ran from y=4 to
//      y=9 in a 12-unit box, so the ink centre was 6.5 against a box centre of
//      6 — half a pixel of built-in droop that no external alignment could fix.
//      The path now runs y=3.5 to y=8.5 and is centred on the box.
//   2. `text-box: trim-both cap alphabetic` trims the label's line box down to
//      exactly the cap band, so the box and the ink become the same thing. Once
//      trimmed, ordinary `items-center` and symmetric padding centre the type
//      itself, identically in every engine that supports the property, because
//      the trim is defined by the font's own cap and baseline metrics.
//   3. Engines without `text-box-trim` keep the untrimmed layout and fall back
//      to anchoring the tick on the baseline: a baseline-aligned 1em square
//      puts its ink centre 0.5em above the baseline while the label's sits
//      capHeight/2 above it, so the tick is nudged down by
//      0.5em - 0.729em/2 = 0.136em (Mona Sans cap height is 0.729em).
//
// The pill stays 26px tall on both paths. Untrimmed, the 16px line box is the
// tallest flex item and py-1 (4px) pads it. Trimmed, the label box shrinks to
// the cap band and the 1em tick becomes the tallest item, so the padding grows
// to 0.5em (6px) to keep the same outer height: 6 + 12 + 6 + 2px of border.
// ---------------------------------------------------------------------------

import clsx from 'clsx'

export function PaidOrderBadge({ className }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700',
        'supports-[text-box-trim:trim-both]:py-[0.5em]',
        className,
      )}
    >
      <svg
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        className="h-[1em] w-[1em] flex-none self-baseline translate-y-[0.136em] supports-[text-box-trim:trim-both]:translate-y-0 supports-[text-box-trim:trim-both]:self-center"
        aria-hidden="true"
      >
        <path
          d="M2.5 6 5 8.5l4.5-5"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {/* The label needs its own element: text-box-trim applies to the block
          container that holds the text, and it is not inherited, so setting it
          on the flex container above would never reach an anonymous text
          item. */}
      <span className="supports-[text-box-trim:trim-both]:[text-box:trim-both_cap_alphabetic]">
        Paid · order confirmed
      </span>
    </span>
  )
}
