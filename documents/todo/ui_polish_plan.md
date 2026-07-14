# Embeddings UI Polish Plan

<critical_warning>
> **CRITICAL WARNING:** Preserve the minimal global header, contact page copy and field contract, and every existing front-page animation design. Do not replace, simplify, remove, or retime `HeroDataFlow.jsx`, `CatalogueTransformation.jsx` staged effects, the service timeline animations, or `ContactSection.jsx` floating snippets. UI polish must be limited to surfaces, hit areas, optical alignment, press feedback, transition specificity, and state transitions that do not alter those animation narratives.
</critical_warning>

<important_note>
> **IMPORTANT NOTE:** The current interface is visually coherent and responsive. This plan is a consistency pass, not a redesign. The strongest gains come from fixing interaction details that are hard to notice individually but compound across the site: undersized targets, broad transition declarations, abrupt state changes, hard card borders, and inconsistent image edge treatment.
</important_note>

## 1. Goal

Improve the perceived quality and tactile consistency of the Embeddings website using the `better-ui` principles while retaining the current information architecture, copy, responsive layout, colour system, and protected animation designs.

The work is complete when:

- Every visible interactive target is at least `44x44px` on mobile and `40x40px` on desktop, or has a non-overlapping expanded hit area of that size.
- Pressable buttons and button-like links provide an interruptible `scale(0.96)` response unless explicitly marked static.
- No changed component uses `transition-all` or Tailwind’s broad `transition` utility.
- The navigation panel and contextual icons have interruptible enter and exit states instead of one-way mounting effects.
- Card depth is expressed through shared layered shadow tokens where a border currently exists only to simulate elevation.
- The mobile hero proof group uses concentric nested radii.
- Process photography uses a neutral pure-black `1px` inset outline.
- Existing front-page animation timing, service animation loading, `IntersectionObserver`, and `content-visibility` behaviour remain unchanged.

---

## 2. Current State Analysis

### 2.1 Current Implementation Overview

- The visual system already has a strong monochrome foundation, generous whitespace, rounded dark sections, and clear primary CTAs.
- The header is intentionally limited to the logo, `Contact us`, and the menu trigger on every viewport. This is correct and must remain unchanged.
- Shared interaction styling is partly centralised in `src/components/Button.jsx`, but secondary links, source chips, footer links, navigation controls, and contact form controls each define their own transition behaviour.
- `src/components/RootNavigation.jsx` conditionally mounts either the open button or the panel. `src/styles/components.css` gives the panel a one-way `max-height` keyframe, so closing has no visual exit and reversing intent mid-animation cannot retarget smoothly.
- Many cards combine solid borders with shadows to create depth. This produces a harder, more component-library-like edge than the softer surrounding layout.
- The process page clips images to bespoke SVG shapes and outlines those shapes with `stroke-neutral-950/10` at `2px`, rather than the neutral pure-black `1px` image outline required by the selected UI standard.

### 2.2 Verified Baseline

The local site was reviewed at `1440x900` and `390x900` on `/`, `/process`, and `/contact`. The mobile navigation was opened, and empty contact submission was used to reveal the local validation state without transmitting form data.

| Area | Verified current result |
| --- | --- |
| Responsive layout | No horizontal overflow was observed at `1440x900` or `390x900` |
| Runtime health | No console warnings or errors were reported during the reviewed flows |
| Mobile header | Logo, `Contact us`, and the menu trigger remain clear and compact |
| Mobile navigation | Navigation rows are large and legible; the close control is `44x44px` |
| Contact form | Inputs are full-width, budget labels have `56px` row targets, and invalid submission focuses `#name-field` |
| Source links | Rendered heights are approximately `28-32px`, below both desktop and mobile target minimums |
| Footer links | Rendered text targets are approximately `13px` high |
| Logo links | Rendered at `32px` high, below the selected minimum |
| Process images | Render with no CSS outline; the SVG shape uses a tinted `2px` stroke |
| Navigation motion | The panel uses one-way `navigationPanelEnter`; the menu and close icons replace each other without a contextual cross-fade |

