'use client'

import { useId, useState } from 'react'
import clsx from 'clsx'
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
      role="alert"
      className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 shadow-sm"
    >
      <p className="font-semibold text-red-800">Fix these details before sending.</p>
      <ul className="mt-3 space-y-1.5">
        {entries.map(([fieldName, message]) => (
          <li key={fieldName}>
            <span className="font-medium">{fieldLabels[fieldName]}:</span>{' '}
            {message}
          </li>
        ))}
      </ul>
    </div>
  )
}


function TextInput({ label, error, multiline = false, rows = 3, ...props }) {
  let id = useId()
  let errorId = `${id}-error`

  const sharedClasses = clsx(
    'peer block w-full border bg-transparent px-6 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:outline-none group-first:rounded-t-2xl group-last:rounded-b-2xl',
    error
      ? 'border-red-300 bg-red-50/40 focus:border-red-600 focus:ring-red-600/10'
      : 'border-neutral-300 focus:border-neutral-950 focus:ring-neutral-950/5',
  )
  const inputClasses = clsx(sharedClasses, error ? 'pb-8 pt-12' : 'pb-4 pt-12')
  const textareaClasses = clsx(
    sharedClasses,
    'resize-none pt-12',
    error ? 'pb-8' : 'pb-3',
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
        <p id={errorId} className="absolute bottom-2 left-6 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}


function RadioInput({ label, invalid = false, ...props }) {
  return (
    <label
      className={clsx(
        'flex gap-x-3 rounded-2xl border p-2 transition hover:bg-neutral-950/[0.03] has-[:checked]:border-neutral-950/10 has-[:checked]:bg-neutral-950/[0.04] has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-60',
        invalid ? 'border-red-200 bg-red-50/50' : 'border-transparent',
      )}
    >
      <input
        type="radio"
        {...props}
        className={clsx(
          'h-6 w-6 flex-none appearance-none rounded-full border outline-none transition checked:border-[0.5rem] checked:border-neutral-950 focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:ring-offset-2',
          invalid ? 'border-red-400' : 'border-neutral-950/20',
        )}
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
          ? 'mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 shadow-sm'
          : isSuccess
            ? 'mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-800 shadow-sm'
            : 'mt-6 overflow-hidden rounded-2xl border border-neutral-950/10 bg-white px-5 py-4 text-sm text-neutral-700 shadow-sm'
      }
    >
      <div className="flex items-start gap-3">
        <span
          className={
            status === 'loading'
              ? 'mt-1.5 h-3 w-3 flex-none animate-spin rounded-full border-2 border-neutral-950/20 border-t-neutral-950'
              : isSuccess
                ? 'mt-2 h-2 w-2 flex-none rounded-full bg-emerald-500'
                : 'mt-2 h-2 w-2 flex-none rounded-full bg-red-500'
          }
          aria-hidden="true"
        />
        <p>{message}</p>
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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})
  const [submitStatus, setSubmitStatus] = useState({
    status: 'idle',
    message: '',
  })

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

    track('Contact Form Budget Selected', {
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

      track('Contact Form Validation Failed', {
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
      setFieldErrors({})

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
        noValidate
        aria-busy={isSubmitting ? 'true' : 'false'}
        aria-describedby="contact-form-guidance"
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

        <fieldset
          disabled={isSubmitting}
          className="mt-8 transition-opacity disabled:opacity-70"
        >
          <legend className="sr-only">Business enquiry details</legend>
          <div className="isolate -space-y-px rounded-2xl bg-white/50 shadow-[0_1px_0_rgba(23,23,23,0.04)]">
            <TextInput
              label="Name"
              name="name"
              autoComplete="name"
              required
              error={fieldErrors.name}
              onFocus={() => handleFieldFocus('name')}
              onBlur={(event) => handleFieldBlur('name', event)}
            />
            <TextInput
              label="Email"
              type="email"
              name="email"
              autoComplete="email"
              required
              error={fieldErrors.email}
              onFocus={() => handleFieldFocus('email')}
              onBlur={(event) => handleFieldBlur('email', event)}
            />
            <TextInput
              label="Company"
              name="company"
              autoComplete="organization"
              required
              error={fieldErrors.company}
              onFocus={() => handleFieldFocus('company')}
              onBlur={(event) => handleFieldBlur('company', event)}
            />
            <TextInput
              label="Phone"
              type="tel"
              name="phone"
              autoComplete="tel"
              required
              error={fieldErrors.phone}
              onFocus={() => handleFieldFocus('phone')}
              onBlur={(event) => handleFieldBlur('phone', event)}
            />
            <TextInput
              label="Message"
              name="message"
              required
              multiline
              rows={3}
              error={fieldErrors.message}
              onFocus={() => handleFieldFocus('message')}
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
                aria-describedby={fieldErrors.budget ? 'budget-error' : undefined}
              >
                <legend className="text-base/6 text-neutral-500">Budget</legend>
                <p className="mt-2 text-sm leading-6 text-neutral-500">
                  Select the closest planning range.
                </p>
                {fieldErrors.budget && (
                  <p id="budget-error" className="mt-3 text-sm font-medium text-red-600">
                    {fieldErrors.budget}
                  </p>
                )}
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {budgetRanges.map(({ label, trackingValue, value }) => (
                    <RadioInput
                      key={value}
                      label={label}
                      name="budget"
                      value={value}
                      required
                      invalid={Boolean(fieldErrors.budget)}
                      onChange={() => handleBudgetChange(trackingValue)}
                    />
                  ))}
                </div>
              </fieldset>
            </div>
          </div>
        </fieldset>

        <StatusPanel
          status={submitStatus.status}
          message={submitStatus.message}
        />
        <ErrorSummary errors={fieldErrors} />

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
      </form>
    </FadeIn>
  )
}
