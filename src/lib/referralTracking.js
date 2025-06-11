import { track, isMixpanelReady } from './mixpanelClient.js';

/**
 * Referral Tracking System for Legal Genie and All Owned Domains
 * 
 * This module implements sophisticated referral source detection with the same
 * sequencing pattern as the original example, ensuring Mixpanel is fully loaded
 * before attempting to track referral sources.
 * 
 * Key Features:
 * - Robust polling mechanism to ensure proper load sequencing
 * - Multi-layered detection (URL params, referrer analysis, user agent)
 * - Legal Genie specific source tracking
 * - All owned domain cross-referral tracking
 * - Performance optimised with minimal DOM queries
 */

/**
 * Extract query parameter value from current URL
 * @param {string} param - Parameter name to extract
 * @returns {string|null} Parameter value or null if not found
 */
function getQueryParam(param) {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  } catch (error) {
    console.warn('Error parsing URL parameters:', error);
    return null;
  }
}

/**
 * Get the initial document referrer (cached to avoid redundant calls)
 * @returns {string} The document referrer or empty string
 */
function getInitialReferrer() {
  return document.referrer || '';
}

/**
 * Extract hostname from a referrer URL with error handling
 * @param {string} referrer - The full referrer URL
 * @returns {string|null} The hostname or null if invalid
 */
function getReferringDomain(referrer) {
  if (!referrer) return null;
  
  try {
    const url = new URL(referrer);
    return url.hostname.toLowerCase();
  } catch (error) {
    console.warn('Error parsing referrer URL:', error);
    return null;
  }
}

/**
 * Detect Facebook as referral source using multiple methods
 * @param {string} referringDomain - The referring domain
 * @returns {boolean} True if source is Facebook
 */
function isFacebookSource(referringDomain) {
  // Check referrer domain
  if (referringDomain && referringDomain.includes('facebook.com')) {
    return true;
  }
  
  // Check user agent for Facebook browser indicators
  const userAgent = navigator.userAgent.toLowerCase();
  return userAgent.includes('fb') || userAgent.includes('facebook');
}

/**
 * Detect Google as referral source
 * @param {string} referringDomain - The referring domain
 * @returns {boolean} True if source is Google
 */
function isGoogleSource(referringDomain) {
  return !!(referringDomain && referringDomain.includes('google.com'));
}

/**
 * Detect Bing as referral source
 * @param {string} referringDomain - The referring domain
 * @returns {boolean} True if source is Bing
 */
function isBingSource(referringDomain) {
  return !!(referringDomain && referringDomain.includes('bing.com'));
}

/**
 * Detect ChatGPT as referral source
 * @param {string} referringDomain - The referring domain
 * @returns {boolean} True if source is ChatGPT
 */
function isChatGPTSource(referringDomain) {
  return !!(referringDomain && referringDomain.includes('chatgpt.com'));
}

/**
 * Detect Perplexity as referral source
 * @param {string} referringDomain - The referring domain
 * @returns {boolean} True if source is Perplexity
 */
function isPerplexitySource(referringDomain) {
  return !!(referringDomain && referringDomain.includes('perplexity.ai'));
}

/**
 * Detect DeepSeek as referral source
 * @param {string} referringDomain - The referring domain
 * @returns {boolean} True if source is DeepSeek
 */
function isDeepSeekSource(referringDomain) {
  return !!(referringDomain && referringDomain.includes('deepseek.com'));
}

/**
 * Detect Legal Genie as referral source with domain distinction
 * @param {string} referringDomain - The referring domain
 * @returns {string|null} Specific Legal Genie domain or null if not Legal Genie
 */
function getLegalGenieSource(referringDomain) {
  if (!referringDomain) return null;
  
  if (referringDomain.includes('app.legalgenie.com.au')) {
    return 'Legal Genie App';
  } else if (referringDomain.includes('legalgenie.com.au')) {
    return 'Legal Genie';
  }
  
  return null;
}

/**
 * Detect owned domains as referral sources
 * @param {string} referringDomain - The referring domain
 * @returns {string|null} Specific owned domain or null if not owned
 */
function getOwnedDomainSource(referringDomain) {
  if (!referringDomain) return null;
  
  // Check for exact domain matches (order matters for specificity)
  // Embeddings domains
  if (referringDomain === 'embeddings.com.au' || referringDomain === 'www.embeddings.com.au') {
    return 'embeddings.com.au';
  } else if (referringDomain === 'embedding.au' || referringDomain === 'www.embedding.au') {
    return 'embedding.au';
  } else if (referringDomain === 'embeddings.au' || referringDomain === 'www.embeddings.au') {
    return 'embeddings.au';
  }
  
  // Additional owned domains
  else if (referringDomain === 'process.au' || referringDomain === 'www.process.au') {
    return 'process.au';
  } else if (referringDomain === 'performant.com.au' || referringDomain === 'www.performant.com.au') {
    return 'performant.com.au';
  } else if (referringDomain === 'performant.au' || referringDomain === 'www.performant.au') {
    return 'performant.au';
  } else if (referringDomain === 'document.au' || referringDomain === 'www.document.au') {
    return 'document.au';
  } else if (referringDomain === 'llms.au' || referringDomain === 'www.llms.au') {
    return 'llms.au';
  } else if (referringDomain === 'autogen.au' || referringDomain === 'www.autogen.au') {
    return 'autogen.au';
  } else if (referringDomain === 'autogen.com.au' || referringDomain === 'www.autogen.com.au') {
    return 'autogen.com.au';
  } else if (referringDomain === 'agentops.au' || referringDomain === 'www.agentops.au') {
    return 'agentops.au';
  } else if (referringDomain === 'agentops.com.au' || referringDomain === 'www.agentops.com.au') {
    return 'agentops.com.au';
  }
  
  return null;
}

