import Link from 'next/link'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Logo, Logomark } from '@/components/Logo'
import { RootNavigation } from '@/components/RootNavigation'

export function RootHeader() {
  return (
    <header>
      <div className="absolute left-0 right-0 top-2 z-40 pt-14">
        <Container>
          <div className="flex items-center justify-between">
            <Link href="/" aria-label="Home" className="group/logo">
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
