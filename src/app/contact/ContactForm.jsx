'use client'

import { useId, useRef, useState } from 'react'
import clsx from 'clsx'
import { Button } from '@/components/Button'
import { FadeIn } from '@/components/FadeIn'

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

const fieldOrder = ['name', 'email', 'company', 'phone', 'message', 'budget']

const fieldLabels = {
  name: 'Name',
  email: 'Email',
  company: 'Company',
  phone: 'Phone',
  message: 'Message',
  budget: 'Budget',
}

const requiredMessages = {
  name: 'Enter your name.',
  email: 'Enter your email address.',
  company: 'Enter your company name.',
  phone: 'Enter your phone number.',
  message: 'Add a short message.',
  budget: 'Select the closest planning range.',
}

function isBlank(value) {
  return typeof value !== 'string' || value.trim().length === 0
}

function validateFormData(formData) {
  const errors = {}

  for (const fieldName of fieldOrder) {
    if (isBlank(formData.get(fieldName))) {
      errors[fieldName] = requiredMessages[fieldName]
    }
  }

  const email = String(formData.get('email') || '').trim()

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email address.'
  }

  return errors
}


function trackContactEvent(eventName, properties) {
  // Load analytics only after a visitor interacts with the form, keeping the
  // contact route’s first client chunk focused on validation and submission UI.
  void import('@/lib/mixpanelClient')
    .then(({ track }) => {
      track(eventName, properties)
    })
    .catch((error) => {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Contact analytics failed to load:', error)
      }
    })
}


function focusFirstInvalidField(form, fieldName) {
  const field = form.elements.namedItem(fieldName)

  if (field instanceof HTMLElement) {
    field.focus()
    return
  }

  field?.[0]?.focus()
}

function ErrorSummary({ errors }) {
  const entries = fieldOrder
    .filter((fieldName) => errors[fieldName])
    .map((fieldName) => [fieldName, errors[fieldName]])

  if (entries.length === 0) {
    return null
  }

  return (
    <div
      id="contact-error-summary"
      role="alert"
      className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 shadow-sm"
    >
      <p className="font-semibold text-red-800">
        Fix these details before sending.
      </p>
      <ul className="mt-3 space-y-1.5">
        {entries.map(([fieldName, message]) => (
          <li key={fieldName}>
            <a
              href={`#${fieldName}-field`}
              className="font-medium underline decoration-red-300 underline-offset-2 hover:text-red-900"
            >
              {fieldLabels[fieldName]}:
            </a>{' '}
            <span>{message}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function TextInput({ label, error, multiline = false, rows = 3, ...props }) {
  const generatedId = useId()
  const id = props.id ?? generatedId
  const errorId = `${id}-error`

  const sharedClasses = clsx(
    'peer block w-full border bg-transparent px-6 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:outline-none group-first:rounded-t-2xl group-last:rounded-b-2xl',
    error
      ? 'border-red-300 bg-red-50/40 focus:border-red-600 focus:ring-red-600/10 group-last:rounded-b-none'
      : 'border-neutral-300 focus:border-neutral-950 focus:ring-neutral-950/5',
  )
  const inputClasses = clsx(sharedClasses, 'pb-4 pt-12')
  const textareaClasses = clsx(
    sharedClasses,
    'resize-none pt-12',
    'pb-3',
  )

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
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? errorId : undefined}
          className={textareaClasses}
        />
      ) : (
        <input
          type="text"
          id={id}
          {...props}
          placeholder=" "
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? errorId : undefined}
          className={inputClasses}
        />
      )}
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
      {error && (
        <p
          id={errorId}
          className="-mt-px border-x border-b border-red-300 bg-red-50 px-6 pb-3 pt-2 text-sm font-medium text-red-700 group-last:rounded-b-2xl"
        >
          {error}
        </p>
      )}
    </div>
  )
}

function RadioInput({ id, label, invalid = false, ...props }) {
  return (
    <label
      htmlFor={id}
      className={clsx(
        'flex min-h-14 items-center gap-x-3 rounded-2xl border px-3 py-3 transition hover:bg-neutral-950/[0.03] has-[:checked]:border-neutral-950/20 has-[:checked]:bg-neutral-950/[0.05] has-[:checked]:shadow-sm has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-60',
        invalid ? 'border-red-200 bg-red-50/50' : 'border-transparent',
      )}
    >
      <input
        id={id}
        type="radio"
        {...props}
        className={clsx(
          'h-6 w-6 flex-none appearance-none rounded-full border outline-none transition checked:border-[0.45rem] checked:border-neutral-950 focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:ring-offset-2',
          invalid ? 'border-red-400' : 'border-neutral-950/20',
        )}
      />
      <span className="text-base/6 text-neutral-950">{label}</span>
    </label>
  )
}

