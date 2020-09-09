/* eslint-disable react-hooks/exhaustive-deps */
import { RefObject, useState, useEffect } from 'react'

interface State {
  isMuted: boolean | null
  isPlaying: boolean | null
  networkStatus: string | null
}

const useVideo = (
  videoRef: RefObject<HTMLVideoElement>,
  containerRef: RefObject<HTMLDivElement>
) => {
  const currentVideoRef = videoRef?.current as any
  const currentContainerRef = containerRef?.current as any
  const [state, setState] = useState<State>({
    isMuted: null,
    isPlaying: null,
    networkStatus: null,
  })

  const play = () => {
    currentVideoRef?.play()

    setState({ ...state, isPlaying: currentVideoRef?.paused === false })
  }

  const pause = () => {
    currentVideoRef?.pause()

    setState({ ...state, isPlaying: currentVideoRef?.paused === false })
  }

  const setVolume = (volume: number) => {
    if (!currentVideoRef) return

    if (volume < 0 || volume > 1) return

    currentVideoRef.volume = volume
  }

  const toggleMute = () => {
    if (!currentVideoRef) return

    currentVideoRef.muted = !currentVideoRef.muted

    setState({ ...state, isMuted: currentVideoRef.muted })
  }

  const toggleFullscreenMode = () => {
    if (document.fullscreenElement) {
      return document.exitFullscreen()
    }

    return currentContainerRef?.requestFullscreen()
  }

  const changeState = (property: string, value: any) => {
    setState({ ...state, [property]: value })
  }

  const setNetworkStatus = (networkStatus: string): void => {
    setState({ ...state, networkStatus })
  }

  const getNetworkStatus = (): string => {
    const NETWORK_STATUS: string[] = [
      'NETWORK_EMPTY',
      'NETWORK_IDLE',
      'NETWORK_LOADING',
      'NETWORK_NO_SOURCE',
    ]

    return NETWORK_STATUS[currentVideoRef?.networkState]
  }

  useEffect(() => {
    return setState({
      ...state,
      isMuted: currentVideoRef?.muted === true,
      isPlaying: currentVideoRef?.paused === false,
      networkStatus: getNetworkStatus(),
    })
  }, [currentVideoRef])

  return {
    isPlaying: state?.isPlaying,
    isMuted: state?.isMuted,
    hasEnded: currentVideoRef?.ended,
    volume: currentVideoRef?.volume,
    networkStatus: state?.networkStatus,
    play,
    pause,
    setVolume,
    setNetworkStatus,
    toggleMute,
    toggleFullscreenMode,
    changeState,
  }
}

export default useVideo
