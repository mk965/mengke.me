import { genPageMetadata } from 'app/seo'
import type { Author } from 'content-collections'
import { allAuthors } from 'content-collections'
import { AuthorLayout } from '~/layouts/author-layout'
import { coreContent } from '~/utils/contentlayer'
import { MDX_COMPONENTS } from '~/components/mdx'
import { SocialAccounts } from '~/components/author/social-accounts'
import { SupportMe } from '~/components/author/support-me'
import { MDXLayoutRenderer } from '~/components/mdx/layout-renderer'

export const metadata = genPageMetadata({ title: 'About', path: '/about' })

export default function AboutPage() {
  const author = allAuthors.find((p) => p.slug === 'default') as Author
  const mainContent = coreContent(author)

  const AuthorMDXComponents = {
    ...MDX_COMPONENTS,
    SocialAccounts,
    SupportMe,
  }

  return (
    <AuthorLayout content={mainContent}>
      <MDXLayoutRenderer code={author.body.code} components={AuthorMDXComponents} />
    </AuthorLayout>
  )
}
