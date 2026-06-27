'use client'

import { useId, useState } from 'react'
import { Button } from '@/components/Button'
import { FadeIn } from '@/components/FadeIn'
import { track } from '@/lib/mixpanelClient'

const budgetRanges = [
  {
    label: 'Less than 100k',
    trackingValue: '0-100k',
    value: '100',
  },
  {
    label: '$100K – $500K',
    trackingValue: '100k-500k',
    value: '500',
  },
  {
    label: '$500K – $1M',
    trackingValue: '500k-1m',
    value: '1000',
  },
  {
    label: 'More than $1M',
    trackingValue: '1m+',
    value: '1500',
  },
]


function TextInput({ label, multiline = false, rows = 3, ...props }) {
  let id = useId()

  const sharedClasses =
    'peer block w-full border border-neutral-300 bg-transparent px-6 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5 group-first:rounded-t-2xl group-last:rounded-b-2xl'
  const inputClasses = `${sharedClasses} pb-4 pt-12`
  const textareaClasses = `${sharedClasses} resize-none pb-3 pt-12`

  const labelClasses = multiline
    ? 'pointer-events-none absolute left-6 top-8 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:top-2 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950'
    : 'pointer-events-none absolute left-6 top-1/2 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950'

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
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
    </div>
  )
}


function RadioInput({ label, ...props }) {
  return (
    <label className="flex gap-x-3 rounded-2xl p-2 transition hover:bg-neutral-950/[0.03]">
      <input
        type="radio"
        {...props}
        className="h-6 w-6 flex-none appearance-none rounded-full border border-neutral-950/20 outline-none transition checked:border-[0.5rem] checked:border-neutral-950 focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
      />
      <span className="text-base/6 text-neutral-950">{label}</span>
    </label>
  )
}


function StatusPanel({ status, message }) {
  if (status === 'idle') {
    return null
  }

  const isError = status === 'error'
  const isSuccess = status === 'success'

  return (
    <div
      role={isError ? 'alert' : 'status'}
      aria-live={isError ? 'assertive' : 'polite'}
      className={
        isError
          ? 'mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700'
          : isSuccess
            ? 'mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-800'
            : 'mt-6 rounded-2xl border border-neutral-950/10 bg-neutral-950/[0.03] px-5 py-4 text-sm text-neutral-700'
      }
    >
      <div className="flex items-start gap-3">
        <span
          className={
            status === 'loading'
              ? 'mt-2 h-2 w-2 flex-none animate-pulse rounded-full bg-neutral-950'
              : isSuccess
                ? 'mt-2 h-2 w-2 flex-none rounded-full bg-emerald-500'
                : 'mt-2 h-2 w-2 flex-none rounded-full bg-red-500'
          }
          aria-hidden="true"
        />
        <p>{message}</p>
      </div>
    </div>
  )
}


function getErrorMessage(status) {
  switch (status) {
    case 400:
      return 'One of the fields was invalid. Please check your details or email solutions@embeddings.au.'
    case 429:
      return 'Too many submissions were received. Please email solutions@embeddings.au and we’ll respond directly.'
    default:
      return 'Your message could not be sent. Please email solutions@embeddings.au and we’ll respond directly.'
  }
}


export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({
    status: 'idle',
    message: '',
  })

  async function handleSubmit(event) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    setIsSubmitting(true)
    setSubmitStatus({
      status: 'loading',
      message: 'Sending your message...',
    })

    track('Contact Form Submit Attempted', {
      form_type: 'business_enquiry',
      timestamp: new Date().toISOString(),
    })

    // Capture only field-completion metadata so analytics never stores message
    // content, phone numbers, or email addresses.
    const formDataObject = {
      has_name: !!formData.get('name'),
      has_email: !!formData.get('email'),
      has_company: !!formData.get('company'),
      has_phone: !!formData.get('phone'),
      has_message: !!formData.get('message'),
      budget_range: formData.get('budget'),
      form_fields_completed: Array.from(formData.keys()).filter(
        (key) => !['_gotcha', '_subject', '_next'].includes(key),
      ).length,
    }

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(getErrorMessage(response.status))
      }

      setSubmitStatus({
        status: 'success',
        message: 'Message sent. We’ll get back to you soon.',
      })
      form.reset()

      track('Contact Form Submitted Successfully', {
        form_type: 'business_enquiry',
        ...formDataObject,
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      const isNetworkFailure =
        error instanceof TypeError || error.message === 'Failed to fetch'
      const errorMessage = isNetworkFailure
        ? getErrorMessage()
        : error.message || getErrorMessage()

      setSubmitStatus({
        status: 'error',
        message: errorMessage,
      })

      track('Contact Form Submission Failed', {
        form_type: 'business_enquiry',
        error_message: errorMessage,
        timestamp: new Date().toISOString(),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleFieldFocus(fieldName) {
    track('Contact Form Field Focused', {
      field_name: fieldName,
      form_type: 'business_enquiry',
    })
  }

  return (
    <FadeIn className="lg:order-last">
      <form
        action="https://formspree.io/f/xrbgdgwq"
        method="POST"
        onSubmit={handleSubmit}
      >
        <h2 className="font-display text-base font-semibold text-neutral-950">
          business enquiries
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-6 text-neutral-600">
          Share the essentials and we’ll respond with the right next step.
        </p>

        <input
          type="hidden"
          name="_subject"
          value="New business enquiry from embeddings.au"
        />
        <input
          type="hidden"
          name="_next"
          value="https://embeddings.au/thank-you"
        />
        <input
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
        />

        <div className="isolate mt-8 -space-y-px rounded-2xl bg-white/50">
          <TextInput
            label="Name"
            name="name"
            autoComplete="name"
            required
            onFocus={() => handleFieldFocus('name')}
          />
          <TextInput
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            required
            onFocus={() => handleFieldFocus('email')}
          />
          <TextInput
            label="Company"
            name="company"
            autoComplete="organization"
            required
            onFocus={() => handleFieldFocus('company')}
          />
          <TextInput
            label="Phone"
            type="tel"
            name="phone"
            autoComplete="tel"
            required
            onFocus={() => handleFieldFocus('phone')}
          />
          <TextInput
            label="Message"
            name="message"
            required
            multiline
            rows={3}
            onFocus={() => handleFieldFocus('message')}
          />
          <div className="border border-neutral-300 px-6 py-8 first:rounded-t-2xl last:rounded-b-2xl">
            <fieldset>
              <legend className="text-base/6 text-neutral-500">Budget</legend>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {budgetRanges.map(({ label, trackingValue, value }) => (
                  <RadioInput
                    key={value}
                    label={label}
                    name="budget"
                    value={value}
                    required
                    onChange={() =>
                      track('Contact Form Budget Selected', {
                        budget_range: trackingValue,
                        form_type: 'business_enquiry',
                      })
                    }
                  />
                ))}
              </div>
            </fieldset>
          </div>
        </div>

        <StatusPanel
          status={submitStatus.status}
          message={submitStatus.message}
        />

        <Button type="submit" className="mt-10" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send message'}
        </Button>
      </form>
    </FadeIn>
  )
}
