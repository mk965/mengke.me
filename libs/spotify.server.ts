import fetch from 'isomorphic-unfetch'
import { SPOTIFY_TOKEN_API, SPOTIFY_NOW_PLAYING_API, SPOTIFY_TOP_TRACKS_API } from '~/constant'

const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
console.log(basic)
async function getAccessToken() {
  const response = await fetch(SPOTIFY_TOKEN_API, {
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
  console.log(refresh_token)

  return response.json()
}

export async function getNowPlaying() {
  const { access_token } = await getAccessToken()
  const url = new URL(SPOTIFY_NOW_PLAYING_API)
  url.searchParams.append('additional_types', 'track,episode')

  return fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export async function getTopTracks() {
  const { access_token } = await getAccessToken()

  return fetch(SPOTIFY_TOP_TRACKS_API, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}
