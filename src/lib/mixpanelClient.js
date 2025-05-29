import mixpanel from 'mixpanel-browser';

// Replace with your Mixpanel project token
const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || '48ebd83acf333df6efcfe970cfde6c5c';

/**
 * Initialize Mixpanel with Session Replay configuration
 * - Session Replay records user interactions for later review
 * - Configured for optimal recording with privacy considerations
 */
export const initMixpanel = () => {
  // Only initialize in browser environment and if token is provided
  if (typeof window === 'undefined' || !MIXPANEL_TOKEN || MIXPANEL_TOKEN === 'your_mixpanel_project_token_here') {
    console.warn('Mixpanel not initialized: Missing token or not in browser environment');
    return;
  }

  mixpanel.init(MIXPANEL_TOKEN, {
    // Automatically track page views
    track_pageview: true,
    
    // Storage configuration
    persistence: 'localStorage', // Use 'cookie' for cross-subdomain tracking
    // cross_subdomain_cookie: true, // Uncomment if needed
    
    // Session Replay settings
    record_sessions_percent: 100,        // Record 100% of sessions
    record_block_selector: "",           // CSS selector for elements to block from recording
    record_mask_text_selector: ".sensitive-data", // Mask sensitive data
    record_collect_fonts: true,          // Include font information
    record_idle_timeout_ms: 600000,      // 10 minutes idle timeout
    record_min_ms: 3000,                 // Minimum session length to record
    
    // Debug mode for development
    debug: process.env.NODE_ENV === 'development',
  });
  
  // Make mixpanel available globally
  window.mixpanel = mixpanel;
  
  // Set flag for other scripts that depend on Mixpanel
  window.mixpanelLoaded = true;
  
  console.log('Mixpanel initialized with Session Replay');
};

/**
 * Safe tracking function that handles errors gracefully
 */
export const track = (eventName, properties = {}) => {
  try {
    if (mixpanel.get_distinct_id()) {
      mixpanel.track(eventName, properties);
    }
  } catch (error) {
    console.warn('Mixpanel tracking failed:', error);
  }
};

/**
 * Safe identify function that handles errors gracefully
 */
export const identify = (userId) => {
  try {
    if (mixpanel.get_distinct_id()) {
      mixpanel.identify(userId);
    }
  } catch (error) {
    console.warn('Mixpanel identify failed:', error);
  }
};

/**
 * Safe people properties function that handles errors gracefully
 */
export const setPeopleProperties = (properties) => {
  try {
    if (mixpanel.get_distinct_id()) {
      mixpanel.people.set(properties);
    }
  } catch (error) {
    console.warn('Mixpanel people properties failed:', error);
  }
};

/**
 * Export mixpanel instance for direct use in components
 */
export default mixpanel; 