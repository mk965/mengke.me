import { allBlogs, allSnippets } from 'contentlayer/generated'
import type { MetadataRoute } from 'next'
import { SITE_METADATA } from '~/data/site-metadata'
import { POSTS_PER_PAGE } from '~/utils/const'
import tagData from '~/json/tag-data.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = SITE_METADATA.siteUrl

  const blogRoutes = allBlogs
    .filter((p) => !p.draft)
    .map(({ path, lastmod, date }) => ({
      url: `${siteUrl}/${path}`,
      lastModified: lastmod || date,
      priority: 0.7,
      changeFrequency: 'weekly' as const,
    }))

  const snippetRoutes = allSnippets
    .filter((s) => !s.draft)
    .map(({ path, lastmod, date }) => ({
      url: `${siteUrl}/snippets/${path}`,
      lastModified: lastmod || date,
      priority: 0.6,
      changeFrequency: 'monthly' as const,
    }))

  const totalPages = Math.ceil(allBlogs.filter((p) => !p.draft).length / POSTS_PER_PAGE)
  const blogPaginationRoutes = Array.from({ length: totalPages - 1 }, (_, i) => ({
    url: `${siteUrl}/blog/page/${i + 2}`,
    lastModified: new Date().toISOString().split('T')[0],
    priority: 0.3,
    changeFrequency: 'weekly' as const,
  }))

  const importantTags = Object.entries(tagData)
    .filter(([_, count]) => (count as number) >= 3)
    .map(([tag, _]) => tag)

  const tagRoutes = importantTags.map((tag) => ({
    url: `${siteUrl}/tags/${tag}`,
    lastModified: new Date().toISOString().split('T')[0],
    priority: 0.4,
    changeFrequency: 'weekly' as const,
  }))

  const routes = [
    {
      url: `${siteUrl}`,
      lastModified: new Date().toISOString().split('T')[0],
      priority: 1.0,
      changeFrequency: 'daily' as const,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date().toISOString().split('T')[0],
      priority: 0.9,
      changeFrequency: 'daily' as const,
    },
    {
      url: `${siteUrl}/snippets`,
      lastModified: new Date().toISOString().split('T')[0],
      priority: 0.8,
      changeFrequency: 'weekly' as const,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: new Date().toISOString().split('T')[0],
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date().toISOString().split('T')[0],
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    },
    {
      url: `${siteUrl}/friends`,
      lastModified: new Date().toISOString().split('T')[0],
      priority: 0.6,
      changeFrequency: 'monthly' as const,
    },
    {
      url: `${siteUrl}/tags`,
      lastModified: new Date().toISOString().split('T')[0],
      priority: 0.5,
      changeFrequency: 'weekly' as const,
    },
  ]

  return [...routes, ...blogRoutes, ...snippetRoutes, ...blogPaginationRoutes, ...tagRoutes]
}
