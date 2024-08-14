import { MDXLayoutRenderer } from '~/components/MDXComponents'
import { getFileBySlug } from '~/libs/mdx'
import type { MdxFileData, MdxPageLayout } from '~/types'

export async function getStaticProps() {
  let authorData = await getFileBySlug('authors', 'default')
  return { props: { authorData } }
}

const DEFAULT_LAYOUT: MdxPageLayout = 'PostSimple'
export default function About({ authorData }: { authorData: MdxFileData }) {
  let { mdxSource, frontMatter } = authorData

  return (
    <MDXLayoutRenderer
      layout={frontMatter.layout || DEFAULT_LAYOUT}
      mdxSource={mdxSource}
      frontMatter={frontMatter}
    />
  )
}
