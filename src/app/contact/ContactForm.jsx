'use client'

import { useId, useState } from 'react'
import { Button } from '@/components/Button'
import { FadeIn } from '@/components/FadeIn'
import { track } from '@/lib/mixpanelClient'

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

// Error message mapping for better user feedback
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

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ success: false, error: null })

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ success: false, error: null })

    // Track form submission attempt
    track('Contact Form Submit Attempted', {
      form_type: 'business_enquiry',
      timestamp: new Date().toISOString()
    })

    try {
      const formData = new FormData(event.target)
      
      // Extract form data for tracking
      const formDataObject = {
        has_name: !!formData.get('name'),
        has_email: !!formData.get('email'),
        has_company: !!formData.get('company'),
        has_phone: !!formData.get('phone'),
        has_message: !!formData.get('message'),
        budget_range: formData.get('budget'),
        form_fields_completed: Array.from(formData.keys()).filter(key => key !== '_gotcha' && key !== '_subject' && key !== '_next').length
      }
      
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
        
        // Track successful submission with form details
        track('Contact Form Submitted Successfully', {
          form_type: 'business_enquiry',
          ...formDataObject,
          timestamp: new Date().toISOString()
        })
      } else {
        throw new Error(getErrorMessage(response.status))
      }
    } catch (error) {
      setSubmitStatus({ success: false, error: error.message })
      
      // Track failed submission
      track('Contact Form Submission Failed', {
        form_type: 'business_enquiry',
        error_message: error.message,
        timestamp: new Date().toISOString()
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Track form focus events
  const handleFieldFocus = (fieldName) => {
    track('Contact Form Field Focused', {
      field_name: fieldName,
      form_type: 'business_enquiry'
    })
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
            multiline={true}
            rows={3}
            onFocus={() => handleFieldFocus('message')}
          />
          <div className="border border-neutral-300 px-6 py-8 first:rounded-t-2xl last:rounded-b-2xl">
            <fieldset>
              <legend className="text-base/6 text-neutral-500">Budget</legend>
              <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
                <RadioInput
                  label="Less than 100k"
                  name="budget" 
                  value="100" 
                  required 
                  onChange={() => track('Contact Form Budget Selected', { budget_range: '0-100k' })}
                />
                <RadioInput 
                  label="$100K – $500K" 
                  name="budget" 
                  value="500" 
                  onChange={() => track('Contact Form Budget Selected', { budget_range: '100k-500k' })}
                />
                <RadioInput 
                  label="$500K – $1M" 
                  name="budget" 
                  value="1000" 
                  onChange={() => track('Contact Form Budget Selected', { budget_range: '500k-1m' })}
                />
                <RadioInput 
                  label="More than $1M" 
                  name="budget" 
                  value="1500" 
                  onChange={() => track('Contact Form Budget Selected', { budget_range: '1m+' })}
                />
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