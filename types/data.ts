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

export interface InstagramPost {
  // 帖子中媒体文件的 URL 地址
  media_url: string
  // 帖子的永久链接，可以在浏览器中访问进入对应的帖子
  permalink: string
  // 媒体文件的类型，可能是 CAROUSEL_ALBUM（多图集）或 IMAGE（单张图片）
  media_type: 'CAROUSEL_ALBUM' | 'IMAGE'
  // 帖子的文字描述
  caption?: string
  // 发布时间戳，格式为 ISO 8601 的字符串
  timestamp: string
  // 帖子作者的用户名
  username: string
  // 帖子的唯一标识符
  id: string
}
