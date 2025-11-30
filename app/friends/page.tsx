import { genPageMetadata } from '~/app/seo'
import { PageHeader } from '~/components/ui/page-header'
import { Container } from '~/components/ui/container'
import { FriendsList } from './friends-list'
import friends from '~/json/friends.json'
import { SITE_METADATA } from '~/data/site-metadata'
import { AUTHOR_INFO } from '~/data/author-info'

export const metadata = genPageMetadata({ title: 'Friends' })

export default async function FriendsPage() {
  const friendsList = friends.filter((f) => f.type === 'friend')
  const bloggersList = friends.filter((f) => f.type === 'techStar')

  return (
    <Container as="div" className="pt-4 lg:pt-12">
      <PageHeader
        title="Friends"
        description="My friends and the tech bloggers I recommend."
        className="border-b border-gray-200 dark:border-gray-700"
      />

      <div className="py-10">
        <h3 className="mb-6 text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
          Friends
        </h3>
        <FriendsList friends={friendsList} />
      </div>

      <div className="border-t border-gray-200 py-10 dark:border-gray-700">
        <h3 className="mb-6 text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
          Technical Bloggers
        </h3>
        <FriendsList friends={bloggersList} />
      </div>

      <div className="border-t border-gray-200 py-10 dark:border-gray-700">
        <h3 className="mb-6 text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
          Exchange Links
        </h3>
        <div className="prose max-w-none dark:prose-invert">
          <p>
            If you are interested in exchanging links with me, please feel free to{' '}
            <a href={`mailto:${AUTHOR_INFO.email}`}>contact me</a>.
          </p>
          <p>
            <strong>Format:</strong>
          </p>
          <pre>
            <code className="language-yaml">
              {`Name: ${SITE_METADATA.title}
Url: ${SITE_METADATA.siteUrl}
Slogan: ${SITE_METADATA.description}
Avatar: ${SITE_METADATA.siteUrl}${SITE_METADATA.siteLogo}`}
            </code>
          </pre>
        </div>
      </div>
    </Container>
  )
}
