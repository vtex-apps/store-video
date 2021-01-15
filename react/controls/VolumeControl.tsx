import type { ElementType, MouseEventHandler } from 'react'
import React, { useState } from 'react'
import {
  IconVolumeOff as DefaultIconVolumeOff,
  IconVolumeOn as DefaultIconVolumeOn,
} from 'vtex.store-icons'

import { useVideoHandles } from '../HandlesContext'
import styles from '../styles/styles.css'

export const CSS_HANDLES = [
  'volumeContainer',
  'volumeSlider',
  'volumeButton',
] as const

export interface VolumeControlProps {
  setVolume: (volume: number) => void
  toggleMute: MouseEventHandler<HTMLButtonElement>
  isMuted: boolean | null
  volume: number | undefined
  IconVolumeOn?: ElementType<unknown>
  IconVolumeOff?: ElementType<unknown>
}

function VolumeControl({
  setVolume,
  toggleMute,
  isMuted,
  volume,
  IconVolumeOn,
  IconVolumeOff,
}: VolumeControlProps) {
  const { handles } = useVideoHandles()

  const [showVolumeSlider, setShowVolumeSlider] = useState(false)

  const VolumeOffIcon = IconVolumeOff ? (
    <IconVolumeOff />
  ) : (
    DefaultIconVolumeOff && <DefaultIconVolumeOff />
  )

  const VolumeOnIcon = IconVolumeOn ? (
    <IconVolumeOn />
  ) : (
    DefaultIconVolumeOn && <DefaultIconVolumeOn />
  )

  return (
    <div
      className={`${handles.volumeContainer} dib absolute bottom-2 right-2`}
      onMouseEnter={() => setShowVolumeSlider(true)}
      onMouseLeave={() => setShowVolumeSlider(false)}
    >
      {showVolumeSlider && (
        <input
          className={`${handles.volumeSlider} ${styles.volumeSlider} v-mid`}
          disabled={isMuted === true}
          type="range"
          defaultValue={volume && volume * 10}
          min={0}
          max={10}
          onChange={(event) => setVolume(parseInt(event.target.value, 10) / 10)}
        />
      )}

      <button
        onClick={toggleMute}
        className={`${handles.volumeButton} ${styles.button} v-mid ml4`}
      >
        {isMuted ? VolumeOffIcon : VolumeOnIcon}
      </button>
    </div>
  )
}

export default VolumeControl
