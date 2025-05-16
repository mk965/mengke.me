'use client'

import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { Container } from '~/components/ui/container'
import { GrowingUnderline } from '~/components/ui/growing-underline'
import { Link } from '~/components/ui/link'
import { HEADER_NAV_LINKS } from '~/data/navigation'
import { SITE_METADATA } from '~/data/site-metadata'
import { Logo } from './logo'
import { MobileNav } from './mobile-nav'
import { MoreLinks } from './more-links'
import { ThemeSwitcher } from './theme-switcher'
import { AUTHOR_INFO } from '~/data/author-info'
import { KbarSearchTrigger } from '../search/kbar-trigger'

let logged = false
function logASCIItext() {
  if (logged) return
  console.info(`
                                 __                                       
                                /\\ \\                                      
  ___ ___      __    ___      __\\ \\ \\/'\\      __        ___ ___      __   
/' __\` __\`\\  /'__\`\\/' _ \`\\  /'_ \`\\ \\ , <    /'__\`\\    /' __\` __\`\\  /'__\`\\ 
/\\ \\/\\ \\/\\ \\/\\  __//\\ \\/\\ \\/\\ \\L\\ \\ \\ \\\\\`\\ /\\  __/  __/\\ \\/\\ \\/\\ \\/\\  __/ 
\\ \\_\\ \\_\\ \\_\\ \\____\\ \\_\\ \\_\\ \\____ \\ \\_\\ \\_\\ \\____\\/\\_\\ \\_\\ \\_\\ \\_\\ \\____\\
 \\/_/\\/_/\\/_/\\/____/\\/_/\\/_/\\/___L\\ \\/_/\\/_/\\/____/\\/_/\\/_/\\/_/\\/_/\\/____/
                              /\\____/                                     
                              \\_/__/                                                          
  `)
  console.log('🧑‍💻 View source:', SITE_METADATA.siteRepo)
  console.log(`🙌 Let's connect:`, AUTHOR_INFO.email)
  logged = true
}

export function Header() {
  const pathname = usePathname()
  useEffect(logASCIItext, [])

  return (
    <Container
      as="header"
      className={clsx(
        'bg-white/75 py-2 backdrop-blur dark:bg-dark/75',
        'shadow-sm saturate-100 md:rounded-2xl',
        SITE_METADATA.stickyNav && 'sticky top-2 z-50 lg:top-3'
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <Logo />
        <div className="flex items-center gap-4">
          <div className="hidden gap-1.5 sm:flex">
            {HEADER_NAV_LINKS.map(({ title, href }) => {
              const isActive = pathname.startsWith(href)
              return (
                <Link key={title} href={href} className="px-3 py-1 font-medium">
                  <GrowingUnderline
                    className={clsx(isActive && 'bg-[length:100%_50%]')}
                    data-umami-event={`nav-${href.replace('/', '')}`}
                  >
                    {title}
                  </GrowingUnderline>
                </Link>
              )
            })}
            <MoreLinks />
          </div>
          <div
            data-orientation="vertical"
            role="separator"
            className="hidden h-4 w-px shrink-0 bg-gray-200 dark:bg-gray-600 md:block"
          />
          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <KbarSearchTrigger />
            <MobileNav />
          </div>
        </div>
      </div>
    </Container>
  )
}
