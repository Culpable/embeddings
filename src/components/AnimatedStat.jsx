import clsx from 'clsx'

// ---------------------------------------------------------------------------
// AnimatedStat — Render sourced statistics truthfully while still giving them
// a tactile emphasis animation. Never count through intermediate values because
// factual proof points such as "700M+" and "81%" must not show incorrect
// numbers, even briefly, while the page settles.
//
// Props:
//   value     – sourced number to display (e.g. 700, 81, 758)
//   prefix    – static text before the number (e.g. "$")
//   suffix    – static text after the number (e.g. "%", "M+", "T")
//   className – pass-through styling for the wrapper <span>
// ---------------------------------------------------------------------------

export function AnimatedStat({ value, prefix = '', suffix = '', className }) {
  const formattedValue = new Intl.NumberFormat('en-AU').format(value)

  return (
    <span className={clsx('static-stat-emphasis', className)}>
      {prefix}
      <span className="tabular-nums">{formattedValue}</span>
      {suffix}
    </span>
  )
}
