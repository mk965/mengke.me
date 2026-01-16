'use client'

import type { Action } from 'kbar'
import { KBarProvider, useKBar } from 'kbar'
import { useRouter } from 'next/navigation.js'
import { useCallback, useEffect, useState, type ReactNode } from 'react'
import type { CoreContent, MDXDocument } from '~/types/data'
import { formatDate } from '~/utils/misc'
import { KBarModal } from './kbar-modal'

export interface KBarSearchProps {
  searchDocumentsPath: string | false
  defaultActions?: Action[]
  onSearchDocumentsLoad?: (json: any) => Action[]
}

export interface KBarConfig {
  provider: 'kbar'
  kbarConfig: KBarSearchProps
}

export function KBarSearchProvider({
  configs,
  children,
}: {
  configs: KBarSearchProps
  children: ReactNode
}) {
  const { searchDocumentsPath, defaultActions, onSearchDocumentsLoad } = configs
  const router = useRouter()
  const [searchActions, setSearchActions] = useState<Action[]>([])
  const [dataLoaded, setDataLoaded] = useState(searchDocumentsPath ? false : true)
  const [hasRequested, setHasRequested] = useState(false)

  const mapPosts = useCallback(
    (posts: CoreContent<MDXDocument>[]) => {
      const actions: Action[] = []
      for (const post of posts) {
        actions.push({
          id: post.path,
          name: post.title,
          keywords: post?.summary || '',
          section: 'Content',
          subtitle: formatDate(post.date),
          perform: () => router.push('/' + post.path),
        })
      }
      return actions
    },
    [router]
  )

  const fetchSearchActions = useCallback(async () => {
    if (!searchDocumentsPath) return
    if (hasRequested) return
    setHasRequested(true)

    try {
      const url =
        searchDocumentsPath.indexOf('://') > 0 || searchDocumentsPath.indexOf('//') === 0
          ? searchDocumentsPath
          : new URL(searchDocumentsPath, window.location.origin).toString()
      const res = await fetch(url)
      const json = await res.json()
      const actions = onSearchDocumentsLoad ? onSearchDocumentsLoad(json) : mapPosts(json)
      setSearchActions(actions)
    } finally {
      setDataLoaded(true)
    }
  }, [hasRequested, mapPosts, onSearchDocumentsLoad, searchDocumentsPath])

  return (
    <KBarProvider actions={defaultActions}>
      <KBarOpenLazyLoader
        enabled={!dataLoaded && !!searchDocumentsPath}
        onOpen={fetchSearchActions}
      />
      <KBarModal actions={searchActions} isLoading={!dataLoaded} />
      {children}
    </KBarProvider>
  )
}

function KBarOpenLazyLoader({ enabled, onOpen }: { enabled: boolean; onOpen: () => void }) {
  const visualState = useKBar((state) => state.visualState)

  useEffect(() => {
    if (!enabled) return
    // kbar visualState is typically: "showing" | "animatingIn" | "hidden" | "animatingOut"
    if (visualState !== 'hidden') {
      onOpen()
    }
  }, [enabled, onOpen, visualState])

  return null
}
