import Link from 'next/link'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Logo, Logomark } from '@/components/Logo'
import { RootNavigation } from '@/components/RootNavigation'

export function RootHeader() {
  return (
    <header>
      <a
        href="#main-content"
        className="sr-only fixed left-6 top-6 z-[60] inline-flex min-h-11 items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-neutral-950 shadow-xl ring-1 ring-neutral-950/10 transition-[background-color,color,box-shadow] focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-neutral-950 sm:min-h-10"
      >
        Skip to content
      </a>
      <div className="absolute left-0 right-0 top-2 z-40 pt-14">
        <Container>
          <div className="flex items-center justify-between">
            <Link
              href="/"
              aria-label="Home"
              className="group/logo inline-flex min-h-11 min-w-11 items-center sm:min-h-10 sm:min-w-10"
            >
              <Logomark className="h-8 sm:hidden" />
              <Logo className="hidden h-8 sm:block" fillOnHover />
            </Link>
            <div className="flex items-center gap-x-6 sm:gap-x-8">
              <Button href="/contact">Contact us</Button>
              <RootNavigation />
            </div>
          </div>
        </Container>
      </div>
    </header>
  )
}