### 2.3 Where the UI Falls Short

1. **The interaction language is inconsistent.** Primary CTAs, source chips, navigation buttons, footer links, and form choices respond differently because they use separate broad transition declarations and no shared press behaviour.
2. **Small links look refined but are harder to use.** Source pills, footer links, contact email, and logo links fall below the selected touch and desktop hit-area minimums.
3. **Navigation state changes feel mounted rather than animated.** Opening expands through a non-interruptible keyframe. Closing removes the panel immediately. The menu and close glyphs swap rather than transform contextually.
4. **Card edges are harder than the wider art direction.** Many cards use a solid border plus a shallow shadow even though the border’s only job is elevation.
5. **One nested radius relationship is visibly close but mathematically off.** On mobile, the hero proof container has a `16px` radius with `6px` padding around children with a `12px` radius. A concentric outer radius should be `18px`.
6. **Process image edging is not neutral.** The bespoke `neutral-950` shape stroke is tinted and twice the intended thickness.
7. **Validation and loading states appear abruptly.** The contact error summary adds a `244px` panel instantly, per-field messages mount simultaneously, and the submit spinner appears without contextual icon motion.

### 2.4 Technical Constraints

- Keep all displayed text in British English and retain right single quotation marks in frontend copy.
- Preserve lowercase navigation and footer labels.
- Do not add inline desktop navigation.
- Preserve the contact fields: name, email, company, phone, message, and budget.
- Preserve all stable contact page and contact details copy.
- Preserve the intentionally empty trailing `Border` in `src/app/contact/ContactDetails.jsx`.
- Keep form input borders because they communicate focus, grouping, and error state; the shadow-over-border recommendation applies only to borders used for elevation.
- Do not add `prefers-reduced-motion`, timing gates, or `requestAnimationFrame` wrappers.
- Do not add `will-change` unless browser evidence shows first-frame stutter on `transform`, `opacity`, or `filter`.
- Keep the existing service animation lazy loading, viewport subscription, `IntersectionObserver`, and `content-visibility` design unchanged.
- Do not perform a repository-wide search-and-replace. Update each reviewed class deliberately.

### 2.5 Existing Infrastructure That Can Be Reused

- `src/components/Button.jsx` is the correct central point for press feedback and explicit button transitions.
- `framer-motion` is already installed and can provide the exact contextual icon transition required by the selected standard without adding a dependency.
- `src/styles/components.css` can hold shared light and dark surface shadow tokens.
- Existing `test/*.test.mjs` source-contract tests can guard hit-area, transition, and protected-animation requirements.
- Existing navigation focus management, Escape handling, focus trap, and link-close logic in `RootNavigationPanel.jsx` must be retained.

---

## 3. Desired State

### 3.1 Desired State Requirements

- **REQ-1 (MUST):** Mobile interactive hit areas must be at least `44x44px`; desktop hit areas must be at least `40x40px`.
- **REQ-2 (MUST):** Buttons and button-like links must use `scale(0.96)` on press with an interruptible transform transition, unless a `static` option disables the effect.
- **REQ-3 (MUST):** Changed components must specify only the properties they animate. They must not use `transition-all` or broad `transition` utilities.
- **REQ-4 (MUST):** The menu and close icon transition must use opacity `0` to `1`, scale `0.25` to `1`, blur `4px` to `0`, and a spring with duration `0.3` and bounce `0`.
- **REQ-5 (MUST):** The default menu icon must not animate on page load. The icon transition wrapper must use `initial={false}`.
- **REQ-6 (MUST):** Navigation closing must have a visible exit of `150ms` or less, with opacity and no more than `12px` upward movement. Opening may use up to `300ms`.
- **REQ-7 (MUST):** Card/container borders used only for depth must be replaced by shared layered light-mode shadows or a single translucent white ring on dark surfaces.
- **REQ-8 (MUST NOT):** Dividers, table boundaries, form input borders, error outlines, and focus rings must not be converted to shadows.
- **REQ-9 (MUST):** The mobile hero proof container must use an `18px` outer radius around `12px` children separated by `6px` padding.
- **REQ-10 (MUST):** Process image shapes must use a `1px` pure-black outline at `10%` opacity with inset-equivalent placement.
- **REQ-11 (MUST):** External-link arrows must use `2px` less padding on the icon side and be optically aligned to the text baseline.
- **REQ-12 (MUST):** Protected front-page animation designs, timing, triggers, and loading behaviour must remain unchanged.

