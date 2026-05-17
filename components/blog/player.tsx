'use client'

import clsx from 'clsx'
import { Plyr, type PlyrProps } from 'plyr-react'
import 'plyr-react/plyr.css'

type MediaType = 'video' | 'audio'

export interface PlayerProps {
  src: string
  /** @default 'video' */
  type?: MediaType
  poster?: string
  className?: string
}

const PLAYER_OPTIONS: NonNullable<PlyrProps['options']> = {
  controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
  ratio: '16:9',
  hideControls: true,
  clickToPlay: true,
}

function mimeFromSrc(src: string, mediaType: MediaType): string {
  const ext = src.split('?')[0]?.split('.').pop()?.toLowerCase()

  if (mediaType === 'audio') {
    const map: Record<string, string> = {
      mp3: 'audio/mpeg',
      m4a: 'audio/mp4',
      ogg: 'audio/ogg',
      wav: 'audio/wav',
    }
    return map[ext ?? ''] ?? 'audio/mpeg'
  }

  const map: Record<string, string> = {
    mp4: 'video/mp4',
    webm: 'video/webm',
    ogg: 'video/ogg',
  }
  return map[ext ?? ''] ?? 'video/mp4'
}

export function Player({ src, type = 'video', poster, className }: PlayerProps) {
  const source: PlyrProps['source'] = {
    type,
    sources: [{ src, type: mimeFromSrc(src, type) }],
    ...(poster ? { poster } : {}),
  }

  return (
    <div
      className={clsx(
        'plyr-blog-player my-6 w-full max-w-2xl overflow-hidden rounded-xl shadow-lg',
        className
      )}
    >
      <Plyr source={source} options={PLAYER_OPTIONS} />
    </div>
  )
}
