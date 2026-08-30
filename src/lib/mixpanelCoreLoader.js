import mixpanel from 'mixpanel-browser/src/loaders/loader-module-core'

// Keep this marker in the generated core chunk so the build budget can resolve
// and measure the exact analytics payload instead of relying on file names.
const analyticsBundleMarker = 'EMBEDDINGS_MIXPANEL_CORE_CHUNK'
const mixpanelCoreBundle = { analyticsBundleMarker, mixpanel }

export default mixpanelCoreBundle
