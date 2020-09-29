import { RefObject, useState, useEffect } from 'react'

interface State {
  currentTime?: number
  duration?: number
}

export const formatTime = (timeInSeconds: number) => {
  let seconds: string = Math.floor(timeInSeconds % 60).toString()

  if (seconds?.length === 1) {
    seconds = `0${seconds}`
  }

  const minutes: number = Math.floor((timeInSeconds / 60) % 60)
  const hours: number = Math.floor(timeInSeconds / 3600)

  if (hours) {
    return `${hours}:${minutes}:${seconds}`
  }

  return `${minutes}:${seconds}`
}

export const useVideoTrack = (
  videoRef: RefObject<HTMLVideoElement>,
  trackBarRef: RefObject<HTMLInputElement>
) => {
  const [state, setState] = useState<State>({})
  const currentVideoRef = videoRef?.current
  const currentTrackBarRef = trackBarRef?.current

  const updateMetaData = () => {
    setState({ currentTime: 0, duration: currentVideoRef?.duration })
  }

  const updateCurrentTime = () => {
    if (currentTrackBarRef) {
      currentTrackBarRef.value = `${currentVideoRef?.currentTime}`
    }

    return setState({ ...state, currentTime: currentVideoRef?.currentTime })
  }

  const setCurrentTime = (timeInSeconds: number) => {
    if (!currentVideoRef) return

    currentVideoRef.currentTime = timeInSeconds
  }

  useEffect(() => {
    currentVideoRef?.addEventListener('loadedmetadata', updateMetaData)
    currentVideoRef?.addEventListener('timeupdate', updateCurrentTime)

    return () => {
      currentVideoRef?.removeEventListener('loadedmetadata', updateMetaData)
      currentVideoRef?.removeEventListener('timeupdate', updateCurrentTime)
    }
    // Disabling because it is necessary to define some event listeners only when video ref is available
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentVideoRef])

  return {
    duration: currentVideoRef?.duration,
    currentTime: state.currentTime,
    setCurrentTime,
    formatTime,
  }
}

export default useVideoTrack
