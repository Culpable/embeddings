'use client'

import { cloneElement, isValidElement, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

function elementKey(element) {
  return isValidElement(element) ? (element.key ?? '__present__') : null
}


export function TransitionPresence({
  children,
  enterClassName,
  exitClassName,
}) {
  const nextElement = isValidElement(children) ? children : null
  const nextKey = elementKey(nextElement)
  const pendingElementRef = useRef(nextElement)
  const [displayedElement, setDisplayedElement] = useState(nextElement)
  const [displayedKey, setDisplayedKey] = useState(nextKey)
  const [phase, setPhase] = useState(nextElement ? 'enter' : 'idle')

  useEffect(() => {
    pendingElementRef.current = nextElement

    if (nextKey === displayedKey) {
      if (nextElement) setDisplayedElement(nextElement)
      return
    }

    if (displayedElement) {
      setPhase('exit')
      return
    }

    setDisplayedElement(nextElement)
    setDisplayedKey(nextKey)
    setPhase(nextElement ? 'enter' : 'idle')
  }, [displayedElement, displayedKey, nextElement, nextKey])

  if (!displayedElement) {
    return null
  }

  return cloneElement(displayedElement, {
    className: clsx(
      displayedElement.props.className,
      phase === 'enter' && enterClassName,
      phase === 'exit' && exitClassName,
    ),
    style: {
      ...displayedElement.props.style,
      animationDelay:
        phase === 'exit' ? '0s' : displayedElement.props.style?.animationDelay,
    },
    onAnimationEnd(event) {
      displayedElement.props.onAnimationEnd?.(event)

      if (event.target !== event.currentTarget) return

      if (phase === 'enter') {
        setPhase('idle')
        return
      }

      if (phase === 'exit') {
        const pendingElement = pendingElementRef.current
        setDisplayedElement(pendingElement)
        setDisplayedKey(elementKey(pendingElement))
        setPhase(pendingElement ? 'enter' : 'idle')
      }
    },
  })
}
