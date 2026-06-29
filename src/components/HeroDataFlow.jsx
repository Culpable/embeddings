'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

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
      aria-hidden="true"
    >
      <div className="absolute inset-6 rounded-[1.5rem] bg-gradient-to-r from-blue-50 via-white to-emerald-50" />
      <div className="absolute left-[8%] top-1/2 h-20 w-28 -translate-y-1/2 rounded-2xl border border-neutral-950/10 bg-white shadow-sm" />
      <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-950/10 bg-neutral-950/[0.04]" />
      <div className="absolute right-[8%] top-1/2 h-24 w-32 -translate-y-1/2 rounded-2xl border border-emerald-200 bg-emerald-50/70 shadow-sm" />
      <div className="absolute left-[22%] right-[22%] top-1/2 h-px bg-gradient-to-r from-blue-300 via-neutral-300 to-emerald-300" />
    </div>
  )
}


function MobileHeroDataFlow() {
  return (
    <div className="mt-10 sm:hidden" aria-hidden="true">
      <div className="grid grid-cols-1 gap-3">
        <div className="rounded-2xl border border-neutral-950/10 bg-white p-4 shadow-[0_1px_0_rgba(23,23,23,0.04)]">
          <div className="flex items-center justify-between">
            <p className="font-display text-xs font-semibold uppercase tracking-wider text-neutral-950">
              Your catalogue
            </p>
            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[0.65rem] font-medium text-amber-700">
              gaps found
            </span>
          </div>
          <div className="mt-4 grid grid-cols-[4rem_1fr] gap-3">
            <div className="rounded-xl bg-blue-50 p-2">
              <div className="h-8 rounded-lg bg-white" />
              <div className="mt-2 h-1.5 rounded bg-neutral-950/80" />
              <div className="mt-1.5 h-1.5 w-10 rounded bg-neutral-950/45" />
              <div className="mt-1.5 h-1.5 w-12 rounded bg-neutral-950/25" />
            </div>
            <div className="space-y-2 text-xs text-neutral-500">
              <p>GTIN missing</p>
              <p>thin description</p>
              <p>stale stock signal</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="h-8 w-px bg-gradient-to-b from-blue-300 via-neutral-300 to-emerald-300" />
        </div>

        <div className="rounded-2xl border border-neutral-950/10 bg-neutral-950 p-4 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <p className="font-display text-xs font-semibold uppercase tracking-wider">
              AI agent
            </p>
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
            </span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[0.7rem] font-medium text-white/70">
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">
              audit
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">
              enrich
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">
              rank
            </span>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="h-8 w-px bg-gradient-to-b from-emerald-300 via-neutral-300 to-emerald-500" />
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 shadow-[0_1px_0_rgba(23,23,23,0.04)]">
          <p className="font-display text-xs font-semibold uppercase tracking-wider text-neutral-950">
            Consumer answer
          </p>
          <div className="mt-4 rounded-2xl bg-white p-3 text-xs leading-5 text-neutral-600 shadow-sm">
            Based on complete catalogue data, recommend the in-stock product
            with the clearest fit.
          </div>
          <p className="mt-3 text-xs font-medium text-emerald-700">
            Recommendation-ready
          </p>
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
