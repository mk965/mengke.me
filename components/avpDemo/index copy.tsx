import { useEffect, useRef } from 'react'
import { Lion, Player } from '~/libs/lion.es'

export default function AvpDemo() {
  const containerRef = useRef()
  let lion: Player | null
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
      width: 300,
      height: 261,
      onEnded: () => {
        lion.destroy()
        lion = null
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
      <div className="pointer-events-none cursor-none">
        <div ref={containerRef} className="absolute -translate-y-full"></div>
      </div>
    </div>
  )
}
