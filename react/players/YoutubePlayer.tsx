import React, { FunctionComponent } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import { VideoPlayer } from '../interfaces'

const CSS_HANDLES = ['videoContainer', 'videoElement'] as const

const YOUTUBE_REGEX = /(?:youtube(?:-nocookie)?\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/

const YoutubePlayer: FunctionComponent<VideoPlayer> = ({
  width,
  height,
  autoPlay,
  loop,
  src,
  description,
}) => {
  const handles = useCssHandles(CSS_HANDLES)

  const getParams = () => {
    return `autoplay=${autoPlay}&loop=${loop}&enablejsapi=1&iv_load_policy=3&modestbranding=1`
  }

  const extractVideoID = () => {
    const matchedSrc = src.match(YOUTUBE_REGEX)

    return matchedSrc?.[1]
  }

  return (
    <div className={`relative ${handles.videoContainer}`}>
      <iframe
        data-testid="youtube-player"
        width={width}
        height={height}
        title={description}
        className={`${handles.videoElement}`}
        src={`https://www.youtube.com/embed/${extractVideoID()}?${getParams()}`}
        frameBorder="0"
        allowFullScreen
        allow="autoplay"
      />
    </div>
  )
}

export default YoutubePlayer
