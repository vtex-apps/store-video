import type { RefObject, ChangeEvent } from 'react'
import React, { useRef } from 'react'

import { useVideoHandles } from '../HandlesContext'
import useVideoTrack, { formatTime } from '../useVideoTrack'

export const CSS_HANDLES = ['trackContainer', 'trackTimer', 'trackBar'] as const

export interface TrackControlProps {
  videoRef: RefObject<HTMLVideoElement>
  changeState: (property: string, value: unknown) => void
}

function TrackControl({ videoRef, changeState }: TrackControlProps) {
  const { handles } = useVideoHandles()
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
      className={`${handles.trackContainer} w-100 absolute bottom-1 lh-title`}
    >
      {currentTime != null && duration != null && (
        <span className={`${handles.trackTimer} ml7 white v-mid`}>
          {`${formatTime(currentTime)} / ${formatTime(duration)}`}
        </span>
      )}

      <input
        ref={trackBarRef}
        onChange={handleChange}
        className={`${handles.trackBar} w-100 v-mid`}
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
