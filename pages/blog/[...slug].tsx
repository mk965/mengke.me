import fs from 'fs'
import { MDXLayoutRenderer } from '~/components/MDXComponents'
import { PageTitle } from '~/components/PageTitle'
import { POSTS_PER_PAGE } from '~/constant'
import { getCommentConfigs } from '~/libs/comment'
import { formatSlug, getFiles } from '~/libs/files'
import { generateRss } from '~/libs/generate-rss'
import { getAllFilesFrontMatter, getFileBySlug } from '~/libs/mdx'
import type { AuthorFrontMatter, BlogProps, MdxPageLayout } from '~/types'

const DEFAULT_LAYOUT: MdxPageLayout = 'PostSimple'

export async function getStaticPaths() {
  const posts = getFiles('blog')
  return {
    paths: posts.map((p: string) => ({
      params: {
        slug: formatSlug(p).split('/'),
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }: { params: { slug: string[] } }) {
  const allPosts = getAllFilesFrontMatter('blog')
  const postIndex = allPosts.findIndex((post) => formatSlug(post.slug) === params.slug.join('/'))
  const prev = allPosts[postIndex + 1] || null
  const next = allPosts[postIndex - 1] || null
  const page = Math.ceil((postIndex + 1) / POSTS_PER_PAGE)
  const post = await getFileBySlug('blog', params.slug.join('/'))

  const authors = post.frontMatter.authors || ['default']
  const authorDetails = await Promise.all(
    authors.map(async (author) => {
      const authorData = await getFileBySlug('authors', author)
      // eslint-disable-next-line
      return authorData.frontMatter as unknown as AuthorFrontMatter
    })
  )

  // rss
  const rss = generateRss(allPosts)
  fs.writeFileSync('./public/feed.xml', rss)
  const commentConfig = getCommentConfigs()

  return { props: { post, authorDetails, prev, next, page, commentConfig } }
}

export default function Blog(props: BlogProps) {
  const { post, ...rest } = props
  const { mdxSource, frontMatter } = post

  return (
    <>
      {frontMatter.draft !== true ? (
        <MDXLayoutRenderer
          layout={frontMatter.layout || DEFAULT_LAYOUT}
          mdxSource={mdxSource}
          frontMatter={frontMatter}
          type="blog"
          {...rest}
        />
      ) : (
        <div className="mt-24 text-center">
          <PageTitle>
            Under letruction{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </>
  )
}
