'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

import { PaidOrderBadge } from '@/components/PaidOrderBadge'

// Load the large desktop SVG only for viewports that can display it. This
// keeps the mobile first route from parsing hidden desktop-only vector markup
// while preserving the original desktop animation module unchanged.
const DesktopHeroDataFlow = dynamic(
  () =>
    import('@/components/HeroDesktopDataFlow').then(
      (module) => module.DesktopHeroDataFlow,
    ),
  {
    ssr: false,
    loading: DesktopHeroDataFlowShell,
  },
)

function DesktopHeroDataFlowShell() {
  return (
    <div
      className="relative mt-16 hidden aspect-[3/1] w-full overflow-hidden rounded-[2rem] border border-neutral-950/10 bg-white/70 shadow-[0_1px_0_rgba(23,23,23,0.04)] sm:block"
      role="img"
      aria-label="Retail catalogue data powering the retailer’s own AI agent, which answers a customer in a branded chat."
    >
      <div className="absolute inset-6 rounded-[1.5rem] bg-gradient-to-r from-blue-50 via-white to-emerald-50" />
      <div className="absolute left-[8%] top-1/2 h-20 w-28 -translate-y-1/2 rounded-2xl border border-neutral-950/10 bg-white shadow-sm" />
      <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-950/10 bg-neutral-950/[0.04]" />
      <div className="absolute right-[8%] top-1/2 h-24 w-32 -translate-y-1/2 rounded-2xl border border-emerald-200 bg-emerald-50/70 shadow-sm" />
      <div className="absolute left-[22%] right-[22%] top-1/2 h-px bg-gradient-to-r from-blue-300 via-neutral-300 to-emerald-300" />
    </div>
  )
}

