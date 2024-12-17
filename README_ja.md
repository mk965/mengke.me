<h1 align="center">mengke.me 🧑‍💻</h1>

<div align="center">

[English](./README.md) | [简体中文](./README_zh-CN.md) | [繁体中文](./README_zh-TW.md)

</div>

<img style="border-radius: 6px" src="./public/static/images/home_page.webp">

## 動機

> 共有は学びです！

このブログは、ソフトウェアエンジニアとしての学びや洞察、そして日常の出来事を記録し、共有するために作成しました。これは私の旅の中で蓄積した貴重な情報の宝庫です。

自分の考えを記録し整理することで、新しい概念や技術への理解が深まります。私の目標は、Web開発や関連技術に興味を持つ方々に有用なリソースを提供することです。

コメントやフィードバックをいただけると、とても嬉しいです🍻。

## 技術スタック

- 🪤 ホスティングは [Vercel](https://vercel.com/)。
- 🧱 **React 18+** と **NextJS 14+** を使用して構築。
- 📊 [Umami](https://umami.is/) を使ってウェブサイトのトラッキング。
- 🎉 **Typescript** を採用し、[Conventional Commits](https://www.conventionalcommits.org/) でコミット管理。

## デモ

デモサイト：<https://mengke.me>

## 同じブログを展開するには？

> ここでは基本的な手順のみを記載します。初心者の方や、デプロイ中に問題が発生した場合は、メールでご連絡ください：me@mengke.me。

### 1. インストール

1. このリポジトリをクローンまたはフォークします。

2. 依存関係をインストールするために、`npm install` または `yarn` を実行します。

### 2. データの変更

1. ルートディレクトリにある `.env.example` ファイルを `.env` にリネームし、値を修正します。

2. `/data` ディレクトリ内の各ファイルの情報を更新します。これがブログのデータを含んでいます。

### 3. Vercelにデプロイ

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmk965%2Fmengke.me&env=NEXT_PUBLIC_GISCUS_REPO,NEXT_PUBLIC_GISCUS_REPOSITORY_ID,NEXT_PUBLIC_GISCUS_CATEGORY,NEXT_PUBLIC_GISCUS_CATEGORY_ID,NEXT_UMAMI_ID,SPOTIFY_CLIENT_ID,SPOTIFY_CLIENT_SECRET,SPOTIFY_REFRESH_TOKEN,DATABASE_URL,GITHUB_API_TOKEN&envDescription=Giscus%5CUmami%5CSpotify%5CData%5CGithub&envLink=https%3A%2F%2Fgithub.com%2Fmk965%2Fmengke.me%2Fblob%2Fmain%2F.env.example&project-name=mengke-me-blog&repository-name=mengke-me-blog&demo-title=mengke.me&demo-description=Mengke's%20blog%20-%20Mengke's%20coding%20journey&demo-url=https%3A%2F%2Fwww.mengke.me%2F&demo-image=https%3A%2F%2Fwww.mengke.me%2Fstatic%2Fimages%2Fhome_page.webp)

### 4. ブログ記事のアクセス数を無料でVercelに保存することも可能

1. Vercelで `Postgres Database` を作成します。

2. 以下のような文字列を取得できます：`postgres://default:xxxxx@xx-xx-xx-xxxx.us-xx-x.postgres.vercel-storage.com:xxx/verceldb`。これを `DATABASE_URL` 環境変数に追加します。

3. `npx prisma db push` を実行して `views` テーブルを作成します。

4. 各ブログ記事の閲覧数は自動的にこのデータベースに保存されます。

## ☕️ Mengkeを応援

<a href='https://ko-fi.com/P5P2ZV7NP' target='_blank'><img height='50' style='border:0px;height:50px;' src='https://storage.ko-fi.com/cdn/kofi2.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
