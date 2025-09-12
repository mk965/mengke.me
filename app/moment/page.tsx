import { Container } from '~/components/ui/container'
import { PageHeader } from '~/components/ui/page-header'
import { Image, Zoom } from '~/components/ui/image'
import { GritBackground } from '~/components/ui/grit-background'
import { SITE_METADATA } from '~/data/site-metadata'
import { AUTHOR_INFO } from '~/data/author-info'
import { formatDate } from '~/utils/date'
import { clsx } from 'clsx'

type MomentResponse = { moment: Moment[] } | { memos: Moment[] }

interface Moment {
  name: string
  state: string
  creator: string
  createTime: string
  updateTime: string
  displayTime: string
  content: string
  nodes?: any[]
  visibility: 'PUBLIC' | 'PRIVATE' | string
  tags?: string[]
  pinned?: boolean
  resources?: Resource[]
  relations?: any[]
  reactions?: any[]
  property?: Record<string, unknown>
  snippet?: string
}

interface Resource {
  name: string
  createTime: string
  filename: string
  content: string
  externalLink: string
  type: string
  size: string
  memo: string
}

async function fetchPublicMoment(): Promise<Moment[]> {
  const url = `${SITE_METADATA.momentApi}/api/v1/memos?visibility=PUBLIC`
  if (!url) return []
  const res = await fetch(url, { next: { revalidate: 60 } })
  if (!res.ok) return []
  const data = (await res.json()) as MomentResponse
  // 兼容两种字段：memos / moment
  // @ts-ignore
  return (data.memos as Moment[]) || (data.moment as Moment[]) || []
}

function getResourceUrl(resource: Resource): string | null {
  if (resource.externalLink) return resource.externalLink
  // Build raw URL for self-hosted usememos
  // resource.name like: "resources/7JoNrgZzCgvtWeLVyjMpT6"
  const id = resource.name?.split('/')?.[1]
  if (!id) return null
  return `${SITE_METADATA.momentApi}/file/${resource.name}/${resource.filename}`
}

export default async function MomentPage() {
  const moments = await fetchPublicMoment()

  if (!SITE_METADATA.momentApi) {
    return (
      <Container className="py-6">
        <PageHeader
          title="Moments"
          description="Data source not configured"
          className="border-b border-gray-200 pb-6 dark:border-gray-700"
        />
        <div className="mx-auto mt-8 max-w-2xl">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-12 text-center dark:border-gray-700 dark:bg-gray-800/50">
            <div className="text-gray-500 dark:text-gray-400">
              <div className="mb-2 text-lg font-medium">Data source not configured</div>
              <div className="text-sm">
                Please configure `NEXT_PUBLIC_MOMENT_API` in the environment variable
              </div>
            </div>
          </div>
        </div>
      </Container>
    )
  }

  return (
    <Container className="py-6">
      <PageHeader
        title="Moments"
        description="Record every bit of life and share your daily thoughts and insights"
        className="border-b border-gray-200 pb-6 dark:border-gray-700"
      />
      <div className="mx-auto mt-8 max-w-2xl space-y-8">
        {moments.map((momentItem) => {
          const images = (momentItem.resources || [])
            .filter((r) => r.type.startsWith('image/'))
            .map((r) => ({ url: getResourceUrl(r), filename: r.filename }))
            .filter((r) => !!r.url) as { url: string; filename: string }[]

          return (
            <article key={momentItem.name} className="group">
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
                        {formatDate(momentItem.displayTime || momentItem.createTime)}
                      </div>
                    </div>
                  </div>
                  <div className="prose prose-sm prose-gray max-w-none dark:prose-invert">
                    {renderContent(momentItem)}
                  </div>
                  {images.length > 0 && (
                    <div
                      className={clsx([
                        'mt-4 grid gap-2',
                        images.length === 1 ? 'grid-cols-1' : 'grid-cols-2 sm:grid-cols-3',
                      ])}
                    >
                      {images.map((img) => (
                        <Zoom key={img.url!}>
                          <Image
                            src={img.url}
                            alt={img.filename}
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

function renderContent(moment: Moment) {
  if (!moment.nodes || moment.nodes.length === 0) {
    return moment.content
  }
  return moment.nodes.map((node: any, idx: number) => {
    if (node.type === 'PARAGRAPH') {
      const text = (node.paragraphNode?.children || [])
        .map((c: any) => {
          if (c.type === 'TEXT') return c.textNode?.content
          if (c.type === 'AUTO_LINK') {
            const url = c.autoLinkNode?.url
            return url
              ? `<a class="text-blue-600 hover:underline dark:text-blue-400" href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
              : ''
          }
          return ''
        })
        .join('')
      if (!text) return null
      return <p key={idx} className="mb-0 mt-0" dangerouslySetInnerHTML={{ __html: text }} />
    }
    if (node.type === 'CODE_BLOCK') {
      const lang = node.codeBlockNode?.language || ''
      const code = node.codeBlockNode?.content || ''
      return (
        <pre
          key={idx}
          className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 text-sm text-gray-800 dark:bg-gray-900 dark:text-gray-100"
        >
          <code className={`language-${lang}`}>{code}</code>
        </pre>
      )
    }
    if (node.type === 'LIST') {
      const ordered = node.listNode?.kind === 'ORDERED'
      const items: any[] = node.listNode?.children || []
      const elements = items
        .map((it: any, i: number) => {
          if (it.type === 'LINE_BREAK') return null
          const container = it.orderedListItemNode || it.unorderedListItemNode
          if (!container) return null
          const content = (container.children || [])
            .map((c: any) => {
              if (c.type === 'TEXT') return c.textNode?.content
              if (c.type === 'AUTO_LINK') {
                const url = c.autoLinkNode?.url
                return url
                  ? `<a class="text-blue-600 hover:underline dark:text-blue-400" href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
                  : ''
              }
              return ''
            })
            .join('')
          return <li key={i} className="mb-1" dangerouslySetInnerHTML={{ __html: content }} />
        })
        .filter(Boolean)
      return ordered ? (
        <ol key={idx} className="my-4 list-decimal space-y-1 pl-6">
          {elements}
        </ol>
      ) : (
        <ul key={idx} className="my-4 list-disc space-y-1 pl-6">
          {elements}
        </ul>
      )
    }
    if (node.type === 'LINE_BREAK') {
      return idx !== 0 && moment.nodes?.[idx - 1].type === 'LINE_BREAK' ? <br key={idx} /> : <></>
    }
    return null
  })
}
