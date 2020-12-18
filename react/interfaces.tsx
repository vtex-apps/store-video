import type { VideoHTMLAttributes, FC } from 'react'
import type { CssHandlesTypes } from 'vtex.css-handles'

import type { CSS_HANDLES } from './players/HTML5Player'

export interface VideoPlayer extends VideoHTMLAttributes<HTMLVideoElement> {
  name?: string
  description?: string
  src: string
  fallbackImageUrl?: string
  type?: string
  controlsType?: string
  IconPlay?: FC<unknown>
  IconPause?: FC<unknown>
  IconFullscreen?: FC<unknown>
  IconVolumeOn?: FC<unknown>
  IconVolumeOff?: FC<unknown>
  uploadDate?: string
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}
