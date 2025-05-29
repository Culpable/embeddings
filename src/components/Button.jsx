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
  className = clsx(
    className,
    'inline-flex rounded-full px-4 py-1.5 text-sm font-semibold transition',
    invert
      ? 'bg-white text-neutral-950 hover:bg-neutral-200'
      : 'bg-neutral-950 text-white hover:bg-neutral-800',
  )

  const handleClick = (e) => {
    // Track the button click
    track('Button Clicked', {
      button_text: children,
      button_label: trackingLabel || children,
      href: props.href,
      invert: invert,
      ...trackingProperties
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