### 3.2 Defaults and Fallbacks

- **Default press behaviour:** Apply `active:scale-[0.96]` to shared buttons and button-like links.
- **Static fallback:** A `static` prop disables press scale for controls where movement would interfere with a loading or destructive state.
- **Motion implementation:** Use Framer Motion only for the existing client-side navigation and contact state boundaries. Keep Server Components as Server Components.
- **Surface fallback:** Retain a border when it communicates input state, division, selection, validation, or layout structure.
- **Hit-area fallback:** Use a non-overlapping pseudo-element when increasing the visible element would damage information density.

### 3.3 Verification Checklist

**Interaction:**

- [ ] All sampled mobile targets are at least `44x44px` and desktop targets are at least `40x40px`.
- [ ] Primary and secondary CTAs scale to exactly `0.96` while pressed and return smoothly when released.
- [ ] Navigation can reverse direction during open or close without snapping.
- [ ] Default-state icons do not animate on first page load.

**Surfaces:**

- [ ] Elevation cards use the shared light or dark shadow treatment.
- [ ] Input, divider, validation, and focus borders remain intact.
- [ ] Mobile hero proof radii are `18px` outer and `12px` inner with `6px` padding.
- [ ] Process image outlines are `1px` pure black at `10%` opacity.

**Performance and compatibility:**

- [ ] Changed components contain no broad transition utilities.
- [ ] No `will-change: all` exists and no new `will-change` is added without measured stutter.
- [ ] Existing animation keyframes and service lazy-loading behaviour are unchanged.
- [ ] Required automated and browser checks pass.

---

## 4. Additional Context

### 4.1 User-Provided Context

The user requested a UI review against `/Users/sacino/.agents/skills/better-ui/SKILL.md`, with clear before-and-after recommendations and a direct account of where the current UI falls short. This plan applies the skill’s surface, animation, performance, image-outline, optical-alignment, press-feedback, and hit-area rules.

### 4.2 Review Evidence

- `/Users/sacino/embeddings/artifacts/ui-audit-home-desktop-top.png`: desktop homepage first viewport.
- `/Users/sacino/embeddings/artifacts/ui-audit-home-mobile-top.png`: mobile homepage first viewport.
- `/Users/sacino/embeddings/artifacts/ui-audit-navigation-mobile.png`: open mobile navigation state.
- `/Users/sacino/embeddings/artifacts/ui-audit-process-desktop-top.png`: desktop process page and first shaped image.
- `/Users/sacino/embeddings/artifacts/ui-audit-contact-desktop-top.png`: desktop contact layout.
- `/Users/sacino/embeddings/artifacts/ui-audit-contact-mobile-top.png`: mobile contact introduction and form start.
- `/Users/sacino/embeddings/artifacts/ui-audit-contact-mobile-form.png`: mobile form controls and budget choices.
- `/Users/sacino/embeddings/artifacts/ui-audit-contact-mobile-errors.png`: mobile empty-submit validation state.

The full-page homepage capture is not used as regression evidence because the application intentionally uses offscreen rendering optimisation. Targeted viewport captures are the source of truth.

---

## 5. UI/UX Recommendations

### 5.1 Minimum hit area

