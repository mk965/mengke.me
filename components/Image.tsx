import { BLUR_IMAGE_DATA_URL, LOGO_IMAGE_PATH } from 'constant'
import NextImage from 'next/image'
import { useState } from 'react'
import type { ImageProps } from 'types'
import { ImageLightbox } from './ImageLightbox'
import clsx from 'clsx'

export function Image({ shouldOpenLightbox = true, ...rest }: ImageProps) {
  let blurDataURL = ''
  if (rest.src !== LOGO_IMAGE_PATH) {
    blurDataURL = BLUR_IMAGE_DATA_URL
  }

  const [openLightbox, setOpenLightbox] = useState(false)
  const handleOpenLightbox = () => {
    if (!shouldOpenLightbox) return
    document.documentElement.classList.add('lightbox-loading')
    setOpenLightbox(true)
  }
  const isThumb = rest.id === 'thumbnail-image'
  const className = clsx(
    `flex justify-center`,
    shouldOpenLightbox && 'cursor-zoom-in',
    isThumb && 'thumbnail-image',
    rest.alt.endsWith('_M') && `w-1/2 m-auto`,
    rest.alt.endsWith('_S') && `w-1/4 m-auto`
  )

  return (
    <>
      <div
        className={className}
        data-umami-event={isThumb ? 'view-post-thumbnail' : 'view-image-in-lightbox'}
      >
        <NextImage {...rest} blurDataURL={blurDataURL} onClick={handleOpenLightbox} />
      </div>
      {openLightbox && (
        <ImageLightbox closeLightbox={() => setOpenLightbox(false)} src={rest.src} />
      )}
    </>
  )
}
