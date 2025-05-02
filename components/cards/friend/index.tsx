'use client'

import { GradientBorder } from '~/components/ui/gradient-border'
import { GrowingUnderline } from '~/components/ui/growing-underline'
import { Image, Zoom } from '~/components/ui/image'
import { Link } from '~/components/ui/link'
import { TiltedGridBackground } from '~/components/ui/tilted-grid-background'
import type { ImdbFriends } from '~/types/data'

export function FriendCard({ friend }: { friend: ImdbFriends }) {
  const { name, slogan, imgSrc, url } = friend

  return (
    <GradientBorder className="rounded-xl shadow-sm dark:bg-white/5">
      <TiltedGridBackground className="inset-0 z-[-1]" />
      <div className="flex gap-5 md:gap-5">
        <div className="m-4 flex shrink-0 items-end">
          <Zoom
            zoomImg={{ src: imgSrc, alt: name }}
            canSwipeToUnzoom={false} // Not working
            zoomMargin={20}
          >
            <Image
              src={imgSrc}
              alt={name}
              width={300}
              height={450}
              className="h-24 w-24 rounded-lg shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] md:h-36 md:w-36"
            />
          </Zoom>
        </div>
        <div className="relative flex grow flex-col gap-1 overflow-hidden pb-4 pr-2 pt-2 md:pr-4">
          <div className="flex items-start justify-between gap-3 text-xl font-semibold md:text-2xl">
            <Link href={url}>
              <GrowingUnderline>{name}</GrowingUnderline>
            </Link>
          </div>
          <div className="grow">
            <div className="flex flex-wrap items-center gap-1 text-gray-500 dark:text-gray-400">
              <span>{slogan}</span>
            </div>
          </div>
          <Link href={url} className="" aria-label="All posts">
            <GrowingUnderline data-umami-event="visit-friend">
              <span className="hidden md:inline-block">Visit</span>
              <span className="md:hidden">More</span> &rarr;
            </GrowingUnderline>
          </Link>
        </div>
      </div>
    </GradientBorder>
  )
}

function formatRuntime(runtime: string) {
  const _mins = Number(runtime)
  const hours = Math.floor(_mins / 60)
  const mins = _mins % 60
  return `${hours}h ${mins < 10 ? '0' : ''}${mins}m`
}
