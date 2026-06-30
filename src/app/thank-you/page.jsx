import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import Link from 'next/link'
import { PageIntro } from '@/components/PageIntro'

export const metadata = {
  title: 'Thank You',
  description: 'Confirmation that Embeddings received your business enquiry.',
}

export default function ThankYou() {
  return (
    <>
      <PageIntro eyebrow="message received" title="We’ll review your enquiry">
        <p>
          Thanks for getting in touch. We’ll look at your context and respond
          with the most useful next step for improving your catalogue data.
        </p>
      </PageIntro>

      <Container className="mt-16">
        <FadeIn>
          <div className="max-w-2xl rounded-3xl border border-neutral-950/10 bg-white p-8 shadow-sm sm:p-10">
            <h2 className="font-display text-xl font-semibold tracking-tight text-neutral-950">
              What to expect
            </h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-neutral-600">
              <p>
                We’ll check whether an audit, enrichment sprint, freshness
                integration, or live optimisation plan is the best first move.
              </p>
              <p>
                If anything is urgent, email solutions@embeddings.au directly
                and include the company name from your enquiry.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/">Back to home</Button>
              <Link
                href="/#services"
                className="inline-flex min-h-11 items-center rounded-full px-5 py-2 text-sm font-semibold text-neutral-950 ring-1 ring-neutral-950/10 transition hover:bg-neutral-50 hover:ring-neutral-950/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
              >
                <span className="relative top-px">Review services</span>
              </Link>
            </div>
          </div>
        </FadeIn>
      </Container>
    </>
  )
}
