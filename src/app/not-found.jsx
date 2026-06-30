import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'

export default function NotFound() {
  return (
    <Container className="flex h-full items-center pt-24 sm:pt-32 lg:pt-40">
      <FadeIn className="flex max-w-xl flex-col items-center text-center">
        <p className="font-display text-4xl font-semibold text-neutral-950 sm:text-5xl">
          404
        </p>
        <h1 className="mt-4 font-display text-2xl font-semibold text-neutral-950">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-neutral-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button href="/">Go to the home page</Button>
          <Button
            href="/#services"
            invert
            className="ring-1 ring-neutral-950/10"
          >
            View services
          </Button>
        </div>
      </FadeIn>
    </Container>
  )
}
