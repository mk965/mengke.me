import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Markdown for Agents (content negotiation): clients that explicitly send
// `Accept: text/markdown` get a markdown representation of content pages,
// while browsers keep getting HTML. Scoped to the home page, the blog index,
// blog posts, snippets and the moments page. The markdown itself is rendered
// by app/agent-md, which only answers requests carrying the x-agent-md
// header set here.
const BLOG_POST_PATH = /^\/blog\/[^/]+\/[^/]+\/?$/
const SNIPPET_PATH = /^\/snippets\/.+/

function isInScope(pathname: string) {
  return (
    pathname === '/' ||
    pathname === '/blog' ||
    pathname === '/moment' ||
    BLOG_POST_PATH.test(pathname) ||
    SNIPPET_PATH.test(pathname)
  )
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const inScope = isInScope(pathname)
  const wantsMarkdown = (request.headers.get('accept') || '').includes('text/markdown')

  if (inScope && wantsMarkdown) {
    const url = request.nextUrl.clone()
    url.pathname = `/agent-md${pathname === '/' ? '' : pathname}`
    const headers = new Headers(request.headers)
    headers.set('x-agent-md', '1')
    const response = NextResponse.rewrite(url, { request: { headers } })
    // The same URL now serves two representations; caches must key on Accept.
    response.headers.set('Vary', 'Accept')
    return response
  }

  if (inScope) {
    const response = NextResponse.next()
    response.headers.set('Vary', 'Accept')
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/blog', '/blog/:path*', '/snippets/:path*', '/moment'],
}
