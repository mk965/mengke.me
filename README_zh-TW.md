<h1 align="center">mengke.me 🧑‍💻</h1>

<div align="center">

[English](./README.md) | [简体中文](./README_zh-CN.md) | [日本語](./README_ja.md)

</div>

<img style="border-radius: 6px" src="./public/static/images/home_page.webp">

## 動機

> 分享就是學習！

我創建這個博客是為了記錄和分享我作為一名軟體工程師的學習和見解，同時也記錄我的生活點滴。它是我在整個旅程中累積的寶貴信息的寶庫。

記錄和整理我的想法有助於我鞏固對新概念和技術的理解。我的目標是為對 Web 開發和相關技術感興趣的人提供有用的資源。

非常感謝您的評論和反饋🍻。

## 技術棧

- 🪤 託管在 [Vercel](https://vercel.com/)。
- 🧱 使用 **React 18+** 和 **NextJS 14+** 構建。
- 📊 使用 [Umami](https://umami.is/) 進行網站的數據監控。
- 🎉 採用 **Typescript**，使用 [Conventional Commits](https://www.conventionalcommits.org/) 進行提交。

## 演示

演示站點：<https://mengke.me>

## 如何部署一個同樣的博客？

> 我这里只描述基本的操作步驟。如果你是零基礎或在部署過程中遇到任何問題，請發郵件給我：me@mengke.me。

### 1. 安裝

1. Clone 或 Fork 本倉庫。

2. 运行 `npm install` 或 `yarn` 安裝依賴。

### 2. 修改數據

1. 將根目錄下的 `.env.example` 文件重命名為 `.env`，並修改其中的值。

2. 更新 `/data` 目錄下各文件中的信息，這裡包含了博客的數據。

### 3. 部署到 Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmk965%2Fmengke.me&env=NEXT_PUBLIC_GISCUS_REPO,NEXT_PUBLIC_GISCUS_REPOSITORY_ID,NEXT_PUBLIC_GISCUS_CATEGORY,NEXT_PUBLIC_GISCUS_CATEGORY_ID,NEXT_UMAMI_ID,SPOTIFY_CLIENT_ID,SPOTIFY_CLIENT_SECRET,SPOTIFY_REFRESH_TOKEN,DATABASE_URL,GITHUB_API_TOKEN&envDescription=Giscus%5CUmami%5CSpotify%5CData%5CGithub&envLink=https%3A%2F%2Fgithub.com%2Fmk965%2Fmengke.me%2Fblob%2Fmain%2F.env.example&project-name=mengke-me-blog&repository-name=mengke-me-blog&demo-title=mengke.me&demo-description=Mengke's%20blog%20-%20Mengke's%20coding%20journey&demo-url=https%3A%2F%2Fwww.mengke.me%2F&demo-image=https%3A%2F%2Fwww.mengke.me%2Fstatic%2Fimages%2Fhome_page.webp)

### 4. 博文的訪問量也可以免費存儲在 Vercel 中

1. 在 Vercel 中創建一個 `Postgres Database`。

2. 你會得到一個類似於：`postgres://default:xxxxx@xx-xx-xx-xxxx.us-xx-x.postgres.vercel-storage.com:xxx/verceldb` 的字符串，將其添加到 `DATABASE_URL` 變量中。

3. 運行 `npx prisma db push` 來創建 `views` 表。

4. 每篇博文的閱讀量會被自動統計到這個數據庫中。

## ☕️ 支持 Mengke

<a href='https://ko-fi.com/P5P2ZV7NP' target='_blank'><img height='50' style='border:0px;height:50px;' src='https://storage.ko-fi.com/cdn/kofi2.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
