'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const serviceAnimations = {
  audit: dynamic(
    () =>
      import('@/components/AuditXRayScanner').then(
        (module) => module.AuditXRayScanner,
      ),
    { ssr: false, loading: ServiceAnimationShell },
  ),
  freshness: dynamic(
    () =>
      import('@/components/FreshnessPipelineFlow').then(
        (module) => module.FreshnessPipelineFlow,
      ),
    { ssr: false, loading: ServiceAnimationShell },
  ),
  enrichment: dynamic(
    () =>
      import('@/components/EnrichmentTypewriter').then(
        (module) => module.EnrichmentTypewriter,
      ),
    { ssr: false, loading: ServiceAnimationShell },
  ),
  optimisation: dynamic(
    () =>
      import('@/components/OptimisationRipple').then(
        (module) => module.OptimisationRipple,
      ),
    { ssr: false, loading: ServiceAnimationShell },
  ),
}


function ServiceAnimationShell() {
  return (
    <div
      className="relative mt-8 hidden aspect-[2.4/1] w-full overflow-hidden rounded-3xl border border-neutral-950/10 bg-white shadow-[0_1px_0_rgba(23,23,23,0.04)] sm:block lg:aspect-[3/1]"
      aria-hidden="true"
    >
      <div className="absolute inset-6 rounded-2xl bg-gradient-to-r from-neutral-100 via-white to-neutral-100" />
      <div className="absolute left-10 top-10 h-3 w-28 rounded-full bg-neutral-950/10" />
      <div className="absolute bottom-10 right-10 h-3 w-36 rounded-full bg-neutral-950/10" />
    </div>
  )
}


function useDesktopAnimationViewport() {
  const [isDesktopAnimationViewport, setIsDesktopAnimationViewport] =
    useState(false)

  useEffect(() => {
    const query = window.matchMedia('(min-width: 640px)')

    function updateViewportState() {
      setIsDesktopAnimationViewport(query.matches)
    }

    updateViewportState()
    query.addEventListener('change', updateViewportState)

    return () => {
      query.removeEventListener('change', updateViewportState)
    }
  }, [])

  return isDesktopAnimationViewport
}


export function ResponsiveServiceAnimation({ animationKey }) {
  const isDesktopAnimationViewport = useDesktopAnimationViewport()
  const Animation = serviceAnimations[animationKey]

  if (!isDesktopAnimationViewport || !Animation) {
    return null
  }

  return <Animation />
}
