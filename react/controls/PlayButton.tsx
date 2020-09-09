import React, { FunctionComponent } from 'react'
import { Icon } from 'vtex.store-icons'
import { useCssHandles } from 'vtex.css-handles'

import styles from '../styles/styles.css'

const CSS_HANDLES = ['playButton']

export interface PlayButtonProps {
  isPlaying: boolean | null
  play: () => void
  pause: () => void
}

const PlayButton: FunctionComponent<PlayButtonProps> = ({
  isPlaying,
  play,
  pause,
}) => {
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <button
      className={`${handles.playButton} ${styles.button} absolute bottom-2 left-0 v-mid z-1`}
      onClick={() => (isPlaying ? pause() : play())}
    >
      <Icon id={isPlaying ? 'hpa-pause' : 'hpa-play'} />
    </button>
  )
}

export default PlayButton
