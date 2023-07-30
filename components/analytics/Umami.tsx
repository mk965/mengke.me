import Script from 'next/script'
import { siteMetadata } from '~/data/siteMetadata'

export function UmamiScript() {
  return (
    <Script
      async
      src="https://analytics.umami.is/script.js"
      data-website-id={siteMetadata.analytics.umamiWebsiteId}
    ></Script>
  )
}
