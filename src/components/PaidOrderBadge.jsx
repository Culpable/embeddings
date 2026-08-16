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
        className="h-3 w-3 flex-none"
        aria-hidden="true"
      >
        <path
          d="M2.5 6.5 5 9l4.5-5"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Paid · order confirmed
    </span>
  )
}
