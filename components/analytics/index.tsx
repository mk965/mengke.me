import { siteMetadata } from '~/data/siteMetadata'
import { GAScript } from './GoogleAnalytics'
import { SimpleAnalyticsScript } from './SimpleAnalytics'
import { UmamiScript } from './Umami'
import { ClarityScript } from './ClarityScript'

const isProduction = process.env.NODE_ENV === 'production'

export function Analytics() {
  if (isProduction) {
    const { analytics } = siteMetadata
    const { simpleAnalytics, umamiWebsiteId, googleAnalyticsId, microsoftClarity } = analytics
    return (
      <>
        {simpleAnalytics && <SimpleAnalyticsScript />}
        {umamiWebsiteId && <UmamiScript />}
        {googleAnalyticsId && <GAScript />}
        {microsoftClarity && <ClarityScript />}
      </>
    )
  }
  return null
}
