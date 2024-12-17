<h1 align="center">mengke.me 🧑‍💻</h1>

<div align="center">

[English](./README.md) | [繁体中文](./README_zh-TW.md) | [日本語](./README_ja.md)

</div>

<img style="border-radius: 6px" src="./public/static/images/home_page.webp">

## 动机

> 分享就是学习！

我创建这个博客是为了记录和分享我作为一名软件工程师的学习和见解，同时也记录我的生活点滴。它是我在整个旅程中积累的宝贵信息的宝库。

记录和整理我的想法有助于我巩固对新概念和技术的理解。我的目标是为对 Web 开发和相关技术感兴趣的人提供有用的资源。

非常感谢您的评论和反馈🍻。

## 技术栈

- 🪤 托管在 [Vercel](https://vercel.com/)。
- 🧱 使用 **React 18+** 和 **NextJS 14+** 构建。
- 📊 使用 [Umami](https://umami.is/) 分级监控网站。
- 🎉 采用 **Typescript**，使用 [Conventional Commits](https://www.conventionalcommits.org/) 进行提交。

## 演示

演示站：<https://mengke.me>

## 如何部署一个同样的博客？

> 我这里只描述基本的操作步骤。如果你是零基础或在部署过程中遇到任何问题，请发邮件给我：me@mengke.me。

### 1. 安装

1. Clone 或 Fork 本仓库。

2. 运行 `npm install` 或 `yarn` 安装依赖。

### 2. 修改数据

1. 将根目录下的 `.env.example` 文件重命名为 `.env`，并修改其中的值。

2. 更新 `/data` 目录下各文件中的信息，这里包含了博客的数据。

### 3. 部署到 Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmk965%2Fmengke.me&env=NEXT_PUBLIC_GISCUS_REPO,NEXT_PUBLIC_GISCUS_REPOSITORY_ID,NEXT_PUBLIC_GISCUS_CATEGORY,NEXT_PUBLIC_GISCUS_CATEGORY_ID,NEXT_UMAMI_ID,SPOTIFY_CLIENT_ID,SPOTIFY_CLIENT_SECRET,SPOTIFY_REFRESH_TOKEN,DATABASE_URL,GITHUB_API_TOKEN&envDescription=Giscus%5CUmami%5CSpotify%5CData%5CGithub&envLink=https%3A%2F%2Fgithub.com%2Fmk965%2Fmengke.me%2Fblob%2Fmain%2F.env.example&project-name=mengke-me-blog&repository-name=mengke-me-blog&demo-title=mengke.me&demo-description=Mengke's%20blog%20-%20Mengke's%20coding%20journey&demo-url=https%3A%2F%2Fwww.mengke.me%2F&demo-image=https%3A%2F%2Fwww.mengke.me%2Fstatic%2Fimages%2Fhome_page.webp)

### 4. 博文的访问量也可以免费存储在 Vercel 中

1. 在 Vercel 中创建一个 `Postgres Database`。

2. 你会得到一个类似于：`postgres://default:xxxxx@xx-xx-xx-xxxx.us-xx-x.postgres.vercel-storage.com:xxx/verceldb` 的字符串，将其添加到 `DATABASE_URL` 变量中。

3. 运行 `npx prisma db push` 来创建 `views` 表。

4. 每篇博文的阅读量会被自动统计到这个数据库中。

## ☕️ 支持 Mengke

<a href='https://ko-fi.com/P5P2ZV7NP' target='_blank'><img height='50' style='border:0px;height:50px;' src='https://storage.ko-fi.com/cdn/kofi2.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
