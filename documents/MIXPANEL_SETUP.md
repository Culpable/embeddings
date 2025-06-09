# Mixpanel Integration Setup Guide

This document explains the Mixpanel analytics integration that has been implemented in your Next.js project.

## 🚀 What's Been Implemented

### ✅ Core Integration
- **Mixpanel Browser Package**: Installed and configured for client-side tracking
- **Session Replay**: Enabled to record user interactions for analysis
- **Automatic Page Tracking**: All page navigations are automatically tracked
- **Error-Safe Implementation**: All tracking calls include error handling

### ✅ Files Created/Modified

1. **`src/lib/mixpanelClient.js`** - Core Mixpanel configuration and client
2. **`src/components/MixpanelProvider.jsx`** - Provider component for app-wide integration
3. **`src/app/layout.jsx`** - Updated to include MixpanelProvider
4. **`src/components/Button.jsx`** - Enhanced with automatic click tracking
5. **`src/app/contact/ContactForm.jsx`** - Updated with comprehensive form tracking

### ✅ Events Currently Being Tracked

- **Page Views**: Automatic tracking when users navigate between pages
- **Button Clicks**: All Button component usage with context
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
4. Add it to your environment variables (see Environment Setup below)

### 2. Set Up Environment Variables

Add this to your `.env.local` file:

```bash
NEXT_PUBLIC_MIXPANEL_TOKEN=your_mixpanel_project_token_here
```

⚠️ **Important**: The `NEXT_PUBLIC_` prefix is required for Next.js client-side access.

## 🛠️ Environment Setup

### Development Setup
```bash
# .env.local (for development)
NEXT_PUBLIC_MIXPANEL_TOKEN=your_development_token_here
```

### Production Setup
```bash
# Add to your deployment environment variables
NEXT_PUBLIC_MIXPANEL_TOKEN=your_production_token_here
```

## 🔒 Privacy & Security Considerations

### Current Privacy Settings
- **Session Recording**: Set to 100% (can be reduced for production)
- **Sensitive Data Masking**: Elements with class `sensitive-data` are automatically masked
- **Data Retention**: Follows Mixpanel's default retention policies

### Recommendations for Production
```javascript
// In src/lib/mixpanelClient.js, consider adjusting:
record_sessions_percent: 10, // Only record 10% of sessions in production
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
- **Button Clicked**: All button interactions with context
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
- `button_text`: Text of clicked buttons
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
import { track } from '@/lib/mixpanelClient';

// Track custom events anywhere in your app
track('Custom Event Name', {
  custom_property: 'value',
  another_property: 123
});
```

### Enhanced Button Tracking
```jsx
<Button 
  href="/contact"
  trackingLabel="hero_cta"
  trackingProperties={{ 
    section: 'hero', 
    campaign: 'summer_2024' 
  }}
>
  Contact Us
</Button>
```

### User Identification
```javascript
import { identify, setPeopleProperties } from '@/lib/mixpanelClient';

// When you have user information
identify('user_123');
setPeopleProperties({
  '$email': 'user@example.com',
  '$name': 'John Doe',
  'company': 'Acme Corp'
});
```

## 🚨 Troubleshooting

### Common Issues

1. **Events not appearing in Mixpanel**
   - Check browser console for Mixpanel initialization logs
   - Verify the project token is correct
   - Ensure you're looking at the correct Mixpanel project

2. **Build errors**
   - The implementation is client-side only and compatible with static builds
   - Ensure all tracking calls are wrapped in client components

3. **Session recordings not working**
   - Check that the session replay feature is enabled in your Mixpanel project
   - Verify the `record_sessions_percent` setting

### Debug Mode
For development debugging, the integration automatically enables debug mode which logs all events to the browser console.

## 📞 Support

If you encounter any issues with the integration:
1. Check the browser console for error messages
2. Verify your environment variables are set correctly
3. Ensure you're using the correct Mixpanel project token

## Session Replay Feature

Session Replay has been configured with:
- 100% session recording (configurable via `record_sessions_percent`)
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