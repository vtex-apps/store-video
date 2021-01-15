import type { ElementType } from 'react'
import React from 'react'
import { IconExpand as DefaultIconFullscreen } from 'vtex.store-icons'

import { useVideoHandles } from '../HandlesContext'
import styles from '../styles/styles.css'

export const CSS_HANDLES = ['fullscreenButton'] as const
export interface FullscreenButtonProps {
  toggleFullscreenMode: () => void
  IconFullscreen?: ElementType
}

function FullscreenButton({
  toggleFullscreenMode,
  IconFullscreen,
}: FullscreenButtonProps) {
  const { handles } = useVideoHandles()

  return (
    <button
      className={`${handles.fullscreenButton} ${styles.button} ml4 absolute bottom-2 right-0`}
      onClick={toggleFullscreenMode}
    >
      {IconFullscreen ? <IconFullscreen /> : <DefaultIconFullscreen />}
    </button>
  )
}

export default FullscreenButton
