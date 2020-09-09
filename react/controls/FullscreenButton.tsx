import React, { FunctionComponent } from 'react'
import { Icon } from 'vtex.store-icons'

import styles from '../styles/styles.css'

export interface FullscreenButtonProps {
  toggleFullscreenMode: () => void
  cssHandles: any
}

const FullscreenButton: FunctionComponent<FullscreenButtonProps> = ({
  toggleFullscreenMode,
  cssHandles,
}) => {
  return (
    <button
      className={`${cssHandles.fullscreenButton} ${styles.button} ml4 absolute bottom-2 right-0`}
      onClick={() => toggleFullscreenMode()}
    >
      <Icon id="hpa-fullscreen" />
    </button>
  )
}

export default FullscreenButton
