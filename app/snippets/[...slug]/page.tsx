import type { Author, Snippet } from 'contentlayer/generated'
import { allAuthors, allSnippets } from 'contentlayer/generated'
import 'css/prism.css'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDX_COMPONENTS } from '~/components/mdx'
import { SITE_METADATA } from '~/data/site-metadata'
import { PostBanner } from '~/layouts/post-banner'
import { PostLayout } from '~/layouts/post-layout'
import { PostSimple } from '~/layouts/post-simple'
import { allCoreContent, coreContent } from '~/utils/contentlayer'
import { MDXLayoutRenderer } from '~/components/mdx/layout-renderer'
import { sortPosts } from '~/utils/misc'

const DEFAULT_LAYOUT = 'PostSimple'
const LAYOUTS = {
  PostSimple,
  PostLayout,
  PostBanner,
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  const snippet = allSnippets.find((s) => s.slug === slug)
  const authorList = snippet?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Author)
  })
  if (!snippet) {
    return
  }

  const publishedAt = new Date(snippet.date).toISOString()
  const modifiedAt = new Date(snippet.lastmod || snippet.date).toISOString()
  const authors = authorDetails.map((author) => author.name)
  let imageList = [SITE_METADATA.socialBanner]
  if (snippet.images) {
    imageList = typeof snippet.images === 'string' ? [snippet.images] : snippet.images
  }
  const ogImages = imageList.map((img) => {
    return {
      url: img.includes('http') ? img : SITE_METADATA.siteUrl + img,
    }
  })

  return {
    title: snippet.title,
    description: snippet.summary,
    openGraph: {
      title: snippet.title,
      description: snippet.summary,
      siteName: SITE_METADATA.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: './',
      images: ogImages,
      authors: authors.length > 0 ? authors : [SITE_METADATA.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: snippet.title,
      description: snippet.summary,
      images: imageList,
    },
  }
}

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  // Filter out drafts in production
  const sortedCoreContents = allCoreContent(sortPosts(allSnippets))
  const snippetIndex = sortedCoreContents.findIndex((p) => p.slug === slug)
  if (snippetIndex === -1) {
    return notFound()
  }

  const prev = sortedCoreContents[snippetIndex + 1]
  const next = sortedCoreContents[snippetIndex - 1]
  const snippet = allSnippets.find((p) => p.slug === slug) as Snippet
  const authorList = snippet?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Author)
  })
  const mainContent = coreContent(snippet)
  const jsonLd = snippet.structuredData
  jsonLd['author'] = authorDetails.map((author) => {
    return {
      '@type': 'Person',
      name: author.name,
    }
  })

  const Layout = LAYOUTS[snippet.layout || DEFAULT_LAYOUT]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout content={mainContent} authorDetails={authorDetails} next={next} prev={prev}>
        <MDXLayoutRenderer code={snippet.body.code} components={MDX_COMPONENTS} toc={snippet.toc} />
      </Layout>
    </>
  )
}
