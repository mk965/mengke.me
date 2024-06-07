import { siteMetadata } from '~/data/siteMetadata'
import { Link } from '../Link'
import { Twemoji } from '../Twemoji'

export function BlogLinks() {
  return (
    <div className="flex flex-col space-y-1.5">
      <Link href="/blog" className="hover:underline">
        <Twemoji emoji="memo" />
        <span data-umami-event="home-link-blog" className="ml-1.5">
          My Writings
        </span>
      </Link>
      <Link href="/about" className="hover:underline">
        <Twemoji emoji="face-with-monocle" />
        <span data-umami-event="home-link-about" className="ml-1.5">
          More About Me
        </span>
      </Link>
      <Link href={siteMetadata.analyticsURL} className="hover:underline">
        <Twemoji emoji="bar-chart" />
        <span data-umami-event="home-link-analytics" className="ml-1.5">
          Traffic & Engagement of This Site
        </span>
      </Link>
    </div>
  )
}
