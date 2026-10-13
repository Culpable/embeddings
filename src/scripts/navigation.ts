/** Preserve modal focus, interrupted transitions and scroll position without hydration. */
export function initialiseNavigation() {
  const scope = document.querySelector<HTMLElement>('[data-navigation-scope]')
  const toggle = scope?.querySelector<HTMLButtonElement>('[data-menu-toggle]')
  const panel = scope?.querySelector<HTMLElement>('[data-navigation-panel]')
  const shell = document.querySelector<HTMLElement>('[data-page-shell]')
  if (!scope || !toggle || !panel || !shell) return
  const headerBackground = Array.from(document.querySelectorAll<HTMLElement>('header a')).filter(element => !scope.contains(element))
  const previousInert = new Map(headerBackground.map(element => [element, element.inert]))
  const menuIcon = toggle.querySelector<HTMLElement>('[data-menu-icon]')!
  const closeIcon = toggle.querySelector<HTMLElement>('[data-close-icon]')!
  let anchorTarget: HTMLElement | null = null
  let expanded = false, exitTimer = 0, savedOverflow = '', savedScroll = 0
  const shown = 'visible scale-100 opacity-100 blur-0', concealed = 'invisible scale-25 opacity-0 blur-[4px]'

  function finishClose() {
    if (expanded) return
    panel!.hidden = true
    scope!.removeAttribute('role'); scope!.removeAttribute('aria-modal'); scope!.removeAttribute('aria-label')
    shell!.inert = false
    for (const element of headerBackground) element.inert = previousInert.get(element) ?? false
    document.body.style.overflow = savedOverflow
    if (anchorTarget) {
      // Finish native same-page navigation after unlocking the document, without restoring the old scroll.
      anchorTarget.scrollIntoView({ block: 'start' })
      anchorTarget.setAttribute('tabindex', '-1')
      anchorTarget.focus({ preventScroll: true })
    } else { window.scrollTo(0, savedScroll); toggle!.focus({ preventScroll: true }) }
  }

  function setOpen(open: boolean) {
    clearTimeout(exitTimer)
    if (open) anchorTarget = null
    if (open && panel!.hidden) {
      savedOverflow = document.body.style.overflow; savedScroll = window.scrollY
      panel!.hidden = false
      // Flush only this approved menu transition's initial state before retargeting it.
      void panel!.offsetHeight
    }
    expanded = open
    toggle!.setAttribute('aria-expanded', String(open)); toggle!.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation')
    menuIcon.className = 'absolute inset-0 transition-[opacity,transform,filter,visibility] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ' + (open ? concealed : shown)
    closeIcon.className = 'absolute inset-0 transition-[opacity,transform,filter,visibility] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ' + (open ? shown : concealed)
    panel!.classList.toggle('translate-y-0', open); panel!.classList.toggle('opacity-100', open)
    panel!.classList.toggle('-translate-y-3', !open); panel!.classList.toggle('opacity-0', !open)
    panel!.classList.toggle('duration-300', open); panel!.classList.toggle('ease-out', open)
    panel!.classList.toggle('duration-150', !open); panel!.classList.toggle('ease-in', !open)
    if (open) {
      scope!.setAttribute('role', 'dialog'); scope!.setAttribute('aria-modal', 'true'); scope!.setAttribute('aria-label', 'Site navigation')
      shell!.inert = true; document.body.style.overflow = 'hidden'
      // Keep header links outside the modal unavailable to every input method as well.
      for (const element of headerBackground) element.inert = true
    } else exitTimer = window.setTimeout(finishClose, 160)
  }
  toggle.addEventListener('click', () => setOpen(!expanded))
  panel.addEventListener('click', event => {
    const link = (event.target as Element).closest<HTMLAnchorElement>('a')
    if (!link) return
    const destination = new URL(link.href)
    if (destination.origin === location.origin && destination.pathname === location.pathname && destination.hash) {
      anchorTarget = document.getElementById(decodeURIComponent(destination.hash.slice(1)))
    }
    setOpen(false)
  })
  panel.addEventListener('transitionend', event => { if (event.target === panel && event.propertyName === 'opacity') finishClose() })
  window.addEventListener('keydown', event => {
    if (panel.hidden) return
    if (event.key === 'Escape') { event.preventDefault(); setOpen(false); return }
    if (event.key !== 'Tab') return
    const items = Array.from(scope.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),[tabindex="0"]')).filter(item => item.getClientRects().length > 0)
    const first = items[0], last = items.at(-1)
    if (!first || !last) return
    if (!scope.contains(document.activeElement)) { event.preventDefault(); first.focus() }
    else if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
  })
}
