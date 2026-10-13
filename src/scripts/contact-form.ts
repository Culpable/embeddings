import { site } from '../config/site'

const order = ['name', 'email', 'company', 'phone', 'message', 'budget'] as const
const required: Record<string, string> = { name: 'Enter your name.', email: 'Enter your email address.', company: 'Enter your company name.', phone: 'Enter your phone number.', message: 'Add a short message.', budget: 'Select the closest planning range.' }

interface ChallengeWindow extends Window { turnstile?: { reset: () => void } }
interface AgentSubmit extends SubmitEvent { agentInvoked?: boolean; respondWith?: (result: Promise<{ content: { type: string; text: string }[] }>) => void }


/** Enhance the native form only after mounting, keeping explicit submission and safe retry. */
export function initialiseContactForm() {
  const form = document.querySelector<HTMLFormElement>('[data-contact-form]')
  if (!form || form.dataset.enhanced) return
  form.dataset.enhanced = 'true'; form.noValidate = true
  const details = form.querySelector<HTMLFieldSetElement>('[data-enquiry-details]')!
  const status = form.querySelector<HTMLElement>('[data-contact-status]')!
  const submit = form.querySelector<HTMLButtonElement>('[data-submit]')!
  const another = form.querySelector<HTMLButtonElement>('[data-send-another]')!
  const summary = form.querySelector<HTMLElement>('#contact-error-summary')!
  const win = window as ChallengeWindow
  let pending = false, submissionId = '', fingerprint = ''
  let pointerActive = false
  let pendingBlur: (() => void) | undefined
  // Finish pointer selection before changing error geometry beneath the focused field.
  form.addEventListener('pointerdown', () => { pointerActive = true })
  window.addEventListener('pointerup', () => { pointerActive = false; if (pendingBlur) { const update = pendingBlur; pendingBlur = undefined; window.setTimeout(update, 0) } })
  const track = (eventName: string, properties: Record<string, unknown> = {}) => window.dispatchEvent(new CustomEvent('embeddings:analytics-event', { detail: { eventName, properties: { form_type: 'business_enquiry', ...properties, timestamp: new Date().toISOString() } } }))

  function focusField(name: string) { form!.querySelector<HTMLElement>(`[name="${name}"]`)?.focus() }

  function showErrors(errors: Record<string, string>) {
    for (const name of order) {
      const element = form!.querySelector<HTMLElement>(`[data-field-error="${name}"]`)!
      element.hidden = !errors[name]; element.textContent = errors[name] ?? ''
      if (errors[name]) { element.style.animation = 'contact-field-enter 300ms ease-out both'; element.style.animationDelay = `${order.indexOf(name) * 0.09}s` }
      for (const control of form!.querySelectorAll<HTMLElement>(`[name="${name}"]`)) {
        if (name !== 'budget') {
          for (const token of ['border-red-300', 'bg-red-50/40', 'focus:border-red-600', 'focus:ring-red-600/10']) control.classList.toggle(token, Boolean(errors[name]))
          for (const token of ['border-neutral-300', 'focus:border-neutral-950', 'focus:ring-neutral-950/5']) control.classList.toggle(token, !errors[name])
        }
        if (errors[name]) { control.setAttribute('aria-invalid', 'true'); control.setAttribute('aria-describedby', element.id) }
        else { control.removeAttribute('aria-invalid'); control.removeAttribute('aria-describedby') }
      }
    }
    const list = form!.querySelector<HTMLElement>('[data-error-list]')!
    list.replaceChildren()
    for (const name of order) if (errors[name]) {
      const li = document.createElement('li'), a = document.createElement('a')
      a.href = `#${name}-field`; a.textContent = `${name[0].toUpperCase() + name.slice(1)}: `; a.className = 'inline-flex min-h-11 items-center font-medium underline'
      a.addEventListener('click', event => { event.preventDefault(); focusField(name) })
      li.append(a, document.createTextNode(' ' + errors[name])); list.append(li)
    }
    summary.hidden = !list.children.length
    form!.setAttribute('aria-describedby', summary.hidden ? 'contact-form-guidance' : 'contact-form-guidance contact-error-summary')
  }

  function showStatus(state: 'loading' | 'success' | 'error', message: string) {
    status.hidden = false; status.setAttribute('role', state === 'error' ? 'alert' : 'status'); status.setAttribute('aria-live', state === 'error' ? 'assertive' : 'polite')
    const messageNode = status.querySelector<HTMLElement>('[data-status-message]')!
    messageNode.textContent = message; messageNode.className = state === 'success' ? 'mt-1 text-emerald-800' : ''
    status.querySelector<HTMLElement>('[data-status-heading]')!.hidden = state !== 'success'
    status.querySelector<SVGElement>('[data-status-check]')!.style.display = state === 'success' ? '' : 'none'
    status.querySelector<SVGElement>('[data-status-check]')!.toggleAttribute('hidden', state !== 'success')
    status.querySelector<HTMLElement>('[data-status-progress]')!.hidden = state !== 'loading'
    status.querySelector<HTMLElement>('[data-status-icon]')!.className = state === 'loading' ? 'mt-1.5 h-3 w-3 flex-none animate-spin rounded-full border-2 border-neutral-950/20 border-t-neutral-950' : state === 'success' ? 'grid h-8 w-8 flex-none place-items-center rounded-full bg-emerald-600 text-white shadow-sm' : 'mt-2 h-2 w-2 flex-none rounded-full bg-red-500'
    status.dataset.state = state; status.style.animation = 'contact-panel-enter 300ms cubic-bezier(0.22,1,0.36,1) both'
    status.className = state === 'success' ? 'mt-6 rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-emerald-50 px-5 py-5 text-sm text-emerald-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/40' : state === 'error' ? 'mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 shadow-sm' : 'mt-6 rounded-2xl border border-neutral-950/10 bg-white px-5 py-4 text-sm text-neutral-700 shadow-sm'
    if (state === 'success') status.focus({ preventScroll: true })
  }

  function validate(data: FormData) {
    const errors: Record<string, string> = {}
    for (const name of order) {
      const value=String(data.get(name)??'').trim(), control=form!.querySelector<HTMLInputElement|HTMLTextAreaElement>(`[name="${name}"]`)
      if (!value) errors[name]=required[name]
      else if (control?.maxLength && control.maxLength > 0 && value.length > control.maxLength) errors[name]=`Use no more than ${control.maxLength} characters.`
    }
    if (data.get('email') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(String(data.get('email')).trim())) errors.email='Enter a valid email address.'
    return errors
  }

  const resetChallenge = () => { win.turnstile?.reset(); const token=form!.querySelector<HTMLInputElement>('[name="cf-turnstile-response"]'); if(token)token.value='' }
  // Leave implicit Turnstile independent of enhancement callbacks so native POST stays usable.
  // Validate its current token at submission and let the server reject expiry/replay.
  form.addEventListener('focusout', event => {
    const control = event.target as HTMLInputElement
    if (!order.includes(control.name as typeof order[number])) return
    const update = () => {
      // Ignore a queued blur once submission disables the controls; disabled fields leave FormData.
      if (pending || details.disabled) return
      const errors = validate(new FormData(form)), existing: Record<string, string> = {}
      for (const name of order) {
        const node = form.querySelector<HTMLElement>(`[data-field-error="${name}"]`)!
        if (!node.hidden) existing[name] = node.textContent ?? ''
      }
      delete existing[control.name]
      if (errors[control.name]) existing[control.name] = errors[control.name]
      showErrors(existing)
    }
    if (pointerActive) pendingBlur = update
    else update()
  })
  form.addEventListener('change', event => { const radio=event.target as HTMLInputElement; if(radio.name==='budget')track('Contact Form Budget Selected',{budget_range:radio.dataset.tracking}) })
  form.addEventListener('submit', async event => {
    event.preventDefault()
    if (pending) return
    const agent = event as AgentSubmit, data = new FormData(form), errors=validate(data)
    if (Object.keys(errors).length) { showErrors(errors); status.hidden=true; focusField(order.find(name=>errors[name])!); track('Contact Form Validation Failed',{error_fields:Object.keys(errors)}); agent.respondWith?.(Promise.resolve({content:[{type:'text',text:'The enquiry needs the highlighted fields.'}]})); return }
    if (!data.get('cf-turnstile-response')) { showStatus('error',`Complete the security check, or email ${site.publicEmail}.`); return }
    const content = JSON.stringify(order.map(name=>String(data.get(name)).trim().replace(/\r\n?/g,'\n')))
    if(content!==fingerprint) { fingerprint=content; submissionId=crypto.randomUUID() }
    data.set('submissionId',submissionId)
    pending=true; form.querySelector<HTMLElement>('[data-submit-label]')!.textContent='Sending'; form.querySelector<HTMLElement>('[data-submit-spinner]')!.hidden=false; showErrors({}); details.disabled=true; submit.disabled=true; form.setAttribute('aria-busy','true'); showStatus('loading','Sending your message...'); track('Contact Form Submit Attempted')
    const delivery=(async()=>{
      let message='', failureMessage=`Delivery could not be confirmed. Please try again or email ${site.publicEmail}.`
      try {
        const response=await fetch(form.action,{method:'POST',body:data,headers:{Accept:'application/json'},signal:AbortSignal.timeout(20000)})
        const body=await response.json() as {ok?:boolean;errors?:Record<string,string>}
        if(!response.ok||body.ok!==true) { if(body.errors)showErrors(body.errors); if(response.status===422) failureMessage='Check the highlighted details and complete the security check again.'; throw new Error('delivery') }
        message='Message sent. We’ll get back to you soon.'; showStatus('success',message); details.hidden=true; submit.hidden=true; another.hidden=false
        track('Contact Form Submitted Successfully',{has_name:true,has_email:true,has_company:true,has_phone:true,has_message:true,budget_range:data.get('budget'),form_fields_completed:6})
        // Keep agent-prepared inputs intact until its invocation has resolved.
        if(!agent.agentInvoked)form.reset()
      } catch { message=failureMessage; showStatus('error',message); track('Contact Form Submission Failed',{error_message:message}); resetChallenge() }
      finally { form.querySelector<HTMLElement>('[data-submit-label]')!.textContent='Send message'; form.querySelector<HTMLElement>('[data-submit-spinner]')!.hidden=true; pending=false;details.disabled=false;submit.disabled=false;form.setAttribute('aria-busy','false') }
      return {content:[{type:'text',text:message}]}
    })()
    agent.respondWith?.(delivery)
    await delivery
  })
  another.addEventListener('click',()=>{form.reset();submissionId='';fingerprint='';status.hidden=true;details.hidden=false;submit.hidden=false;another.hidden=true;showErrors({});resetChallenge();window.setTimeout(() => focusField('name'), 0)})
  if(new URLSearchParams(location.search).has('error'))showStatus('error',`Delivery could not be confirmed. Please try again or email ${site.publicEmail}.`)
}
