import React from 'react'
export interface Project {
  type: 'work' | 'self'
  title: string
  description?: string
  imgSrc: string
  url?: string
  repo?: string
  demo?: React.JSX.Element
  builtWith: string[]
}

export interface Friend {
  type: 'friend' | 'techStar'
  name: string
  slogan?: string
  imgSrc: string
  url: string
}
