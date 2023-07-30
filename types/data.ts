export interface Project {
  type: 'work' | 'self'
  title: string
  description?: string
  imgSrc: string
  url?: string
  repo?: string
  builtWith: string[]
}

export interface Friend {
  type: 'friend' | 'techStar'
  name: string
  slogan?: string
  imgSrc: string
  url: string
}
