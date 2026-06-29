import { Border } from '@/components/Border'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'

export function StatList({ children, ...props }) {
  return (
    <FadeInStagger {...props}>
      <dl className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:auto-cols-fr lg:grid-flow-col lg:grid-cols-none">
        {children}
      </dl>
    </FadeInStagger>
  )
}

export function StatListItem({ label, value, sourceHref, sourceLabel }) {
  return (
    <Border as={FadeIn} position="left" className="flex flex-col-reverse pl-8">
      <dt className="mt-2 text-base text-neutral-600">
        {label}
        {sourceLabel && (
          <>
            {' '}
            {sourceHref ? (
              <a
                href={sourceHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-7 items-center rounded-full border border-neutral-950/10 bg-white px-2.5 text-xs font-semibold text-neutral-500 shadow-[0_1px_0_rgba(23,23,23,0.04)] transition hover:border-neutral-950/20 hover:text-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
              >
                Source · {sourceLabel}
                <span className="ml-1 text-[0.6rem]" aria-hidden="true">
                  ↗
                </span>
              </a>
            ) : (
              <span className="font-medium text-neutral-500">
                Source: {sourceLabel}
              </span>
            )}
          </>
        )}
      </dt>
      <dd className="font-display text-3xl font-semibold text-neutral-950 sm:text-4xl">
        {value}
      </dd>
    </Border>
  )
}
