const isDevelopment = process.env.NODE_ENV === 'development'
const trackedPageViews = new Set()
const pendingPageViews = new Set()
const initialPagePath = typeof window === 'undefined' ? null : getPagePath()
const analyticsStartEvents = ['pointerdown', 'keydown', 'scroll']
const patchedHistoryMethods = new Set()
const pendingAnalyticsEvents = []
let analyticsClient = null
let analyticsClientPromise = null
let analyticsStarted = false
let analyticsStartScheduled = false
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
  if (isDevelopment || typeof window === 'undefined') {
    return
  }

  if (trackedPageViews.has(page) || pendingPageViews.has(page)) {
    return
  }

  // Preserve route changes that happen while the deferred analytics module is
  // loading. Flush every distinct path after Mixpanel becomes ready.
  if (!analyticsClient) {
    pendingPageViews.add(page)
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


function flushPendingPageViews() {
  const pages = Array.from(pendingPageViews)

  pendingPageViews.clear()

  for (const page of pages) {
    trackPageView(page)
  }
}


function flushPendingAnalyticsEvents() {
  if (!analyticsClient) return

  for (const { eventName, properties } of pendingAnalyticsEvents.splice(0)) {
    analyticsClient.track(eventName, properties)
  }
}


function handleAnalyticsEvent(event) {
  const eventName = event.detail?.eventName

  if (typeof eventName !== 'string' || eventName.length === 0) return

  pendingAnalyticsEvents.push({
    eventName,
    properties: event.detail?.properties ?? {},
  })
  requestAnalyticsStart()
}


function trackCurrentPageView() {
  trackPageView()
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

    flushPendingPageViews()
    flushPendingAnalyticsEvents()

    // Load referral attribution only after analytics is ready so the classifier
    // stays out of the initial client route work.
    const { initReferralTracking } = await import('@/lib/referralTracking')

    initReferralTracking(analyticsClient)

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

  window.addEventListener('popstate', trackCurrentPageView, { passive: true })
  window.addEventListener('embeddings:navigation', trackCurrentPageView)
}

function startAnalytics() {
  if (analyticsStarted) {
    return
  }

  analyticsStarted = true
  removeAnalyticsStartTriggers()

  void initialiseAnalytics()
}

function requestAnalyticsStart() {
  if (analyticsStarted || analyticsStartScheduled) {
    return
  }

  analyticsStartScheduled = true

  scheduleWhenIdle(() => {
    analyticsStartScheduled = false
    startAnalytics()
  })
}


function scheduleAnalyticsStart() {
  if (isDevelopment) {
    return scheduleWhenIdle(requestAnalyticsStart)
  }

  const fallbackId = window.setTimeout(requestAnalyticsStart, 12000)

  for (const eventName of analyticsStartEvents) {
    window.addEventListener(eventName, requestAnalyticsStart, {
      once: true,
      passive: eventName !== 'keydown',
    })
  }

  return () => {
    window.clearTimeout(fallbackId)

    for (const eventName of analyticsStartEvents) {
      window.removeEventListener(eventName, requestAnalyticsStart)
    }
  }
}

if (typeof window !== 'undefined') {
  // Observe navigation immediately so the first route change cannot occur
  // before history is patched during the deferred analytics start.
  startNavigationTracking()

  if (initialPagePath) {
    trackPageView(initialPagePath)
  }

  window.addEventListener('embeddings:analytics-event', handleAnalyticsEvent)
  removeAnalyticsStartTriggers = scheduleAnalyticsStart()
}
