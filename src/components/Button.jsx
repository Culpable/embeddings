import Link from 'next/link'
import clsx from 'clsx'

export function Button({
  invert = false,
  className,
  children,
  trackingLabel,
  trackingProperties,
  ...props
}) {
  // Accept legacy tracking props without hydrating static CTA links for analytics.
  void trackingLabel
  void trackingProperties

  const isDisabled = props.disabled || props['aria-disabled']

  className = clsx(
    className,
    'inline-flex min-h-9 items-center justify-center rounded-full px-4 py-1.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2',
    isDisabled && 'cursor-not-allowed opacity-55',
    invert
      ? 'bg-white text-neutral-950 hover:bg-neutral-200 focus-visible:ring-white focus-visible:ring-offset-neutral-950'
      : 'bg-neutral-950 text-white hover:bg-neutral-800',
  )

  let inner = <span className="relative top-px">{children}</span>

  if (typeof props.href === 'undefined') {
    return (
      <button className={className} {...props}>
        {inner}
      </button>
    )
  }

  return (
    <Link className={className} {...props}>
      {inner}
    </Link>
  )
}
