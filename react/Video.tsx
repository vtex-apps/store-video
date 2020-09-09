import React from 'react'

import { VideoPlayer } from './interfaces'
import VimeoPlayer from './players/VimeoPlayer'
import HTML5Player from './players/HTML5Player'
import YoutubePlayer from './players/YoutubePlayer'

const Video: StorefrontFunctionComponent<VideoPlayer> = (props) => {
  const { src, name, description } = props
  const isVimeo = /vimeo/.test(src)
  const isYoutube = /youtube|youtu.be/.test(src)

  const renderStructuredData = () => {
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `{
          "@context": "http://schema.org",
          "@type": "VideoObject",
          "name": ${name},
          "description": ${description},
          "contentUrl": ${src}
        }`,
        }}
      />
    )
  }

  const renderPlayer = () => {
    if (isVimeo) {
      return <VimeoPlayer {...props} />
    }

    if (isYoutube) {
      return <YoutubePlayer {...props} />
    }

    return <HTML5Player {...props} />
  }

  return (
    <>
      {renderStructuredData()}
      {renderPlayer()}
    </>
  )
}

Video.schema = {
  title: 'admin/editor.video.title',
  type: 'object',
  properties: {
    name: {
      title: 'admin/editor.video.name.title',
      description: 'admin/editor.video.name.description',
      type: 'string',
    },
    description: {
      title: 'admin/editor.video.description.title',
      description: 'admin/editor.video.description.description',
      type: 'string',
    },
    width: {
      title: 'admin/editor.video.width.title',
      type: 'string',
    },
    height: {
      title: 'admin/editor.video.height.title',
      type: 'string',
    },
    src: {
      title: 'admin/editor.video.src.title',
      type: 'string',
    },
    autoPlay: {
      title: 'admin/editor.video.autoplay.title',
      type: 'boolean',
    },
    loop: {
      title: 'admin/editor.video.loop.title',
      type: 'boolean',
    },
    poster: {
      title: 'admin/editor.video.poster.title',
      description: 'admin/editor.video.poster.description',
      type: 'string',
    },
  },
}

export default Video
