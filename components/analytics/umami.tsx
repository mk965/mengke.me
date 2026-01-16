import Script from 'next/script.js'

interface UmamiAnalyticsProps {
  websiteId?: string
  src?: string
}

export function UmamiAnalytics({ websiteId, src = '/stats/script.js' }: UmamiAnalyticsProps) {
  if (websiteId) {
    // Delay loading analytics to reduce TBT impact on initial render.
    return <Script strategy="lazyOnload" async defer data-website-id={websiteId} src={src} />
  }
  return null
}
