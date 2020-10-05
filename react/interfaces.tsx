import { VideoHTMLAttributes, FC } from 'react'

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
}
