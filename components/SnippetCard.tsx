import type { SnippetFrontMatter } from '~/types'
import { DevIcon } from './DevIcon'
import { Link } from './Link'

export function SnippetCard({ snippet }: { snippet: SnippetFrontMatter }) {
  let { type, heading, summary, title, slug } = snippet

  return (
    <Link href={`/snippets/${slug}`} title={title}>
      <div
        data-umami-event="view-snippet"
        className="flex gap-6 p-3 mb-4 border border-transparent rounded-lg cursor-pointer lg:p-4 shadow-intense hover:shadow-nextjs dark:shadow-intense-dark dark:hover:shadow-nextjs-dark lg:mb-0"
      >
        <div className="flex items-center justify-center">
          <DevIcon type={type} />
        </div>
        <div className="space-y-2 overflow-hidden">
          <h3 className="overflow-hidden text-lg font-bold leading-8 tracking-tight overflow-ellipsis whitespace-nowrap lg:text-xl">
            {heading}
          </h3>
          <p className="text-gray-700 dark:text-gray-400 lg:text-base">{summary}</p>
        </div>
      </div>
    </Link>
  )
}
