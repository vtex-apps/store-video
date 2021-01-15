import type { VideoHTMLAttributes, ElementType } from 'react'
import type { CssHandlesTypes } from 'vtex.css-handles'

import type { CSS_HANDLES } from './players/HTML5Player'

export interface VideoPlayer extends VideoHTMLAttributes<HTMLVideoElement> {
  name?: string
  description?: string
  src: string
  fallbackImageUrl?: string
  type?: string
  controlsType?: string
  IconPlay?: ElementType<unknown>
  IconPause?: ElementType<unknown>
  IconFullscreen?: ElementType<unknown>
  IconVolumeOn?: ElementType<unknown>
  IconVolumeOff?: ElementType<unknown>
  uploadDate?: string
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}
