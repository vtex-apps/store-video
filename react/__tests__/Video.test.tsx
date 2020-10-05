import React, { RefObject } from 'react'
import { renderHook, render } from '@vtex/test-tools/react'
import { act } from 'react-test-renderer'

import Video from '../Video'
import useVideoTrack from '../useVideoTrack'
import useVideo from '../useVideo'

describe('Video rendering', () => {
  it.todo('should show a loading when the network status is not ready')

  it('should render youtube player correctly', () => {
    const { queryByTestId } = render(
      <Video src="https://www.youtube.com/watch?v=hT0OMD11b0A" />
    )

    expect(queryByTestId('html5-player')).not.toBeInTheDocument()
    expect(queryByTestId('vimeo-player')).not.toBeInTheDocument()
    expect(queryByTestId('youtube-player')).toBeInTheDocument()
  })

  it('should render vimeo player correctly', () => {
    const { queryByTestId } = render(<Video src="https://vimeo.com/89404519" />)

    expect(queryByTestId('html5-player')).not.toBeInTheDocument()
    expect(queryByTestId('vimeo-player')).toBeInTheDocument()
    expect(queryByTestId('youtube-player')).not.toBeInTheDocument()
  })

  it('should have native controls if controlsType is `native`', () => {
    const { queryByTestId } = render(
      <Video controlsType="native" src="vtex.mp4" />
    )

    expect(queryByTestId('html5-player')).toHaveAttribute('controls')
    expect(queryByTestId('controls-container')).not.toBeInTheDocument()
  })

  it('should have custom controls if controlsType is `vtex`', () => {
    const { queryByTestId } = render(
      <Video controlsType="custom-vtex" src="vtex.mp4" />
    )

    expect(queryByTestId('html5-player')).not.toHaveAttribute('controls')
    expect(queryByTestId('controls-container')).toBeInTheDocument()
  })
})

describe('Video logic', () => {
  let video: HTMLVideoElement
  let container: HTMLDivElement
  let videoRef: RefObject<HTMLVideoElement>
  let containerRef: RefObject<HTMLDivElement>

  beforeEach(() => {
    video = document.createElement('video')
    container = document.createElement('div')
    container.appendChild(video)
    videoRef = { current: video }
    containerRef = { current: container }
  })

  it('should change the volume of the video', () => {
    const {
      result: {
        current: { toggleMute, setVolume },
      },
    } = renderHook(() => useVideo(videoRef, containerRef))

    act(() => {
      setVolume(0.5)
    })

    expect(videoRef?.current?.muted).toBe(false)
    expect(videoRef?.current?.volume).toBe(0.5)

    act(() => {
      setVolume(0.3)
      toggleMute()
    })

    expect(videoRef?.current?.muted).toBe(true)
    expect(videoRef?.current?.volume).toBe(0.3)

    act(() => {
      setVolume(30)
    })

    expect(videoRef?.current?.volume).toBe(0.3)
  })

  it('should pause the video', () => {
    jest.spyOn(window.HTMLMediaElement.prototype, 'pause').mockImplementation()

    Object.defineProperty(HTMLMediaElement.prototype, 'paused', {
      get() {
        return true
      },
    })

    const {
      result: {
        current,
        current: { pause },
      },
    } = renderHook(() => useVideo(videoRef, containerRef))

    act(() => {
      pause()
    })

    expect(videoRef?.current?.pause).toHaveBeenCalled()
    expect(current.isPlaying).toBeFalsy()
  })

  it('should play the video', () => {
    jest
      .spyOn(window.HTMLMediaElement.prototype, 'play')
      .mockImplementation(() => Promise.resolve())

    Object.defineProperty(HTMLMediaElement.prototype, 'paused', {
      get() {
        return false
      },
    })

    const {
      result: {
        current,
        current: { play, pause },
      },
    } = renderHook(() => useVideo(videoRef, containerRef))

    act(() => {
      play()
      pause()
      play()
    })

    expect(videoRef?.current?.play).toHaveBeenCalled()
    expect(current.isPlaying).toBeTruthy()
  })

  it('should get the track timer with the right format', () => {
    const trackBar: HTMLInputElement = document.createElement('input')
    const trackBarRef = { current: trackBar }

    const {
      result: {
        current: { formatTime = () => {} },
      },
    } = renderHook(() => useVideoTrack(videoRef, trackBarRef))

    expect(formatTime(7)).toBe('0:07')
    expect(formatTime(30)).toBe('0:30')
    expect(formatTime(120)).toBe('2:00')
    expect(formatTime(10300)).toBe('2:51:40')
  })

  it('should update the current time when video is playing', () => {
    const trackBar: HTMLInputElement = document.createElement('input')
    const trackBarRef = { current: trackBar }

    const {
      result: {
        current,
        current: { setCurrentTime },
      },
    } = renderHook(() => useVideoTrack(videoRef, trackBarRef))

    act(() => {
      setCurrentTime(2)
    })

    expect(videoRef?.current?.currentTime).toBe(2)

    act(() => {
      videoRef?.current?.dispatchEvent(
        new window.Event('timeupdate', () => {
          expect(trackBarRef?.current.value).toBe('2')
          expect(current.currentTime).toBe(2)
        })
      )
    })
  })
})
