import { PageSeo } from 'components/SEO'
import { SnippetLayout } from '~/layouts/SnippetLayout'
import { getAllFilesFrontMatter } from '~/libs/mdx'
import type { SnippetFrontMatter } from '~/types/mdx'
import { siteMetadata } from '~/data/siteMetadata'

export async function getStaticProps() {
  let snippets = getAllFilesFrontMatter(`/snippets`)
  return {
    props: { snippets },
  }
}

export default function Snippet({ snippets }: { snippets: SnippetFrontMatter[] }) {
  let description = 'My snippets collection'
  return (
    <>
      <PageSeo title={`Snippets - ${siteMetadata.author} - Snippets`} description={description} />
      <SnippetLayout snippets={snippets} description={description} />
    </>
  )
}
