'use client'

import clsx from 'clsx'
import { Github, Download, ExternalLink } from 'lucide-react'
import useSWR from 'swr'
import { Brand, type BrandsMap } from '~/components/ui/brand'
import { Image } from '~/components/ui/image'
import { Link } from '~/components/ui/link'
import type { PROJECTS } from '~/data/projects'
import type { GithubRepository, NpmPackage } from '~/types/data'
import { fetcher } from '~/utils/misc'

function NpmStats({ npmPackageName, downloads }: { npmPackageName: string; downloads: number }) {
  return (
    <Link
      href={`https://www.npmjs.com/package/${npmPackageName}`}
      className="flex items-center gap-1.5 text-xs text-gray-500 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
    >
      <Download size={14} strokeWidth={1.5} />
      <span>{downloads.toLocaleString()} downloads</span>
    </Link>
  )
}

function GithubStats({ repository }: { repository: GithubRepository }) {
  return (
    <Link
      href={repository.url}
      className="flex items-center gap-1.5 text-xs text-gray-500 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
    >
      <Github size={14} strokeWidth={1.5} />
      <span>{repository.stargazerCount.toLocaleString()} stars</span>
    </Link>
  )
}

function Stack({ builtWith }: { builtWith: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {builtWith?.map((tool) => (
        <div
          key={tool}
          className="flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300"
        >
          <Brand
            name={tool as keyof typeof BrandsMap}
            iconClassName={clsx(tool === 'Pygame' ? 'h-3 w-3' : 'h-3 w-3')}
          />
          <span>{tool}</span>
        </div>
      ))}
    </div>
  )
}

export function ProjectCard({ project }: { project: (typeof PROJECTS)[0] }) {
  const { title, description, imgSrc, url, repo, npmPackageName, builtWith } = project

  const { data: repository } = useSWR<GithubRepository>(
    repo ? `/api/github?repo=${repo}` : null,
    fetcher
  )

  const { data: npmPackage } = useSWR<NpmPackage>(
    npmPackageName ? `/api/npm?package=${npmPackageName}` : null,
    fetcher
  )

  const href = url || repository?.url

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:border-primary-500 hover:shadow-lg dark:border-gray-800 dark:bg-white/5 dark:hover:border-primary-500">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          src={imgSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-start justify-between gap-4">
          <h2 className="text-xl font-bold leading-tight text-gray-900 transition-colors group-hover:text-primary-600 dark:text-gray-100 dark:group-hover:text-primary-400">
            {href ? (
              <Link href={href} className="flex items-center gap-2">
                {title}
                <ExternalLink
                  size={16}
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                />
              </Link>
            ) : (
              title
            )}
          </h2>
        </div>

        <p className="mb-4 line-clamp-3 text-sm text-gray-600 dark:text-gray-400">{description}</p>

        <div className="mt-auto flex flex-col gap-4">
          <Stack builtWith={builtWith} />

          {(npmPackageName || repository) && (
            <div className="flex items-center gap-4 border-t border-gray-100 pt-3 dark:border-gray-700/50">
              {npmPackageName && (
                <NpmStats npmPackageName={npmPackageName} downloads={npmPackage?.downloads || 0} />
              )}
              {repository && <GithubStats repository={repository} />}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
