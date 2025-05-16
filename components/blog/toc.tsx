'use client'

import { clsx } from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { Link } from '~/components/ui/link'

type TocItem = {
  value: string
  url: string
  depth: number
}

function useActiveTocItem(ids: string[]) {
  const [inViewIds, setInViewIds] = useState<string[]>([])
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (document) {
      const headings = ids.map((id) =>
        document.getElementById(id.startsWith('#') ? id.slice(1) : id)
      )
      observer.current?.disconnect()
      observer.current = new IntersectionObserver(
        (entries) => {
          for (const { intersectionRatio, target } of entries) {
            if (intersectionRatio > 0) {
              if (!inViewIds.includes(target.id)) {
                setInViewIds([...inViewIds, target.id])
              }
            } else {
              if (inViewIds.includes(target.id) && inViewIds.length > 1) {
                setInViewIds(inViewIds.filter((id) => id !== target.id))
              }
            }
          }
        },
        { rootMargin: '-96px 0% 0% 0%' }
      )
      for (const el of headings) {
        el && observer.current.observe(el)
      }
      return () => observer.current?.disconnect()
    }
  }, [ids])

  return inViewIds[0]
}

export function TableOfContents({ toc, className }: { toc: TocItem[]; className?: string }) {
  const ids = toc.map((item) => item.url)
  const activeId = useActiveTocItem(ids)

  return (
    <details className={clsx('space-y-4 [&_.chevron-right]:open:rotate-90', className)} open>
      <summary className="flex cursor-pointer items-center gap-1 marker:content-none">
        <ChevronRight
          strokeWidth={1.5}
          size={20}
          className="chevron-right rotate-0 transition-transform"
        />
        <span className="text-lg font-medium">On this page</span>
      </summary>
      <ul className="flex flex-col space-y-2">
        {toc.map(({ value, depth, url }) => (
          <li
            key={url}
            className={clsx([
              'font-medium',
              url === `#${activeId}`
                ? 'text-gray-700 dark:text-gray-200'
                : 'text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-200',
            ])}
            style={{ paddingLeft: (depth - 2) * 16 }}
          >
            <Link href={url}>{value}</Link>
          </li>
        ))}
      </ul>
    </details>
  )
}
