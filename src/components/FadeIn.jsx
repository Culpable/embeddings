'use client'

import clsx from 'clsx'
import { createContext, useContext, useEffect, useRef } from 'react'

const FadeInStaggerContext = createContext(false)

const observerOptions = {
  root: null,
  rootMargin: '0px 0px -200px 0px',
  threshold: 0,
}

function useRevealObserver(ref, enabled = true) {
  useEffect(() => {
    const node = ref.current

    if (!enabled || !node) {
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        return
      }

      node.classList.add('is-visible')
      observer.unobserve(node)
    }, observerOptions)

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [enabled, ref])
}

export function FadeIn({ className, variants, ...props }) {
  let isInStaggerGroup = useContext(FadeInStaggerContext)
  let ref = useRef(null)
  let revealVariant = variants?.hidden?.scale ? 'scale' : 'slide'

  useRevealObserver(ref, !isInStaggerGroup)

  return (
    <div
      ref={ref}
      data-reveal-item=""
      data-reveal-variant={revealVariant}
      className={clsx(
        'reveal-item',
        !isInStaggerGroup && 'reveal-root',
        className,
      )}
      {...props}
    />
  )
}

export function FadeInStagger({ faster = false, className, style, ...props }) {
  let ref = useRef(null)

  useRevealObserver(ref)

  return (
    <FadeInStaggerContext.Provider value={true}>
      <div
        ref={ref}
        data-reveal-root=""
        data-reveal-stagger={faster ? 'fast' : 'default'}
        className={clsx('reveal-root reveal-stagger', className)}
        style={{
          '--reveal-stagger-step': faster ? '90ms' : '140ms',
          ...style,
        }}
        {...props}
      />
    </FadeInStaggerContext.Provider>
  )
}
