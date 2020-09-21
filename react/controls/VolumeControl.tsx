import React, { useState, FunctionComponent } from 'react'
import {
  IconVolumeOff as DefaultIconVolumeOff,
  IconVolumeOn as DefaultIconVolumeOn,
} from 'vtex.store-icons'

import styles from '../styles/styles.css'

export interface VolumeControlProps {
  setVolume: (volume: number) => void
  toggleMute: React.MouseEventHandler<HTMLButtonElement>
  isMuted: boolean | null
  cssHandles: any
  IconVolumeOn?: any
  IconVolumeOff?: any
  volume: number | undefined
}

const VolumeControl: FunctionComponent<VolumeControlProps> = ({
  setVolume,
  toggleMute,
  isMuted,
  cssHandles,
  volume,
  IconVolumeOn,
  IconVolumeOff,
}) => {
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
      className={`${cssHandles.volumeContainer} dib absolute bottom-2 right-2`}
      onMouseEnter={() => setShowVolumeSlider(true)}
      onMouseLeave={() => setShowVolumeSlider(false)}
    >
      {showVolumeSlider && (
        <input
          className={`${cssHandles.volumeSlider} ${styles.trackBar} ${styles.volumeSlider} v-mid`}
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
        className={`${cssHandles.volumeButton} ${styles.button} v-mid ml4`}
      >
        {isMuted ? VolumeOffIcon : VolumeOnIcon}
      </button>
    </div>
  )
}

export default VolumeControl
