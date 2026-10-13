import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'

// ---------------------------------------------------------------------------
// Closing call to action shared by the homepage, about page and process page.
//
// A light panel split in two: the question on the left, and the supporting
// line with the Contact us button on the right. Phones and tablets stack the
// two halves. The wording is broad on purpose, so every page ends on the same
// invitation regardless of the visitor's industry.
// ---------------------------------------------------------------------------

export function ContactSection() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="grid gap-10 rounded-4xl bg-neutral-100 px-6 py-16 sm:px-12 sm:py-20 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <h2 className="font-display text-4xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-5xl">
            Where could AI take work off your team?
          </h2>
          <div>
            <p className="text-lg text-neutral-600">
              Tell us how your team works today. We’ll come back with a
              practical first step.
            </p>
            <Button href="/contact" className="mt-6">
              Contact us
            </Button>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}
