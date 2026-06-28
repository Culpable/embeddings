'use client'

import Link from 'next/link'
import clsx from 'clsx'
import { track } from '@/lib/mixpanelClient'

export function Button({
  invert = false,
  className,
  children,
  trackingLabel,
  trackingProperties = {},
  ...props
}) {
  const isDisabled = props.disabled || props['aria-disabled']
  const trackingText =
    trackingLabel || (typeof children === 'string' ? children : 'button')

  className = clsx(
    className,
    'inline-flex min-h-9 items-center justify-center rounded-full px-4 py-1.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2',
    isDisabled && 'cursor-not-allowed opacity-55',
    invert
      ? 'bg-white text-neutral-950 hover:bg-neutral-200 focus-visible:ring-white focus-visible:ring-offset-neutral-950'
      : 'bg-neutral-950 text-white hover:bg-neutral-800',
  )

  const handleClick = (e) => {
    // Track the button click without serialising nested React children.
    track('Button Clicked', {
      button_text: trackingText,
      button_label: trackingText,
      href: props.href,
      invert: invert,
      ...trackingProperties,
    })

    // Call the original onClick handler if it exists
    if (props.onClick) {
      props.onClick(e)
    }
  }

  let inner = <span className="relative top-px">{children}</span>

  if (typeof props.href === 'undefined') {
    return (
      <button className={className} {...props} onClick={handleClick}>
        {inner}
      </button>
    )
  }

  return (
    <Link className={className} {...props} onClick={handleClick}>
      {inner}
    </Link>
  )
}
