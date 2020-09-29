import React, { FC } from 'react'
import {
  IconPlay as DefaultIconPlay,
  IconPause as DefaultIconPause,
} from 'vtex.store-icons'

import styles from '../styles/styles.css'

export interface PlayButtonProps {
  isPlaying: boolean | null
  cssHandles: Record<'playButton', string>
  play: () => void
  pause: () => void
  IconPlay?: FC<unknown>
  IconPause?: FC<unknown>
}

const PlayButton: FC<PlayButtonProps> = ({
  isPlaying,
  cssHandles,
  IconPlay,
  IconPause,
  play,
  pause,
}) => {
  const PauseIcon = IconPause ? (
    <IconPause />
  ) : (
    DefaultIconPause && <DefaultIconPause />
  )

  const PlayIcon = IconPlay ? (
    <IconPlay />
  ) : (
    DefaultIconPlay && <DefaultIconPlay />
  )

  return (
    <button
      className={`${cssHandles.playButton} ${styles.button} absolute bottom-2 left-0 v-mid z-1`}
      onClick={() => (isPlaying ? pause() : play())}
    >
      {isPlaying ? PauseIcon : PlayIcon}
    </button>
  )
}

export default PlayButton
