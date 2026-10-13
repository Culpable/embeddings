import { initialiseNavigation } from './navigation'

// Install each document controller once. Ordinary navigation loads a fresh document.
initialiseNavigation()
if (document.querySelector('[data-contact-form]')) void import('./contact-form').then(module => module.initialiseContactForm())
if (location.hostname === 'embeddings.au') void import('../instrumentation-client.js')