/**
 * Comprehensive referral source detection with priority hierarchy
 * @returns {string} The identified referral source
 */
function determineReferralSource() {
  // Cache referrer data to avoid redundant DOM/URL parsing
  const initialReferrer = getInitialReferrer();
  const referringDomain = getReferringDomain(initialReferrer);
  
  // Extract URL parameters for analysis
  const fbclid = getQueryParam('fbclid');
  const utmSource = getQueryParam('utm_source');
  
  // Priority 1: Facebook Click ID (most reliable Facebook indicator)
  if (fbclid) {
    return 'Facebook';
  }
  
  // Priority 2: UTM Source parameter analysis
  if (utmSource) {
    const normalisedUtmSource = utmSource.toLowerCase();
    
    // Map specific UTM sources to readable names
    switch (normalisedUtmSource) {
      // AI Platforms
      case 'chatgpt.com':
        return 'ChatGPT';
      case 'perplexity.ai':
        return 'Perplexity';
      case 'deepseek.com':
        return 'DeepSeek';
      
      // Legal Genie domains
      case 'app.legalgenie.com.au':
        return 'Legal Genie App';
      case 'legalgenie.com.au':
        return 'Legal Genie';
      
      // Embeddings domains
      case 'embeddings.com.au':
        return 'embeddings.com.au';
      case 'embedding.au':
        return 'embedding.au';
      case 'embeddings.au':
        return 'embeddings.au';
      
      // Additional owned domains
      case 'process.au':
        return 'process.au';
      case 'performant.com.au':
        return 'performant.com.au';
      case 'performant.au':
        return 'performant.au';
      case 'document.au':
        return 'document.au';
      case 'llms.au':
        return 'llms.au';
      case 'autogen.au':
        return 'autogen.au';
      case 'autogen.com.au':
        return 'autogen.com.au';
      case 'agentops.au':
        return 'agentops.au';
      case 'agentops.com.au':
        return 'agentops.com.au';
      
      default:
        // For any other UTM source, classify as Direct or Other
        return 'Direct or Other';
    }
  }
  
  // Priority 3: Owned domain detection (before other domains)
  const ownedDomainSource = getOwnedDomainSource(referringDomain);
  if (ownedDomainSource) {
    return ownedDomainSource;
  }
  
  // Priority 4: Legal Genie domain detection
  const legalGenieSource = getLegalGenieSource(referringDomain);
  if (legalGenieSource) {
    return legalGenieSource;
  }
  
  // Priority 5: Facebook detection via referrer or user agent
  if (isFacebookSource(referringDomain)) {
    return 'Facebook';
  }
  
  // Priority 6: AI platform detection
  if (isChatGPTSource(referringDomain)) {
    return 'ChatGPT';
  }
  
  if (isPerplexitySource(referringDomain)) {
    return 'Perplexity';
  }
  
  if (isDeepSeekSource(referringDomain)) {
    return 'DeepSeek';
  }
  
  // Priority 7: Search engine detection
  if (isGoogleSource(referringDomain)) {
    return 'Google';
  }
  
  if (isBingSource(referringDomain)) {
    return 'Bing';
  }
  
  // Default: All other sources classified as Direct or Other
  return 'Direct or Other';
}

/**
 * Track referral source with robust polling mechanism
 * 
 * This function implements the same polling pattern as the original example,
 * ensuring Mixpanel is fully loaded before attempting to track the referral source.
 * 
 * Configuration:
 * - Maximum 10 attempts (1 second total wait time)
 * - 100ms interval between attempts
 * - Graceful fallback if tracking fails
 */
export function trackReferralSource() {
  // Configuration for polling mechanism
  const maxAttempts = 10;
  const interval = 100; // milliseconds
  let attempts = 0;
  
  // Determine referral source once (cached for performance)
  const referralSource = determineReferralSource();
  
  /**
   * Internal polling function that checks Mixpanel readiness
   * and tracks the referral source when ready
   */
  function attemptTracking() {
    attempts++;
    
    // Check if Mixpanel is fully loaded and ready for tracking
    if (window.mixpanelLoaded && isMixpanelReady()) {
      try {
        // Track the referral source event
        track('Referral Source Identified', {
          'Referral Source': referralSource
        });
        
      } catch (error) {
        console.warn('Failed to track referral source:', error);
      }
      
    } else if (attempts < maxAttempts) {
      // Mixpanel not ready yet - retry after interval
      setTimeout(attemptTracking, interval);
      
    } else {
      // Maximum attempts reached - log warning but don't crash
      console.warn('Maximum attempts reached. Unable to track referral source.');
    }
  }
  
  // Start the tracking process
  attemptTracking();
}

/**
 * Initialize referral tracking (for use in pages or components)
 * 
 * This function can be called from pages that need referral tracking.
 * It will automatically handle the sequencing and polling.
 */
export function initReferralTracking() {
  // Only run in browser environment
  if (typeof window === 'undefined') {
    console.warn('Referral tracking can only run in browser environment');
    return;
  }
  
  // Start tracking process
  trackReferralSource();
} 