import { writeFileSync } from 'fs'
import { slug } from 'github-slugger'
import path from 'path'
import { allBlogs, allSnippets } from 'content-collections'
import { SITE_METADATA } from '../data/site-metadata'
import { allCoreContent } from '../utils/contentlayer'
import { sortPosts } from '../utils/misc'

// Replaces the old contentlayer `onSuccess` hook, which generated the tag
// counts and the local search index after building the content collections.
// Run after `content-collections build` and before `next build`
// (see the `build` script in package.json).

const isProduction = process.env.NODE_ENV === 'production'

/**
 * Count the occurrences of all tags across blog posts and write to json file
 */
function createTagCount(documents) {
  const tagCount: Record<string, number> = {}
  documents.forEach((file) => {
    if (file.tags && (!isProduction || file.draft !== true)) {
      file.tags.forEach((tag: string) => {
        const formattedTag = slug(tag)
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1
        } else {
          tagCount[formattedTag] = 1
        }
      })
    }
  })
  writeFileSync('./json/tag-data.json', JSON.stringify(tagCount))
  console.log('🏷️. Tag list generated.')
}

function createSearchIndex(allPosts) {
  const searchDocsPath = SITE_METADATA.search.kbarConfigs.searchDocumentsPath
  if (searchDocsPath) {
    writeFileSync(
      `public/${path.basename(searchDocsPath)}`,
      JSON.stringify(allCoreContent(sortPosts(allPosts)))
    )
    console.log('🔍 Local search index generated.')
  }
}

const allPosts = [...allBlogs, ...allSnippets]
console.log('📝 Blogs:', allBlogs.length)
console.log('💡 Snippets:', allSnippets.length)
createTagCount(allPosts)
createSearchIndex(allPosts)
console.log('✨ Content hooks done.')
