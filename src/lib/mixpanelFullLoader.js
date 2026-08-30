import mixpanel from 'mixpanel-browser'

// Keep the recorder-enabled payload distinguishable from the lean core chunk.
const analyticsBundleMarker = 'EMBEDDINGS_MIXPANEL_FULL_CHUNK'
const mixpanelFullBundle = { analyticsBundleMarker, mixpanel }

export default mixpanelFullBundle
