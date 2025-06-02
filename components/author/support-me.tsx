import { AUTHOR_INFO } from '~/data/author-info'
import { SUPPORTERS } from '~/data/supporters'
import { Image } from '~/components/ui/image'
import clsx from 'clsx'

export function SupportMe({ className }: { className?: string }) {
  const supportersSort = SUPPORTERS.sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB.getTime() - dateA.getTime()
  })

  return (
    <div className={clsx('flex flex-col gap-8', className)}>
      <div className="flex flex-col items-center gap-6 sm:flex-row">
        {AUTHOR_INFO.support.kofi && (
          <a
            href={AUTHOR_INFO.support.kofi}
            target="_blank"
            className="flex flex-col items-center [&_.image-container]:mx-0"
          >
            <Image
              src="/static/images/support-kofi.webp"
              alt="Support me via Ko-fi"
              width={297}
              height={60}
              style={{ height: 60, width: 'auto' }}
            />
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Support me via Ko-fi</p>
          </a>
        )}
        {AUTHOR_INFO.support.wechat && (
          <div className="flex flex-col items-center [&_.image-container]:mx-0">
            <Image
              src={AUTHOR_INFO.support.wechat}
              alt="Support me via WeChat"
              width={200}
              height={200}
              style={{ height: 200, width: 'auto' }}
            />
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Support me via WeChat</p>
          </div>
        )}
      </div>

      {supportersSort.length > 0 && (
        <div>
          <h3 className="mb-4 text-start text-xl font-bold">Thank you for your support:</h3>
          <ul className="list-disc space-y-2 pl-5">
            {supportersSort.map((supporter, index) => (
              <li key={index} className="text-sm">
                <span className="text-gray-500 dark:text-gray-400">{supporter.date}</span>
                <span className="ml-2 font-medium">{supporter?.name ?? 'Anonymous'}</span>
                {supporter.amount && supporter.currency && (
                  <span className="ml-2 font-medium text-green-600 dark:text-green-400">
                    {supporter.currency === 'CNY' ? '¥' : '$'}
                    {supporter.amount}
                  </span>
                )}
                <span className="ml-2 text-gray-500 dark:text-gray-400">
                  via {supporter.via ?? 'Other'}
                </span>
                {supporter.message && (
                  <span className="ml-2 italic text-gray-600 dark:text-gray-300">
                    "{supporter.message}"
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
