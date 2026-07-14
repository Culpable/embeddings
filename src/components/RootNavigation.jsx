'use client'

import { useCallback, useId, useRef, useState } from 'react'

import { NavigationButton } from '@/components/NavigationButton'
import { RootNavigationPanel } from '@/components/RootNavigationPanel'


export function RootNavigation() {
  const panelId = useId()
  const [expanded, setExpanded] = useState(false)
  const [panelMounted, setPanelMounted] = useState(false)
  const navigationRef = useRef(null)
  const toggleRef = useRef(null)

  const openPanel = useCallback(() => {
    setPanelMounted(true)
    setExpanded(true)
  }, [])

  const closePanel = useCallback(() => {
    setExpanded(false)
  }, [])

  const finishPanelExit = useCallback(() => {
    if (!expanded) {
      setPanelMounted(false)
      toggleRef.current?.focus({ preventScroll: true })
    }
  }, [expanded])

  return (
    <div
      ref={navigationRef}
      role={panelMounted ? 'dialog' : undefined}
      aria-modal={panelMounted ? 'true' : undefined}
      aria-label={panelMounted ? 'Site navigation' : undefined}
    >
      <NavigationButton
        panelId={`${panelId}-panel`}
        toggleRef={toggleRef}
        expanded={expanded}
        invert={panelMounted}
        onToggle={expanded ? closePanel : openPanel}
        className="relative z-[60]"
      />

      {panelMounted && (
        <RootNavigationPanel
          panelId={`${panelId}-panel`}
          expanded={expanded}
          focusScopeRef={navigationRef}
          onClose={closePanel}
          onExitComplete={finishPanelExit}
        />
      )}
    </div>
  )
}
