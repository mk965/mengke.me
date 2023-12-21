import { siteMetadata } from '~/data/siteMetadata'
import { BuiltWith } from './BuiltWith'

export function Footer() {
  return (
    <footer>
      <div className="items-center justify-between mt-16 mb-8 space-y-4 md:mb-10 md:flex md:space-y-0">
        <BuiltWith />
        <div></div>
        <div className="flex my-2 space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{`Copyright © ${new Date().getFullYear()}`}</div>
          <span>{` • `}</span>
          <span>{siteMetadata.footerTitle}</span>
        </div>
      </div>
    </footer>
  )
}
