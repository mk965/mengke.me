import type { MDXComponents } from 'mdx/types'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import Pre from 'pliny/ui/Pre'
import TOCInline from 'pliny/ui/TOCInline'
import { Image, Zoom, type ImageProps } from '~/components/ui/image'
import { Link } from '~/components/ui/link'
import { Twemoji } from '~/components/ui/twemoji'
import { TableWrapper } from './table-wrapper'

export const MDX_COMPONENTS: MDXComponents = {
  Image: ({ alt, src, ...rest }: ImageProps) => {
    return (
      <Zoom zoomImg={{ src, alt }} canSwipeToUnzoom={false} zoomMargin={20}>
        <Image alt={alt} src={src} {...rest} className="my-4" />
      </Zoom>
    )
  },
  TOCInline,
  Twemoji,
  a: Link,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm,
}
