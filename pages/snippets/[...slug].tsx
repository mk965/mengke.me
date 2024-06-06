import { MDXLayoutRenderer } from 'components/MDXComponents'
import { PageTitle } from '~/components/PageTitle'
import { getCommentConfigs } from '~/libs/comment'
import { formatSlug, getFiles } from '~/libs/files'
import { getFileBySlug } from '~/libs/mdx'
import type { MdxPageLayout } from '~/types/mdx'
import type { SnippetProps } from '~/types/page'

const DEFAULT_LAYOUT: MdxPageLayout = 'PostSimple'

export async function getStaticPaths() {
  const snippets = getFiles('snippets')
  return {
    paths: snippets.map((p: string) => ({
      params: {
        slug: formatSlug(p).split('/'),
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const snippet = await getFileBySlug('snippets', params.slug.join('/'))
  const commentConfig = getCommentConfigs()
  return {
    props: { snippet, commentConfig },
  }
}

export default function Snippet({ snippet, commentConfig }: SnippetProps) {
  const { mdxSource, frontMatter } = snippet

  return (
    <>
      {frontMatter.draft !== true ? (
        <MDXLayoutRenderer
          layout={frontMatter.layout || DEFAULT_LAYOUT}
          mdxSource={mdxSource}
          type="snippets"
          frontMatter={frontMatter}
          commentConfig={commentConfig}
        />
      ) : (
        <div className="mt-24 text-center">
          <PageTitle>
            Under construction
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </>
  )
}