function FlowConnector({ label }) {
  // Join two flow cards with a short labelled arrow so the mobile visual
  // reads as one continuous diagram (catalogue feeds agent, agent answers
  // customer) instead of three floating cards separated by bare lines.
  return (
    <div
      className="flex flex-col items-center gap-0.5 py-0.5"
      aria-hidden="true"
    >
      <span className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-neutral-400">
        {label}
      </span>
      <svg
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        className="h-3 w-3 text-neutral-400"
      >
        <path
          d="M2.5 4.5 6 8l3.5-3.5"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}


function MobileHeroDataFlow() {
  return (
    <div
      className="mt-10 sm:hidden"
      role="img"
      aria-label="Enriched retail catalogue data powering the retailer’s own AI agent, which answers a customer in a branded chat and takes payment in the conversation."
    >
      <div className="grid grid-cols-1 gap-2">
        {/* Compact catalogue strip: the cause of the story gets one dense
            row (thumbnail, promise line, enriched badge) so the customer
            chat below keeps the majority of the visual's height. */}
        <div className="rounded-2xl border border-neutral-950/10 bg-white p-3 shadow-[0_1px_0_rgba(23,23,23,0.04)]">
          <div className="flex items-center gap-3">
            <div
              className="w-10 flex-none rounded-lg bg-blue-50 p-1.5"
              aria-hidden="true"
            >
              <div className="h-5 rounded bg-white" />
              <div className="mt-1 h-1 rounded bg-neutral-950/70" />
              <div className="mt-0.5 h-1 w-5 rounded bg-neutral-950/35" />
            </div>
            <div className="min-w-0">
              <p className="font-display text-xs font-semibold uppercase tracking-wider text-neutral-950">
                Your catalogue
              </p>
              <p className="mt-0.5 truncate text-[0.7rem] text-neutral-500">
                details · descriptions · live stock
              </p>
            </div>
            <span className="ml-auto flex-none rounded-full bg-emerald-50 px-2 py-0.5 text-[0.65rem] font-medium text-emerald-700">
              enriched
            </span>
          </div>
        </div>

        <FlowConnector label="feeds" />

        {/* Compact agent strip: title plus live indicator on the left and
            capability chips on the right. flex-wrap lets the chips drop to a
            second row on very narrow viewports without overflowing. */}
        <div className="rounded-2xl border border-neutral-950/10 bg-neutral-950 p-3 text-white shadow-xl">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <p className="font-display text-xs font-semibold uppercase tracking-wider">
              Your agent
            </p>
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
            </span>
            <span className="ml-auto flex gap-1.5 text-[0.65rem] font-medium text-white/70">
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5">
                discover
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5">
                checkout
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5">
                support
              </span>
            </span>
          </div>
        </div>

        <FlowConnector label="answers" />

        {/* Customer chat card: an emerald frame around a white chat panel.
            The slim chrome header (traffic dots, retailer domain, brand chip)
            is a miniature of AgentConversationShowcase's browser mockup, so
            the hero teaches the same "chat on the retailer's own site" idiom
            the showcase expands on further down the page. */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3 shadow-[0_1px_0_rgba(23,23,23,0.04)]">
          <p className="px-1 font-display text-xs font-semibold uppercase tracking-wider text-neutral-950">
            Your customer
          </p>
          <div className="mt-2.5 overflow-hidden rounded-xl border border-neutral-950/10 bg-white">
            <div
              className="flex items-center gap-2 border-b border-neutral-950/10 bg-neutral-50 px-3 py-2"
              aria-hidden="true"
            >
              <span className="flex gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-950/15" />
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-950/15" />
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-950/15" />
              </span>
              <span className="truncate rounded-full border border-neutral-950/10 bg-white px-2 py-0.5 text-[0.6rem] text-neutral-500">
                yourstore.com.au
              </span>
              {/* White wordmark chip keeps the brand slot readable as site
                  chrome: a black chip here reads as another dark speech
                  bubble. The ✦ mark links the chip to the agent avatar in
                  the thread below — one identity, two appearances. */}
              <span className="ml-auto flex flex-none items-center gap-1 rounded-full border border-neutral-950/10 bg-white px-2 py-0.5 text-[0.6rem] font-semibold text-neutral-950">
                <span className="text-[0.55rem]">✦</span>
                your brand
              </span>
            </div>
            {/* Three-beat thread: ask on the right, answer with catalogue
                proof on the left, then a centred system line for the paid
                state. Alignment and colour name the speakers for sighted
                users; sr-only prefixes keep the exchange followable in
                screen readers. Bubble colours mirror AgentConversationShowcase
                (dark customer, neutral agent) so the chat idiom stays
                consistent across the site. */}
            <div className="space-y-2.5 p-3">
              <div className="flex justify-end">
                <p className="max-w-[75%] rounded-2xl rounded-br-sm bg-neutral-950 px-3 py-2 text-xs leading-5 text-white">
                  <span className="sr-only">Customer: </span>
                  Wedding guest dress, size 10, under $200?
                </p>
              </div>
              <div className="flex items-end gap-1.5">
                {/* Brand-dark avatar replaces the old "your agent" pill: the
                    left-aligned bubble plus avatar reads as the agent without
                    a third pseudo-speaker floating in the thread. */}
                <span
                  className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-neutral-950 text-[0.6rem] text-white"
                  aria-hidden="true"
                >
                  ✦
                </span>
                <div className="max-w-[75%] rounded-2xl rounded-bl-sm bg-neutral-100 px-3 py-2 text-xs leading-5 text-neutral-700">
                  <span className="sr-only">Your agent: </span>
                  <p>Found it: in stock and in your size.</p>
                  {/* Product row inside the reply shows enriched catalogue
                      data doing the work, echoing the showcase's cards. */}
                  <span className="mt-2 flex items-center gap-2 rounded-lg border border-neutral-950/10 bg-white p-1.5">
                    <span
                      className="h-8 w-6 flex-none rounded bg-gradient-to-b from-blue-500 to-indigo-600"
                      aria-hidden="true"
                    />
                    <span className="min-w-0 text-[0.7rem] leading-4">
                      <span className="block truncate font-semibold text-neutral-950">
                        Sapphire Blue Midi
                      </span>
                      <span className="block truncate text-neutral-500">
                        $189 · size 10 · in stock
                      </span>
                    </span>
                  </span>
                  <p className="mt-2">Pay here in the chat?</p>
                </div>
              </div>
              {/* Centred status pill ends the conversation the way chat apps
                  confirm delivery. It shares PaidOrderBadge with
                  AgentConversationShowcase, so the paid state is identical on
                  both surfaces and reads as a system outcome, not another
                  message. */}
              <p className="flex justify-center pt-0.5">
                <PaidOrderBadge />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function useDesktopHeroViewport() {
  const [isDesktopHeroViewport, setIsDesktopHeroViewport] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(min-width: 640px)')

    function updateViewportState() {
      setIsDesktopHeroViewport(query.matches)
    }

    updateViewportState()
    query.addEventListener('change', updateViewportState)

    return () => {
      query.removeEventListener('change', updateViewportState)
    }
  }, [])

  return isDesktopHeroViewport
}

export function HeroDataFlow() {
  const isDesktopHeroViewport = useDesktopHeroViewport()

  return (
    <>
      <MobileHeroDataFlow />
      {isDesktopHeroViewport ? (
        <DesktopHeroDataFlow />
      ) : (
        <DesktopHeroDataFlowShell />
      )}
    </>
  )
}
