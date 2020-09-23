import { VideoHTMLAttributes, ComponentType } from 'react'

export interface VideoPlayer extends VideoHTMLAttributes<HTMLVideoElement> {
  name?: string
  description?: string
  src: string
  type?: string
  controlsType?: string
  IconPlay?: React.FC<unknown>
  IconPause?: React.FC<unknown>
  IconFullscreen?: React.FC<unknown>
  IconVolumeOn?: React.FC<unknown>
  IconVolumeOff?: React.FC<unknown>
  uploadDate?: string
}
