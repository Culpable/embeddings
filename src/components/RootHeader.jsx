'use client'

import { useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
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

function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="m5.636 4.223 14.142 14.142-1.414 1.414L4.222 5.637z" />
      <path d="M4.222 18.363 18.364 4.22l1.414 1.414L5.636 19.777z" />
    </svg>
  )
}

function MenuIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M2 6h20v2H2zM2 16h20v2H2z" />
    </svg>
  )
}

function Header({
  panelId,
  icon: Icon,
  expanded,
  onToggle,
  toggleRef,
  logoHovered,
  setLogoHovered,
  invert = false,
}) {
  return (
    <Container>
      <div className="flex items-center justify-between">
        <Link
          href="/"
          aria-label="Home"
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
        >
          <Logomark
            className="h-8 sm:hidden"
            invert={invert}
            filled={logoHovered}
          />
          <Logo
            className="hidden h-8 sm:block"
            invert={invert}
            filled={logoHovered}
          />
        </Link>
        <div className="flex items-center gap-x-6 sm:gap-x-8">
          <Button href="/contact" invert={invert}>
            Contact us
          </Button>
          <button
            ref={toggleRef}
            type="button"
            onClick={onToggle}
            aria-expanded={expanded ? 'true' : 'false'}
            aria-controls={panelId}
            className={clsx(
              'group -m-2.5 rounded-full p-2.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-4',
              invert
                ? 'hover:bg-white/10 focus-visible:ring-white focus-visible:ring-offset-neutral-950'
                : 'hover:bg-neutral-950/10',
            )}
            aria-label="Toggle navigation"
          >
            <Icon
              className={clsx(
                'h-6 w-6 transition',
                invert
                  ? 'fill-white group-hover:fill-neutral-200'
                  : 'fill-neutral-950 group-hover:fill-neutral-700',
              )}
            />
          </button>
        </div>
      </div>
    </Container>
  )
}

function NavigationRow({ children }) {
  return (
    <div className="even:mt-px sm:bg-neutral-950">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2">{children}</div>
      </Container>
    </div>
  )
}

function NavigationItem({ href, children }) {
  return (
    <Link
      href={href}
      className="group relative isolate -mx-6 bg-neutral-950 px-6 py-8 transition even:mt-px sm:mx-0 sm:px-0 sm:py-12 sm:odd:pr-16 sm:even:mt-0 sm:even:border-l sm:even:border-neutral-800 sm:even:pl-16"
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-y-0 -z-10 w-screen bg-neutral-900 opacity-0 transition-opacity duration-300 group-odd:right-0 group-even:left-0 group-hover:opacity-100" />
    </Link>
  )
}

function Navigation() {
  return (
    <nav className="mt-px font-display text-4xl font-medium tracking-tight text-white sm:text-5xl">
      {navigationRows.map((row) => (
        <NavigationRow key={row.map((item) => item.href).join('-')}>
          {row.map(({ href, label }) => (
            <NavigationItem key={href} href={href}>
              {label}
            </NavigationItem>
          ))}
        </NavigationRow>
      ))}
    </nav>
  )
}

export function RootHeader() {
  let panelId = useId()
  let [expanded, setExpanded] = useState(false)
  let [logoHovered, setLogoHovered] = useState(false)
  let openRef = useRef(null)
  let closeRef = useRef(null)
  let panelRef = useRef(null)

  useEffect(() => {
    function onClick(event) {
      if (
        expanded &&
        event.target instanceof HTMLElement &&
        panelRef.current?.contains(event.target) &&
        event.target.closest('a')
      ) {
        setExpanded(false)
      }
    }

    window.addEventListener('click', onClick)

    return () => {
      window.removeEventListener('click', onClick)
    }
  }, [expanded])

  function togglePanel(nextExpanded) {
    setExpanded(nextExpanded)
    window.setTimeout(() => {
      if (nextExpanded) {
        closeRef.current?.focus({ preventScroll: true })
        return
      }

      openRef.current?.focus({ preventScroll: true })
    })
  }

  return (
    <header>
      <div
        className="absolute left-0 right-0 top-2 z-40 pt-14"
        aria-hidden={expanded ? 'true' : undefined}
        inert={expanded}
      >
        <Header
          panelId={panelId}
          icon={MenuIcon}
          toggleRef={openRef}
          expanded={expanded}
          logoHovered={logoHovered}
          setLogoHovered={setLogoHovered}
          onToggle={() => togglePanel(!expanded)}
        />
      </div>

      <div
        ref={panelRef}
        id={panelId}
        className={clsx(
          'relative z-50 overflow-hidden bg-neutral-950 pt-2 transition-[max-height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
          expanded ? 'max-h-[52rem]' : 'max-h-2',
        )}
        aria-hidden={expanded ? undefined : 'true'}
        inert={!expanded}
      >
        <div className="bg-neutral-800">
          <div className="bg-neutral-950 pb-16 pt-14">
            <Header
              invert
              panelId={panelId}
              icon={XIcon}
              toggleRef={closeRef}
              expanded={expanded}
              logoHovered={logoHovered}
              setLogoHovered={setLogoHovered}
              onToggle={() => togglePanel(!expanded)}
            />
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
    </header>
  )
}
