import React, { useState, FunctionComponent } from 'react'
import { Icon } from 'vtex.store-icons'
import { useCssHandles } from 'vtex.css-handles'

import styles from '../styles/styles.css'

const CSS_HANDLES = ['volumeContainer', 'volumeSlider', 'volumeButton']

export interface VolumeControlProps {
  setVolume: (volume: number) => void
  toggleMute: () => void
  isMuted: boolean | null
}

const VolumeControl: FunctionComponent<VolumeControlProps> = ({
  setVolume,
  toggleMute,
  isMuted,
}) => {
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <div
      className={`${handles.volumeContainer} dib absolute bottom-2 right-2`}
      onMouseEnter={() => setShowVolumeSlider(true)}
      onMouseLeave={() => setShowVolumeSlider(false)}
    >
      {showVolumeSlider && (
        <input
          className={`${handles.volumeSlider} ${styles.trackBar} ${styles.volumeSlider} v-mid`}
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
        className={`${handles.volumeButton} ${styles.button} v-mid ml4`}
      >
        <Icon id={isMuted ? 'volume-muted' : 'volume-up'} />
      </button>
    </div>
  )
}

export default VolumeControl
