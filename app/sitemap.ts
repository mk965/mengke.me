import { allBlogs, allSnippets } from 'contentlayer/generated'
import type { MetadataRoute } from 'next'
import { SITE_METADATA } from '~/data/site-metadata'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = SITE_METADATA.siteUrl
  const blogRoutes = allBlogs
    .filter((p) => !p.draft)
    .map(({ path, lastmod, date }) => ({
      url: `${siteUrl}/${path}`,
      lastModified: lastmod || date,
    }))
  const snippetRoutes = allSnippets
    .filter((s) => !s.draft)
    .map(({ path, lastmod, date }) => ({
      url: `${siteUrl}/snippets/${path}`,
      lastModified: lastmod || date,
    }))

  const routes = ['', 'blog', 'snippets', 'projects', 'about', 'books', 'movies', 'tags'].map(
    (route) => ({
      url: `${siteUrl}/${route}`,
      lastModified: new Date().toISOString().split('T')[0],
    })
  )

  return [...routes, ...blogRoutes, ...snippetRoutes]
}
