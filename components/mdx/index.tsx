import type { MDXComponents } from 'mdx/types'
import { Image, Zoom, type ImageProps } from '~/components/ui/image'
import { Link } from '~/components/ui/link'
import { Twemoji } from '~/components/ui/twemoji'
import { CodeTitle } from './code-title'
import { Pre } from './pre'
import { TableWrapper } from './table-wrapper'

export const MDX_COMPONENTS: MDXComponents = {
  Image: ({ alt, src, ...rest }: ImageProps) => {
    return (
      <Zoom zoomImg={{ src, alt }}>
        <Image alt={alt} src={src} {...rest} className="my-4" />
      </Zoom>
    )
  },
  Twemoji,
  CodeTitle,
  a: Link,
  pre: Pre,
  table: TableWrapper,
}
