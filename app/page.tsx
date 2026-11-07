import { allBlogs, allSnippets } from 'content-collections'
import type { Metadata } from 'next'
import { Home } from '~/components/home-page'
import { SITE_METADATA } from '~/data/site-metadata'
import { allCoreContent } from '~/utils/contentlayer'
import { sortPosts } from '~/utils/misc'
import { SiteJsonLd } from './seo'

export const metadata: Metadata = {
  alternates: {
    canonical: SITE_METADATA.siteUrl,
    types: {
      'application/rss+xml': `${SITE_METADATA.siteUrl}/feed.xml`,
    },
  },
}

const MAX_POSTS_DISPLAY = 5
const MAX_SNIPPETS_DISPLAY = 6

export default async function HomePage() {
  return (
    <>
      <SiteJsonLd />
      <Home
        posts={allCoreContent(sortPosts(allBlogs)).slice(0, MAX_POSTS_DISPLAY)}
        snippets={allCoreContent(sortPosts(allSnippets)).slice(0, MAX_SNIPPETS_DISPLAY)}
      />
    </>
  )
}
