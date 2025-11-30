import { genPageMetadata } from 'app/seo'
import { ProjectCard } from '~/components/cards/project'
import { Container } from '~/components/ui/container'
import { PageHeader } from '~/components/ui/page-header'
import { PROJECTS } from '~/data/projects'

export let metadata = genPageMetadata({ title: 'Projects' })

export default async function Projects() {
  const workProjects = PROJECTS.filter(({ type }) => type === 'work')
  const sideProjects = PROJECTS.filter(({ type }) => type === 'self')

  return (
    <Container className="pt-4 lg:pt-12">
      <PageHeader
        title="Projects"
        description="Collections of my open-source side projects, along with some cool things I’ve built with colleagues at work. It’s a mix of passion projects and practical tools—some just for fun, others to solve real-world problems."
        className="border-b border-gray-200 dark:border-gray-700"
      />

      <div className="py-10">
        <h3 className="mb-8 text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:text-3xl">
          Work
        </h3>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {workProjects.map((pro) => (
            <ProjectCard key={pro.title} project={pro} />
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 py-10 dark:border-gray-700">
        <h3 className="mb-8 text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:text-3xl">
          Side projects
        </h3>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sideProjects.map((pro) => (
            <ProjectCard key={pro.title} project={pro} />
          ))}
        </div>
      </div>
    </Container>
  )
}
