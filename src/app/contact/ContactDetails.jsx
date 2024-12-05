import Link from 'next/link'
import { Border } from '@/components/Border'
import { FadeIn } from '@/components/FadeIn'
import { Offices } from '@/components/Offices'

export function ContactDetails() {
  return (
    <FadeIn>
      <h2 className="font-display text-base font-semibold text-neutral-950">
        our offices
      </h2>
      <p className="mt-6 text-base text-neutral-600">
        We’re based in Perth and Melbourne, and work with clients all over Australia.
      </p>

      <Offices className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2" />

      <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-semibold text-neutral-950">
          email us
        </h2>
        <dl className="mt-6 grid grid-cols-1 gap-8 text-sm sm:grid-cols-2">
          {[
            ['business enquiries', 'solutions@embeddings.au'],
          ].map(([label, email]) => (
            <div key={email}>
              <dt className="font-semibold text-neutral-950">{label}</dt>
              <dd>
                <Link
                  href={`mailto:${email}`}
                  className="text-neutral-600 hover:text-neutral-950"
                >
                  {email}
                </Link>
              </dd>
            </div>
          ))}
        </dl>
      </Border>

      <Border className="mt-16 pt-16">
        {/* <h2 className="font-display text-base font-semibold text-neutral-950">
          follow us
        </h2>
        <SocialMedia className="mt-6" /> */}
      </Border>
    </FadeIn>
  )
} 