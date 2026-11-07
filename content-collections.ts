import type { Context, Meta } from '@content-collections/core'
import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic'
import path from 'path'
import readingTime from 'reading-time'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeCitation from 'rehype-citation'
import rehypeKatex from 'rehype-katex'
import rehypePresetMinify from 'rehype-preset-minify'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { remarkAlert } from 'remark-github-blockquote-alert'
import remarkMath from 'remark-math'
import { z } from 'zod'
import { SITE_METADATA } from './data/site-metadata'
import { remarkCodeTitles } from './utils/remark-code-titles'
import { remarkImgToJsx } from './utils/remark-img-to-jsx'
import { extractTocHeadings } from './utils/remark-toc-headings'

const root = process.cwd()

// heroicon mini link
const icon = fromHtmlIsomorphic(
  `
    <span class="content-header-link">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 linkicon">
        <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
        <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
      </svg>
    </span>
  `,
  { fragment: true }
)

// Same remark/rehype pipeline the old contentlayer config used.
// (remarkExtractFrontmatter is dropped: nothing in the codebase consumes
// file.data.frontmatter, and the compiled body no longer contains a yaml node.)
const mdxOptions = {
  cwd: root,
  remarkPlugins: [remarkGfm, remarkCodeTitles, remarkMath, remarkImgToJsx, remarkAlert],
  rehypePlugins: [
    rehypeSlug,
    [
      rehypeAutolinkHeadings,
      {
        behavior: 'prepend',
        headingProperties: {
          className: ['content-header'],
        },
        content: icon,
      },
    ],
    rehypeKatex,
    [rehypeCitation, { path: path.join(root, 'data') }],
    [
      rehypePrettyCode,
      {
        theme: {
          dark: 'github-dark-dimmed',
          light: 'solarized-light',
        },
      },
    ],
    rehypePresetMinify,
  ],
} as Parameters<typeof compileMDX>[2]

const dateLike = z.union([z.string(), z.date()])

const sharedFields = {
  tags: z.array(z.string()).default([]),
  lastmod: dateLike.optional(),
  draft: z.boolean().optional(),
  summary: z.string().optional(),
  images: z.union([z.string(), z.array(z.string())]).optional(),
  authors: z.array(z.string()).optional(),
  layout: z.string().optional(),
  bibliography: z.string().optional(),
  canonicalUrl: z.string().optional(),
  content: z.string(),
}

function toIsoString(value: string | Date): string {
  return new Date(value).toISOString()
}

// Reproduces the old contentlayer computed fields (slug/path/filePath/
// readingTime/toc/body) plus the `type` discriminator contentlayer added.
// Note: no explicit return-type annotation here — content-collections checks
// that the transform result is serializable, and its check only passes on the
// inferred concrete object type, not on a hand-written intersection type.
async function withComputedFields<
  T extends { content: string; _meta: Meta; date?: string | Date; lastmod?: string | Date },
>(ctx: Pick<Context, 'cache'>, doc: T, typeName: string, withToc: boolean) {
  const { content, _meta, date, lastmod, ...rest } = doc
  const code = await compileMDX(ctx, doc, mdxOptions)
  return {
    ...rest,
    ...(date ? { date: toIsoString(date) } : {}),
    ...(lastmod ? { lastmod: toIsoString(lastmod) } : {}),
    type: typeName,
    slug: _meta.path.replace(/^.+?\//, ''),
    path: _meta.path,
    filePath: _meta.filePath,
    ...(withToc
      ? {
          // Reshaped into a plain object: reading-time's result is declared as
          // an `interface`, which TypeScript does not consider assignable to
          // content-collections' Record-based Serializable check.
          readingTime: (({ text, minutes, time, words }) => ({ text, minutes, time, words }))(
            readingTime(content)
          ),
          toc: await extractTocHeadings(content),
        }
      : {}),
    body: { raw: content, code },
    _meta,
  }
}

export const blogs = defineCollection({
  name: 'blogs',
  typeName: 'Blog',
  directory: 'data',
  include: 'blog/**/*.mdx',
  schema: z.object({
    title: z.string(),
    date: dateLike,
    ...sharedFields,
  }),
  transform: async (doc, ctx) => {
    const base = await withComputedFields(ctx, doc, 'Blog', true)
    // Explicit (non-spread) `date` so the generated type keeps it a required
    // string, as contentlayer's `date` field type did.
    const date = toIsoString(doc.date)
    const url = `${SITE_METADATA.siteUrl}/${base.path}`
    const rawImage = Array.isArray(doc.images) ? doc.images[0] : doc.images
    const image = rawImage
      ? rawImage.startsWith('http')
        ? rawImage
        : `${SITE_METADATA.siteUrl}${rawImage}`
      : `${SITE_METADATA.siteUrl}${SITE_METADATA.socialBanner}`
    return {
      ...base,
      date,
      // Always present for Blog/Snippet (the helper computed them with
      // withToc=true); asserted so the generated types keep them required,
      // as contentlayer's computed fields were.
      readingTime: base.readingTime!,
      toc: base.toc!,
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: doc.title,
        datePublished: date,
        dateModified: base.lastmod || date,
        description: doc.summary,
        image,
        url,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url,
        },
      },
    }
  },
})

export const snippets = defineCollection({
  name: 'snippets',
  typeName: 'Snippet',
  directory: 'data',
  include: 'snippets/**/*.mdx',
  schema: z.object({
    heading: z.string(),
    title: z.string(),
    icon: z.string(),
    date: dateLike,
    ...sharedFields,
  }),
  transform: async (doc, ctx) => {
    const base = await withComputedFields(ctx, doc, 'Snippet', true)
    const date = toIsoString(doc.date)
    return {
      ...base,
      date,
      readingTime: base.readingTime!,
      toc: base.toc!,
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'CodeSnippet',
        headline: doc.title,
        datePublished: date,
        dateModified: base.lastmod || date,
        description: doc.summary,
        image: doc.images ? doc.images[0] : SITE_METADATA.socialBanner,
        url: `${SITE_METADATA.siteUrl}/${base.path}`,
      },
    }
  },
})

export const moments = defineCollection({
  name: 'moments',
  typeName: 'Moment',
  directory: 'data',
  include: 'moments/**/*.mdx',
  schema: z.object({
    date: dateLike,
    images: z.union([z.string(), z.array(z.string())]).optional(),
    draft: z.boolean().optional(),
    content: z.string(),
  }),
  transform: async (doc, ctx) => {
    const base = await withComputedFields(ctx, doc, 'Moment', false)
    return { ...base, date: toIsoString(doc.date) }
  },
})

export const authors = defineCollection({
  name: 'authors',
  typeName: 'Author',
  directory: 'data',
  include: 'authors/**/*.mdx',
  schema: z.object({
    name: z.string(),
    avatar: z.string().nullish(),
    occupation: z.string().nullish(),
    company: z.string().nullish(),
    email: z.string().nullish(),
    twitter: z.string().nullish(),
    linkedin: z.string().nullish(),
    github: z.string().nullish(),
    layout: z.string().nullish(),
    content: z.string(),
  }),
  transform: async (doc, ctx) => withComputedFields(ctx, doc, 'Author', true),
})

export default defineConfig({
  content: [blogs, snippets, moments, authors],
})