function StatusPanel({ status, message, panelRef }) {
  if (status === 'idle') {
    return null
  }

  const isError = status === 'error'
  const isSuccess = status === 'success'

  return (
    <div
      ref={panelRef}
      role={isError ? 'alert' : 'status'}
      aria-live={isError ? 'assertive' : 'polite'}
      tabIndex={-1}
      className={
        isError
          ? 'mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 shadow-sm'
          : isSuccess
            ? 'mt-6 rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-emerald-50 px-5 py-5 text-sm text-emerald-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/40'
            : 'mt-6 overflow-hidden rounded-2xl border border-neutral-950/10 bg-white px-5 py-4 text-sm text-neutral-700 shadow-sm'
      }
    >
      <div className="flex items-start gap-3">
        <span
          className={
            status === 'loading'
              ? 'mt-1.5 h-3 w-3 flex-none animate-spin rounded-full border-2 border-neutral-950/20 border-t-neutral-950'
              : isSuccess
                ? 'grid h-8 w-8 flex-none place-items-center rounded-full bg-emerald-600 text-white shadow-sm'
                : 'mt-2 h-2 w-2 flex-none rounded-full bg-red-500'
          }
          aria-hidden="true"
        >
          {isSuccess && (
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.25 7.31a1 1 0 0 1-1.42 0L3.29 9.225a1 1 0 1 1 1.42-1.408l4.04 4.07 6.54-6.59a1 1 0 0 1 1.414-.006Z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </span>
        <div>
          {isSuccess && (
            <p className="font-display text-lg font-semibold tracking-tight text-emerald-950">
              Message sent
            </p>
          )}
          <p className={isSuccess ? 'mt-1 text-emerald-800' : undefined}>
            {message}
          </p>
        </div>
      </div>
      {status === 'loading' && (
        <div
          className="mt-4 h-1 overflow-hidden rounded-full bg-neutral-950/10"
          aria-hidden="true"
        >
          <div className="h-full w-1/2 animate-[shimmerBorder_1.5s_ease-in-out_infinite] rounded-full bg-neutral-950" />
        </div>
      )}
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
  const statusPanelRef = useRef(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})
  const [submitStatus, setSubmitStatus] = useState({
    status: 'idle',
    message: '',
  })
  const hasFieldErrors = Object.values(fieldErrors).some(Boolean)
  const isSuccess = submitStatus.status === 'success'

  function handleFieldBlur(fieldName, event) {
    const form = event.currentTarget.form

    if (!form) {
      return
    }

    const errors = validateFormData(new FormData(form))

    setFieldErrors((currentErrors) => ({
      ...currentErrors,
      [fieldName]: errors[fieldName],
    }))
  }

  function handleBudgetChange(trackingValue) {
    setFieldErrors((currentErrors) => ({
      ...currentErrors,
      budget: undefined,
    }))

    trackContactEvent('Contact Form Budget Selected', {
      budget_range: trackingValue,
      form_type: 'business_enquiry',
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const validationErrors = validateFormData(formData)
    const firstInvalidField = fieldOrder.find(
      (fieldName) => validationErrors[fieldName],
    )

    if (firstInvalidField) {
      setFieldErrors(validationErrors)
      setSubmitStatus({ status: 'idle', message: '' })

      trackContactEvent('Contact Form Validation Failed', {
        form_type: 'business_enquiry',
        error_fields: Object.keys(validationErrors),
        timestamp: new Date().toISOString(),
      })

      focusFirstInvalidField(form, firstInvalidField)
      return
    }

    setIsSubmitting(true)
    setFieldErrors({})
    setSubmitStatus({
      status: 'loading',
      message: 'Sending your message...',
    })

    trackContactEvent('Contact Form Submit Attempted', {
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
      setFieldErrors({})
      window.setTimeout(() => {
        statusPanelRef.current?.focus({ preventScroll: true })
      })

      trackContactEvent('Contact Form Submitted Successfully', {
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

      trackContactEvent('Contact Form Submission Failed', {
        form_type: 'business_enquiry',
        error_message: errorMessage,
        timestamp: new Date().toISOString(),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleSendAnotherMessage() {
    setSubmitStatus({ status: 'idle', message: '' })
    setFieldErrors({})
  }

  return (
    <FadeIn className="lg:order-last">
      <form
        action="https://formspree.io/f/xrbgdgwq"
        method="POST"
        onSubmit={handleSubmit}
        noValidate
        aria-busy={isSubmitting ? 'true' : 'false'}
        aria-describedby={
          hasFieldErrors
            ? 'contact-form-guidance contact-error-summary'
            : 'contact-form-guidance'
        }
      >
        <h2 className="font-display text-base font-semibold text-neutral-950">
          business enquiries
        </h2>
        <p
          id="contact-form-guidance"
          className="mt-4 max-w-xl text-sm leading-6 text-neutral-600"
        >
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

        {!isSuccess && (
          <fieldset
            disabled={isSubmitting}
            className="mt-8 transition-opacity disabled:opacity-70"
          >
            <legend className="sr-only">Business enquiry details</legend>
            <ErrorSummary errors={fieldErrors} />
            <div className="isolate -space-y-px rounded-2xl bg-white/50 shadow-[0_1px_0_rgba(23,23,23,0.04)]">
              <TextInput
                id="name-field"
                label="Name"
                name="name"
                autoComplete="name"
                required
                error={fieldErrors.name}
                onBlur={(event) => handleFieldBlur('name', event)}
              />
              <TextInput
                id="email-field"
                label="Email"
                type="email"
                name="email"
                autoComplete="email"
                required
                error={fieldErrors.email}
                onBlur={(event) => handleFieldBlur('email', event)}
              />
              <TextInput
                id="company-field"
                label="Company"
                name="company"
                autoComplete="organization"
                required
                error={fieldErrors.company}
                onBlur={(event) => handleFieldBlur('company', event)}
              />
              <TextInput
                id="phone-field"
                label="Phone"
                type="tel"
                name="phone"
                autoComplete="tel"
                required
                error={fieldErrors.phone}
                onBlur={(event) => handleFieldBlur('phone', event)}
              />
              <TextInput
                id="message-field"
                label="Message"
                name="message"
                required
                multiline
                rows={3}
                error={fieldErrors.message}
                onBlur={(event) => handleFieldBlur('message', event)}
              />
              <div
                className={clsx(
                  'border px-6 py-8 first:rounded-t-2xl last:rounded-b-2xl',
                  fieldErrors.budget
                    ? 'border-red-300 bg-red-50/40'
                    : 'border-neutral-300',
                )}
              >
                <fieldset
                  aria-invalid={fieldErrors.budget ? 'true' : undefined}
                  aria-describedby={
                    fieldErrors.budget ? 'budget-error' : undefined
                  }
                >
                  <legend className="text-base/6 text-neutral-500">
                    Budget
                  </legend>
                  <p className="mt-2 text-sm leading-6 text-neutral-500">
                    Select the closest planning range.
                  </p>
                  {fieldErrors.budget && (
                    <p
                      id="budget-error"
                      className="mt-3 text-sm font-medium text-red-600"
                    >
                      {fieldErrors.budget}
                    </p>
                  )}
                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {budgetRanges.map(
                      ({ label, trackingValue, value }, index) => (
                        <RadioInput
                          key={value}
                          id={index === 0 ? 'budget-field' : undefined}
                          label={label}
                          name="budget"
                          value={value}
                          required
                          invalid={Boolean(fieldErrors.budget)}
                          onChange={() => handleBudgetChange(trackingValue)}
                        />
                      ),
                    )}
                  </div>
                </fieldset>
              </div>
            </div>
          </fieldset>
        )}

        <StatusPanel
          status={submitStatus.status}
          message={submitStatus.message}
          panelRef={statusPanelRef}
        />

        {isSuccess ? (
          <Button type="button" className="mt-8" onClick={handleSendAnotherMessage}>
            Send another message
          </Button>
        ) : (
          <Button
            type="submit"
            className="mt-10 min-w-36"
            disabled={isSubmitting}
            trackingLabel="Send message"
          >
            <span className="inline-flex items-center gap-2">
              {isSubmitting && (
                <span
                  className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white"
                  aria-hidden="true"
                />
              )}
              {isSubmitting ? 'Sending' : 'Send message'}
            </span>
          </Button>
        )}
      </form>
    </FadeIn>
  )
}
