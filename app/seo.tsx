import type { Metadata } from 'next'
import { AUTHOR_INFO, AUTHOR_SAME_AS } from '~/data/author-info'
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

function absoluteUrl(pathOrUrl: string): string {
  return pathOrUrl.startsWith('http') ? pathOrUrl : `${SITE_METADATA.siteUrl}${pathOrUrl}`
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

/**
 * Site-level structured data for the homepage: who the author is (Person),
 * what the site is (WebSite / Blog), and which external profiles are the
 * same person (sameAs). Article pages emit their own BlogPosting JSON-LD.
 */
export function SiteJsonLd() {
  const personId = `${SITE_METADATA.siteUrl}/#person`
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: SITE_METADATA.author,
        url: SITE_METADATA.siteUrl,
        image: absoluteUrl(SITE_METADATA.siteLogo),
        description: SITE_METADATA.description,
        jobTitle: AUTHOR_INFO.work.occupation,
        sameAs: AUTHOR_SAME_AS,
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_METADATA.siteUrl}/#website`,
        url: SITE_METADATA.siteUrl,
        name: SITE_METADATA.title,
        description: SITE_METADATA.description,
        inLanguage: SITE_METADATA.language,
        publisher: { '@id': personId },
      },
      {
        '@type': 'Blog',
        '@id': `${SITE_METADATA.siteUrl}/#blog`,
        url: SITE_METADATA.siteUrl,
        name: SITE_METADATA.title,
        description: SITE_METADATA.description,
        inLanguage: SITE_METADATA.language,
        publisher: { '@id': personId },
        author: { '@id': personId },
      },
    ],
  }
  return <JsonLd data={data} />
}
