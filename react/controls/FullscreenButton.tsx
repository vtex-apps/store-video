import React, { FunctionComponent } from 'react'
import { IconExpand as DefaultIconFullscreen } from 'vtex.store-icons'

import styles from '../styles/styles.css'

export interface FullscreenButtonProps {
  toggleFullscreenMode: () => void
  cssHandles: any
  IconFullscreen?: any
}

const FullscreenButton: FunctionComponent<FullscreenButtonProps> = ({
  toggleFullscreenMode,
  cssHandles,
  IconFullscreen,
}) => {
  return (
    <button
      className={`${cssHandles.fullscreenButton} ${styles.button} ml4 absolute bottom-2 right-0`}
      onClick={toggleFullscreenMode}
    >
      {IconFullscreen ? (
        <IconFullscreen />
      ) : (
        DefaultIconFullscreen && <DefaultIconFullscreen />
      )}
    </button>
  )
}

export default FullscreenButton
