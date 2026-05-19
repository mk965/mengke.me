import { allMoments } from 'contentlayer/generated'
import { clsx } from 'clsx'
import { Container } from '~/components/ui/container'
import { PageHeader } from '~/components/ui/page-header'
import { Image, Zoom } from '~/components/ui/image'
import { GritBackground } from '~/components/effects/grit-background'
import { MDXLayoutRenderer } from '~/components/mdx/layout-renderer'
import { MDX_COMPONENTS } from '~/components/mdx'
import { SITE_METADATA } from '~/data/site-metadata'
import { AUTHOR_INFO } from '~/data/author-info'
import { formatDate } from '~/utils/date'
import { sortPosts } from '~/utils/misc'

const isProduction = process.env.NODE_ENV === 'production'

function getMomentImages(images: unknown): string[] {
  if (!images) return []
  if (typeof images === 'string') return [images]
  if (Array.isArray(images)) return images.filter((i): i is string => typeof i === 'string')
  return []
}

export default function MomentPage() {
  const moments = sortPosts(allMoments.filter((m) => (isProduction ? m.draft !== true : true)))

  return (
    <Container className="py-6">
      <PageHeader
        title="Moment"
        description="Record every bit of life and share your daily thoughts and insights"
        className="border-b border-gray-200 pb-6 dark:border-gray-700"
      />
      <div className="mx-auto mt-8 max-w-2xl space-y-8">
        {moments.map((moment) => {
          const images = getMomentImages(moment.images)
          return (
            <article key={moment._id} className="group">
              <div
                className={clsx([
                  'relative overflow-hidden rounded-2xl',
                  'bg-white shadow-sm transition-all duration-300',
                  'dark:bg-white/5 dark:shadow-none',
                  'border border-gray-100 dark:border-gray-800',
                  'hover:shadow-lg hover:shadow-gray-900/5',
                  'dark:hover:shadow-black/20',
                ])}
              >
                <GritBackground className="absolute inset-0 opacity-30 dark:opacity-100" />
                <div className="relative p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="relative">
                      <Image
                        src={SITE_METADATA.siteLogo}
                        alt={AUTHOR_INFO.name}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full ring-2 ring-white dark:ring-gray-800"
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-900"></div>
                    </div>
                    <div className="leading-tight">
                      <div className="font-semibold text-gray-900 dark:text-gray-100">
                        {AUTHOR_INFO.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(moment.date)}
                      </div>
                    </div>
                  </div>
                  <div className="prose prose-sm prose-gray max-w-none dark:prose-invert">
                    <MDXLayoutRenderer code={moment.body.code} components={MDX_COMPONENTS} />
                  </div>
                  {images.length > 0 && (
                    <div
                      className={clsx([
                        'mt-4 grid gap-2',
                        images.length === 1 ? 'grid-cols-1' : 'grid-cols-2 sm:grid-cols-3',
                      ])}
                    >
                      {images.map((src) => (
                        <Zoom key={src}>
                          <Image
                            src={src}
                            alt="moment image"
                            width={600}
                            height={600}
                            className={clsx([
                              'overflow-hidden rounded-lg transition-all duration-200',
                              'hover:scale-[1.02] hover:shadow-lg',
                              images.length === 1 ? 'aspect-video' : 'aspect-square',
                            ])}
                          />
                        </Zoom>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </article>
          )
        })}
        {moments.length === 0 && (
          <div className="mx-auto max-w-2xl">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-12 text-center dark:border-gray-700 dark:bg-gray-800/50">
              <div className="text-gray-500 dark:text-gray-400">
                <div className="mb-2 text-lg font-medium">Empty</div>
                <div className="text-sm">No moments shared yet</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}
