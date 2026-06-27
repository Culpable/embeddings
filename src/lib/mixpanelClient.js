const MIXPANEL_TOKEN = '48ebd83acf333df6efcfe970cfde6c5c'
const isDevelopment = process.env.NODE_ENV === 'development'

let mixpanelModulePromise = null
let mixpanelInstance = null
let mixpanelInitialisationPromise = null

function markMixpanelDisabled() {
  if (typeof window === 'undefined') {
    return
  }

  window.mixpanelLoaded = false
  window.mixpanelDisabled = true
}

async function loadMixpanelModule() {
  if (typeof window === 'undefined' || !MIXPANEL_TOKEN || isDevelopment) {
    return null
  }

  if (!mixpanelModulePromise) {
    mixpanelModulePromise = import('mixpanel-browser').then(
      (module) => module.default ?? module,
    )
  }

  return mixpanelModulePromise
}

function applyLoadedState(mixpanel) {
  window.mixpanelLoaded = true
  window.mixpanelInstance = mixpanel

  if (typeof window.dispatchEvent === 'function') {
    window.dispatchEvent(
      new CustomEvent('mixpanel:loaded', {
        detail: { mixpanel },
      }),
    )
  }
}

export async function initMixpanel() {
  if (typeof window === 'undefined' || !MIXPANEL_TOKEN) {
    return false
  }

  if (isDevelopment) {
    markMixpanelDisabled()
    console.info('Mixpanel disabled in development environment.')
    return false
  }

  if (mixpanelInstance) {
    return true
  }

  if (mixpanelInitialisationPromise) {
    return mixpanelInitialisationPromise
  }

  mixpanelInitialisationPromise = loadMixpanelModule()
    .then((mixpanel) => {
      if (!mixpanel) {
        return false
      }

      mixpanel.init(MIXPANEL_TOKEN, {
        track_pageview: true,
        persistence: 'localStorage',
        record_sessions_percent: 100,
        record_heatmap_data: true,
        record_block_selector: '',
        record_mask_text_selector: '.sensitive-data',
        record_collect_fonts: true,
        record_idle_timeout_ms: 600000,
        record_min_ms: 3000,
        loaded(loadedMixpanel) {
          applyLoadedState(loadedMixpanel)
        },
      })

      mixpanelInstance = mixpanel
      window.mixpanel = mixpanel

      return true
    })
    .catch((error) => {
      console.error('Failed to initialise Mixpanel:', error)
      mixpanelInitialisationPromise = null
      return false
    })

  return mixpanelInitialisationPromise
}

async function withMixpanel(callback) {
  if (isDevelopment) {
    return
  }

  const initialised = await initMixpanel()

  if (!initialised || !mixpanelInstance) {
    return
  }

  callback(mixpanelInstance)
}

export function track(eventName, properties = {}, callback = null) {
  void withMixpanel((mixpanel) => {
    mixpanel.track(eventName, properties)

    if (callback && typeof callback === 'function') {
      callback()
    }
  }).catch((error) => {
    console.warn('Mixpanel tracking failed:', error)
  })
}

export function identify(userId) {
  void withMixpanel((mixpanel) => {
    mixpanel.identify(userId)
  }).catch((error) => {
    console.warn('Mixpanel identify failed:', error)
  })
}

export function setPeopleProperties(properties) {
  void withMixpanel((mixpanel) => {
    if (mixpanel.people) {
      mixpanel.people.set(properties)
    }
  }).catch((error) => {
    console.warn('Mixpanel people properties failed:', error)
  })
}

export function isMixpanelReady() {
  if (isDevelopment || typeof window === 'undefined') {
    return false
  }

  return !!(
    window.mixpanelLoaded &&
    mixpanelInstance &&
    typeof mixpanelInstance.track === 'function' &&
    mixpanelInstance.get_distinct_id &&
    mixpanelInstance.get_distinct_id()
  )
}

const mixpanelClient = {
  identify,
  initMixpanel,
  isMixpanelReady,
  setPeopleProperties,
  track,
}

export default mixpanelClient
