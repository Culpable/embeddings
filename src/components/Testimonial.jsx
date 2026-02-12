import Image from 'next/image'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GridPattern } from '@/components/GridPattern'
import { NoiseOverlay } from '@/components/NoiseOverlay'

// ---------------------------------------------------------------------------
// Testimonial — supports two visual variants:
//   default : light neutral-50 background with GridPattern
//   dark    : neutral-950 background with oversized quotation mark and
//             highlighted key phrases (editorial pull-quote style)
// ---------------------------------------------------------------------------

export function Testimonial({ children, client, className, dark = false }) {
  if (dark) {
    return (
      <div
        className={clsx(
          'relative isolate overflow-hidden bg-neutral-950 py-16 sm:py-28 md:py-32',
          className,
        )}
      >
        {/* Noise texture overlay for visual depth */}
        <NoiseOverlay id="testimonial" />
        <Container>
          <FadeIn>
            <figure className="relative mx-auto max-w-4xl">
              {/* Oversized quotation mark — decorative background element */}
              <div
                className="pointer-events-none absolute -left-4 -top-8 select-none font-display text-[10rem] font-medium leading-none text-white/[0.05] sm:-left-8 sm:-top-12 sm:text-[14rem]"
                aria-hidden="true"
              >
                &ldquo;
              </div>

              {/* Quote text with highlighted phrases */}
              <blockquote className="relative font-display text-2xl font-medium tracking-tight text-white sm:text-3xl md:text-4xl">
                <p className="leading-snug">
                  {children}
                </p>
              </blockquote>

              {/* Attribution */}
              <figcaption className="mt-10 border-t border-white/10 pt-6">
                <div className="flex items-center gap-4">
                  {client.logo && (
                    <Image src={client.logo} alt={client.name} unoptimized className="brightness-0 invert" />
                  )}
                  <div>
                    {client.name && (
                      <p className="text-sm font-semibold text-white">
                        {client.name}
                      </p>
                    )}
                    {client.role && (
                      <p className="text-sm text-neutral-400">
                        {client.role}
                      </p>
                    )}
                  </div>
                </div>
              </figcaption>
            </figure>
          </FadeIn>
        </Container>
      </div>
    )
  }

  // Default light variant (unchanged)
  return (
    <div
      className={clsx(
        'relative isolate bg-neutral-50 py-16 sm:py-28 md:py-32',
        className,
      )}
    >
      <GridPattern
        className="absolute inset-0 -z-10 h-full w-full fill-neutral-100 stroke-neutral-950/5 [mask-image:linear-gradient(to_bottom_left,white_50%,transparent_60%)]"
        yOffset={-256}
      />
      <Container>
        <FadeIn>
          <figure className="mx-auto max-w-4xl">
            <blockquote className="relative font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
              <p className="before:content-['\u201C'] after:content-['\u201D'] sm:before:absolute sm:before:right-full">
                {children}
              </p>
            </blockquote>
            <figcaption className="mt-10">
              {client.logo && <Image src={client.logo} alt={client.name} unoptimized />}
            </figcaption>
          </figure>
        </FadeIn>
      </Container>
    </div>
  )
}
