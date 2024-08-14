import type { CommentConfigType } from '~/types'
import { commentConfig as DefaultCommentConfig } from '~/data/siteMetadata'

// This is a temporary workaround for the fact that the `mdx-bundler` & `esbuild`
// is not working with the NextJS's public variables.
export function getCommentConfigs(): CommentConfigType {
  return {
    ...DefaultCommentConfig,
    giscusConfig: {
      ...DefaultCommentConfig.giscusConfig,
      repo: (process.env.GISCUS_REPO as string) || '',
      repositoryId: (process.env.GISCUS_REPOSITORY_ID as string) || '',
      category: (process.env.GISCUS_CATEGORY as string) || '',
      categoryId: (process.env.GISCUS_CATEGORY_ID as string) || '',
    },
    utterancesConfig: {
      ...DefaultCommentConfig.utterancesConfig,
      repo: (process.env.UTTERANCES_REPO as string) || '',
    },
    disqus: {
      shortname: (process.env.DISQUS_SHORTNAME as string) || '',
    },
  }
}
