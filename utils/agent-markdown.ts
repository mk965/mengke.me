import { allBlogs, allMoments, allSnippets } from 'content-collections'
import { SITE_METADATA } from '~/data/site-metadata'
import { sortPosts } from '~/utils/misc'

// Builders for the markdown representation served to agents
// (see middleware.ts and app/agent-md). Everything is derived from the
// content collections, so no page markup is involved: posts and snippets
// reuse their MDX source (body.raw), listings are rendered from metadata.

const isProduction = process.env.NODE_ENV === 'production'

function visible<T extends { draft?: boolean }>(items: T[]): T[] {
  return isProduction ? items.filter((item) => item.draft !== true) : items
}

function cleanRaw(raw: string): string {
  let text = raw.trim()
  // Defensive: body.raw should already exclude frontmatter, but strip a
  // leading frontmatter block if one ever slips through.
  if (text.startsWith('---')) {
    const end = text.indexOf('\n---', 3)
    if (end !== -1) text = text.slice(end + 4).trim()
  }
  // MDX import statements have no meaning in plain markdown.
  return text.replace(/^import\s.+$/gm, '').trim()
}

function formatDate(isoDate: string): string {
  return isoDate.slice(0, 10)
}

type Blog = (typeof allBlogs)[number]
type Snippet = (typeof allSnippets)[number]

export function findPost(slug: string): Blog | undefined {
  return visible(allBlogs).find((post) => post.slug === slug)
}

export function findSnippet(slug: string): Snippet | undefined {
  return visible(allSnippets).find((snippet) => snippet.slug === slug)
}

export function postMarkdown(post: Blog): string {
  const lines = [`# ${post.title}`, '']
  if (post.summary) lines.push(post.summary, '')
  lines.push(`- 发布日期：${formatDate(post.date)}`)
  if (post.tags.length > 0) lines.push(`- 标签：${post.tags.join(', ')}`)
  lines.push(`- 原文：${SITE_METADATA.siteUrl}/blog/${post.slug}`, '', '---', '')
  lines.push(cleanRaw(post.body.raw))
  return lines.join('\n')
}

export function snippetMarkdown(snippet: Snippet): string {
  const lines = [`# ${snippet.title}`, '']
  if (snippet.summary) lines.push(snippet.summary, '')
  lines.push(`- 发布日期：${formatDate(snippet.date)}`)
  if (snippet.tags.length > 0) lines.push(`- 标签：${snippet.tags.join(', ')}`)
  lines.push(`- 原文：${SITE_METADATA.siteUrl}/snippets/${snippet.slug}`, '', '---', '')
  lines.push(cleanRaw(snippet.body.raw))
  return lines.join('\n')
}

function postListItem(post: Blog): string {
  const summary = post.summary ? `\n  ${post.summary}` : ''
  return `- [${post.title}](${SITE_METADATA.siteUrl}/blog/${post.slug})（${formatDate(post.date)}）${summary}`
}

export function blogIndexMarkdown(): string {
  const posts = sortPosts(visible(allBlogs))
  return [`# 全部文章`, '', ...posts.map(postListItem), ''].join('\n')
}

export function momentsMarkdown(): string {
  const moments = sortPosts(visible(allMoments))
  const lines = ['# 动态', '']
  for (const moment of moments) {
    lines.push(`## ${formatDate(moment.date)}`, '', cleanRaw(moment.body.raw), '')
  }
  return lines.join('\n')
}

export function homeMarkdown(): string {
  const posts = sortPosts(visible(allBlogs)).slice(0, 5)
  const snippets = sortPosts(visible(allSnippets)).slice(0, 6)
  const lines = [
    `# ${SITE_METADATA.title}`,
    '',
    SITE_METADATA.description,
    '',
    '## 最新文章',
    '',
    ...posts.map(postListItem),
    '',
    '## 代码片段',
    '',
    ...snippets.map(
      (snippet) =>
        `- [${snippet.title}](${SITE_METADATA.siteUrl}/snippets/${snippet.slug})（${formatDate(snippet.date)}）`
    ),
    '',
    '## 更多',
    '',
    `- [全部文章](${SITE_METADATA.siteUrl}/blog)`,
    `- [动态](${SITE_METADATA.siteUrl}/moment)`,
    `- [关于](${SITE_METADATA.siteUrl}/about)`,
    '',
  ]
  return lines.join('\n')
}
