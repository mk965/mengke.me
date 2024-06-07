export let siteMetadata = {
  title: "Wuqibor's blog - A ordinary boy's journey",
  author: 'Wuqibor',
  fullName: 'Wuqibor Paper',
  headerTitle: "Wuqibor's blog - A ordinary boy's journey",
  footerTitle: "Wuqibor's blog - Wish everyone everyone be treated with gentleness",
  description:
    "Wuqibor's walking journey - A high school student with a dream to be an ordinary man",
  language: 'en-us',
  siteUrl: 'https://blog.57777777.xyz',
  siteRepo: 'https://github.com/Sunakier/blog',
  siteLogo: '/static/images/logo.png',
  image: '/static/images/logo.png',
  socialBanner: '/static/images/logo.png',
  email: 'lazyerpaper@qq.com',
  github: 'https://github.com/Sunakier',
  telegram: 'https://t.me/Wuqibor',
  locale: 'en-US',
  analyticsURL: 'https://us.umami.is/websites/1e7fed50-448b-42cb-af8e-06fe1df68c83',
  analytics: {
    plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
    simpleAnalytics: false, // true or false
    umamiWebsiteId: '1e7fed50-448b-42cb-af8e-06fe1df68c83', // e.g. 123e4567-e89b-12d3-a456-426614174000
    googleAnalyticsId: 'G-PK8B95RZ5T', // e.g. UA-000000-2 or G-XXXXXXX
    microsoftClarity: 'mmz5d97tbm',
  },
  socialAccounts: {
    github: 'Sunakier',
    telegram: 'Wuqibor',
  },
}

/**
 * Select a provider and use the environment variables associated to it
 * https://vercel.com/docs/environment-variables
 * --
 *
 * Visit each provider's documentation link and follow the instructions, then add the environment variable to your project.
 */
export let commentConfig = {
  provider: 'giscus', // 'giscus' | 'utterances' | 'disqus',
  // https://giscus.app/
  giscusConfig: {
    repo: '', // process.env.GISCUS_REPO
    repositoryId: '', // process.env.GISCUS_REPOSITORY_ID
    category: '', // process.env.GISCUS_CATEGORY
    categoryId: '', // process.env.GISCUS_CATEGORY_ID
    mapping: 'pathname',
    reactions: '1',
    metadata: '0',
    lightTheme: 'light',
    darkTheme: 'transparent_dark',
    themeURL: '',
  },
  // https://utteranc.es/
  utterancesConfig: {
    repo: '', // process.env.UTTERANCES_REPO
    issueTerm: '',
    label: '',
    lightTheme: '',
    darkTheme: '',
  },
  // https://help.disqus.com/en/articles/1717111-what-s-a-shortname
  disqus: {
    shortname: '', // process.env.DISQUS_SHORTNAME
  },
}
