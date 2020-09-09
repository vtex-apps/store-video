/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import useVideo from '../useVideo'
import TrackControl from '../controls/TrackControl'
import styles from '../styles/styles.css'
import VolumeControl from '../controls/VolumeControl'
import PlayButton from '../controls/PlayButton'
import FullscreenButton from '../controls/FullscreenButton'
import { VideoPlayer } from '../interfaces'

const CSS_HANDLES = [
  'videoContainer',
  'videoElement',
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
}) => {
  const handles = useCssHandles(CSS_HANDLES)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const {
    isPlaying,
    isMuted,
    networkStatus,
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
      <div className="fallback">
        <img
          className="w-100 h-100"
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
      {/* {networkStatus !== 'NETWORK_READY' && (
        <div className="absolute w-100 h-100 flex items-center justify-center bg-black-90 tc">
          <Spinner />
        </div>
      )} */}
      <video
        ref={videoRef}
        data-testid="html5-player"
        className={`${handles.videoElement} ${styles.videoElement} w-100 h-100`}
        poster={poster}
        loop={loop}
        autoPlay={autoPlay}
        controls={hasNativeControls}
        muted={muted}
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
              play={play}
              pause={pause}
            />
            <TrackControl
              cssHandles={handles}
              videoRef={videoRef}
              changeState={changeState}
            />
            <FullscreenButton
              cssHandles={handles}
              toggleFullscreenMode={toggleFullscreenMode}
            />
            <VolumeControl
              cssHandles={handles}
              setVolume={setVolume}
              toggleMute={toggleMute}
              isMuted={isMuted}
            />
          </>
        </div>
      )}
    </div>
  )
}

export default HTML5Player
