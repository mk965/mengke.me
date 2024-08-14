import dynamic from 'next/dynamic'
import type { CommentsProps } from '~/types'

const Giscus = dynamic(() => import('./Giscus'), { ssr: false })
const Utterances = dynamic(() => import('./Utterances'), { ssr: false })
const Disqus = dynamic(() => import('./Disqus'), { ssr: false })

export function Comments({ frontMatter, config }: CommentsProps) {
  const { provider, giscusConfig, utterancesConfig, disqus } = config

  switch (provider) {
    case 'giscus':
      return <Giscus config={giscusConfig} />
    case 'utterances':
      return <Utterances config={utterancesConfig} />
    case 'disqus':
      return <Disqus identifier={frontMatter.slug} disqus={disqus} />
    default:
      return <div>Unknown comment provider: {provider}</div>
  }
}
