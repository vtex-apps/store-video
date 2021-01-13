import type { VideoHTMLAttributes, ComponentType } from 'react'
import type { CssHandlesTypes } from 'vtex.css-handles'

import type { CSS_HANDLES } from './players/HTML5Player'

export interface VideoPlayer extends VideoHTMLAttributes<HTMLVideoElement> {
  name?: string
  description?: string
  src: string
  fallbackImageUrl?: string
  type?: string
  controlsType?: string
  IconPlay?: ComponentType<unknown>
  IconPause?: ComponentType<unknown>
  IconFullscreen?: ComponentType<unknown>
  IconVolumeOn?: ComponentType<unknown>
  IconVolumeOff?: ComponentType<unknown>
  uploadDate?: string
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}
