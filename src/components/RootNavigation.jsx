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
      // Lay the toggle out as a flex item, not as inline-block text. A plain
      // block wrapper puts the inline-block button on a text baseline, which
      // adds descender space below it and makes this wrapper 33px tall instead
      // of the toggle's 24px footprint. The header row then centres the taller
      // wrapper, leaving the toggle itself about 4.5px above the "Contact us"
      // button's centre line.
      className="flex items-center"
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