| Before | After |
| --- | --- |
| `src/app/page.jsx:138-139`, `src/app/page.jsx:177`, and `src/components/StatList.jsx:27` render source links at `28-32px` high | Give every source link a `44px` mobile and `40px` desktop hit area, using a non-overlapping pseudo-element where the visible pill should remain compact |
| `src/components/Footer.jsx:60-67` renders footer links as approximately `13px`-high text targets | Make footer links `inline-flex min-h-11 sm:min-h-10 items-center`; replace per-item margin with a gap so expanded targets do not overlap |
| `src/app/contact/ContactDetails.jsx:29-34` renders the email link as an approximately `13px`-high target | Make the email address an `inline-flex min-h-11 sm:min-h-10 items-center` target without changing its copy or position |
| `src/components/RootHeader.jsx:20-23`, `src/components/RootNavigationPanel.jsx:51-54`, and `src/components/Footer.jsx:93-95` expose `32px`-high logo links | Extend each logo link to a non-overlapping `44x44px` mobile and `40px`-high desktop hit area while leaving the visible logo size unchanged |

### 5.2 Scale on press

| Before | After |
| --- | --- |
| `src/components/Button.jsx:18-24` has hover and focus states but no tactile press response | Add an interruptible transform transition and exactly `active:not-disabled:scale-[0.96]`; add a `static` prop that disables press scale when required |
| `src/app/page.jsx:478-483` and `src/app/thank-you/page.jsx:42` define secondary button-like links independently | Apply the same exact `0.96` press behaviour and transition timing, or route these styles through a shared secondary button variant |
| Source pills and `src/app/contact/ContactForm.jsx:197-214` budget labels have hover/checked states but no press state | Add `active:scale-[0.96]` to the visible pressable surface while keeping checked, disabled, and focus states unchanged |

### 5.3 Transition specificity

| Before | After |
| --- | --- |
| `src/components/Logo.jsx:17` uses `transition-all` for a width-only fill animation | Use `transition-[width] duration-300` |
| `src/components/Button.jsx:20`, `src/components/NavigationButton.jsx:40,49`, `src/components/Footer.jsx:63`, and source-link classes use broad `transition` utilities | Specify only the properties that change, such as `transition-[scale,background-color,color,box-shadow]`, `transition-[background-color,scale]`, `transition-[fill,opacity,filter,scale]`, or `transition-colors` |
| `src/app/page.jsx:225,376,379,398` and `src/components/CatalogueTransformation.jsx:70,128` use `transition-all` on cards, accent bars, and dividers | Replace each with an exact property list: card `transform/background-color/box-shadow`, accent `height/opacity/background-position`, and divider `width/background-color` |
| `src/app/contact/ContactForm.jsx:141,154-158,200,209` broadly watches input, label, wrapper, and radio properties | Limit transitions to the properties each state changes: border/background/ring for inputs, transform/top/colour for labels, and border/background/box-shadow/scale for radio labels |

### 5.4 Interruptible navigation and contextual icons

| Before | After |
| --- | --- |
| `src/components/NavigationButton.jsx:30` replaces `MenuIcon` with `XIcon` immediately | Keep the state icons in an `AnimatePresence initial={false}` boundary and animate opacity `0→1`, scale `0.25→1`, and blur `4px→0` with `{ type: 'spring', duration: 0.3, bounce: 0 }` |
| `src/components/RootNavigation.jsx:29-44` conditionally mounts either the trigger or panel, so closing has no rendered exit | Keep enough state mounted for an exit to complete while retaining current focus return, Escape, focus-trap, and route-close behaviour |
| `src/styles/components.css:29-31,69-77` animates `max-height` through a one-way keyframe | Replace `navigationPanelEnter` with interruptible opacity/transform state transitions: up to `300ms` on enter and `150ms` on exit with no more than `translateY(-12px)` |

### 5.5 Contact state transitions

| Before | After |
| --- | --- |
| `src/app/contact/ContactForm.jsx:218-281` mounts loading, success, and error panels without an exit transition | Wrap contextual panels in `AnimatePresence initial={false}`; use a `300ms` opacity/blur/`12px` enter and a `150ms` opacity/blur/`-12px` exit while preserving `role`, `aria-live`, and focus behaviour |
| `src/app/contact/ContactForm.jsx:183-190` mounts all field messages at once after invalid submit | Reveal the summary immediately for assistive technology, then visually stagger the summary and field messages by about `80-100ms` without delaying focus on the first invalid field |
| `src/app/contact/ContactForm.jsx:603-610` conditionally inserts the loading spinner | Animate the spinner wrapper with the contextual icon values while retaining the spinner’s existing rotational keyframe and the button’s fixed minimum width |

