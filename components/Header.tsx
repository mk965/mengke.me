import clsx from 'clsx'
import { headerNavLinks } from 'data/headerNavLinks'
import NextImage from 'next/image'
import { useRouter } from 'next/router'
import { AnalyticsLink } from './AnalyticsLink'
import { Link } from './Link'
import { ThemeSwitcher } from './ThemeSwitcher'
import { siteMetadata } from '~/data/siteMetadata'

export function Header({ onToggleNav }: { onToggleNav: () => void }) {
  let router = useRouter()
  return (
    <header className="sticky top-0 z-40 py-3 overflow-x-hidden supports-backdrop-blur:bg-white/95 bg-white/75 backdrop-blur dark:bg-dark/75">
      <div className="flex items-center justify-between max-w-3xl px-3 mx-auto xl:max-w-5xl xl:px-0">
        <div>
          <Link href="/" aria-label="Mengke's Blog">
            <div className="flex items-center justify-between" data-umami-event="logo">
              <div className="flex items-center justify-center mr-3">
                <NextImage
                  src={siteMetadata.siteLogo}
                  alt="Mengke's Blog logo"
                  width={45}
                  height={45}
                  className="rounded-full"
                  priority
                />
              </div>
            </div>
          </Link>
        </div>
        <div className="flex items-center text-base leading-5">
          <div className="hidden space-x-2 sm:block">
            {headerNavLinks.map((link) => {
              return (
                <Link key={link.title} href={link.href}>
                  <span
                    className={clsx(
                      'inline-block rounded px-2 py-1 font-medium text-gray-900 dark:text-gray-100 sm:px-3 sm:py-2',
                      router.pathname.startsWith(link.href)
                        ? 'bg-gray-200 dark:bg-gray-700'
                        : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                    )}
                    data-umami-event={`nav-${link.href.replace('/', '')}`}
                  >
                    {link.title}
                  </span>
                </Link>
              )
            })}
          </div>
          <AnalyticsLink />
          <ThemeSwitcher />
          <button
            className="w-8 h-8 ml-2 mr-1 rounded sm:hidden"
            type="button"
            aria-label="Toggle Menu"
            onClick={onToggleNav}
            data-umami-event="mobile-nav-toggle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="text-gray-900 dark:text-gray-100"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
