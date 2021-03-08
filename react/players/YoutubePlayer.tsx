import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

import type { VideoPlayer } from '../VideoTypes'

const CSS_HANDLES = ['videoContainer', 'videoElement'] as const

// https://regex101.com/r/CWmgOb/1
const YOUTUBE_REGEX = /(?:youtube(?:-nocookie)?\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/

function YoutubePlayer({
  width,
  height,
  autoPlay,
  controlsType,
  loop,
  playsInline,
  src,
  description,
  classes,
}: VideoPlayer) {
  const { handles } = useCssHandles(CSS_HANDLES, { classes })
  const matchedSrc = src.match(YOUTUBE_REGEX)
  const videoId = matchedSrc?.[1]
  const params = `autoplay=${autoPlay}&loop=${
    loop ? `1&playlist=${videoId}` : '0'
  }&enablejsapi=1&iv_load_policy=3&modestbranding=1&rel=0&controls=${
    controlsType === 'none' ? 0 : 1
  }&playsinline=${playsInline ? '1' : '0'}`

  return (
    <div className={`relative ${handles.videoContainer}`}>
      <iframe
        data-testid="youtube-player"
        width={width}
        height={height}
        title={description}
        className={`${handles.videoElement}`}
        src={`https://www.youtube.com/embed/${videoId}?${params}`}
        frameBorder="0"
        allowFullScreen
        allow="autoplay"
      />
    </div>
  )
}

export default YoutubePlayer
