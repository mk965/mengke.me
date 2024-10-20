import type { NextRequest } from 'next/server'
import { fetchRepoData } from '~/server/github.server'

export async function GET(request: NextRequest) {
  const params = new URL(request.url).searchParams
  const repo = params.get('repo')
  if (!repo) {
    return Response.json(
      { message: 'Missing repo parameter' },
      {
        status: 400,
      }
    )
  }
  const data = await fetchRepoData(repo)
  return Response.json(data)
}
