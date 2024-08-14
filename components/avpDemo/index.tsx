import { useEffect, useRef, useState } from 'react'
import { Lion, Player } from '~/libs/lion.es'

let lion: Player | null
export default function AvpDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)
  const play = async () => {
    if (lion) {
      lion?.play?.()
      return
    }
    lion = await Lion({
      container: containerRef.current,
      video: '/static/images/blog/202309/AVP_Introduction/cat.mp4',
      logLevel: 'debug',
      mode: 'webgl',
      alphaPlacement: 'right',
      width: 500,
      height: 435,
      onStart: () => {
        setPlaying(true)
      },
      onEnded: () => {
        lion?.destroy()
        lion = null
        setPlaying(false)
      },
    })
    lion?.play?.()
  }

  return (
    <div className="relative inline-block">
      <button
        className="p-1 text-gray-100 transition-opacity bg-gray-700 rounded-md bottom-8 right-8 hover:bg-gray-800 dark:hover:bg-gray-600 md:inline-block"
        type="button"
        onClick={play}
      >
        Play
      </button>
      <div
        className={`fixed top-0 left-0 w-full h-full pointer-events-none cursor-none bg-black  flex justify-center items-center ${
          playing ? 'bg-opacity-50' : 'bg-opacity-0'
        }`}
      >
        <div ref={containerRef} className="absolute"></div>
      </div>
    </div>
  )
}
