import { genPageMetadata } from '~/app/seo'
import { PageHeader } from '~/components/ui/page-header'
import { Container } from '~/components/ui/container'
import { FriendsList } from './friends-list'
import friends from '~/json/friends.json' assert { type: 'json' }

// const MAX_POSTS_DISPLAY = 5
// const MAX_SNIPPETS_DISPLAY = 6

export const metadata = genPageMetadata({ title: 'My friends and tech bloggers' })

export default async function HomePage() {
  const friendsList = friends.filter((f) => f.type === 'friend')
  const bloggersList = friends.filter((f) => f.type === 'techStar')
  return (
    // <Home
    //   posts={allCoreContent(sortPosts(allBlogs)).slice(0, MAX_POSTS_DISPLAY)}
    //   snippets={allCoreContent(sortPosts(allSnippets)).slice(0, MAX_SNIPPETS_DISPLAY)}
    // />
    <Container as="div" className="pt-4 lg:pt-12">
      <PageHeader
        title="Friends"
        description="My friends and the tech bloggers I recommend."
        className="border-b border-gray-200 dark:border-gray-700"
      />
      <div className="py-5 md:py-10">
        <h3 className="mb-6 text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:text-3xl">
          Friends
        </h3>
        <div className="space-y-16">
          <FriendsList friends={friendsList} />
        </div>
      </div>
      <div className="mt-6 border-t border-gray-200 py-5 dark:border-gray-700 md:mt-10 md:py-10">
        <h3 className="mb-6 text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:mb-8 md:text-3xl">
          Technical bloggers
        </h3>
        <div className="space-y-16">
          <FriendsList friends={bloggersList} />
        </div>
      </div>
    </Container>
  )
}
