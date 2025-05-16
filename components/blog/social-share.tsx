'use client'

import { clsx } from 'clsx'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WeiboShareButton,
  WeiboIcon,
  XIcon,
  LinkedinIcon,
  FacebookIcon,
} from 'react-share'
import { AUTHOR_INFO } from '~/data/author-info'

type SocialButtonsProps = {
  postUrl: string
  title: string
  className?: string
}

export function SocialShare({ postUrl, title, className }: SocialButtonsProps) {
  return (
    <div className={clsx('flex items-center gap-2 text-white', className)}>
      <span className="hidden text-gray-500 lg:inline">Share:</span>
      <WeiboShareButton url={postUrl} title={title}>
        <WeiboIcon className="h-8 w-8 rounded-full" />
      </WeiboShareButton>
      <TwitterShareButton url={postUrl} title={title} via={AUTHOR_INFO.social.x}>
        <XIcon className="h-8 w-8 rounded-full" />
      </TwitterShareButton>
      <LinkedinShareButton url={postUrl} title={title}>
        <LinkedinIcon className="h-8 w-8 rounded-full" />
      </LinkedinShareButton>
      <FacebookShareButton url={postUrl}>
        <FacebookIcon className="h-8 w-8 rounded-full" />
      </FacebookShareButton>
    </div>
  )
}
