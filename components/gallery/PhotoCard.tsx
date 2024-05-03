import useSWR from 'swr'
import type { ProjectCardProps } from '~/types/components'
import type { GithubRepository } from '~/types/server'
import { fetcher } from '~/utils/fetcher'
import { Image } from '../Image'
import { Link } from '../Link'
import UnsplashPhotoInfo from '../UnsplashPhotoInfo'

export function PhotoCard(props: any) {
  const item = props.item

  return (
    // <div className="p-4 md md:w-1/2" style={{ maxWidth: '544px' }}>
    <div>
      <div className="flex flex-col h-full overflow-hidden border border-transparent rounded-lg shadow-nextjs dark:shadow-nextjs-dark">
        <Image
          alt={'aaa'}
          src={item.media_url}
          className="object-cover object-center"
          width={1088}
          height={1088}
        />
        <div className="flex flex-col justify-between p-4 space-y-6 grow md:p-6">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold leading-8 tracking-tight">
              <span data-umami-event="project-title-link">{item.caption}</span>
            </h2>
            <div className="space-y-2 text-gray-500 max-w-none dark:text-gray-400">
              <p>{new Date(item.timestamp).toLocaleString()}</p>
              <div className="flex flex-wrap space-x-1.5">
                <div className="text-sm italic text-right">
                  Photo by{' '}
                  <a className="!no-underline" href={'/'} target="_blank" rel="noreferrer">
                    {item.username}
                  </a>{' '}
                </div>
              </div>
            </div>
          </div>
          <Link
            href={item.permalink}
            className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label={`Link to ${item.caption}`}
          >
            <span data-umami-event="go-ins">View post &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
