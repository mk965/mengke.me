export const AUTHOR_INFO = {
  name: 'Mengke',
  description:
    'A personal space on the cloud where I document my programming journey, sharing lessons, insights, and resources for fellow developers.',
  email: 'me@mengke.me',
  identity: 'Learner | Builder',
  address: {
    city: 'Peking, China',
    flag: 'flag-china',
    timeZone: 8,
  },
  work: {
    company: '',
    occupation: 'Front-End Engineer',
    location: 'Peking, China',
    website: '/',
  },
  social: {
    github: 'https://github.com/mk965',
    x: '/',
    facebook: '/',
    youtube: '/',
    linkedin: '/',
    threads: 'https://www.threads.net/@_mk965',
    instagram: '/',
  },
  support: {
    kofi: 'https://ko-fi.com/mengke',
    wechat: '/static/images/wechat-reward-code.webp',
  },
}

/** Public profile URLs of the author, used for JSON-LD `sameAs` entity linking. */
export const AUTHOR_SAME_AS: string[] = Object.values(AUTHOR_INFO.social).filter(
  (url): url is string => typeof url === 'string' && url.startsWith('http')
)