### 5.6 Shadows over elevation borders

| Before | After |
| --- | --- |
| `src/app/page.jsx:225` uses a solid translucent border plus an ambient shadow on dark timeline cards | Use a dark-surface shadow token with a single pure-white translucent ring and retain the ambient depth layer; remove the depth-only border |
| `src/components/CatalogueTransformation.jsx:70,128` uses `border-neutral-200` plus `shadow-sm` for the before and after cards | Replace the depth-only border with a shared light-surface layered shadow: a `1px` black ring, small lift, and ambient depth |
| `src/components/ServiceTimelineLeftRail.jsx:69,88`, `src/app/about/page.jsx:54,97`, and hero proof cards use repeated hard border and shallow-shadow combinations | Apply the shared light or dark surface shadow token where the border does not communicate grouping or state; retain true dividers and the service timeline rail |
| Surface hover styles jump from shallow shadows to `shadow-xl` | Use a paired hover shadow token with slightly stronger ring and lift values so hover depth changes remain subtle and consistent |

### 5.7 Concentric border radius

| Before | After |
| --- | --- |
| `src/app/page.jsx:154-160` uses a `16px` mobile outer radius, `6px` padding, and `12px` child radii | Set the mobile outer radius to exactly `18px` so `12px inner + 6px padding = 18px outer`; keep the desktop ungrouped card treatment unchanged |

### 5.8 Optical alignment

| Before | After |
| --- | --- |
| `src/app/page.jsx:138-145`, `src/app/page.jsx:177-182`, and `src/components/StatList.jsx:27-32` give text and the external arrow equal horizontal padding | Use `2px` less padding on the arrow side, keep the arrow in an inline-flex alignment wrapper, and apply a `1px` optical baseline correction only if the rendered glyph remains low or high |
| Menu and close icons share a geometric `24x24` box but have different visual weight | Adjust the SVG path or viewBox after the cross-fade is implemented so both states appear centred without component-level margin hacks |

### 5.9 Image outlines

| Before | After |
| --- | --- |
| `src/components/StylizedImage.jsx:46-50` outlines process image shapes with `stroke-neutral-950/10` at `2px` | Use a `1px` pure-black `10%` SVG stroke with inset-equivalent placement so the outline follows the bespoke clip shape without adding layout size |

---

## 6. Implementation Plan

### ~~Step 1: Standardise Shared Interaction Primitives~~ ✅ **COMPLETED**

**Objective:** Establish exact press, transition, and hit-area behaviour before updating individual pages.

#### 1.1 High-Level Approach

- Update `src/components/Button.jsx` with the exact `0.96` press response, explicit transition properties, and a `static` option.
- Update `src/components/NavigationButton.jsx` with an explicit outer transition and contextual icon animation.
- Update shared logo link wrappers in `RootHeader.jsx`, `RootNavigationPanel.jsx`, and `Footer.jsx` without changing visible logo dimensions.
- Add focused source-contract tests for the shared behaviour.

**Success Criteria:**

- Shared buttons compute to `scale(0.96)` while pressed and `scale(1)` after release.
- Disabled buttons do not scale and retain the existing disabled cursor and opacity.
- The `static` option disables only press scaling.
- Menu and close icons use the exact scale, opacity, blur, spring duration, and bounce values in REQ-4.
- Header and navigation logo hit areas measure at least `44x44px` at `390x900` and at least `40px` high at `1440x900`.
- `node --test test/ui-interaction-polish.test.mjs` passes.

### ~~Step 2: Correct Site-Wide Small Targets and Optical Alignment~~ ✅ **COMPLETED**

**Objective:** Make compact links easy to activate without making the interface visually heavy.

#### 2.1 High-Level Approach

