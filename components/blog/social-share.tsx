'use client'

import { clsx } from 'clsx'
import { Facebook, Linkedin } from 'lucide-react'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WeiboShareButton,
} from 'react-share'
import { AUTHOR_INFO } from '~/data/author-info'
import XIcon from '~/icons/x.svg'
import Weibo from '~/icons/weibo.svg'

type SocialButtonsProps = {
  postUrl: string
  title: string
  className?: string
}

export function SocialShare({ postUrl, title, className }: SocialButtonsProps) {
  return (
    <div className={clsx('flex items-center gap-2 text-white', className)}>
      <span className="hidden text-gray-500 lg:inline">Share:</span>
      <WeiboShareButton
        url={postUrl}
        title={title}
        className="flex items-center overflow-hidden rounded-full !bg-weibo !px-2 !py-2 text-white hover:opacity-90"
      >
        <Weibo className="h-4 w-4" fill="#fff" />
      </WeiboShareButton>
      <TwitterShareButton
        url={postUrl}
        title={title}
        via={AUTHOR_INFO.social.x}
        className="flex items-center overflow-hidden rounded-full !bg-x !px-2 !py-2 text-white hover:opacity-90"
      >
        <XIcon className="h-3.5 w-3.5" fill="#fff" viewBox="0 0 1200 1227" />
      </TwitterShareButton>
      <LinkedinShareButton
        url={postUrl}
        title={title}
        className="flex items-center overflow-hidden rounded-full !bg-linkedin !px-2 !py-2 text-white hover:opacity-90"
      >
        <Linkedin strokeWidth={1.5} size={16} />
      </LinkedinShareButton>
      <FacebookShareButton
        url={postUrl}
        className="flex items-center overflow-hidden rounded-full !bg-facebook !px-2 !py-2 text-white hover:opacity-90"
      >
        <Facebook strokeWidth={1.5} size={16} />
      </FacebookShareButton>
    </div>
  )
}
