import { Link } from '~/components/Link'
import { siteMetadata } from '~/data/siteMetadata'
import { PhotoCard } from '~/components/gallery/PhotoCard'
import getInstagramMedias from 'libs/instagram/media'

export async function getStaticProps() {
  const data = await getInstagramMedias()
  return {
    props: {
      galleryList: data?.data ?? [],
    },
    revalidate: 86400, // 缓存 24 小时 (24 * 60 * 60 秒)
  }
}

export default function Gallery(props: { galleryList: any[] }) {
  const galleryList = props?.galleryList ?? []

  return (
    <div className="flex flex-col items-center justify-center gap-8 pt-4 md:pt-10 xl:pt-20">
      {galleryList.map((item) => (
        <PhotoCard key={item.id} item={item} />
      ))}
      <Link href={siteMetadata.instagram}>
        <button className="inline px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg shadow focus:shadow-outline-blue hover:bg-blue-700 focus:outline-none dark:hover:bg-blue-500">
          View More &rarr;
        </button>
      </Link>
    </div>
  )
}