- Update source chips in `src/app/page.jsx` and `src/components/StatList.jsx`.
- Update footer links in `src/components/Footer.jsx` and the contact email in `src/app/contact/ContactDetails.jsx`.
- Use explicit gaps or scoped pseudo-elements so expanded targets do not overlap.
- Correct icon-side padding on all external source chips.

**Success Criteria:**

- Every reviewed source link, footer link, email link, and logo link meets REQ-1 at both required viewports.
- Browser inspection reports no overlapping hit areas.
- Footer section spacing remains at least `4px` between adjacent semantic hit boxes.
- External arrows have exactly `2px` less trailing padding than the text side.
- No visible copy, label casing, route, or link destination changes.

### ~~Step 3: Replace Broad Transitions Deliberately~~ ✅ **COMPLETED**

**Objective:** Make hover, focus, press, and form state motion predictable and cheaper to evaluate.

#### 3.1 High-Level Approach

- Replace each reviewed `transition-all` and broad `transition` class with an exact property list.
- Limit changes to active files named in section 5.3; do not run repository-wide replacement scripts.
- Preserve current durations unless a navigation or contact enter/exit duration is explicitly changed by this plan.

**Success Criteria:**

- `rg -n "transition-all|className=.*\\btransition\\b"` returns no broad transition in the changed active components.
- Hover, focus, selected, disabled, error, and press states still render at both viewports.
- No changed element animates padding, layout position, or unrelated colour properties unexpectedly.
- `npm run lint` reports zero errors.

### ~~Step 4: Make Navigation and Contact State Changes Interruptible~~ ✅ **COMPLETED**

**Objective:** Add polished enter and exit context while preserving navigation and form semantics.

#### 4.1 High-Level Approach

- Replace the navigation panel’s one-way keyframe with mounted enter/exit state transitions.
- Preserve focus return, Escape close, focus trapping, route-link close, `role="dialog"`, and `aria-modal`.
- Add contextual panel and spinner transitions to `ContactForm.jsx` without delaying validation focus or live-region updates.
- Reuse the existing 20-iteration contact-to-about diagnostic before and after navigation changes because a historical transient RSC abort has been recorded.

**Success Criteria:**

- Navigation enter completes within `300ms`; exit completes within `150ms`.
- Clicking the menu control during an in-progress transition retargets smoothly without restarting a keyframe or leaving two panels visible.
- Escape closes the panel and focus returns to the open trigger.
- Tab and Shift+Tab remain trapped while the dialog is open.
- Twenty mobile `/contact` to menu to `/about` iterations reach `/about` with the expected title and H1, zero page errors, and zero unexpected request failures.
- Contact invalid submission focuses `#name-field` immediately and exposes the summary through the existing alert semantics.
- Contact status and error panels have softer exits than enters.

### ~~Step 5: Harmonise Surface Depth and Radii~~ ✅ **COMPLETED**

**Objective:** Replace depth-only borders with shared shadows and correct the mobile nested radius relationship.

#### 5.1 High-Level Approach

- Add shared light, light-hover, dark, and dark-hover surface shadow tokens to `src/styles/components.css` or the existing global style layer.
- Apply them only to the specific elevation cards named in section 5.6.
- Retain input borders, dividers, selection borders, error borders, focus rings, and the service timeline rail.
- Set the hero proof mobile outer radius to `18px`.

**Success Criteria:**

- Light cards compute to the documented three-layer shadow; dark cards include a pure-white translucent ring.
- The changed elevation cards do not retain a redundant depth-only border.
- Input, error, focus, divider, and selection borders remain visually and semantically unchanged.
- Hero proof computed radii are `18px` outer and `12px` inner at `390x900`.
- No content shift or horizontal overflow is introduced.

### ~~Step 6: Correct Process Image Edge Treatment~~ ✅ **COMPLETED**

**Objective:** Give clipped process photography a consistent neutral outline.

#### 6.1 High-Level Approach

- Update the outline `<use>` in `src/components/StylizedImage.jsx` so it follows the bespoke path with a `1px` pure-black `10%` stroke.
- Keep clipping paths, image aspect ratios, grayscale behaviour, and hover scale unchanged.

