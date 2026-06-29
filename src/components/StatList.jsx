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
                className="font-medium text-neutral-500 underline decoration-neutral-300 underline-offset-2 transition hover:text-neutral-950"
              >
                Source: {sourceLabel}
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
