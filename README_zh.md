# My 🏠 on the ☁️

![Home Page](./public/static/images/home_page.jpg)

## 动机

> 分享就是学习！

我创建这个博客是为了记录和分享我作为一名软件工程师的学习和见解，同时也记录我的生活点滴。它是我在整个旅程中积累的宝贵信息的宝库。

记录和整理我的想法有助于我巩固对新概念和技术的理解。我的目标是为对 Web 开发和相关技术感兴趣的人提供有用的资源。

非常感谢您的评论和反馈🍻。

## 技术栈

- 🪤 托管在 [Vercel](https://vercel.com/)。
- 🧱 使用 [Next.js](https://nextjs.org/) 构建。
- 🎨 样式使用了 [Tailwind CSS](https://tailwindcss.com/) **Tailwind Nextjs Starter Blog** 模版。
- 📈 使用 [Umami](https://umami.is/)、[Google Analytics](https://analytics.google.com/analytics/web/) 和 [Microsoft Clarity](https://clarity.microsoft.com/) 网站分析监控网站。

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

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmk965%2Fmengke.me&env=GISCUS_REPO,GISCUS_REPOSITORY_ID,GISCUS_CATEGORY,GISCUS_CATEGORY_ID,DATABASE_URL&project-name=mengke-blog&repository-name=mengke-blog&demo-title=mengke.me&demo-description=Mengke's%20blog%20-%20Mengke's%20coding%20journey&demo-url=https%3A%2F%2Fmengke.me&demo-image=https%3A%2F%2Fgithub.com%2Fmk965%2Fmengke.me%2Fraw%2Fmain%2Fpublic%2Fstatic%2Fimages%2Fhome_page.jpg)

### 4. 博文的访问量也可以免费存储在 Vercel 中

1. 在 Vercel 中创建一个 `Postgres Database`。

2. 你会得到一个类似于：`postgres://default:xxxxx@xx-xx-xx-xxxx.us-xx-x.postgres.vercel-storage.com:xxx/verceldb` 的字符串，将其添加到 `DATABASE_URL` 变量中。

3. 每篇博文的阅读量会被自动统计到这个数据库中。
