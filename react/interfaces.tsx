import { VideoHTMLAttributes } from 'react'

export interface VideoPlayer extends VideoHTMLAttributes<HTMLVideoElement> {
  name?: string
  description?: string
  src: string
  type?: string
  controlsType?: string
  IconPlay?: any
  IconPause?: any
  IconFullscreen?: any
  IconVolumeOn?: any
  IconVolumeOff?: any
  uploadDate?: string
}
