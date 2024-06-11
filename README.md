# My 🏠 on the ☁️

![Home Page](./public/static/images/home_page.jpg)

[简体中文](./README_zh.md)

## Motivation

> Sharing is learning!

I created this blog to record and share my learnings and insights as a software engineer, but also to keep track of my life. It is a treasure trove of valuable information that I have accumulated throughout my journey.

Recording and organizing my thoughts helps me solidify my understanding of new concepts and technologies. My goal is to provide a useful resource for those interested in web development and related technologies.

Your comments and feedback are highly appreciated 🍻. They contribute to the growth and improvement of this blog.

## Tech stack

- 🪤 Hosted on [Vercel](https://vercel.com/)
- 🧱 Built with [Next.js](https://nextjs.org/)
- 🎨 Styled using [Tailwind CSS](https://tailwindcss.com/) with the **Tailwind Nextjs Starter Blog** template.
- 📈 Monitoring site with [Umami](https://umami.is/), [Google Analytics](https://analytics.google.com/analytics/web/) and [Microsoft Clarity](https://clarity.microsoft.com/) website analytics

## DEMO

You can see what the blog looks like here: <https://mengke.me>

## How to deploy a similar blog?

### 1. Installation

1. Clone or fork this repository.

2. Run `npm install` or `yarn` to install dependencies.

### 2. Modify data

1. Rename the `.env.example` file in the root directory to `.env` and modify the value in it.

2. Update the information in the files in the `/data` directory, which contains the blog data.

### 3. Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmk965%2Fmengke.me&env=GISCUS_REPO,GISCUS_REPOSITORY_ID,GISCUS_CATEGORY,GISCUS_CATEGORY_ID,DATABASE_URL&project-name=mengke-blog&repository-name=mengke-blog&demo-title=mengke.me&demo-description=Mengke's%20blog%20-%20Mengke's%20coding%20journey&demo-url=https%3A%2F%2Fmengke.me&demo-image=https%3A%2F%2Fgithub.com%2Fmk965%2Fmengke.me%2Fraw%2Fmain%2Fpublic%2Fstatic%2Fimages%2Fhome_page.jpg)

### 4. Blog post visits can also be stored in Vercel for free

1. Create a `Postgres Database` in Vercel.

2. You will get a string similar to: `postgres://default:xxxxx@xx-xx-xx-xxxx.us-xx-x.postgres.vercel-storage.com:xxx/verceldb`, add it to the `DATABASE_URL` variable.

3. The number of views of each blog post will be automatically counted in this database.
