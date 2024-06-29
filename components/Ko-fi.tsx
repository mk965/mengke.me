import { useEffect } from 'react'
import { siteMetadata } from '~/data/siteMetadata'

export default function Kofi() {
  useEffect(() => {
    if (!siteMetadata.kofiName) return () => {}
    const script = document.createElement('script')
    script.src = 'https://storage.ko-fi.com/cdn/scripts/overlay-widget.js'
    script.onload = () => {
      if ((window as any).kofiWidgetOverlay) {
        ;(window as any).kofiWidgetOverlay.draw(siteMetadata.kofiName, {
          type: 'floating-chat',
          'floating-chat.donateButton.text': 'Support me',
          'floating-chat.donateButton.background-color': '#00b9fe',
          'floating-chat.donateButton.text-color': '#fff',
        })
      }
    }
    document.body.appendChild(script)

    // Clean up the script if the component is unmounted
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return <></>
}
