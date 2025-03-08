# Contact Page Implementation Documentation

## Table of Contents

1. [File Structure](#file-structure)
2. [Page Implementation](#page-implementation)
3. [Component Structure](#component-structure)
   - [ContactForm](#contactform)
   - [ContactDetails](#contactdetails)
   - [ContactSection](#contactsection)
4. [Shared Components](#shared-components)
   - [Container](#container)
   - [FadeIn](#fadein)
   - [Border](#border)
   - [Button](#button)
   - [Offices](#offices)
   - [PageIntro](#pageintro)
5. [Form Submission Logic](#form-submission-logic)
6. [Styling and Responsiveness](#styling-and-responsiveness)
7. [Usage in Other Pages](#usage-in-other-pages)
8. [Implementation Instructions](#implementation-instructions)

## File Structure

```
src/
├── app/
│   └── contact/
│       ├── page.jsx                # Main contact page entry point
│       ├── ContactForm.jsx         # Contact form component with submission logic
│       └── ContactDetails.jsx      # Component for displaying contact information
├── components/
│   ├── Border.jsx                  # Decorative border component
│   ├── Button.jsx                  # Button component with hover states
│   ├── Container.jsx               # Layout container component
│   ├── ContactSection.jsx          # CTA section that links to the contact page
│   ├── FadeIn.jsx                  # Animation component for fade-in effects
│   ├── Offices.jsx                 # Component to display office locations
│   └── PageIntro.jsx               # Page header component with title and description
```

## Page Implementation

### Contact Page (`src/app/contact/page.jsx`)

```jsx
import { Border } from '@/components/Border'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Offices } from '@/components/Offices'
import { PageIntro } from '@/components/PageIntro'
import { ContactForm } from './ContactForm'
import { ContactDetails } from './ContactDetails'

export const metadata = {
  title: 'Contact Us',
  description: "Contact us to learn how we can integrate AI into your business.",
}

export default function Contact() {
  return (
    <>
      <PageIntro eyebrow="contact us" title="Your AI advantage starts here">
        <p>Ready to experience the future of work? Contact us to see how we can integrate AI into your business.</p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
          <ContactForm />
          <ContactDetails />
        </div>
      </Container>
    </>
  )
}
```

The main contact page is built with NextJS App Router structure. It includes:
- Metadata for SEO optimization
- A `PageIntro` component that displays the title and description
- A two-column layout for larger screens that places the contact form on the left and contact details on the right
- Responsive design that stacks the columns on mobile

## Component Structure

### ContactForm

Located at `src/app/contact/ContactForm.jsx`, this is a client component that includes the form and submission logic.

```jsx
'use client'

import { useId, useState } from 'react'
import { Button } from '@/components/Button'
import { FadeIn } from '@/components/FadeIn'

// TextInput subcomponent for form fields
function TextInput({ label, multiline = false, rows = 3, ...props }) {
  let id = useId()

  const sharedClasses = "peer block w-full border border-neutral-300 bg-transparent px-6 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5 group-first:rounded-t-2xl group-last:rounded-b-2xl"
  
  const inputClasses = `${sharedClasses} pb-4 pt-12`
  const textareaClasses = `${sharedClasses} pb-3 pt-12 resize-none`

  const labelClasses = multiline
    ? "pointer-events-none absolute left-6 top-8 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:top-2 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950"
    : "pointer-events-none absolute left-6 top-1/2 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950"

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      {multiline ? (
        <textarea
          id={id}
          rows={rows}
          {...props}
          placeholder=" "
          className={textareaClasses}
        />
      ) : (
        <input
          type="text"
          id={id}
          {...props}
          placeholder=" "
          className={inputClasses}
        />
      )}
      <label
        htmlFor={id}
        className={labelClasses}
      >
        {label}
      </label>
    </div>
  )
}

// RadioInput subcomponent for radio buttons
function RadioInput({ label, ...props }) {
  return (
    <label className="flex gap-x-3">
      <input
        type="radio"
        {...props}
        className="h-6 w-6 flex-none appearance-none rounded-full border border-neutral-950/20 outline-none checked:border-[0.5rem] checked:border-neutral-950 focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
      />
      <span className="text-base/6 text-neutral-950">{label}</span>
    </label>
  )
}

// Error message mapping function
const getErrorMessage = (status) => {
  switch (status) {
    case 400:
      return 'Oops, one of the fields in the form was invalid. Please check your form details and try again. Please email us directly at solutions@embeddings.au if the issue persists.'
    case 429:
      return 'Sorry, there were too many submissions. Please email us directly at solutions@embeddings.au'
    default:
      return 'Sorry, your message failed to send. Please email us directly at solutions@embeddings.au'
  }
}

// Main ContactForm component
export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ success: false, error: null })

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ success: false, error: null })

    try {
      const formData = new FormData(event.target)
      const response = await fetch('https://formspree.io/f/xrbgdgwq', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      })

      if (response.ok) {
        setSubmitStatus({ success: true, error: null })
        event.target.reset()
        // Track successful submission
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'form_submission', {
            event_category: 'Contact',
            event_label: 'Success',
          })
        }
      } else {
        throw new Error(getErrorMessage(response.status))
      }
    } catch (error) {
      setSubmitStatus({ success: false, error: error.message })
      // Track failed submission
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'form_submission', {
          event_category: 'Contact',
          event_label: 'Failed',
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <FadeIn className="lg:order-last">
      <form onSubmit={handleSubmit}>
        <h2 className="font-display text-base font-semibold text-neutral-950">
          business enquiries
        </h2>
        
        {/* Hidden fields for Formspree configuration */}
        <input type="hidden" name="_subject" value="New business enquiry from embeddings.au" />
        <input type="hidden" name="_next" value="https://embeddings.au/thank-you" />
        <input type="text" name="_gotcha" style={{ display: 'none' }} />

        <div className="isolate mt-6 -space-y-px rounded-2xl bg-white/50">
          <TextInput label="Name" name="name" autoComplete="name" required />
          <TextInput
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            required
          />
          <TextInput
            label="Company"
            name="company"
            autoComplete="organization"
            required
          />
          <TextInput label="Phone" type="tel" name="phone" autoComplete="tel" required />
          <TextInput 
            label="Message" 
            name="message" 
            required 
            multiline={true}
            rows={3}
          />
          <div className="border border-neutral-300 px-6 py-8 first:rounded-t-2xl last:rounded-b-2xl">
            <fieldset>
              <legend className="text-base/6 text-neutral-500">Budget</legend>
              <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
                <RadioInput label="$0 – $100K" name="budget" value="100" required />
                <RadioInput label="$100K – $500K" name="budget" value="500" />
                <RadioInput label="$500K – $1M" name="budget" value="1000" />
                <RadioInput label="More than $1M" name="budget" value="1500" />
              </div>
            </fieldset>
          </div>
        </div>

        {submitStatus.error && (
          <div className="mt-4 text-red-500">{submitStatus.error}</div>
        )}

        {submitStatus.success && (
          <div className="mt-4 text-green-500">Message sent successfully. We'll get back to you soon.</div>
        )}

        <Button 
          type="submit" 
          className="mt-10"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send message'}
        </Button>
      </form>
    </FadeIn>
  )
}
```

#### Key Features:
- Uses React's `useId` hook for generating unique IDs for form fields
- Implements custom-styled text inputs and radio buttons
- Uses Formspree for form submission (requires a Formspree account and form ID)
- Includes honeypot field to prevent spam (`_gotcha`)
- Tracks form submissions with Google Analytics when available
- Provides user feedback for successful/failed submissions
- Implements loading state with disabled button during submission
- Uses custom tailored error messages based on HTTP status codes

### ContactDetails

Located at `src/app/contact/ContactDetails.jsx`, this component displays office locations and contact information.

```jsx
import Link from 'next/link'
import { Border } from '@/components/Border'
import { FadeIn } from '@/components/FadeIn'
import { Offices } from '@/components/Offices'

export function ContactDetails() {
  return (
    <FadeIn>
      <h2 className="font-display text-base font-semibold text-neutral-950">
        our offices
      </h2>
      <p className="mt-6 text-base text-neutral-600">
        We're based in Perth and Melbourne, and work with clients all over Australia.
      </p>

      <Offices className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2" />

      <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-semibold text-neutral-950">
          email us
        </h2>
        <dl className="mt-6 grid grid-cols-1 gap-8 text-sm sm:grid-cols-2">
          {[
            ['business enquiries', 'solutions@embeddings.au'],
          ].map(([label, email]) => (
            <div key={email}>
              <dt className="font-semibold text-neutral-950">{label}</dt>
              <dd>
                <Link
                  href={`mailto:${email}`}
                  className="text-neutral-600 hover:text-neutral-950"
                >
                  {email}
                </Link>
              </dd>
            </div>
          ))}
        </dl>
      </Border>

      <Border className="mt-16 pt-16">
        {/* <h2 className="font-display text-base font-semibold text-neutral-950">
          follow us
        </h2>
        <SocialMedia className="mt-6" /> */}
      </Border>
    </FadeIn>
  )
}
```

#### Key Features:
- Displays office locations using the `Offices` component
- Shows email contacts with proper mailto: links
- Uses the `Border` component for visual separation
- Has a commented-out section for social media links that can be enabled if needed
- Implements responsive layout with grid columns that adapt to screen size

### ContactSection

Located at `src/components/ContactSection.jsx`, this is a reusable call-to-action component used across multiple pages that links to the contact page.

```jsx
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import clsx from 'clsx'

export function ContactSection({ invert = false }) {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="mx-auto max-w-3xl text-center">
        <h2
          className={clsx(
            'font-display text-3xl font-medium tracking-tight',
            invert ? 'text-white' : 'text-neutral-950'
          )}
        >
          Ready to transform your business with AI?
        </h2>
        <div
          className={clsx(
            'mt-6 text-base',
            invert ? 'text-neutral-300' : 'text-neutral-600'
          )}
        >
          <p>Get in touch to start your AI transformation journey.</p>
        </div>
        <Button href="/contact" invert={invert} className="mt-8">
          Contact us
        </Button>
      </div>
    </Container>
  )
}
```

#### Key Features:
- Used as a call-to-action section on various pages to link to the contact page
- Accepts an `invert` prop to display with inverted colors when used on dark backgrounds
- Uses the `clsx` utility for conditional class names
- Centered content with a maximum width for better readability
- Responsive margins that increase on larger screens

## Shared Components

### Container

Located at `src/components/Container.jsx`, this layout component provides consistent padding and maximum width constraints.

```jsx
import clsx from 'clsx'

export function Container({ as, className, children }) {
  let Component = as ?? 'div'

  return (
    <Component className={clsx('mx-auto max-w-7xl px-6 lg:px-8', className)}>
      <div className="mx-auto max-w-2xl lg:max-w-none">{children}</div>
    </Component>
  )
}
```

#### Key Features:
- Polymorphic component that can render as any HTML element via the `as` prop
- Provides consistent horizontal padding that increases on larger screens
- Sets a maximum width for the container with responsive behavior
- Uses the `clsx` utility to combine class names

### FadeIn

Located at `src/components/FadeIn.jsx`, this animation component provides fade-in effects for elements as they enter the viewport.

```jsx
'use client'

import { createContext, useContext } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const FadeInStaggerContext = createContext(false)

const viewport = { once: true, margin: '0px 0px -200px' }

export function FadeIn(props) {
  let shouldReduceMotion = useReducedMotion()
  let isInStaggerGroup = useContext(FadeInStaggerContext)

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
      {...(isInStaggerGroup
        ? {}
        : {
            initial: 'hidden',
            whileInView: 'visible',
            viewport,
          })}
      {...props}
    />
  )
}

export function FadeInStagger({ faster = false, ...props }) {
  return (
    <FadeInStaggerContext.Provider value={true}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        transition={{ staggerChildren: faster ? 0.12 : 0.2 }}
        {...props}
      />
    </FadeInStaggerContext.Provider>
  )
}
```

#### Key Features:
- Client component that uses Framer Motion for animations
- Respects user's reduced motion preferences
- Provides a staggered animation context for creating sequences
- Elements fade in once when they enter the viewport
- Elements slide up slightly during the fade-in animation

### Border

Located at `src/components/Border.jsx`, this decorative component adds styled borders to elements.

```jsx
import clsx from 'clsx'

export function Border({
  as,
  className,
  position = 'top',
  invert = false,
  ...props
}) {
  let Component = as ?? 'div'

  return (
    <Component
      className={clsx(
        className,
        'relative before:absolute after:absolute',
        invert
          ? 'before:bg-white after:bg-white/10'
          : 'before:bg-neutral-950 after:bg-neutral-950/10',
        position === 'top' &&
          'before:left-0 before:top-0 before:h-px before:w-6 after:left-8 after:right-0 after:top-0 after:h-px',
        position === 'left' &&
          'before:left-0 before:top-0 before:h-6 before:w-px after:bottom-0 after:left-0 after:top-8 after:w-px',
      )}
      {...props}
    />
  )
}
```

#### Key Features:
- Uses pseudo-elements to create decorative borders
- Supports both top and left border positions
- Has an inverted color mode for use on dark backgrounds
- Polymorphic component that can render as any HTML element via the `as` prop
- Uses the `clsx` utility for conditional class names

### Button

Located at `src/components/Button.jsx`, this component renders styled buttons or links.

```jsx
import Link from 'next/link'
import clsx from 'clsx'

export function Button({ invert = false, className, children, ...props }) {
  className = clsx(
    className,
    'inline-flex rounded-full px-4 py-1.5 text-sm font-semibold transition',
    invert
      ? 'bg-white text-neutral-950 hover:bg-neutral-200'
      : 'bg-neutral-950 text-white hover:bg-neutral-800',
  )

  let inner = <span className="relative top-px">{children}</span>

  if (typeof props.href === 'undefined') {
    return (
      <button className={className} {...props}>
        {inner}
      </button>
    )
  }

  return (
    <Link className={className} {...props}>
      {inner}
    </Link>
  )
}
```

#### Key Features:
- Intelligently renders either a `button` element or a Next.js `Link` component based on whether an href prop is provided
- Supports an inverted color scheme for use on dark backgrounds
- Uses a rounded pill style with consistent padding
- Implements hover states for improved user interaction
- Uses the `clsx` utility for combining class names

### Offices

Located at `src/components/Offices.jsx`, this component displays office locations.

```jsx
import clsx from 'clsx'

function Office({ name, children, invert = false }) {
  return (
    <address
      className={clsx(
        'text-sm not-italic',
        invert ? 'text-neutral-300' : 'text-neutral-600'
      )}
    >
      <strong
        className={clsx(
          'font-semibold',
          invert ? 'text-white' : 'text-neutral-950'
        )}
      >
        {name}
      </strong>
    </address>
  )
}

export function Offices({ invert = false, ...props }) {
  return (
    <div {...props}>
      <Office name="perth" invert={invert} />
      <Office name="melbourne" invert={invert} />
    </div>
  )
}
```

#### Key Features:
- Displays office locations using the HTML5 `address` element
- Supports an inverted color scheme for use on dark backgrounds
- Uses semantic HTML for better accessibility
- Accepts additional props to customize the container

### PageIntro

Located at `src/components/PageIntro.jsx`, this component provides a consistent page header format.

```jsx
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'

export function PageIntro({ eyebrow, title, children, centered = false }) {
  return (
    <Container
      className={clsx('mt-24 sm:mt-32 lg:mt-40', centered && 'text-center')}
    >
      <FadeIn>
        <h1>
          <span className="block font-display text-base font-semibold text-neutral-950">
            {eyebrow}
          </span>
          <span className="sr-only"> - </span>
          <span
            className={clsx(
              'mt-6 block max-w-5xl font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl',
              centered && 'mx-auto',
            )}
          >
            {title}
          </span>
        </h1>
        <div
          className={clsx(
            'mt-6 max-w-3xl text-xl text-neutral-600',
            centered && 'mx-auto',
          )}
        >
          {children}
        </div>
      </FadeIn>
    </Container>
  )
}
```

#### Key Features:
- Provides a consistent page header format with eyebrow, title, and description
- Supports centered alignment option
- Uses responsive typography that scales with screen size
- Implements proper semantic HTML structure with heading elements
- Uses the `text-wrap:balance` CSS property for better typography

## Form Submission Logic

The form submission logic in the `ContactForm` component uses Formspree as the form backend:

1. The form data is collected using the FormData API
2. It's submitted to Formspree using the fetch API
3. The component manages loading and error states during submission
4. Successful submissions reset the form and show a success message
5. Failed submissions display appropriate error messages
6. Google Analytics events are triggered for successful and failed submissions

**Important implementation details:**
- The form requires a Formspree account and form ID (`xrbgdgwq` in the example)
- Hidden fields are used to configure Formspree behavior:
  - `_subject`: Sets the email subject line
  - `_next`: Sets a redirect URL for non-JS form submissions
  - `_gotcha`: Honeypot field to prevent spam

## Styling and Responsiveness

The styling uses Tailwind CSS with a consistent approach to responsiveness:

- Mobile-first design with breakpoints at:
  - `sm`: 640px and above
  - `lg`: 1024px and above
  - `xl`: 1280px and above

- Consistent spacing scale with margins that increase at larger screens:
  - Mobile: `mt-24` (6rem)
  - Small screens: `sm:mt-32` (8rem)
  - Large screens: `lg:mt-40` (10rem)

- Grid layouts that adapt to screen size:
  - Single column on mobile: `grid-cols-1`
  - Two columns on larger screens: `lg:grid-cols-2` or `sm:grid-cols-2`

- Typography that scales with screen size:
  - Larger heading sizes on bigger screens: `text-5xl sm:text-6xl`
  - Consistent `font-display` usage for headings
  - Neutral color palette with proper contrast ratios

## Usage in Other Pages

The `ContactSection` component is reused across multiple pages as a call-to-action:

- Home page (`src/app/page.jsx`)
- About page (`src/app/about/page.jsx`)
- Process page (`src/app/process/page.jsx`)
- Disabled Work page (`src/app/_disabled_pages/work/wrapper.jsx`)
- Disabled Blog page (`src/app/_disabled_pages/blog/wrapper.jsx`)

This creates a consistent way to direct users to the contact page throughout the site.

## Implementation Instructions

To implement this contact page in another project:

1. **Copy the required files:**
   - `src/app/contact/page.jsx`
   - `src/app/contact/ContactForm.jsx`
   - `src/app/contact/ContactDetails.jsx`
   - `src/components/ContactSection.jsx`

2. **Ensure the shared components are available:**
   - `src/components/Border.jsx`
   - `src/components/Button.jsx`
   - `src/components/Container.jsx`
   - `src/components/FadeIn.jsx`
   - `src/components/Offices.jsx`
   - `src/components/PageIntro.jsx`

3. **Update the Formspree configuration:**
   - Replace the form ID `xrbgdgwq` with your own Formspree form ID
   - Update email addresses and redirect URLs

4. **Customize the office locations:**
   - Modify the `Offices` component to show your actual office locations
   - Update the text in `ContactDetails` to match your company's locations

5. **Update the email contact information:**
   - Replace `solutions@embeddings.au` with your business email
   - Add any additional email categories needed

6. **Adjust the form fields if needed:**
   - Modify the form fields in `ContactForm` to collect the information you need
   - Update the budget ranges if necessary

7. **Install dependencies:**
   - Ensure you have the required packages installed:
     - `framer-motion` for animations
     - `clsx` for conditional class names
     - `next` and `react` as core dependencies

8. **Test form submission:**
   - Test the form to ensure submissions are received correctly
   - Verify the error handling works properly

9. **Add Google Analytics tracking (optional):**
   - Set up Google Analytics if you want to track form submissions
   - The existing code will automatically use `window.gtag` if available

10. **Ensure responsive design works:**
    - Test the layout on various screen sizes
    - Verify that the grid system adapts correctly 

### Formspree Setup Process

To set up and integrate Formspree with this contact form implementation:

1. **Create a Formspree account**:
   - Visit [https://formspree.io](https://formspree.io) and sign up for an account
   - Choose between the free tier or paid plans based on your needs (free tier allows up to 50 submissions per month)

2. **Create a new form**:
   - Log into your Formspree dashboard
   - Click "New Form" or "Create Form"
   - Provide a descriptive name for your form (e.g., "Business Contact Form")
   - Select your preferred plan

3. **Configure form settings**:
   - **Email notifications**: Specify which email(s) should receive form submissions
   - **Spam filtering**: Enable/adjust spam protection settings
   - **reCAPTCHA**: Configure additional protection if needed
   - **Integrations**: Set up optional integrations with services like Slack, Discord, or Zapier

4. **Get your Form ID**:
   - Once created, Formspree will provide you with a unique form ID (e.g., `xrgpodme`)
   - The complete endpoint will be in the format `https://formspree.io/f/yourFormId`
   - This is the ID you'll need to replace `xrbgdgwq` with in the `ContactForm.jsx` file

5. **Update your code**:
   - In `ContactForm.jsx`, locate the fetch URL:
     ```javascript
     const response = await fetch('https://formspree.io/f/xrbgdgwq', {
     ```
   - Replace `xrbgdgwq` with your new form ID
   - Update all hidden fields:
     ```jsx
     <input type="hidden" name="_subject" value="New business enquiry from embeddings.au" />
     <input type="hidden" name="_next" value="https://embeddings.au/thank-you" />
     ```
   - Ensure these reflect your business name and redirect URL

6. **Configure form behavior (optional)**:
   - **Subject line**: Customize email subject lines using the `_subject` hidden field
   - **Success redirects**: Set a custom success page URL with the `_next` hidden field
   - **Custom email templates**: Available on paid plans to customize email notification format
   - **File uploads**: If needed, enable file upload handling in your Formspree settings

7. **Testing and troubleshooting**:
   - Submit a test form to verify everything works correctly
   - Check spam folders if you're not receiving submissions
   - Review Formspree's dashboard to see if submissions are being received but not delivered
   - Inspect browser console for any JavaScript errors during form submission

By properly configuring both the form code and your Formspree account, you'll ensure a seamless form submission experience for your users while receiving reliable notifications for all form submissions. 