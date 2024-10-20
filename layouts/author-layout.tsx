import type { Author } from 'contentlayer/generated'
import type { ReactNode } from 'react'
import { CareerTimeline } from '~/components/author/career'
import { SocialAccounts } from '~/components/author/social-accounts'
import { ProfileCard } from '~/components/cards/profile'
import { Button } from '~/components/ui/button'
import { Container } from '~/components/ui/container'
import { Image } from '~/components/ui/image'
import { PageHeader } from '~/components/ui/page-header'
import { Twemoji } from '~/components/ui/twemoji'
import { AUTHOR_INFO } from '~/data/author-info'
import { SITE_METADATA } from '~/data/site-metadata'

interface Props {
  children?: ReactNode
  content: Omit<Author, '_id' | '_raw' | 'body'>
}

export function AuthorLayout({ children }: Props) {
  return (
    <Container className="pt-4 lg:pt-12">
      <PageHeader
        title="About"
        description="A bit of background on who I am, what I do, and why I started this blog. Nothing too serious, just a little intro to the person typing away behind the scenes."
        className="border-b border-gray-200 dark:border-gray-700"
      />
      <div className="py-8 md:grid md:grid-cols-3">
        <div className="pr-4">
          <ProfileCard />
        </div>
        <div className="md:col-span-2 md:pl-12 xl:pl-16">
          <div className="prose prose-lg dark:prose-invert">
            <div>
              <h2 className="mt-0">
                Hi there <Twemoji emoji="waving-hand" />
              </h2>
              <p>
                I'm <strong>{AUTHOR_INFO.name}</strong>, a software engineer from{' '}
                <strong>{AUTHOR_INFO.address.city}</strong>. I have a passion for all things{' '}
                <strong>Javascript</strong>, and I enjoy building web applications. I work mainly
                with <strong>Typescript</strong>, <strong>Vue</strong>, <strong>React</strong>,{' '}
                <strong>NodeJS</strong>, and <strong>TailwindCSS</strong>.
              </p>
              <p>
                I started this blog as a way to document and share stuff I have learned and found
                useful as a software engineer. Building and writing things down is a great way for
                me to solidify my understanding of new concepts and ideas. I hope my blog could be a
                helpful resource for fellow devs who interested in web dev, and related
                technologies.
              </p>
              <p>
                I'm currently learning Japanese and am interested in Japanese culture.
                <br></br>
                はじめまして、よろしくお願いします。
              </p>
              <p>
                I would be highly appreciated if you could leave your comments and thoughts on what
                I have written <Twemoji emoji="clinking-beer-mugs" />.
              </p>
            </div>
            {/* <div>
              <div className="mb-[1em] mt-[2em] flex items-center justify-between [&>h2]:my-0">
                <h2>My career</h2>
                <Button as="a" href="/static/resume.pdf" target="_blank">
                  <span>Resume</span>
                  <Twemoji emoji="page-facing-up" />
                </Button>
              </div>
              <CareerTimeline />
            </div> */}
            <div>
              <h2>Tech stack</h2>
              <p>
                This blog is hosted on{' '}
                <a href="https://vercel.com/" target="_blank">
                  Vercel
                </a>
                , built with{' '}
                <a href="https://nextjs.org/" target="_blank">
                  Next.js
                </a>{' '}
                and{' '}
                <a href="https://tailwindcss.com/" target="_blank">
                  Tailwind CSS
                </a>{' '}
                using <strong>Tailwind Nextjs Starter Blog</strong>.
              </p>
              <p>
                A huge thanks to{' '}
                <a href="https://twitter.com/timlrxx" target="_blank">
                  Timothy Lin
                </a>{' '}
                for the minimal, lightweight, and super easy-to-customize blog starter.
              </p>
              <p>A few major over-engineering-changes from the original repo:</p>
              <ul>
                <li>
                  <Twemoji emoji="atom-symbol" /> Upgrading to <strong>React v18</strong>,{' '}
                  <strong>Next v14</strong>
                  (Using App router)
                </li>
                <li>
                  <Twemoji emoji="party-popper" /> Adopting <strong>Typescript</strong>, committing
                  with{' '}
                  <a href="https://www.conventionalcommits.org/" target="_blank">
                    Conventional Commits
                  </a>
                </li>
                <li>
                  <Twemoji emoji="bar-chart" /> Monitoring site with{' '}
                  <a href="https://umami.is/" target="_blank">
                    Umami
                  </a>{' '}
                  website analytics
                </li>
                <li>
                  <Twemoji emoji="eyes" /> Theming in dark mode with{' '}
                  <a
                    href="https://github.blog/changelog/2021-04-14-dark-and-dimmed-themes-are-now-generally-available/"
                    target="_blank"
                  >
                    Github dark dimmed
                  </a>{' '}
                  colors for better contrast
                </li>
                <li>
                  <Twemoji emoji="man-technologist" /> Making a lot of changes to the UI, new
                  homepage design, adding <code>ProfileCard</code>, <code>CareerTimeline</code>{' '}
                  components, adding <code>/friends</code>, <code>/snippets</code> page, etc.
                </li>
                {/* <li>
                  <Twemoji emoji="inbox-tray" /> Bumping up <code>mdx-bundler</code>,{' '}
                  <code>rehype</code>/<code>remark</code> plugins and dependencies to the latest
                  version
                </li> */}
              </ul>
              <p>
                See my{' '}
                <a href={SITE_METADATA.siteRepo} target="_blank">
                  Github repository
                </a>{' '}
                for this blog.
              </p>
              <div>
                <h3>Legacy versions</h3>
                <p>I started this blog since 2023 and up until now it has 1 legacy versions:</p>
                <ul>
                  <li>
                    <code>v1</code> built with <strong>NextJS v13</strong> using Page router:{' '}
                    <a href="https://mengke-me-v1.vercel.app/" target="_blank">
                      https://mengke-me-v1.vercel.app/
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <h2>Brief timeline of my blog</h2>
              <p>
                <em>Jul 29, 2023 - now</em>
              </p>
              <table>
                <thead>
                  <tr>
                    <th>date</th>
                    <th>desc</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2024.10.20</td>
                    <td>
                      <Twemoji emoji="fireworks" />
                      <b>Version 2.0</b>
                    </td>
                  </tr>
                  <tr>
                    <td>2024.07.29</td>
                    <td>
                      🎉 First Anniversary -{' '}
                      <a href="/blog/202407/Blog_Timeline">The year Mengke'blog was launched</a>
                    </td>
                  </tr>
                  <tr>
                    <td>2024.05.03</td>
                    <td>
                      Added <a href="/status/health">Health Status</a>
                    </td>
                  </tr>
                  <tr>
                    <td>2023.11.20</td>
                    <td>Added Microsoft Clarity</td>
                  </tr>
                  <tr>
                    <td>
                      <del>2023.10.25</del>
                    </td>
                    <td>
                      <del>
                        Added <a href="/gallery">Gallery</a>
                      </del>
                    </td>
                  </tr>
                  <tr>
                    <td>2023.08.06</td>
                    <td>Added theme switch sound effects</td>
                  </tr>
                  <tr>
                    <td>2023.08.01</td>
                    <td>Added Giscus comment</td>
                  </tr>
                  <tr>
                    <td>2023.07.30</td>
                    <td>
                      Added <a href="/friends">Friends</a> and Analysis functions
                    </td>
                  </tr>
                  <tr>
                    <td>2023.07.29</td>
                    <td>Publish</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <h2>Assets</h2>
              <p>
                Most of the images in my blog are from{' '}
                <a href="https://unsplash.com/" target="_blank">
                  Unsplash
                </a>
                , gifs from{' '}
                <a href="https://giphy.com/" target="_blank">
                  GIPHY
                </a>
                , and illustrations are from{' '}
                <a href="https://storyset.com/" target="_blank">
                  Storyset
                </a>
                .
              </p>
              <p>
                Thanks for the free resources <Twemoji emoji="folded-hands" />.
              </p>
            </div>
            <div>
              <h2>Contact</h2>
              <p>
                Reach out to me at <a href={`mailto:${AUTHOR_INFO.email}`}>{AUTHOR_INFO.email}</a>{' '}
                or find me on social media:
              </p>
              <SocialAccounts />
            </div>
            <div>
              <h2>Support</h2>
              <p>If you like my work, consider supporting me:</p>
              <a
                href={AUTHOR_INFO.support.kofi}
                target="_blank"
                className="[&_.image-container]:mx-0"
              >
                <Image
                  src="/static/images/support-kofi.webp"
                  alt="Support me on Ko-fi"
                  width={297}
                  height={60}
                  style={{ height: 60, width: 'auto' }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
