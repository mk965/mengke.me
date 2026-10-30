import { allBlogs, allSnippets } from 'contentlayer/generated'
import { Home } from '~/components/home-page'
import { allCoreContent } from '~/utils/contentlayer'
import { sortPosts } from '~/utils/misc'
import { SiteJsonLd } from './seo'

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
