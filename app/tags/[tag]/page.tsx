import { genPageMetadata } from 'app/seo'
import { allBlogs, allSnippets } from 'contentlayer/generated'
import { slug } from 'github-slugger'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { SITE_METADATA } from '~/data/site-metadata'
import tagData from '~/json/tag-data.json'
import { ListLayoutWithTags } from '~/layouts/list-layout-with-tags'

export async function generateMetadata({ params }: { params: { tag: string } }): Promise<Metadata> {
  const tag = decodeURI(params.tag)
  return genPageMetadata({
    title: tag,
    description: `${SITE_METADATA.title} ${tag} tagged content`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${SITE_METADATA.siteUrl}/tags/${tag}/feed.xml`,
      },
    },
  })
}

export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const paths = tagKeys.map((tag) => ({
    tag: encodeURI(tag),
  }))
  return paths
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURI(params.tag)
  // Capitalize first letter and convert space to dash
  const title = '#' + tag[0] + tag.split(' ').join('-').slice(1)
  const filteredPosts = allCoreContent(
    sortPosts(allBlogs.filter((post) => post.tags && post.tags.map((t) => slug(t)).includes(tag)))
  )
  const filteredSnippets = allCoreContent(
    sortPosts(
      allSnippets.filter((post) => post.tags && post.tags.map((t) => slug(t)).includes(tag))
    )
  )
  if (filteredPosts.length === 0 && filteredSnippets.length === 0) {
    return notFound()
  }
  return (
    <ListLayoutWithTags
      title={title}
      description={
        <>
          Things I've written about <span className="ml-2 font-medium">#{tag}</span>
        </>
      }
      posts={filteredPosts}
      snippets={filteredSnippets}
    />
  )
}
