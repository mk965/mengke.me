import type { Metadata } from 'next'
import { SITE_METADATA } from '~/data/site-metadata'

interface PageSEOProps {
  title: string
  description?: string
  image?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export function genPageMetadata({ title, description, image, ...rest }: PageSEOProps): Metadata {
  const fullTitle = `${title} | ${SITE_METADATA.title}`
  const pageDescription = description || SITE_METADATA.description

  return {
    title,
    description: pageDescription,
    openGraph: {
      title: fullTitle,
      description: pageDescription,
      url: SITE_METADATA.siteUrl,
      siteName: SITE_METADATA.title,
      images: image ? [image] : [SITE_METADATA.socialBanner],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      title: fullTitle,
      card: 'summary_large_image',
      images: image ? [image] : [SITE_METADATA.socialBanner],
    },
    ...rest,
  }
}
