'use client'

import dynamic from 'next/dynamic'
import { useCallback, useId, useRef, useState } from 'react'

import { NavigationButton } from '@/components/NavigationButton'

const RootNavigationPanel = dynamic(
  () =>
    import('@/components/RootNavigationPanel').then(
      (module) => module.RootNavigationPanel,
    ),
  { ssr: false },
)


export function RootNavigation() {
  const panelId = useId()
  const [expanded, setExpanded] = useState(false)
  const openRef = useRef(null)
  const closeRef = useRef(null)

  const openPanel = useCallback(() => {
    setExpanded(true)
  }, [])

  const closePanel = useCallback(() => {
    setExpanded(false)

    window.setTimeout(() => {
      openRef.current?.focus({ preventScroll: true })
    })
  }, [])

  return (
    <>
      {!expanded && (
        <NavigationButton
          panelId={panelId}
          toggleRef={openRef}
          expanded={false}
          onToggle={openPanel}
        />
      )}

      {expanded && (
        <RootNavigationPanel
          panelId={panelId}
          closeRef={closeRef}
          onClose={closePanel}
        />
      )}
    </>
  )
}
