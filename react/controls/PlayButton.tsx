import React, { FunctionComponent } from 'react'
import { Icon } from 'vtex.store-icons'

import styles from '../styles/styles.css'

export interface PlayButtonProps {
  isPlaying: boolean | null
  play: () => void
  pause: () => void
  cssHandles: any
}

const PlayButton: FunctionComponent<PlayButtonProps> = ({
  isPlaying,
  play,
  pause,
  cssHandles,
}) => {
  return (
    <button
      className={`${cssHandles.playButton} ${styles.button} absolute bottom-2 left-0 v-mid z-1`}
      onClick={() => (isPlaying ? pause() : play())}
    >
      <Icon id={isPlaying ? 'hpa-pause' : 'hpa-play'} />
    </button>
  )
}

export default PlayButton
