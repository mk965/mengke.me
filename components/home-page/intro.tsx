// import { Twemoji } from '~/components/ui/twemoji'
import { AUTHOR_INFO } from '~/data/author-info'

export function Intro() {
  return (
    <h1 className="text-neutral-900 dark:text-neutral-200">
      I'm <span className="font-medium">{AUTHOR_INFO.name}</span> - a passionate{' '}
      {AUTHOR_INFO.work.occupation} in
      <span className="font-medium"> {AUTHOR_INFO.address.city} </span>
      {/* {AUTHOR_INFO.address.flag && (
        <span className="absolute ml-1.5 inline-flex pt-[3px]">
          <Twemoji emoji={AUTHOR_INFO.address.flag} />
        </span>
      )} */}
    </h1>
  )
}
