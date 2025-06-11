'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/Button';
import { track, isMixpanelReady } from '@/lib/mixpanelClient';

export default function TestMixpanel() {
  const [status, setStatus] = useState('checking');
  const [details, setDetails] = useState({});

  useEffect(() => {
    const checkStatus = () => {
      const isReady = isMixpanelReady();
      setStatus(isReady ? 'ready' : 'not-ready');
      
      setDetails({
        mixpanelExists: typeof window.mixpanel !== 'undefined',
        mixpanelLoaded: window.mixpanelLoaded === true,
        hasTrackFunction: typeof window.mixpanel?.track === 'function',
        distinctId: window.mixpanel?.get_distinct_id?.() || 'N/A',
        timestamp: new Date().toISOString()
      });
    };

    // Check immediately
    checkStatus();
    
    // Check again after a delay
    const timer = setTimeout(checkStatus, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const sendTestEvent = () => {
    track('Test Event from Debug Page', {
      page: '/test-mixpanel',
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    });
    alert('Test event sent! Check your Mixpanel dashboard.');
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-24">
      <h1 className="text-4xl font-bold mb-8">Mixpanel Test Page</h1>
      
      <div className={`p-6 rounded-lg mb-8 ${
        status === 'ready' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
      } border`}>
        <h2 className="text-xl font-semibold mb-2">
          Status: {status === 'ready' ? '✅ Ready' : '❌ Not Ready'}
        </h2>
        <pre className="text-sm overflow-auto">
          {JSON.stringify(details, null, 2)}
        </pre>
      </div>

      <div className="space-y-4">
        <Button onClick={sendTestEvent}>
          Send Test Event
        </Button>
        
        <div className="text-sm text-gray-600">
          <p>Note: If you see CORS errors in the console, that means you have an ad blocker or privacy extension blocking Mixpanel. This is normal and expected.</p>
        </div>
      </div>
    </div>
  );
} 