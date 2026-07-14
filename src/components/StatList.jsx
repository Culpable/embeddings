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
        {sourceLabel &&
          (sourceHref ? (
            // Keep the 44px/40px responsive tap target on the link while the
            // visible pill inside stays compact beside the smaller stat copy.
            // The block-level link also drops the pill onto its own line with
            // breathing room below the label.
            <a
              href={sourceHref}
              target="_blank"
              rel="noreferrer"
              className="group/source mt-1.5 flex min-h-11 w-fit items-center transition-transform duration-200 ease-out focus-visible:outline-none active:scale-[0.96] sm:min-h-10"
            >
              <span className="inline-flex items-center rounded-full border border-neutral-950/10 bg-white py-1 pl-2.5 pr-2 text-xs font-semibold leading-4 text-neutral-500 shadow-[0_1px_0_rgba(23,23,23,0.04)] transition-[border-color,color] duration-200 ease-out group-hover/source:border-neutral-950/20 group-hover/source:text-neutral-950 group-focus-visible/source:ring-2 group-focus-visible/source:ring-neutral-950 group-focus-visible/source:ring-offset-2">
                Source · {sourceLabel}
                <span
                  className="ml-1 inline-flex -translate-y-px items-center text-[0.6rem]"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </span>
            </a>
          ) : (
            <span className="mt-1.5 block w-fit font-medium text-neutral-500">
              Source: {sourceLabel}
            </span>
          ))}
      </dt>
      <dd className="font-display text-3xl font-semibold text-neutral-950 sm:text-4xl">
        {value}
      </dd>
    </Border>
  )
}
