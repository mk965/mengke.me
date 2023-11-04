import { useEffect, useState } from 'react'

export default function AppleHealth() {
  const [url, setUrl] = useState('/gh/mk965/GitHubPoster/main/OUT_FOLDER/apple_health.svg')
  useEffect(() => {
    setUrl(`/gh/mk965/GitHubPoster/main/OUT_FOLDER/apple_health.svg?t=${Date.now()}`)
  }, [])
  return (
    <div>
      <img alt="AppleHealte" src={url} />
    </div>
  )
}
export const ssr = false
