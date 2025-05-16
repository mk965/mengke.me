import type { MDXDocumentDate } from '~/types/data'

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })
}

export async function fetcher(url: string) {
  return fetch(url).then((res) => res.json())
}

export function kebabCaseToPlainText(str: string): string {
  return str.replace(/-/g, ' ')
}

export function capitalize(str: string): string {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`
}

function is(interval: number, cycle: number) {
  return cycle >= interval ? Math.floor(cycle / interval) : 0
}

export function getTimeAgo(time: string | number | Date, now = Date.now()) {
  if (typeof time === 'string' || time instanceof Date) {
    time = new Date(time).getTime()
  }

  const secs = (now - time) / 1000
  const mins = is(60, secs)
  const hours = is(60, mins)
  const days = is(24, hours)
  const weeks = is(7, days)
  const months = is(30, days)
  const years = is(12, months)

  let amount = years
  let cycle = 'year'

  if (secs <= 1) {
    return 'just now'
  }
  if (years > 0) {
    amount = years
    cycle = 'year'
  } else if (months > 0) {
    amount = months
    cycle = 'month'
  } else if (weeks > 0) {
    amount = weeks
    cycle = 'week'
  } else if (days > 0) {
    amount = days
    cycle = 'day'
  } else if (hours > 0) {
    amount = hours
    cycle = 'hour'
  } else if (mins > 0) {
    amount = mins
    cycle = 'minute'
  } else {
    amount = secs
    cycle = 'second'
  }

  const v = Math.floor(amount)

  return `${v === 1 ? (amount === hours ? 'an' : 'a') : v} ${cycle}${v > 1 ? 's' : ''} ago`
}

function dateSortDesc(a: string, b: string) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

/**
 * Sorts a list of MDX documents by date in descending order
 */
export function sortPosts<T extends MDXDocumentDate>(allBlogs: T[], dateKey: string = 'date'): T[] {
  return allBlogs.sort((a, b) => dateSortDesc(a[dateKey], b[dateKey]))
}
