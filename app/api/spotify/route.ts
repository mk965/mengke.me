import { getNowPlaying } from './spotify'
import type { SpotifyNowPlayingData } from '~/types/data'

export async function GET() {
  try {
    const response = await getNowPlaying()
    if (response.status === 204 || response.status > 400) {
      return Response.json(
        { isPlaying: false },
        {
          headers: {
            'Cache-Control': 'public, max-age=60, s-maxage=60, stale-while-revalidate=120',
          },
        }
      )
    }

    const data = await response.json()
    // Spotify can return 200 with an empty item in some edge cases.
    if (!data?.item) {
      return Response.json(
        { isPlaying: false },
        {
          headers: {
            'Cache-Control': 'public, max-age=60, s-maxage=60, stale-while-revalidate=120',
          },
        }
      )
    }

    if (data?.currently_playing_type === 'episode') {
      return Response.json(
        {
          isPlaying: true,
          title: data.item.name,
          songUrl: data.item.external_urls.spotify,
        },
        {
          headers: {
            'Cache-Control': 'public, max-age=60, s-maxage=60, stale-while-revalidate=120',
          },
        }
      )
    }

    const songData: SpotifyNowPlayingData = {
      isPlaying: data.is_playing,
      title: data.item.name,
      artist: data.item.artists.map((art: { name: string }) => art.name).join(', '),
      album: data.item.album.name,
      albumImageUrl: data.item.album.images[0]?.url,
      songUrl: data.item.external_urls.spotify,
    }

    return Response.json(songData, {
      headers: { 'Cache-Control': 'public, max-age=60, s-maxage=60, stale-while-revalidate=120' },
    })
  } catch {
    return Response.json(
      { isPlaying: false },
      {
        headers: { 'Cache-Control': 'public, max-age=60, s-maxage=60, stale-while-revalidate=120' },
      }
    )
  }
}
