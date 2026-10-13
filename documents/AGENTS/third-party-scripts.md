# Browser providers

The literal Turnstile loader lives in `src/components/scripts/page/Turnstile.astro` and is placed through the contact page’s body-end slot. It is the only new browser provider. Preserve its HTTPS URL, async/defer attributes and contact-only scope.

Mixpanel remains project-owned deferred modules, activated only on the canonical host. `src/scripts/site-entry.ts` imports the guarded instrumentation. Keep recording and heatmaps opt-in, one page view per native document load, existing enquiry events and no submitted personal data in analytics.

`public/_headers` owns CSP sources. The Worker imports that policy at build time for generated responses. Do not put Resend into browser CSP or browser code. Check emitted scripts, provider scope, event duplication, CSP and safe provider failure before completion.

Keep the two reviewed NEXT_PUBLIC Mixpanel recording/heatmap settings in the explicit Vite define allowlist in astro.config.mjs. The shared analytics-config owner supplies both loader selection and compiled values. Never expose the whole process environment or rely on a browser Node process shim. Verify production-only modules with a local SDK stub, and confirm both queued startup events and later form events without sending live analytics data.
