/* eslint-disable react-hooks/exhaustive-deps */
import { RefObject, useState, useEffect } from 'react'

interface State {
  currentTime?: number
  duration?: number
}

export const useVideoTrack = (
  videoRef: RefObject<HTMLVideoElement>,
  trackBarRef: RefObject<HTMLInputElement>
) => {
  const [state, setState] = useState<State>()
  const currentVideoRef = videoRef?.current as any
  const currentTrackBarRef = trackBarRef?.current as any

  const updateMetaData = () => {
    setState({ currentTime: 0, duration: currentVideoRef?.duration })
  }

  const updateCurrentTime = () => {
    if (currentTrackBarRef) {
      currentTrackBarRef.value = `${currentVideoRef?.currentTime}`
    }

    setState({ ...state, currentTime: currentVideoRef?.currentTime })
  }

  const setCurrentTime = (timeInSeconds: number) => {
    if (!currentVideoRef && currentVideoRef !== 0) return

    currentVideoRef.currentTime = timeInSeconds
  }

  const formatTime = (timeInSeconds: number) => {
    const seconds: string = Math.floor(timeInSeconds % 60)
      .toString()
      .padStart(2, '0')

    const minutes: number = Math.floor((timeInSeconds / 60) % 60)

    const hours: number = Math.floor(timeInSeconds / 3600)

    if (hours) {
      return `${hours}:${minutes}:${seconds}`
    }

    return `${minutes}:${seconds}`
  }

  useEffect(() => {
    currentVideoRef?.addEventListener('loadedmetadata', updateMetaData)
    currentVideoRef?.addEventListener('timeupdate', updateCurrentTime)

    return () => {
      currentVideoRef?.removeEventListener('loadedmetadata', updateMetaData)
      currentVideoRef?.removeEventListener('timeupdate', updateCurrentTime)
    }
  }, [currentVideoRef])

  return {
    duration: currentVideoRef?.duration,
    currentTime: state?.currentTime,
    setCurrentTime,
    formatTime,
  }
}

export default useVideoTrack
