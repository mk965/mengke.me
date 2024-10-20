'use client'

import { useEffect } from 'react'
import useSWR from 'swr'
import type { ViewApiResponse, ViewCounterProps } from '~/types/data'
import { fetcher } from '~/utils/misc'

export function ViewCounter({ slug, className }: ViewCounterProps) {
  const { data } = useSWR(`/api/views/${slug}`, fetcher) as ViewApiResponse
  const views = Number(data?.total)

  useEffect(() => {
    const registerView = () => fetch(`/api/views/${slug}`, { method: 'POST' })
    registerView()
  }, [slug])

  return <span className={className}>{+views > 0 ? views.toLocaleString() : '–––'} views</span>
}
