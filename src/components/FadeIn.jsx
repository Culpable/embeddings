import clsx from 'clsx'

export function FadeIn({ className, variants, ...props }) {
  const revealVariant = variants?.hidden?.scale ? 'scale' : 'slide'

  return (
    <div
      data-reveal-item=""
      data-reveal-variant={revealVariant}
      className={clsx('reveal-item', className)}
      {...props}
    />
  )
}

export function FadeInStagger({ faster = false, className, style, ...props }) {
  return (
    <div
      data-reveal-root=""
      data-reveal-stagger={faster ? 'fast' : 'default'}
      className={clsx('reveal-stagger', className)}
      style={{
        '--reveal-stagger-step': faster ? '90ms' : '140ms',
        ...style,
      }}
      {...props}
    />
  )
}
