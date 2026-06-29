# Mixpanel Integration Setup Guide

This document explains the Mixpanel analytics integration that has been implemented in your Next.js project.

## ✅ Current Implementation Notes (This Repo)

- The Mixpanel token is hardcoded in `src/lib/mixpanelClient.js`.
- Session replay sampling and heatmap recording use `NEXT_PUBLIC_MIXPANEL_RECORDING_PERCENT` and `NEXT_PUBLIC_MIXPANEL_RECORD_HEATMAPS`.
- Mixpanel is disabled in development - it only initializes in production builds.
- A `window.mixpanelDisabled` flag is set in development for visibility.
- Analytics starts from `src/instrumentation-client.js` so the app layout does not hydrate a React analytics provider.

## 🚀 What's Been Implemented

### ✅ Core Integration

- **Mixpanel Browser Package**: Installed and configured for client-side tracking
- **Session Replay**: Enabled to record user interactions for analysis
- **Automatic Page Tracking**: Page navigations are tracked after idle time
- **Error-Safe Implementation**: All tracking calls include error handling

### ✅ Files Created/Modified

1. **`src/lib/mixpanelClient.js`** - Core Mixpanel configuration and client
2. **`src/instrumentation-client.js`** - Client instrumentation entry point for idle analytics setup and page-view tracking
3. **`src/app/layout.jsx`** - Server layout without a React analytics provider
4. **`src/components/Button.jsx`** - Shared server-renderable CTA component; it deliberately does not import analytics
5. **`src/app/contact/ContactForm.jsx`** - Contact form tracking for owned client-side events

### ✅ Events Currently Being Tracked

- **Page Views**: Idle tracking when users land on or navigate between pages
- **CTA/Form Events**: Meaningful interactions are tracked inside the client component that owns the event
- **Contact Form Interactions**:
  - Form submission attempts
  - Successful submissions with form data insights
  - Failed submissions with error details
  - Field focus events
  - Budget selection tracking

## 🔑 What You Need from Mixpanel

To complete the setup, you need to provide the following from your Mixpanel account:

### 1. Project Token

1. Log in to your [Mixpanel account](https://mixpanel.com)
2. Go to **Settings** → **Project Settings**
3. Copy your **Project Token**
4. Update the hardcoded token in `src/lib/mixpanelClient.js`.

### Optional: Use Environment Variables Instead

The current code does not read environment variables. If you want to switch to env-based tokens, update `src/lib/mixpanelClient.js` to read `process.env.NEXT_PUBLIC_MIXPANEL_TOKEN` and add values in `.env.local` and your deployment environment.

## 🔒 Privacy & Security Considerations

### Current Privacy Settings

- **Session Recording**: Defaults to 10%; override with `NEXT_PUBLIC_MIXPANEL_RECORDING_PERCENT`
- **Sensitive Data Masking**: Elements with class `sensitive-data` are automatically masked
- **Data Retention**: Follows Mixpanel's default retention policies

### Recommendations for Production

```javascript
// In deployment env, adjust only if you need a different sampling rate:
NEXT_PUBLIC_MIXPANEL_RECORDING_PERCENT = 10
```

### Masking Sensitive Data

Add the `sensitive-data` class to any elements containing sensitive information:

```html
<input type="password" className="sensitive-data" />
<div className="credit-card-info sensitive-data">Card details</div>
```

## 📊 Data You'll See in Mixpanel

### Automatic Events

- **Page View**: Every page navigation with URL and timestamp
- **CTA/Form Events**: Events explicitly tracked by their owning client components
- **Contact Form Submit Attempted**: When users start form submission
- **Contact Form Submitted Successfully**: Successful submissions with insights
- **Contact Form Submission Failed**: Failed submissions with error details
- **Contact Form Field Focused**: Individual field interactions
- **Contact Form Budget Selected**: Budget preference selections

### Event Properties

Each event includes relevant properties like:

- `timestamp`: When the event occurred
- `page`/`url`: Current page context
- `form_type`: Type of form being interacted with
- `cta`: CTA identifier when a client component explicitly tracks the interaction
- `error_message`: Details of any errors
- And many more contextual properties

## 🎯 Next Steps & Recommendations

### 1. Review Session Recordings

- Monitor the first few session recordings to ensure no sensitive data is captured
- Adjust masking selectors if needed

### 2. Set Up Funnels

Create funnels in Mixpanel to track:

- Homepage → Contact Page → Form Submission
- Service Pages → Contact Form

### 3. Create Cohorts

- Users who submitted contact forms
- Users who viewed multiple services
- High-engagement visitors

### 4. Set Up Alerts

- Drop in form submissions
- Increase in form submission errors
- Unusual traffic patterns

## 🔧 Customisation Options

### Adding Custom Events

```javascript
import { track } from '@/lib/mixpanelClient'

// Track custom events anywhere in your app
track('Custom Event Name', {
  custom_property: 'value',
  another_property: 123,
})
```

### CTA and Interaction Tracking

The shared `Button` component intentionally stays server-renderable and does
not import analytics. Track meaningful interactions inside the interactive
component that owns the event, such as the contact form submit and validation
handlers.

```javascript
track('CTA Clicked', {
  cta: 'hero_contact',
  section: 'hero',
})
```

### User Identification

```javascript
import { identify, setPeopleProperties } from '@/lib/mixpanelClient'

// When you have user information
identify('user_123')
setPeopleProperties({
  $email: 'user@example.com',
  $name: 'John Doe',
  company: 'Acme Corp',
})
```

## 🚨 Troubleshooting

### Common Issues

1. **Events not appearing in Mixpanel**

   - Check browser console for Mixpanel initialization logs
   - Verify the project token is correct
   - Ensure you're looking at the correct Mixpanel project

2. **Build errors**

   - The implementation is client-side only and compatible with static builds
   - Keep route-level analytics in `src/instrumentation-client.js`
   - Keep interaction tracking inside the client component that owns the event

3. **Session recordings not working**
   - Check that the session replay feature is enabled in your Mixpanel project
   - Verify the `record_sessions_percent` setting

### Debug Logging

The current implementation logs initialization and tracking errors to the browser console. Mixpanel debug mode is not enabled by default.

## 📞 Support

If you encounter any issues with the integration:

1. Check the browser console for error messages
2. Verify the hardcoded project token and any optional replay sampling environment variables
3. Ensure you're using the correct Mixpanel project token

## Session Replay Feature

Session Replay has been configured with:

- 10% session recording by default (configurable via `NEXT_PUBLIC_MIXPANEL_RECORDING_PERCENT`)
- Privacy masking for elements with `.sensitive-data` class
- 10-minute idle timeout
- Minimum 3-second session length

To mask sensitive content from recordings, add the `.sensitive-data` class to any element.

## Troubleshooting

### CORS Errors in Console

If you see CORS errors like:

```
Access to fetch at 'https://api-js.mixpanel.com/record/...' from origin 'https://embeddings.au' has been blocked by CORS policy
```

This is **not** an error with your implementation. Common causes:

- Ad blockers (uBlock Origin, AdBlock Plus, etc.)
- Privacy extensions (Privacy Badger, Ghostery, etc.)
- Brave browser's shields
- Strict browser privacy settings
- Corporate firewalls

These errors mean Mixpanel is working but being blocked by the user's browser/network. This is expected behaviour and doesn't affect users without these blockers.

### Verifying Mixpanel is Loaded

---

**Ready to Go**: Once you add your Mixpanel project token, the analytics will be fully operational and you'll start seeing data in your Mixpanel dashboard immediately!
