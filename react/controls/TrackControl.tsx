import React, { RefObject, useRef, FunctionComponent, ChangeEvent } from 'react'

import styles from '../styles/styles.css'
import useVideoTrack, { formatTime } from '../useVideoTrack'

export interface TrackControlProps {
  videoRef: RefObject<HTMLVideoElement>
  changeState: (property: string, value: any) => void
  cssHandles: Record<'trackContainer' | 'trackTimer' | 'trackBar', string>
}

const TrackControl: FunctionComponent<TrackControlProps> = ({
  videoRef,
  changeState,
  cssHandles,
}) => {
  const trackBarRef = useRef<HTMLInputElement>(null)
  const { duration, currentTime, setCurrentTime } = useVideoTrack(
    videoRef,
    trackBarRef
  )

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (videoRef?.current?.ended) {
      changeState('isPlaying', false)
    }

    setCurrentTime(parseFloat(event?.target?.value))
  }

  return (
    <div
      className={`${cssHandles.trackContainer} w-100 absolute bottom-1 lh-title`}
    >
      {currentTime != null && duration != null && (
        <span className={`${cssHandles.trackTimer} ml7 white v-mid`}>
          {`${formatTime(currentTime)} / ${formatTime(duration)}`}
        </span>
      )}

      <input
        ref={trackBarRef}
        onChange={handleChange}
        className={`${cssHandles.trackBar} ${styles.trackBar} w-100 v-mid`}
        type="range"
        min={0}
        step={0.05}
        defaultValue="0"
        max={duration ?? 0}
      />
    </div>
  )
}

export default TrackControl
