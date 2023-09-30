---
heading: 'Getting Spotify token & status'
title: '获取 Spotify token 并在网站上显示当前播放的曲目'
date: '2023-09-30'
type: 'Spotify'
draft: false
summary: '如何获得 Spotify token 并使用它在你的网站上显示当前播放的曲目'
tags: [spotify, now playing, spotify api, next.js]
---

import Twemoji from './Twemoji.tsx'

如果你想在你的网站上显示你的 Spotify 现在正在播放曲目，你需要从 Spotify 获取 token。此 token 将用于从 Spotify API 获取曲目信息。

## 创建 Spotify app

第一步，你需要创建一个 Spotify app 来获取凭证，以便生成 token。

- 打开 [Spotify for Developers](https://developer.spotify.com/dashboard/applications) 并使用你的 Spotify 账户登录。
- 点击 **Create app** 按钮。
- 填写表单并填写应用名称和描述。
- 添加一个重定向 URI。这个 URI 将用于重定向到本地应用。例如，`http://localhost:3434`。
- 点击 **Create** 按钮。

创建 App 后，到 **Settings** 页面并复制 `Client ID` 和 `Client secret`。

![Spotify App](/static/images/snippets/getting_spotify_token_and_status/spotify_app.jpeg)

## Authentication

由于我们只需要生成一次令牌，因此我们将使用[Authorization Code Flow](https://developer.spotify.com/documentation/web-api/concepts/authorization#authorization-code-flow).

打开到以下URL，并将 `CLIENT_ID` 替换为你的 `Spotify` 应用程序客户端ID：

```bash
https://accounts.spotify.com/authorize?client_id=CLIENT_ID&response_type=code&redirect_uri=http://localhost:3434&scope=user-read-currently-playing
```

请记住使用你添加到 Spotify app 的 `Redirect URIs`。

在我的案例中, 重定向域名是 `http://localhost:3434`.

![Spotify auth](/static/images/snippets/getting_spotify_token_and_status/spotify_auth.jpg)

After the authentication process, you will be redirected to the redirect URI with a `code` query parameter.

The redirect URI will look like this:

```bash
http://localhost:3434/?code=AQBis...i9j0
```

![Spotify code](/static/images/snippets/getting_spotify_token_and_status/spotify_code.jpg)

保存这个 `code` 值，我们将在下一步中使用它。

下一步是向 Spotify API 发送 POST 请求以获取令牌。我们只需在浏览器中打开一个新选项卡，然后使用浏览器开发工具中的 `fetch` API 发送请求。

在浏览器开发人员工具的控制台选项卡中运行以下代码：

```javascript {3,18} showLineNumbers
let data = {
  grant_type: 'authorization_code',
  code: 'AQB....GemX',
  redirect_uri: 'http://localhost:3434',
}

let formData = []
for (let prop in data) {
  let encodedKey = encodeURIComponent(prop)
  let encodedValue = encodeURIComponent(data[prop])
  formData.push(encodedKey + '=' + encodedValue)
}
formData = formData.join('&')

fetch('https://accounts.spotify.com/api/token', {
  method: 'POST',
  headers: {
    Authorization: 'Basic <base64 encoded client_id:client_secret>',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: formData,
})
```

将第3行中的代码替换为上一步中保存的 `code` 值。

将第18行中的 `<base64 encoded client_id:client_secret>` 替换为 Spotify app 的 base64 编码的 `Client ID` 和 `Client secret`。
你可以使用这个[在线工具](https://www.base64encode.org/)以对该值进行编码。

![Base64 encode tool](/static/images/snippets/getting_spotify_token_and_status/spotify_base64_encode.jpg)

值格式应为 `client_id:client_secret`

请求将返回一个包含 `refresh_token` 的响应，此令牌无限期有效，除非你撤销它或更改你 Spotify 帐户的密码。

## 获取当前正在播放的曲目

现在我们有了 token，我们可以使用它从 Spotify API 获取正在播放的曲目。

使用以下代码在节点服务器中获取当前播放的曲目：

```typescript
import fetch from 'isomorphic-unfetch'

let SPOTIFY_TOKEN_API = `https://accounts.spotify.com/api/token`
let SPOTIFY_NOW_PLAYING_API = `https://api.spotify.com/v1/me/player/currently-playing`
let SPOTIFY_TOP_TRACKS_API = `https://api.spotify.com/v1/me/top/tracks`

let {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env

let basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')

async function getAccessToken() {
  let response = await fetch(SPOTIFY_TOKEN_API, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  })

  return response.json()
}

export async function getNowPlaying() {
  let { access_token } = await getAccessToken()
  let url = new URL(SPOTIFY_NOW_PLAYING_API)
  url.searchParams.append('additional_types', 'track,episode')

  return fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}
```

你在接口中可以得到如下格式的内容：

```json
{
  "isPlaying": true,
  "title": "唯一 (三立/台視戲劇《戀愛是科學》插曲)",
  "artist": "告五人",
  "album": "運氣來得若有似無",
  "albumImageUrl": "https://i.scdn.co/image/ab67616d0000b273dea5f1d53c6450cde827daef",
  "songUrl": "https://open.spotify.com/track/19fp9nI0tq0lcBl7XoCHAb"
}
```

你如果使用我当前的网站源码建站的话，你可以直接把值添加到 `.env` 文件中。

```bash
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token
```

就是这样！现在，你可以使用 `getNowPlaying` 功能从 Spotify API 获取正在播放的曲目。

Happy coding! <Twemoji emoji="clinking-beer-mugs" />
