import {
  blogIndexMarkdown,
  findPost,
  findSnippet,
  homeMarkdown,
  momentsMarkdown,
  postMarkdown,
  snippetMarkdown,
} from '~/utils/agent-markdown'

// Markdown representations for agents, reached only through the middleware
// rewrite in middleware.ts (which sets x-agent-md). Direct hits get a 404 so
// this never becomes a second, indexable copy of the content.
export async function GET(
  request: Request,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  if (request.headers.get('x-agent-md') !== '1') {
    return new Response('Not found', { status: 404 })
  }

  const { path = [] } = await params
  let markdown: string | null = null

  if (path.length === 0) {
    markdown = homeMarkdown()
  } else if (path[0] === 'blog' && path.length === 1) {
    markdown = blogIndexMarkdown()
  } else if (path[0] === 'blog') {
    const post = findPost(decodeURI(path.slice(1).join('/')))
    if (post) markdown = postMarkdown(post)
  } else if (path[0] === 'snippets') {
    const snippet = findSnippet(decodeURI(path.slice(1).join('/')))
    if (snippet) markdown = snippetMarkdown(snippet)
  } else if (path[0] === 'moment') {
    markdown = momentsMarkdown()
  }

  if (markdown === null) {
    return new Response('Not found', { status: 404 })
  }

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      Vary: 'Accept',
    },
  })
}