**Success Criteria:**

- Each `/process` image shape has a `1px` pure-black `10%` outline.
- The outline follows the existing SVG clip without changing the rendered box dimensions.
- The existing grayscale and hover-scale interaction remains unchanged.
- Process page screenshots at `1440x900` and `390x900` show no clipping gaps or dirty tinted edge.

### ~~Step 7: Validate and Synchronise Documentation~~ ✅ **COMPLETED**

**Objective:** Prove the polish pass works across routes and does not alter protected architecture.

#### 7.1 High-Level Approach

- Run focused tests, all Node tests, lint, and static export.
- Verify `/`, `/process`, `/contact`, `/about`, `/thank-you`, and the navigation dialog at `1440x900` and `390x900`.
- Check target sizes, overflow, console errors, page errors, hover, press, focus, open/close reversal, validation, and changed offscreen sections.
- Review `documents/service-section-animations.md`. Update it only if implementation accidentally changes service animation timing, triggers, imports, viewport gating, or rendering behaviour. The intended result is no documentation change because those behaviours are out of scope.

**Success Criteria:**

- `node --test test/ui-interaction-polish.test.mjs`, `npm test`, `npm run lint`, and `npm run build` all exit with status `0`.
- Desktop and mobile browser checks report zero horizontal overflow, console errors, and page errors.
- Targeted screenshots show all changed elements in view after layout settles.
- Protected animation source and `documents/service-section-animations.md` remain unchanged unless an actual architecture change is documented.

---

## 7. Testing Plan

### 7.1 Source-of-Truth Regression Artefacts

Use the eight targeted screenshots listed in section 4.2 as the visual baseline. They establish the current header, homepage hero, mobile navigation, process imagery, contact layout, form controls, and validation state.

The existing source files are also direct regression artefacts:

- `src/components/NavigationButton.jsx` and `src/styles/components.css` prove the current abrupt icon replacement and one-way panel keyframe.
- `src/app/page.jsx`, `src/components/Footer.jsx`, `src/components/StatList.jsx`, and `src/app/contact/ContactDetails.jsx` prove the current sub-minimum target classes.
- `src/components/StylizedImage.jsx` proves the current `2px` tinted shape stroke.
- `src/app/contact/ContactForm.jsx` proves the current immediate panel and per-field error mounting.

<critical_warning>
> **CRITICAL WARNING:** Do not use an unscrolled full-page screenshot as evidence that deferred homepage content is missing. Scroll every changed offscreen element into view, wait for layout to settle, return to the intended starting position before any full-page capture, and use targeted viewport captures as the primary visual regression evidence.
</critical_warning>

### 7.2 Automated Tests

| Test Case | Location and Framework | Expected Result | Command |
| --- | --- | --- | --- |
| UI interaction contracts | `test/ui-interaction-polish.test.mjs`, Node test runner | Exact press scale, hit-area classes, transition specificity, icon values, surface tokens, radius values, and image outline values are present | `node --test test/ui-interaction-polish.test.mjs` |
| Contact form contract | Existing `test/contact-form-contract.test.mjs`, Node test runner | Name, email, company, phone, message, budget, copy, and validation behaviour remain present | `node --test test/contact-form-contract.test.mjs` |
| Navigation contracts | Existing navigation tests plus the focused browser diagnostic | Dialog semantics, separators, focus behaviour, and contact-to-about navigation remain stable | `npm test` and the existing 20-iteration browser diagnostic |
| Repository lint | Next ESLint | Zero errors | `npm run lint` |
| Static export | Next build | Compilation, static generation, and export complete without errors | `npm run build` |

### 7.3 Browser Validation

1. **Homepage at `1440x900` and `390x900`**
   - Action: Verify header logo, primary and secondary CTAs, hero proof source chips, timeline cards, why-now cards, service overview, and final CTA. Press and release each changed control.
   - Expected: Hit-area minimums pass; press scale reaches `0.96`; shadows and radii match the plan; no overflow or errors occur; protected animations retain their existing sequence.
   - Verify: Computed style/box measurements and targeted screenshots.
