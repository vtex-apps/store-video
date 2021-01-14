import type { ElementType } from 'react'
import React from 'react'
import {
  IconPlay as DefaultIconPlay,
  IconPause as DefaultIconPause,
} from 'vtex.store-icons'

import { useVideoHandles } from '../HandlesContext'
import styles from '../styles/styles.css'

export const CSS_HANDLES = ['playButton'] as const

export interface PlayButtonProps {
  isPlaying: boolean | null
  play: () => void
  pause: () => void
  IconPlay?: ElementType<unknown>
  IconPause?: ElementType<unknown>
}

function PlayButton({
  isPlaying,
  IconPlay,
  IconPause,
  play,
  pause,
}: PlayButtonProps) {
  const { handles } = useVideoHandles()

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
      className={`${handles.playButton} ${styles.button} absolute bottom-2 left-0 v-mid z-1`}
      onClick={() => (isPlaying ? pause() : play())}
    >
      {isPlaying ? PauseIcon : PlayIcon}
    </button>
  )
}

export default PlayButton
