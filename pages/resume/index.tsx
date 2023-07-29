import Image from 'next/image'
import { Link } from '~/components/Link'
import { Twemoji } from '~/components/Twemoji'
import { siteMetadata } from '~/data/siteMetadata'

export default function FourZeroFour() {
  return (
    <div className="flex flex-col items-center justify-center pt-4 md:pt-10 xl:pt-20">
      <div>
        <Image src={'/static/images/resume.png'} alt="resume" width={500} height={500} />
      </div>
      <div className="space-x-2 pt-8 md:space-y-5 md:pt-12 xl:pt-16">
        <div className="max-w-md text-center">
          <p className="mb-4 text-xl font-bold leading-normal md:text-2xl">
            The resume page is syncing and you can find my resume in {' '}
            <a href={siteMetadata.linkedin} className=' underline'>LinkedIn</a>. {' '}
            <Twemoji emoji={'face-with-monocle'} />
          </p>
          {/* <p className="mb-8">
            I'll put some interesting/practical code snippets here.
          </p> */}
          <Link href={siteMetadata.linkedin}>
            <button className="focus:shadow-outline-blue inline rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none dark:hover:bg-blue-500">
              Go LinkedIn
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
