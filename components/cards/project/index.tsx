'use client'

import clsx from 'clsx'
import { Github, Download } from 'lucide-react'
import useSWR from 'swr'
import type { BrandsMap } from '~/components/ui/brand'
import { Brand } from '~/components/ui/brand'
import { GradientBorder } from '~/components/ui/gradient-border'
import { GrowingUnderline } from '~/components/ui/growing-underline'
import { Image } from '~/components/ui/image'
import { Link } from '~/components/ui/link'
import { TiltedGridBackground } from '~/components/ui/tilted-grid-background'
import type { PROJECTS } from '~/data/projects'
import type { GithubRepository, NpmPackage } from '~/types/data'
import { fetcher } from '~/utils/misc'

function NpmStats({ npmPackageName, downloads }: { npmPackageName: string; downloads: number }) {
  return (
    <div className="space-y-1.5">
      <div className="text-xs text-gray-600 dark:text-gray-400">
        <span className="hidden sm:inline">Monthly downloads</span>
        <span className="sm:hidden">Downloads</span>
      </div>
      <div className="flex items-center gap-2">
        <Link
          href={`https://www.npmjs.com/package/${npmPackageName}`}
          className="flex items-center gap-1.5"
        >
          <GrowingUnderline data-umami-event="project-npm-link">
            <div className="flex items-center space-x-1.5">
              <Download size={16} strokeWidth={1.5} />
              <span className="font-medium">{downloads}</span>
            </div>
          </GrowingUnderline>
        </Link>
      </div>
    </div>
  )
}

function GithubStats({ repository }: { repository: GithubRepository }) {
  return (
    <div className="space-y-1.5">
      <div className="text-xs text-gray-600 dark:text-gray-400">
        <span className="hidden sm:inline">Github stars</span>
        <span className="sm:hidden">Stars</span>
      </div>
      <div className="flex items-center gap-2">
        <Link href={repository.url} className="flex items-center gap-1.5">
          <GrowingUnderline data-umami-event="project-github-link">
            <div className="flex items-center space-x-1.5">
              <Github size={16} strokeWidth={1.5} />
              <span className="font-medium">{repository.stargazerCount}</span>
            </div>
          </GrowingUnderline>
        </Link>
      </div>
    </div>
  )
}

function Stack({ builtWith }: { builtWith: string[] }) {
  return (
    <div className="space-y-1.5">
      <div className="text-xs text-gray-600 dark:text-gray-400">Stack</div>
      <div className="flex h-6 flex-wrap items-center gap-1.5">
        {builtWith?.map((tool) => {
          return (
            <Brand
              key={tool}
              name={tool as keyof typeof BrandsMap}
              iconClassName={clsx(tool === 'Pygame' ? 'h-4' : 'h-4 w-4')}
            />
          )
        })}
      </div>
    </div>
  )
}

export function ProjectCard({ project }: { project: (typeof PROJECTS)[0] }) {
  const { title, description, imgSrc, url, repo, npmPackageName, builtWith, links } = project

  const { data: repository } = useSWR<GithubRepository>(
    repo ? `/api/github?repo=${repo}` : null,
    fetcher
  )

  const { data: npmPackage } = useSWR<NpmPackage>(
    npmPackageName ? `/api/npm?package=${npmPackageName}` : null,
    fetcher
  )
  const href = url || repository?.url

  const propertyCount = (npmPackage ? 1 : 0) + (repository ? 1 : 0) + (builtWith.length > 0 ? 1 : 0)

  return (
    <GradientBorder
      offset={28}
      className="flex flex-col rounded-[40px] p-6 [box-shadow:0_8px_32px_rgba(194,194,218,.3)] dark:bg-white/5 dark:shadow-none md:p-8"
    >
      <TiltedGridBackground className="inset-0 z-[-1] rounded-[40px]" />
      <div className="mb-6 flex items-center gap-4">
        <Image src={imgSrc} alt={title} width={100} height={100} className="h-15 w-15 shrink-0" />
        <div className="flex flex-col items-start gap-1 pt-1">
          <h2 className="text-[22px] font-bold leading-[30px]">
            {href ? (
              <Link href={href} aria-label={`Link to ${title}`}>
                <GrowingUnderline data-umami-event="project-title-link">{title}</GrowingUnderline>
              </Link>
            ) : (
              title
            )}
          </h2>
        </div>
      </div>
      <p className="mb-16 line-clamp-3 grow text-lg">{description}</p>
      <div
        className={clsx('mt-auto flex gap-6 sm:gap-9 md:grid md:gap-0', {
          'md:grid-cols-1': propertyCount === 1,
          'md:grid-cols-2': propertyCount === 2,
          'md:grid-cols-3': propertyCount === 3,
          'md:grid-cols-4': propertyCount === 4,
        })}
      >
        {/* {projectProperty} */}
        {npmPackageName && (
          <NpmStats npmPackageName={npmPackageName} downloads={npmPackage?.downloads || 0} />
        )}
        {repository && <GithubStats repository={repository} />}
        {builtWith.length > 0 && <Stack builtWith={builtWith} />}
      </div>
    </GradientBorder>
  )
}
