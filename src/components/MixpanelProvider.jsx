'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initMixpanel, track } from '@/lib/mixpanelClient';
import { initReferralTracking } from '@/lib/referralTracking';

/**
 * Enhanced Analytics Provider Component
 * 
 * This client component handles the initialization of analytics systems with proper sequencing:
 * 1. Initializes Mixpanel with Session Replay
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
  const pathname = usePathname();

  // Initialize Mixpanel and referral tracking once when component mounts
  useEffect(() => {
    /**
     * Initialize analytics systems with proper sequencing
     * This ensures referral tracking waits for Mixpanel to be fully ready
     */
    const initializeAnalytics = async () => {
      try {
        // Only run in browser environment
        if (typeof window === 'undefined') {
          return;
        }

        // Step 1: Initialize Mixpanel
        // This sets up the Mixpanel client and will trigger the 'loaded' callback
        // when fully ready, setting window.mixpanelLoaded = true
        const mixpanelInitialized = initMixpanel();
        
        if (mixpanelInitialized) {
          // Step 2: Initialize referral tracking
          // This uses the polling mechanism to wait for Mixpanel to be ready
          // before tracking the referral source (runs only once per session)
          initReferralTracking();
          
        } else {
          console.warn('Mixpanel initialization failed - referral tracking disabled');
        }
        
      } catch (error) {
        console.error('Analytics initialization failed:', error);
      }
    };

    // Start the initialization process
    initializeAnalytics();
    
  }, []); // Empty dependency array ensures this runs only once per session

  // Track page views when pathname changes (existing functionality)
  useEffect(() => {
    if (pathname) {
      // Use the safe track function which handles Mixpanel readiness
      track('Page View', { 
        url: pathname,
        page: pathname,
        timestamp: new Date().toISOString()
      });
    }
  }, [pathname]);

  // This component doesn't render any UI - purely for analytics
  return null;
} 