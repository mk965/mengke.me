import type { Project } from '~/types'

export let projectsData: Project[] = [
  {
    type: 'work',
    title: "MoonFox Data - Aurora's Big Data Brand",
    description: `The MoonFox Data brand portal includes iAPP, iBrand, iMarkting, Alternative Data and other parts, and users can obtain the Moon Fox big data service on the website.`,
    imgSrc: '/static/images/projects/moonfox.jpg',
    url: 'https://moonfox.cn/en?ref=mengke.me',
    builtWith: ['Next.js', 'React', 'ECharts', 'AntDesign', 'i18', 'Gulp'],
  },
  {
    type: 'work',
    title: 'Aone - Open Platform for Geographic Business Data',
    description: `Edit the map fence online to generate a portrait of the crowd tag inside the fence.`,
    imgSrc: '/static/images/projects/aone.jpg',
    url: '/',
    builtWith: ['Nuxt.js', 'Vue', 'Amap', 'Baidu Map', 'Vuex'],
  },
  {
    type: 'work',
    title: 'iAPP Lite - WeChat Mini-Program',
    description: `View iAPP data on your phone at any time.`,
    imgSrc: '/static/images/projects/iapp_lite.jpg',
    url: '/',
    builtWith: ['Mini-Program Vanilla', 'Antv-F2', 'JState-mini'],
  },
  {
    type: 'work',
    title: 'Aurora DMP - Data Management Platform',
    description: `Users can filter data by customizing IMEI, application, mobile phone number, OAID and other conditions, and generate user portrait charts online.`,
    imgSrc: '/static/images/projects/moonfox-top.jpg',
    url: '/',
    builtWith: ['Nuxt.js', 'Vue', 'Amap', 'Baidu Map', 'Vuex'],
  },
  {
    type: 'self',
    title: 'qiankun-demo - Quick Start Qiankun Micro Frontend',
    description: `Qiankun Micro frontend integrates various frameworks, including Vue2, Vue3, React, Nuxt, Angular, etc..`,
    imgSrc: '/static/images/projects/qiankun.png',
    repo: '/',
    builtWith: ['qiankun', 'Vue', 'React', 'Nuxt', 'Angular'],
  },
  {
    type: 'self',
    title: 'coord-check - Geographic coordinate checking',
    description: `Quickly check a set of string coordinates for incorrect coordinates and format them.`,
    imgSrc: '/static/images/projects/coord-check.jpg',
    repo: '/',
    builtWith: ['JavaScript'],
  },
  {
    type: 'self',
    title: '年龄计算器 - WeChat Mini-Program',
    description: `More than 2,800,000+ users. Calculate various age data of users by birthday.`,
    imgSrc: '/static/images/projects/AgeCalculator.jpg',
    repo: 'https://github.com/mk965/AgeCalculator',
    builtWith: ['Mini-Program Vanilla'],
  },
  {
    type: 'self',
    title: '恋爱匹配度 - TikTok Mini-Program',
    description: `More than 14,000,000+ users. Love theme app for teens.`,
    imgSrc: '/static/images/projects/LoveMatching.jpg',
    repo: 'https://github.com/mk965/AgeCalculator',
    builtWith: ['Mini-Program Vanilla'],
  },
]
