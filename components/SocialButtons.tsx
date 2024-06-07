import { siteMetadata } from '~/data/siteMetadata'
import { Link } from './Link'
import type { SocialButtonsProps } from '~/types'

export function SocialButtons({ postUrl, title, fileName }: SocialButtonsProps) {
  let creatEditOnGithubUrl = (fileName: string) =>
    `${siteMetadata.siteRepo}/blob/main/data/blog/${fileName}`

  return (
    <div className="items-center justify-between pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300 md:flex">
      <div className="mb-6 md:mb-0">
        <Link href={creatEditOnGithubUrl(fileName)} className="hover:underline">
          {'View on GitHub'}
        </Link>
      </div>
    </div>
  )
}
