/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import useVideo from '../useVideo'
import styles from '../styles/styles.css'
import type { VideoPlayer } from '../VideoTypes'
import PlayButton, {
  CSS_HANDLES as PLAY_BUTTON_CSS_HANDLES,
} from '../controls/PlayButton'
import FullscreenButton, {
  CSS_HANDLES as FULLSCREEN_BUTTON_CSS_HANDLES,
} from '../controls/FullscreenButton'
import TrackControl, {
  CSS_HANDLES as TRACK_CONTROL_CSS_HANDLES,
} from '../controls/TrackControl'
import VolumeControl, {
  CSS_HANDLES as VOLUME_CONTROL_CSS_HANDLES,
} from '../controls/VolumeControl'
import { useVideoHandles, VideoHandlesProvider } from '../HandlesContext'

export const CSS_HANDLES = [
  'videoContainer',
  'videoElement',
  'fallbackContainer',
  'fallbackImage',
  'controlsContainer',
  ...PLAY_BUTTON_CSS_HANDLES,
  ...TRACK_CONTROL_CSS_HANDLES,
  ...FULLSCREEN_BUTTON_CSS_HANDLES,
  ...VOLUME_CONTROL_CSS_HANDLES,
] as const

interface FallbackImageProps {
  imageUrl?: string
  description?: string
}

function FallbackImage({
  imageUrl = 'https://storecomponents.vtexassets.com/arquivos/ids/155639',
  description,
}: FallbackImageProps) {
  const { handles } = useVideoHandles()

  return (
    <div className={`${handles.fallbackContainer}`}>
      <img
        className={`w-100 h-100 ${handles.fallbackImage}`}
        src={imageUrl}
        alt={description}
      />
    </div>
  )
}

function HTML5Player({
  src,
  type,
  width,
  height,
  autoPlay,
  loop,
  poster,
  controlsType,
  description,
  muted,
  IconPlay,
  IconPause,
  IconFullscreen,
  IconVolumeOn,
  IconVolumeOff,
  classes,
}: VideoPlayer) {
  const { handles, withModifiers } = useCssHandles(CSS_HANDLES, { classes })
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const {
    isPlaying,
    isMuted,
    networkStatus,
    volume,
    play,
    pause,
    setVolume,
    toggleMute,
    toggleFullscreenMode,
    changeState,
  } = useVideo(videoRef, containerRef)

  const hasCustomControls = controlsType === 'custom-vtex'
  const hasNativeControls = controlsType === 'native'

  if (hasCustomControls && networkStatus === 'NETWORK_NO_SOURCE') {
    return <FallbackImage imageUrl={poster} description={description} />
  }

  return (
    <VideoHandlesProvider withModifiers={withModifiers} handles={handles}>
      <div
        ref={containerRef}
        aria-label={description}
        style={{ width, height }}
        className={`relative ${handles.videoContainer} ba b--gray`}
      >
        <video
          ref={videoRef}
          data-testid="html5-player"
          className={`${handles.videoElement} ${styles.videoElement} w-100 h-100`}
          poster={poster}
          loop={loop}
          autoPlay={autoPlay}
          controls={hasNativeControls}
          muted={autoPlay ? true : muted}
        >
          <source src={src} type={type && `video/${type}`} />

          {<FallbackImage imageUrl={poster} description={description} />}
        </video>

        {videoRef && hasCustomControls && (
          <div
            data-testid="controls-container"
            className={`${handles.controlsContainer} absolute left-2 right-2 lh-copy`}
          >
            <>
              <PlayButton
                isPlaying={isPlaying}
                IconPlay={IconPlay}
                IconPause={IconPause}
                play={play}
                pause={pause}
              />
              <TrackControl videoRef={videoRef} changeState={changeState} />
              <FullscreenButton
                IconFullscreen={IconFullscreen}
                toggleFullscreenMode={toggleFullscreenMode}
              />
              <VolumeControl
                IconVolumeOn={IconVolumeOn}
                IconVolumeOff={IconVolumeOff}
                isMuted={isMuted}
                volume={volume}
                setVolume={setVolume}
                toggleMute={toggleMute}
              />
            </>
          </div>
        )}
      </div>
    </VideoHandlesProvider>
  )
}

export default HTML5Player
