'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { initMixpanel, track } from '@/lib/mixpanelClient'
import { initReferralTracking } from '@/lib/referralTracking'

const isDevelopment = process.env.NODE_ENV === 'development'

function scheduleWhenIdle(callback) {
  if (typeof window === 'undefined') {
    return () => {}
  }

  if ('requestIdleCallback' in window) {
    const idleId = window.requestIdleCallback(callback, { timeout: 3000 })

    return () => window.cancelIdleCallback(idleId)
  }

  const timeoutId = window.setTimeout(callback, 1500)

  return () => window.clearTimeout(timeoutId)
}

/**
 * Enhanced Analytics Provider Component
 *
 * This client component handles the initialisation of analytics systems with proper sequencing:
 * 1. Initialises Mixpanel with Session Replay
 * 2. Tracks referral sources (once per session, with polling for Mixpanel readiness)
 * 3. Tracks page navigation continuously
 *
 * Features:
 * - Proper load sequencing ensures referral tracking waits for Mixpanel
 * - Referral tracking runs only once per session (on mount)
 * - Page view tracking continues to work as before
 * - Performance optimised with minimal re-renders
 * - Comprehensive error handling and development logging
 */
export default function MixpanelProvider() {
  const pathname = usePathname()

  // Initialise Mixpanel and referral tracking once the first render has settled.
  useEffect(() => {
    const initializeAnalytics = async () => {
      try {
        if (typeof window === 'undefined') {
          return
        }

        if (isDevelopment) {
          await initMixpanel()
          return
        }

        const mixpanelInitialized = await initMixpanel()

        if (mixpanelInitialized) {
          initReferralTracking()
        } else {
          console.warn(
            'Mixpanel initialisation failed - referral tracking disabled',
          )
        }
      } catch (error) {
        console.error('Analytics initialisation failed:', error)
      }
    }

    return scheduleWhenIdle(initializeAnalytics)
  }, [])

  // Track page views after idle time so analytics does not compete with first paint.
  useEffect(() => {
    if (isDevelopment) {
      return
    }

    if (pathname) {
      return scheduleWhenIdle(() => {
        track('Page View', {
          url: pathname,
          page: pathname,
          timestamp: new Date().toISOString(),
        })
      })
    }
  }, [pathname])

  return null
}
