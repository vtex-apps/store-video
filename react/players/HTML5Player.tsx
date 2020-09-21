/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import useVideo from '../useVideo'
import styles from '../styles/styles.css'
import { VideoPlayer } from '../interfaces'
import PlayButton from '../controls/PlayButton'
import FullscreenButton from '../controls/FullscreenButton'
import TrackControl from '../controls/TrackControl'
import VolumeControl from '../controls/VolumeControl'

const CSS_HANDLES = [
  'videoContainer',
  'videoElement',
  'fallbackContainer',
  'fallbackImage',
  'controlsContainer',
  'playButton',
  'trackContainer',
  'trackTimer',
  'trackBar',
  'fullscreenButton',
  'volumeContainer',
  'volumeSlider',
  'volumeButton',
]

const FALLBACK_IMAGE_URL =
  'https://storecomponents.vtexassets.com/arquivos/ids/155639'

const HTML5Player: StorefrontFunctionComponent<VideoPlayer> = ({
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
}) => {
  const handles = useCssHandles(CSS_HANDLES)
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

  const renderFallback = () => {
    return (
      <div className={`${handles.fallbackContainer}`}>
        <img
          className={`w-100 h-100 ${handles.fallbackImage}`}
          src={FALLBACK_IMAGE_URL}
          alt={description}
        />
      </div>
    )
  }

  if (hasCustomControls && networkStatus === 'NETWORK_NO_SOURCE') {
    return renderFallback()
  }

  return (
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

        {renderFallback()}
      </video>

      {videoRef && hasCustomControls && (
        <div
          data-testid="controls-container"
          className={`${handles.controlsContainer} ${styles.controlsContainer} absolute left-2 right-2 lh-copy`}
        >
          <>
            <PlayButton
              cssHandles={handles}
              isPlaying={isPlaying}
              IconPlay={IconPlay}
              IconPause={IconPause}
              play={play}
              pause={pause}
            />
            <TrackControl
              cssHandles={handles}
              videoRef={videoRef}
              changeState={changeState}
            />
            <FullscreenButton
              IconFullscreen={IconFullscreen}
              cssHandles={handles}
              toggleFullscreenMode={toggleFullscreenMode}
            />
            <VolumeControl
              IconVolumeOn={IconVolumeOn}
              IconVolumeOff={IconVolumeOff}
              cssHandles={handles}
              isMuted={isMuted}
              volume={volume}
              setVolume={setVolume}
              toggleMute={toggleMute}
            />
          </>
        </div>
      )}
    </div>
  )
}

export default HTML5Player
