import type { FriendCardProps } from '~/types'
import { GithubRepo } from '../GithubRepo'
import { Image } from '../Image'
import { Link } from '../Link'

export function FriendCard({ friend }: FriendCardProps) {
  const { name, slogan, imgSrc, url } = friend
  const href = url || '/'

  return (
    <div className="w-1/2 p-2 mt-2 md md:w-1/4 sm:w-1/3" style={{ maxWidth: '544px' }}>
      <div className="flex flex-col items-center justify-center h-full p-6 space-y-6 overflow-hidden text-center border border-gray-400 rounded-md border-opacity-60 hover:border-gray-500 dark:border-gray-600 dark:hover:border-gray-400">
        <Image
          alt={name}
          src={imgSrc}
          className="object-cover object-center w-16 h-16 rounded-full md:h-20 md:w-20 lg:h-28 lg:w-28"
          width={112}
          height={112}
        />
        <div className="flex flex-col justify-between space-y-6 grow">
          <div className="space-y-3">
            <h2 className="font-bold leading-8 tracking-tight text-md">
              {href ? (
                <Link href={href} aria-label={`Link to ${name}`}>
                  <span data-umami-event="friend-name">{name}</span>
                </Link>
              ) : (
                name
              )}
            </h2>
            <div className="space-y-2 text-gray-500 max-w-none dark:text-gray-400">
              <p>{slogan}</p>
            </div>
          </div>
          <Link
            href={url}
            className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label={`Link to ${name}`}
          >
            <span data-umami-event="friend-go">Visit &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
