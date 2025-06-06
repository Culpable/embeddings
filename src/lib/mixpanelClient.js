import mixpanel from 'mixpanel-browser';

// Replace with your Mixpanel project token
const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || '48ebd83acf333df6efcfe970cfde6c5c';

/**
 * Initialize Mixpanel with Session Replay configuration
 * - Session Replay records user interactions for later review
 * - Configured for optimal recording with privacy considerations
 * - Sets global flags for dependent tracking systems
 */
export const initMixpanel = () => {
  // Only initialize in browser environment and if token is provided
  if (typeof window === 'undefined' || !MIXPANEL_TOKEN) {
    console.warn('Mixpanel not initialized: Missing token or not in browser environment');
    return false;
  }

  try {
  mixpanel.init(MIXPANEL_TOKEN, {
    // Automatically track page views
    track_pageview: true,
    
      // Storage configuration - using localStorage for better performance
      persistence: 'localStorage',
      
      // Cross-subdomain tracking (uncomment if needed)
      // cross_subdomain_cookie: true,
    
      // Session Replay settings optimised for performance
      record_sessions_percent: 100,                    // Record 100% of sessions
      record_block_selector: "",                       // CSS selector for elements to block from recording
      record_mask_text_selector: ".sensitive-data",   // Mask sensitive data elements
      record_collect_fonts: true,                      // Include font information for accurate playback
      record_idle_timeout_ms: 600000,                  // 10 minutes idle timeout before ending session
      record_min_ms: 3000,                             // Minimum 3 seconds for a valid recording
      
      // Callback when Mixpanel is fully loaded and ready
      loaded: function(mixpanel) {
        // Set multiple flags for robust detection by dependent systems
        window.mixpanelLoaded = true;
        window.mixpanelInstance = mixpanel;
        
        // Dispatch custom event for more advanced integrations
        if (typeof window.dispatchEvent === 'function') {
          window.dispatchEvent(new CustomEvent('mixpanel:loaded', { 
            detail: { mixpanel } 
          }));
        }
        
        console.log('Mixpanel fully loaded and ready for tracking');
      }
  });
  
    // Make mixpanel available globally for backward compatibility
  window.mixpanel = mixpanel;
  
    console.log('Mixpanel initialization started...');
    return true;
  
  } catch (error) {
    console.error('Failed to initialize Mixpanel:', error);
    return false;
  }
};

/**
 * Safe tracking function with comprehensive error handling
 * @param {string} eventName - The name of the event to track
 * @param {object} properties - Properties to attach to the event
 * @param {function} callback - Optional callback after successful tracking
 */
export const track = (eventName, properties = {}, callback = null) => {
  try {
    // Ensure Mixpanel is initialized and has a distinct ID
    if (mixpanel && mixpanel.get_distinct_id && mixpanel.get_distinct_id()) {
      mixpanel.track(eventName, properties);
      
      if (callback && typeof callback === 'function') {
        callback();
      }
    } else {
      console.warn('Mixpanel not ready for tracking:', eventName);
    }
  } catch (error) {
    console.warn('Mixpanel tracking failed:', error);
  }
};

/**
 * Safe identify function with comprehensive error handling
 * @param {string} userId - The user ID to identify
 */
export const identify = (userId) => {
  try {
    if (mixpanel && mixpanel.get_distinct_id && mixpanel.get_distinct_id()) {
      mixpanel.identify(userId);
    }
  } catch (error) {
    console.warn('Mixpanel identify failed:', error);
  }
};

/**
 * Safe people properties function with comprehensive error handling
 * @param {object} properties - Properties to set for the current user
 */
export const setPeopleProperties = (properties) => {
  try {
    if (mixpanel && mixpanel.people && mixpanel.get_distinct_id && mixpanel.get_distinct_id()) {
      mixpanel.people.set(properties);
    }
  } catch (error) {
    console.warn('Mixpanel people properties failed:', error);
  }
};

/**
 * Check if Mixpanel is fully loaded and ready for tracking
 * @returns {boolean} True if Mixpanel is ready, false otherwise
 */
export const isMixpanelReady = () => {
  return !!(
    window.mixpanelLoaded && 
    mixpanel && 
    typeof mixpanel.track === 'function' &&
    mixpanel.get_distinct_id && 
    mixpanel.get_distinct_id()
  );
};

/**
 * Export mixpanel instance for direct use in components
 */
export default mixpanel; 