import { AUTHOR_INFO } from '~/data/author-info'
import { Image } from '~/components/ui/image'
import clsx from 'clsx'

export function SupportMe({ className }: { className?: string }) {
  return (
    <div className={clsx(className)}>
      <a href={AUTHOR_INFO.support.kofi} target="_blank" className="[&_.image-container]:mx-0">
        <Image
          src="/static/images/support-kofi.webp"
          alt="Support me on Ko-fi"
          width={297}
          height={60}
          style={{ height: 60, width: 'auto' }}
        />
      </a>
    </div>
  )
}
