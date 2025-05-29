'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initMixpanel, track } from '@/lib/mixpanelClient';

/**
 * Client component that initializes Mixpanel and tracks page navigation
 * Must be a client component due to browser-specific APIs
 */
export default function MixpanelProvider() {
  const pathname = usePathname();

  // Initialize Mixpanel once when component mounts
  useEffect(() => {
    console.log('Initializing Mixpanel with Session Replay...');
    initMixpanel();
  }, []);

  // Track page views when pathname changes
  useEffect(() => {
    if (pathname) {
      track('Page View', { 
        url: pathname,
        page: pathname,
        timestamp: new Date().toISOString()
      });
    }
  }, [pathname]);

  // This component doesn't render any UI
  return null;
} 