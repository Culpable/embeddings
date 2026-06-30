'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
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

const desktopViewportSubscribers = new Set()
const animationVisibilityCallbacks = new Map()
let desktopViewportQuery = null
let isDesktopViewport = true
let sharedAnimationObserver = null

function notifyDesktopViewportSubscribers(event) {
  isDesktopViewport = event.matches

  for (const callback of desktopViewportSubscribers) {
    callback()
  }
}

function getDesktopViewportQuery() {
  if (typeof window === 'undefined') {
    return null
  }

  if (!desktopViewportQuery) {
    desktopViewportQuery = window.matchMedia('(min-width: 640px)')
    isDesktopViewport = desktopViewportQuery.matches
    desktopViewportQuery.addEventListener(
      'change',
      notifyDesktopViewportSubscribers,
    )
  }

  return desktopViewportQuery
}

function subscribeToDesktopViewport(callback) {
  const query = getDesktopViewportQuery()

  if (!query) {
    return () => {}
  }

  desktopViewportSubscribers.add(callback)

  return () => {
    desktopViewportSubscribers.delete(callback)

    if (desktopViewportSubscribers.size === 0 && desktopViewportQuery) {
      desktopViewportQuery.removeEventListener(
        'change',
        notifyDesktopViewportSubscribers,
      )
      desktopViewportQuery = null
      isDesktopViewport = true
    }
  }
}

function readDesktopViewportSnapshot() {
  if (typeof window === 'undefined') {
    return true
  }

  if (!desktopViewportQuery) {
    return window.matchMedia('(min-width: 640px)').matches
  }

  return isDesktopViewport
}

function readServerDesktopViewportSnapshot() {
  return true
}

function getSharedAnimationObserver() {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null
  }

  if (!sharedAnimationObserver) {
    sharedAnimationObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue
          }

          const onVisible = animationVisibilityCallbacks.get(entry.target)

          if (onVisible) {
            animationVisibilityCallbacks.delete(entry.target)
            sharedAnimationObserver?.unobserve(entry.target)
            onVisible()
          }
        }
      },
      {
        rootMargin: '600px 0px',
      },
    )
  }

  return sharedAnimationObserver
}

function observeAnimationVisibility(target, onVisible) {
  const observer = getSharedAnimationObserver()

  if (!observer) {
    onVisible()
    return () => {}
  }

  animationVisibilityCallbacks.set(target, onVisible)
  observer.observe(target)

  return () => {
    animationVisibilityCallbacks.delete(target)
    observer.unobserve(target)

    if (animationVisibilityCallbacks.size === 0) {
      observer.disconnect()
      sharedAnimationObserver = null
    }
  }
}

function ServiceAnimationShell() {
  return (
    <div
      className="relative mt-8 hidden aspect-[2.4/1] w-full overflow-hidden rounded-3xl border border-neutral-950/10 bg-white shadow-[0_1px_0_rgba(23,23,23,0.04)] sm:block lg:aspect-[3/1]"
      aria-hidden="true"
    >
      <div className="absolute inset-6 rounded-2xl bg-gradient-to-r from-neutral-50 via-white to-neutral-50" />
      <div className="absolute left-10 top-10 h-3 w-28 rounded-full bg-neutral-950/10" />
      <div className="absolute left-10 top-20 h-2 w-40 rounded-full bg-neutral-950/[0.06]" />
      <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-950/10 bg-neutral-950/[0.03]" />
      <div className="absolute left-[18%] right-[18%] top-1/2 h-px bg-gradient-to-r from-blue-300/60 via-neutral-300 to-emerald-300/60" />
      <div className="absolute bottom-10 right-10 h-3 w-36 rounded-full bg-neutral-950/10" />
      <div className="absolute bottom-20 right-10 h-2 w-28 rounded-full bg-neutral-950/[0.06]" />
    </div>
  )
}

function useDesktopAnimationViewport() {
  return useSyncExternalStore(
    subscribeToDesktopViewport,
    readDesktopViewportSnapshot,
    readServerDesktopViewportSnapshot,
  )
}

function useAnimationVisibility({ animationKey, isEnabled }) {
  const targetRef = useRef(null)
  const [shouldLoadAnimation, setShouldLoadAnimation] = useState(false)

  useEffect(() => {
    setShouldLoadAnimation(false)
  }, [animationKey])

  useEffect(() => {
    if (!isEnabled || shouldLoadAnimation) {
      return undefined
    }

    const target = targetRef.current

    if (!target) {
      return undefined
    }

    return observeAnimationVisibility(target, () => {
      setShouldLoadAnimation(true)
    })
  }, [isEnabled, shouldLoadAnimation])

  return [targetRef, shouldLoadAnimation]
}

export function ResponsiveServiceAnimation({ animationKey }) {
  const isDesktopAnimationViewport = useDesktopAnimationViewport()
  const Animation = serviceAnimations[animationKey]
  const [targetRef, shouldLoadAnimation] = useAnimationVisibility({
    animationKey,
    isEnabled: isDesktopAnimationViewport && Boolean(Animation),
  })

  if (!isDesktopAnimationViewport || !Animation) {
    return null
  }

  return (
    <div ref={targetRef} data-service-animation={animationKey}>
      {shouldLoadAnimation ? <Animation /> : <ServiceAnimationShell />}
    </div>
  )
}
