const isDevelopment = process.env.NODE_ENV === 'development'
const trackedPageViews = new Set()
const initialPagePath = typeof window === 'undefined' ? null : getPagePath()
const analyticsStartEvents = ['pointerdown', 'keydown', 'scroll']
const patchedHistoryMethods = new Set()
let analyticsClient = null
let analyticsClientPromise = null
let analyticsStarted = false
let removeAnalyticsStartTriggers = () => {}

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

function loadAnalyticsClient() {
  if (!analyticsClientPromise) {
    analyticsClientPromise = import('@/lib/mixpanelClient')
  }

  return analyticsClientPromise
}

function trackPageView(page = getPagePath()) {
  if (isDevelopment || typeof window === 'undefined' || !analyticsClient) {
    return
  }

  if (trackedPageViews.has(page)) {
    return
  }

  trackedPageViews.add(page)

  scheduleWhenIdle(() => {
    analyticsClient.track('Page View', {
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

    analyticsClient = await loadAnalyticsClient()

    if (isDevelopment) {
      await analyticsClient.initMixpanel()
      return
    }

    const mixpanelInitialized = await analyticsClient.initMixpanel()

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
  if (patchedHistoryMethods.has(methodName)) {
    return
  }

  patchedHistoryMethods.add(methodName)

  const originalMethod = window.history[methodName]

  window.history[methodName] = function patchedHistoryMethod(...args) {
    const result = originalMethod.apply(this, args)

    window.dispatchEvent(new Event('embeddings:navigation'))

    return result
  }
}

function startNavigationTracking() {
  patchHistoryMethod('pushState')
  patchHistoryMethod('replaceState')

  window.addEventListener('popstate', trackPageView, { passive: true })
  window.addEventListener('embeddings:navigation', trackPageView)
}

function startAnalytics() {
  if (analyticsStarted) {
    return
  }

  analyticsStarted = true
  removeAnalyticsStartTriggers()

  void initialiseAnalytics().then(() => {
    if (isDevelopment || !analyticsClient) {
      return
    }

    startNavigationTracking()
  })
}

function scheduleAnalyticsStart() {
  if (isDevelopment) {
    return scheduleWhenIdle(startAnalytics)
  }

  const fallbackId = window.setTimeout(startAnalytics, 12000)

  for (const eventName of analyticsStartEvents) {
    window.addEventListener(eventName, startAnalytics, {
      once: true,
      passive: eventName !== 'keydown',
    })
  }

  return () => {
    window.clearTimeout(fallbackId)

    for (const eventName of analyticsStartEvents) {
      window.removeEventListener(eventName, startAnalytics)
    }
  }
}

if (typeof window !== 'undefined') {
  removeAnalyticsStartTriggers = scheduleAnalyticsStart()
}
