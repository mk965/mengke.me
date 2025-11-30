'use client'

import { Image } from '~/components/ui/image'
import { Link } from '~/components/ui/link'
import type { ImdbFriends } from '~/types/data'
import { ArrowUpRight } from 'lucide-react'

export function FriendCard({ friend }: { friend: ImdbFriends }) {
  const { name, slogan, imgSrc, url } = friend

  return (
    <Link
      href={url}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-transparent transition-all hover:border-primary-500 hover:shadow-lg dark:border-gray-800 dark:hover:border-primary-500"
    >
      <div className="flex h-full flex-row items-center gap-5 p-5">
        <div className="shrink-0">
          <Image
            src={imgSrc}
            alt={name}
            width={80}
            height={80}
            className="h-20 w-20 rounded-full shadow-sm ring-2 ring-gray-100 transition-all group-hover:ring-primary-500 dark:ring-gray-800"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <div className="mb-1 flex items-center justify-between">
            <h4 className="truncate text-lg font-bold text-gray-900 transition-colors group-hover:text-primary-500 dark:text-gray-100">
              {name}
            </h4>
            <ArrowUpRight className="h-5 w-5 text-gray-400 opacity-0 transition-all group-hover:text-primary-500 group-hover:opacity-100" />
          </div>

          <p className="line-clamp-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            {slogan}
          </p>
        </div>
      </div>
    </Link>
  )
}
