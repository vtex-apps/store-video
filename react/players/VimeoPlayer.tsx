import React, { FunctionComponent } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import { VideoPlayer } from '../interfaces'

const CSS_HANDLES = ['videoContainer', 'videoElement'] as const

const VIMEO_REGEX = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/

const VimeoPlayer: FunctionComponent<VideoPlayer> = ({
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
    const matchedSrc = src.match(VIMEO_REGEX)

    return matchedSrc?.[5]
  }

  return (
    <div className={`relative ${handles.videoContainer}`}>
      <iframe
        data-testid="vimeo-player"
        width={width}
        height={height}
        title={description}
        className={`${handles.videoElement}`}
        src={`https://player.vimeo.com/video/${extractVideoID()}?${getParams()}`}
        frameBorder="0"
        allowFullScreen
        allow="autoplay"
      />
    </div>
  )
}

export default VimeoPlayer
