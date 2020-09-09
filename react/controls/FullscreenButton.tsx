import React, { FunctionComponent } from 'react'
import { Icon } from 'vtex.store-icons'
import { useCssHandles } from 'vtex.css-handles'

import styles from '../styles/styles.css'

const CSS_HANDLES = ['fullscreenButton']

export interface FullscreenButtonProps {
  toggleFullscreenMode: () => void
}

const FullscreenButton: FunctionComponent<FullscreenButtonProps> = ({
  toggleFullscreenMode,
}) => {
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <button
      className={`${handles.fullscreenButton} ${styles.button} ml4 absolute bottom-2 right-0`}
      onClick={() => toggleFullscreenMode()}
    >
      <Icon id="hpa-fullscreen" />
    </button>
  )
}

export default FullscreenButton
