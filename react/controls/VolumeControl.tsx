import React, { useState, FunctionComponent } from 'react'
import { Icon } from 'vtex.store-icons'

import styles from '../styles/styles.css'

export interface VolumeControlProps {
  setVolume: (volume: number) => void
  toggleMute: () => void
  isMuted: boolean | null
  cssHandles: any
}

const VolumeControl: FunctionComponent<VolumeControlProps> = ({
  setVolume,
  toggleMute,
  isMuted,
  cssHandles,
}) => {
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)

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
          min={0}
          max={10}
          onChange={(event) =>
            setVolume(parseInt(event?.target?.value, 10) / 10)
          }
        />
      )}

      <button
        onClick={() => toggleMute()}
        className={`${cssHandles.volumeButton} ${styles.button} v-mid ml4`}
      >
        <Icon id={isMuted ? 'volume-muted' : 'volume-up'} />
      </button>
    </div>
  )
}

export default VolumeControl
