import clsx from 'clsx'
import { preload } from 'react-dom'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'

export function PageIntro({ eyebrow, title, children, centered = false }) {
  // Preload body copy only on routes that render this introduction. Keep the
  // homepage display font as its sole critical font request.
  preload('/fonts/Mona-Sans-body-latin.var.woff2', {
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  })

  return (
    <Container
      className={clsx('mt-24 sm:mt-32 lg:mt-40', centered && 'text-center')}
    >
      <FadeIn>
        <h1>
          <span className="block font-display text-base font-semibold text-neutral-950">
            {eyebrow}
          </span>
          <span className="sr-only"> - </span>
          <span
            className={clsx(
              'mt-6 block max-w-5xl font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl',
              centered && 'mx-auto',
            )}
          >
            {title}
          </span>
        </h1>
        <div
          className={clsx(
            'mt-6 max-w-3xl text-xl text-neutral-600',
            centered && 'mx-auto',
          )}
        >
          {children}
        </div>
      </FadeIn>
    </Container>
  )
}