2. **Navigation at `1440x900` and `390x900`**
   - Action: Open, reverse during enter, reopen, close through the trigger, close with Escape, and navigate from `/contact` to `/about`.
   - Expected: Icon cross-fade uses the exact values; exit is softer and shorter than enter; focus return and trapping pass; navigation stability diagnostic passes.
   - Verify: DOM state, focused element, computed transition values, diagnostic output, and open/closing screenshots.
3. **Contact form at `1440x900` and `390x900`**
   - Action: Trigger empty validation without external submission, follow summary links, fill fields, select budget, and inspect loading/error/success states through safe local or mocked responses.
   - Expected: First invalid field receives focus immediately; live-region semantics remain; panels and spinner animate contextually; field contract and copy remain unchanged.
   - Verify: Accessibility snapshot, focused element, computed transitions, and targeted screenshots.
4. **Process page at `1440x900` and `390x900`**
   - Action: Scroll each shaped image into view and inspect its edge and hover state.
   - Expected: Every image has the pure-black `1px` outline; no clipping gap, tinted edge, layout shift, or overflow occurs.
   - Verify: Computed SVG stroke values and targeted screenshots.

---

## Implemented Solution

- Updated shared interaction primitives in `src/components/Button.jsx` and `src/components/NavigationButton.jsx` with exact-property transitions, `0.96` press feedback, a static-button fallback, and contextual menu/close icon motion.
- Reworked the mounted navigation lifecycle across `src/components/RootNavigation.jsx` and `src/components/RootNavigationPanel.jsx`. The trigger remains persistent, the panel enters over `300ms`, exits within `150ms`, reverses without a blank dialog, traps focus while mounted, closes on links or Escape, and returns focus to the trigger after exit.
- Added responsive target sizing and optical alignment in `src/components/RootHeader.jsx`, `src/components/Footer.jsx`, `src/components/Logo.jsx`, `src/components/StatList.jsx`, `src/app/contact/ContactDetails.jsx`, and source links in `src/app/page.jsx`.
- Added shared light and dark elevation tokens in `src/styles/components.css`, then applied them to homepage, service, proof, about, and thank-you surfaces through `src/app/page.jsx`, `src/app/about/page.jsx`, `src/app/thank-you/page.jsx`, `src/components/CatalogueTransformation.jsx`, and `src/components/ServiceTimelineLeftRail.jsx`.
- Updated `src/app/contact/ContactForm.jsx` with contextual presence motion for validation, loading, error, success, and spinner states; staggered field errors; exact input/radio transitions; larger error-summary targets; controlled budget selection; stable IDs for every budget option; and reliable success-panel focus after render.
- Updated `src/components/StylizedImage.jsx` to use a pure-black `10%`, `1px` outline while retaining the existing clip paths, grayscale behaviour, and hover scale.
- Added `test/ui-interaction-polish.test.mjs` and updated `test/contact-form-contract.test.mjs`, `test/root-layout-inert-attribute.test.mjs`, and `test/root-layout-server-shell.test.mjs` for the new interaction, target, surface, navigation, contact, and optical-edge contracts.
- Preserved all protected hero, service-stage, and floating-snippet animation behaviour. `documents/service-section-animations.md` remains accurate, so the post-change documentation sync required no update.
- Browser verification at `390x900` and `1440x900` covered `/`, `/process`, `/contact`, `/about`, `/thank-you`, and the navigation dialog. All routes had zero horizontal overflow and no unexpected console or page errors. The locally intercepted contact flow passed empty validation, loading, mocked `429`, and mocked success states; the success panel received focus; process outlines measured `1px` pure-black at `10%`; button press reached `0.96`; and the 20-iteration contact-to-about navigation diagnostic passed `20/20`.
- Validation passed: `node --test test/ui-interaction-polish.test.mjs` (`7/7`), `npm test` (`67/67`), `npm run lint` (zero warnings/errors), and `npm run build` (successful static export).
