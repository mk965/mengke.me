import clsx from 'clsx'
import { Image } from '~/components/Image'
import { useEffect, useState } from 'react'
import { Link } from '~/components/Link'
import { Twemoji } from '~/components/Twemoji'

export default function FourZeroFour() {
  const [hash, setHash] = useState('')

  useEffect(() => {
    const handleHashChange = () => {
      const fullPath = window.location.hash // 获取当前页面的哈希值
      const hashValue = fullPath.substring(1) || '' // 移除 # 符号，获取哈希值，如果不存在则设为空字符串
      setHash(hashValue)
    }

    // 初次加载时设置初始哈希值
    handleHashChange()

    // 添加事件监听器
    window.addEventListener('hashchange', handleHashChange)

    // 清除事件监听器
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  const list = [
    {
      id: 'water',
      title: 'Drinking water',
      icon: <Twemoji emoji="cup-with-straw" />,
      sectionTitle: 'Drinking water calendar',
      img: 'https://raw.githubusercontent.com/mk965/istatus/main/svg/water.svg',
    },
  ]

  const timestamp = Date.now()

  return (
    <>
      <div>
        <div className="flex">
          <div className="hidden w-60 reactive">
            {/* <div className="hidden w-60 reactive sm:block"> */}
            <div className="sticky top-20">
              <div className="flex flex-col mr-6 space-y-2">
                {list.map((link) => (
                  <Link key={link.title} href={`#${link.id}`}>
                    <span
                      className={clsx(
                        'block rounded px-2 py-1 font-medium text-gray-900 dark:text-gray-100 sm:px-3 sm:py-2',
                        hash === link.id
                          ? 'bg-gray-200 dark:bg-gray-700'
                          : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                      )}
                    >
                      {link.icon}
                      {link.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1 ">
            {list.map((link) => (
              <div key={link.id} id={link.id} className="flex flex-col pt-4 md:pt-10 xl:pt-20">
                <section>
                  <div className="flex items-center justify-between">
                    <h1 className="mb-2 text-2xl font-bold leading-8 tracking-tight ">
                      {link.icon} {link.sectionTitle}
                    </h1>
                    <Legend />
                  </div>
                  <Image
                    src={link.img}
                    width={1000}
                    height={600}
                    className="w-full "
                    alt={'Drinking water calendar'}
                    unoptimized={true}
                    priority={true}
                  />
                </section>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

const Legend = () => {
  return (
    <div className="hidden sm:block">
      <div className="flex items-center float-right color-fg-muted d-flex flex-items-center ">
        <span data-view-component="true" className="mr-1">
          0㎖
        </span>
        {['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'].map((color) => (
          <div
            key={color}
            style={{ background: color, border: '1px solid rgba(27, 31, 35, 0.06)' }}
            className="w-3 h-3 mr-1 rounded radius"
          ></div>
        ))}
        <span data-view-component="true">3000㎖</span>
      </div>
    </div>
  )
}
