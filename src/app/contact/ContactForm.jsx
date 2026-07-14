'use client'

import { useEffect, useId, useRef, useState } from 'react'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/Button'
import { FadeIn } from '@/components/FadeIn'

const FIELD_ERROR_STAGGER_SECONDS = 0.09

const contextualPanelVariants = {
  initial: {
    opacity: 0,
    y: 12,
    filter: 'blur(4px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: 'blur(4px)',
    transition: { duration: 0.15, ease: [0.4, 0, 1, 1] },
  },
}

const contextualIconVariants = {
  initial: {
    opacity: 0,
    scale: 0.25,
    filter: 'blur(4px)',
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
  },
  exit: {
    opacity: 0,
    scale: 0.25,
    filter: 'blur(4px)',
  },
}

const contextualIconTransition = {
  type: 'spring',
  duration: 0.3,
  bounce: 0,
}

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
    <motion.div
      id="contact-error-summary"
      role="alert"
      variants={contextualPanelVariants}
      initial="initial"
      animate="animate"
      exit="exit"
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
              className="inline-flex min-h-11 min-w-11 items-center font-medium underline decoration-red-300 underline-offset-2 transition-colors hover:text-red-900 sm:min-h-10 sm:min-w-10"
            >
              {fieldLabels[fieldName]}:
            </a>{' '}
            <span>{message}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

function TextInput({
  label,
  error,
  errorIndex = 0,
  multiline = false,
  rows = 3,
  ...props
}) {
  const generatedId = useId()
  const id = props.id ?? generatedId
  const errorId = `${id}-error`

  const sharedClasses = clsx(
    'peer block w-full border bg-transparent px-6 text-base/6 text-neutral-950 ring-4 ring-transparent transition-[border-color,background-color,box-shadow] duration-200 focus:outline-none group-first:rounded-t-2xl group-last:rounded-b-2xl',
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
    ? 'pointer-events-none absolute left-6 top-8 origin-left text-base/6 text-neutral-500 transition-[top,transform,color] duration-200 peer-focus:top-2 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950'
    : 'pointer-events-none absolute left-6 top-1/2 -mt-3 origin-left text-base/6 text-neutral-500 transition-[transform,color] duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950'

  return (
    <div className="group relative z-0 focus-within:z-10">
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
      <AnimatePresence initial={false}>
        {error ? (
          <motion.p
            key={errorId}
            id={errorId}
            initial={{ opacity: 0, y: 6 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.3,
                delay: errorIndex * FIELD_ERROR_STAGGER_SECONDS,
              },
            }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
            className="-mt-px border-x border-b border-red-300 bg-red-50 px-6 pb-3 pt-2 text-sm font-medium text-red-700 group-last:rounded-b-2xl"
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

function RadioInput({ id, label, invalid = false, ...props }) {
  return (
    <label
      htmlFor={id}
      className={clsx(
        'flex min-h-14 items-center gap-x-3 rounded-2xl border px-3 py-3 transition-[transform,border-color,background-color,box-shadow] duration-200 ease-out hover:bg-neutral-950/[0.03] active:scale-[0.96] has-[:disabled]:scale-100 has-[:disabled]:cursor-not-allowed has-[:checked]:border-neutral-950/20 has-[:checked]:bg-neutral-950/[0.05] has-[:disabled]:opacity-60 has-[:checked]:shadow-sm',
        invalid ? 'border-red-200 bg-red-50/50' : 'border-transparent',
      )}
    >
      <input
        id={id}
        type="radio"
        {...props}
        className={clsx(
          'h-6 w-6 flex-none appearance-none rounded-full border outline-none transition-[border-width,border-color,box-shadow] duration-200 checked:border-[0.45rem] checked:border-neutral-950 focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:ring-offset-2',
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
    <motion.div
      ref={panelRef}
      role={isError ? 'alert' : 'status'}
      aria-live={isError ? 'assertive' : 'polite'}
      tabIndex={-1}
      variants={contextualPanelVariants}
      initial="initial"
      animate="animate"
      exit="exit"
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
    </motion.div>
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
  const [selectedBudget, setSelectedBudget] = useState('')
  const [submitStatus, setSubmitStatus] = useState({
    status: 'idle',
    message: '',
  })
  const hasFieldErrors = Object.values(fieldErrors).some(Boolean)
  const isSuccess = submitStatus.status === 'success'

  useEffect(() => {
    if (isSuccess) {
      statusPanelRef.current?.focus({ preventScroll: true })
    }
  }, [isSuccess])

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

  function handleBudgetChange(trackingValue, value) {
    // Keep the selected radio controlled when clearing its validation state so
    // React preserves the visitor’s choice across the resulting re-render.
    setSelectedBudget(value)
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
      setSelectedBudget('')
      setFieldErrors({})

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
    setSelectedBudget('')
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
            <AnimatePresence initial={false}>
              {hasFieldErrors ? (
                <ErrorSummary
                  key="contact-error-summary"
                  errors={fieldErrors}
                />
              ) : null}
            </AnimatePresence>
            <div className="isolate -space-y-px rounded-2xl bg-white/50 shadow-[0_1px_0_rgba(23,23,23,0.04)]">
              <TextInput
                id="name-field"
                label="Name"
                name="name"
                autoComplete="name"
                required
                error={fieldErrors.name}
                errorIndex={0}
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
                errorIndex={1}
                onBlur={(event) => handleFieldBlur('email', event)}
              />
              <TextInput
                id="company-field"
                label="Company"
                name="company"
                autoComplete="organization"
                required
                error={fieldErrors.company}
                errorIndex={2}
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
                errorIndex={3}
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
                errorIndex={4}
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
                  <AnimatePresence initial={false}>
                    {fieldErrors.budget ? (
                      <motion.p
                        key="budget-error"
                        id="budget-error"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.3,
                            delay: 5 * FIELD_ERROR_STAGGER_SECONDS,
                          },
                        }}
                        exit={{
                          opacity: 0,
                          y: -6,
                          transition: { duration: 0.15 },
                        }}
                        className="mt-3 text-sm font-medium text-red-600"
                      >
                        {fieldErrors.budget}
                      </motion.p>
                    ) : null}
                  </AnimatePresence>
                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {budgetRanges.map(
                      ({ label, trackingValue, value }, index) => (
                        <RadioInput
                          key={value}
                          id={
                            index === 0
                              ? 'budget-field'
                              : `budget-field-${value}`
                          }
                          label={label}
                          name="budget"
                          value={value}
                          checked={selectedBudget === value}
                          required
                          invalid={Boolean(fieldErrors.budget)}
                          onChange={() =>
                            handleBudgetChange(trackingValue, value)
                          }
                        />
                      ),
                    )}
                  </div>
                </fieldset>
              </div>
            </div>
          </fieldset>
        )}

        <AnimatePresence initial={false}>
          {submitStatus.status !== 'idle' ? (
            <StatusPanel
              key={submitStatus.status}
              status={submitStatus.status}
              message={submitStatus.message}
              panelRef={statusPanelRef}
            />
          ) : null}
        </AnimatePresence>

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
              <AnimatePresence initial={false}>
                {isSubmitting ? (
                  <motion.span
                    key="submit-spinner"
                    className="inline-flex"
                    variants={contextualIconVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={contextualIconTransition}
                    aria-hidden="true"
                  >
                    <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  </motion.span>
                ) : null}
              </AnimatePresence>
              {isSubmitting ? 'Sending' : 'Send message'}
            </span>
          </Button>
        )}
      </form>
    </FadeIn>
  )
}
