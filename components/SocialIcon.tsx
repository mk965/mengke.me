import type { AnchorHTMLAttributes } from 'react'
import type { SocialIconProps } from '~/types'
import Github from '~/icons/github.svg'
import Mail from '~/icons/mail.svg'

export let SocialIconsMap = {
  Mail,
  Github,
}

export function SocialIcon({ name, href }: SocialIconProps) {
  let SocialSvg = SocialIconsMap[name]
  let attrs: AnchorHTMLAttributes<HTMLAnchorElement> = {
    href,
    target: name !== 'Mail' ? '_blank' : '_self',
    rel: 'noopener noreferrer',
  }

  return (
    <a className="text-sm text-gray-500 transition hover:text-gray-600" {...attrs}>
      <span className="sr-only">{name}</span>
      <SocialSvg
        className={`h-6 w-6 fill-current text-gray-700 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400`}
      />
    </a>
  )
}
