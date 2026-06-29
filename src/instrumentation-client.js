import { initMixpanel, track } from '@/lib/mixpanelClient'

const isDevelopment = process.env.NODE_ENV === 'development'
const trackedPageViews = new Set()
const initialPagePath = typeof window === 'undefined' ? null : getPagePath()

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

function getPagePath() {
  return `${window.location.pathname}${window.location.search}`
}

function trackPageView(page = getPagePath()) {
  if (isDevelopment || typeof window === 'undefined') {
    return
  }

  if (trackedPageViews.has(page)) {
    return
  }

  trackedPageViews.add(page)

  scheduleWhenIdle(() => {
    track('Page View', {
      url: page,
      page,
      timestamp: new Date().toISOString(),
    })
  })
}

async function initialiseAnalytics() {
  try {
    if (typeof window === 'undefined') {
      return
    }

    if (isDevelopment) {
      await initMixpanel()
      return
    }

    const mixpanelInitialized = await initMixpanel()

    if (!mixpanelInitialized) {
      console.warn(
        'Mixpanel initialisation failed - referral tracking disabled',
      )
      return
    }

    // Load referral attribution only after analytics is ready so the classifier
    // stays out of the initial client route work.
    const { initReferralTracking } = await import('@/lib/referralTracking')

    initReferralTracking()

    if (initialPagePath) {
      trackPageView(initialPagePath)
    }
  } catch (error) {
    console.error('Analytics initialisation failed:', error)
  }
}

function patchHistoryMethod(methodName) {
  const originalMethod = window.history[methodName]

  window.history[methodName] = function patchedHistoryMethod(...args) {
    const result = originalMethod.apply(this, args)

    window.dispatchEvent(new Event('embeddings:navigation'))

    return result
  }
}

if (typeof window !== 'undefined') {
  scheduleWhenIdle(initialiseAnalytics)

  patchHistoryMethod('pushState')
  patchHistoryMethod('replaceState')

  window.addEventListener('popstate', trackPageView, { passive: true })
  window.addEventListener('embeddings:navigation', trackPageView)
}
