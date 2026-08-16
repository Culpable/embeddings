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
// Tick alignment (see test/paid-order-badge-tick-alignment.test.mjs). Two
// separate faults made the tick sit below the label:
//
//   1. The tick was drawn low inside its own viewBox. Its ink ran from y=4 to
//      y=9 in a 12-unit box, so the ink centre was 6.5 against a box centre of
//      6 — half a pixel of built-in droop that no external alignment could fix.
//      The path now runs y=3.5 to y=8.5 and is centred on the box.
//   2. `items-center` centres the icon box on the line box, but glyphs do not
//      fill their line box. Where the ink sits inside that box depends on the
//      font's ascent, descent, and half-leading, so the error varied by browser
//      — about 0.9px in Chrome and roughly twice that on iOS Safari.
//
// The icon is therefore anchored to the label baseline instead. A baseline-
// aligned replaced element rests its bottom edge on the baseline, so a 1em
// square icon puts its ink centre 0.5em above the baseline, while the label's
// ink centre sits capHeight/2 above it. Mona Sans has a cap height of 0.729em
// and this label has no descender, so the icon is nudged back down by
// 0.5em - 0.729em/2 = 0.136em. Every term is font-relative, which keeps the
// tick centred on the cap band at any font size and under a fallback font.
// ---------------------------------------------------------------------------

import clsx from 'clsx'

export function PaidOrderBadge({ className }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700',
        className,
      )}
    >
      <svg
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        className="h-[1em] w-[1em] flex-none self-baseline translate-y-[0.136em]"
        aria-hidden="true"
      >
        <path
          d="M2.5 6 5 8.5l4.5-5"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Paid · order confirmed
    </span>
  )
}
