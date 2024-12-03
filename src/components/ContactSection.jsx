import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import clsx from 'clsx'

export function ContactSection({ invert = false }) {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="mx-auto max-w-3xl text-center">
        <h2
          className={clsx(
            'font-display text-3xl font-medium tracking-tight',
            invert ? 'text-white' : 'text-neutral-950'
          )}
        >
          Ready to transform your business with AI?
        </h2>
        <div
          className={clsx(
            'mt-6 text-base',
            invert ? 'text-neutral-300' : 'text-neutral-600'
          )}
        >
          <p>Get in touch to start your AI transformation journey.</p>
        </div>
        <Button href="/contact" invert={invert} className="mt-8">
          Contact us
        </Button>
      </div>
    </Container>
  )
}
