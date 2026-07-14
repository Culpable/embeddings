'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Logo, Logomark } from '@/components/Logo'
import { Offices } from '@/components/Offices'

const navigationRows = [
  [
    { href: '/#why-now', label: 'why now' },
    { href: '/#services', label: 'services' },
  ],
  [
    { href: '/#proof', label: 'proof' },
    { href: '/process', label: 'our process' },
  ],
  [
    { href: '/about', label: 'about us' },
    { href: '/contact', label: 'contact us' },
  ],
]

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')


function getFocusableElements(container) {
  return Array.from(container.querySelectorAll(focusableSelector)).filter(
    (element) =>
      element instanceof HTMLElement && element.getClientRects().length > 0,
  )
}


function NavigationPanelHeader() {
  return (
    <Container>
      <div className="flex items-center justify-between">
        <Link
          href="/"
          aria-label="Home"
          className="group/logo inline-flex min-h-11 min-w-11 items-center sm:min-h-10 sm:min-w-10"
        >
          <Logomark className="h-8 sm:hidden" invert />
          <Logo className="hidden h-8 sm:block" invert fillOnHover />
        </Link>
        <div className="flex items-center gap-x-6 sm:gap-x-8">
          <Button href="/contact" invert>
            Contact us
          </Button>
          <span
            className="block min-h-11 min-w-11 sm:min-h-10 sm:min-w-10"
            aria-hidden="true"
          />
        </div>
      </div>
    </Container>
  )
}


function NavigationRow({ children }) {
  return (
    <div className="mt-px first:mt-0 sm:bg-neutral-950">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2">{children}</div>
      </Container>
    </div>
  )
}


function isCurrentNavigationItem(href, pathname) {
  if (href.includes('#')) {
    return false
  }

  return pathname === href
}


function NavigationItem({ href, children, isCurrent = false }) {
  return (
    <Link
      href={href}
      aria-current={isCurrent ? 'page' : undefined}
      className={clsx(
        'group relative isolate -mx-6 bg-neutral-950 px-6 py-8 even:mt-px sm:mx-0 sm:px-0 sm:py-12 sm:odd:pr-16 sm:even:mt-0 sm:even:border-l sm:even:border-neutral-800 sm:even:pl-16',
        isCurrent && 'text-white',
      )}
    >
      <span className="relative z-10">{children}</span>
      {isCurrent && (
        <span className="relative z-10 ml-4 inline-flex align-middle text-xs font-semibold uppercase tracking-wider text-white/45">
          current
        </span>
      )}
      <span
        className={clsx(
          'absolute inset-y-0 left-0 -z-10 w-1 bg-white transition-opacity duration-300 sm:left-auto sm:right-0',
          isCurrent ? 'opacity-100' : 'opacity-0',
        )}
        aria-hidden="true"
      />
      <span className="absolute inset-y-0 -z-10 w-screen bg-neutral-900 opacity-0 transition-opacity duration-300 group-odd:right-0 group-even:left-0 group-hover:opacity-100" />
    </Link>
  )
}


function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="mt-px font-display text-4xl font-medium tracking-tight text-white sm:text-5xl">
      {navigationRows.map((row) => (
        <NavigationRow key={row.map((item) => item.href).join('-')}>
          {row.map(({ href, label }) => (
            <NavigationItem
              key={href}
              href={href}
              isCurrent={isCurrentNavigationItem(href, pathname)}
            >
              {label}
            </NavigationItem>
          ))}
        </NavigationRow>
      ))}
    </nav>
  )
}


export function RootNavigationPanel({
  panelId,
  expanded,
  focusScopeRef,
  onClose,
  onExitComplete,
}) {
  const panelRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Retarget the mounted panel after its first paint so enter and exit use
    // the same interruptible opacity and transform transition.
    setVisible(expanded)
  }, [expanded])

  useEffect(() => {
    function onClick(event) {
      if (
        event.target instanceof HTMLElement &&
        panelRef.current?.contains(event.target) &&
        event.target.closest('a')
      ) {
        onClose()
      }
    }

    window.addEventListener('click', onClick)

    return () => {
      window.removeEventListener('click', onClick)
    }
  }, [onClose])

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab' || !focusScopeRef.current) {
        return
      }

      const focusableElements = getFocusableElements(focusScopeRef.current)
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (!firstElement || !lastElement) {
        event.preventDefault()
        return
      }

      if (!focusScopeRef.current.contains(document.activeElement)) {
        event.preventDefault()
        firstElement.focus()
        return
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
        return
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [focusScopeRef, onClose])

  return (
    <div
      ref={panelRef}
      id={panelId}
      onTransitionEnd={(event) => {
        if (
          event.target === event.currentTarget &&
          event.propertyName === 'opacity' &&
          !visible
        ) {
          onExitComplete()
        }
      }}
      className={clsx(
        'fixed inset-x-0 top-0 z-50 max-h-screen overflow-y-auto overflow-x-hidden bg-neutral-950 pt-2 transition-[opacity,transform]',
        visible
          ? 'translate-y-0 opacity-100 duration-300 ease-out'
          : '-translate-y-3 opacity-0 duration-150 ease-in',
      )}
    >
      <div className="bg-neutral-800">
        <div className="bg-neutral-950 pb-16 pt-14">
          <NavigationPanelHeader />
        </div>
        <Navigation />
        <div className="relative bg-neutral-950 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-neutral-800">
          <Container>
            <div className="grid grid-cols-1 gap-y-10 pb-16 pt-10 sm:grid-cols-2 sm:pt-16">
              <div>
                <h2 className="font-display text-base font-semibold text-white">
                  our offices
                </h2>
                <Offices
                  invert
                  className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2"
                />
              </div>
              <div className="sm:border-l sm:border-transparent sm:pl-16">
                <p className="max-w-sm text-sm leading-6 text-neutral-400">
                  Jump straight to the offer, proof, process, or a
                  catalogue-readiness conversation.
                </p>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  )
}
