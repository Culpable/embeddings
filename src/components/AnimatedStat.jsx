'use client'

// ---------------------------------------------------------------------------
// AnimatedStat — Animated counting number that springs from 0 to target
// when the element scrolls into view. Uses framer-motion springs for a
// smooth, physics-based count-up effect (~1.5s ease-out).
//
// Props:
//   value     – target number to count up to (e.g. 700, 81, 758)
//   prefix    – static text before the number (e.g. "$")
//   suffix    – static text after the number (e.g. "%", "M+", "T")
//   className – pass-through styling for the wrapper <span>
// ---------------------------------------------------------------------------

import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'


export function AnimatedStat({ value, prefix = '', suffix = '', className }) {
  const ref = useRef(null)

  // Trigger animation once when the element enters the viewport
  const isInView = useInView(ref, { once: true })

  // Motion value drives the spring animation from 0 → target
  const motionValue = useMotionValue(0)

  // Spring config: moderate stiffness for ~1.5s duration, low bounce
  const springValue = useSpring(motionValue, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.5,
  })

  // Transform the spring output to a rounded integer string
  const displayValue = useTransform(springValue, (latest) =>
    Math.round(latest).toLocaleString(),
  )

  // Ref to the DOM node for updating text content directly (avoids re-renders)
  const numberRef = useRef(null)

  // Start the spring when the element comes into view
  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, motionValue, value])

  // Subscribe to the transformed display value and update the DOM
  useEffect(() => {
    const unsubscribe = displayValue.on('change', (latest) => {
      if (numberRef.current) {
        numberRef.current.textContent = latest
      }
    })
    return unsubscribe
  }, [displayValue])

  return (
    <span ref={ref} className={className}>
      {prefix}
      <span ref={numberRef}>0</span>
      {suffix}
    </span>
  )
}
