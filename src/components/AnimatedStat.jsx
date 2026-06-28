'use client'

// ---------------------------------------------------------------------------
// AnimatedStat — Animated counting number that springs from 0 to target
// when the element scrolls into view. Uses IntersectionObserver and direct DOM
// text updates so stat cards keep their premium count-up without adding a
// heavy animation runtime to otherwise static page sections.
//
// Props:
//   value     – target number to count up to (e.g. 700, 81, 758)
//   prefix    – static text before the number (e.g. "$")
//   suffix    – static text after the number (e.g. "%", "M+", "T")
//   className – pass-through styling for the wrapper <span>
// ---------------------------------------------------------------------------

import { useEffect, useMemo, useRef } from 'react'


export function AnimatedStat({ value, prefix = '', suffix = '', className }) {
  const ref = useRef(null)
  const numberRef = useRef(null)
  const formatter = useMemo(() => new Intl.NumberFormat('en-AU'), [])

  useEffect(() => {
    const node = ref.current
    const numberNode = numberRef.current
    let frameId = null

    if (!node || !numberNode) {
      return
    }

    function setDisplayedValue(nextValue) {
      numberNode.textContent = formatter.format(Math.round(nextValue))
    }

    function startCount() {
      const startTime = performance.now()
      const duration = 1450

      function tick(now) {
        const elapsed = Math.min((now - startTime) / duration, 1)
        const eased = 1 - Math.pow(1 - elapsed, 3)

        setDisplayedValue(value * eased)

        if (elapsed < 1) {
          frameId = window.requestAnimationFrame(tick)
        }
      }

      frameId = window.requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return
        }

        startCount()
        observer.unobserve(node)
      },
      { rootMargin: '0px 0px -200px 0px', threshold: 0 },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()

      if (frameId) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [formatter, value])

  return (
    <span ref={ref} className={className}>
      {prefix}
      <span ref={numberRef}>0</span>
      {suffix}
    </span>
  )
}
