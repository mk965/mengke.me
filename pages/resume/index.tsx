import Image from 'next/image'
import { Link } from '~/components/Link'
import { Twemoji } from '~/components/Twemoji'
import { siteMetadata } from '~/data/siteMetadata'

export default function Resume() {
  return (
    <div className="flex flex-col items-center justify-center pt-4 md:pt-10 xl:pt-20">
      <div>
        <Image src={'/static/images/resume.png'} alt="resume" width={500} height={500} />
      </div>
      <div className="pt-8 space-x-2 md:space-y-5 md:pt-12 xl:pt-16">
        <div className="max-w-md text-center">
          <p className="mb-4 text-xl font-bold leading-normal md:text-2xl">
            The resume page is syncing and you can find my resume in{' '}
            <a href={siteMetadata.linkedin} className="underline ">
              LinkedIn
            </a>
            . <Twemoji emoji={'face-with-monocle'} />
          </p>
          {/* <p className="mb-8">
            I'll put some interesting/practical code snippets here.
          </p> */}
          <Link href={siteMetadata.linkedin}>
            <button className="inline px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg shadow focus:shadow-outline-blue hover:bg-blue-700 focus:outline-none dark:hover:bg-blue-500">
              Go LinkedIn
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
