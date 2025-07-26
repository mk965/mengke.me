import { getNpmPackage } from './npm'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const params = new URL(request.url).searchParams
  const packageName = params.get('package')
  if (!packageName) {
    return Response.json({ message: 'Missing package parameter' }, { status: 400 })
  }
  const response = await getNpmPackage(packageName)
  if (response.status === 204 || response.status > 400) {
    return Response.json({ message: 'Package not found' }, { status: 404 })
  }

  const data = await response.json()

  return Response.json(data)
}
