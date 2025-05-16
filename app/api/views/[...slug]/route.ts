import { NextResponse } from 'next/server'
import __db from '~/server/prisma.server'

type Params = {
  slug: string | string[]
}

const isProduction = process.env.NODE_ENV === 'production'
export async function GET(req: Request, props: { params: Promise<Params> }) {
  try {
    const params = await props.params
    const slug = (
      typeof params.slug === 'string' ? params.slug.toString() : params.slug?.pop()?.toString()
    ) as string

    const views = await __db.views.findUnique({ where: { slug } })

    return NextResponse.json({
      total: views?.count?.toString?.() || 0,
      slug,
    })
  } catch (e) {
    return NextResponse.json({ message: e.message })
  }
}

export async function POST(req: Request, props: { params: Promise<Params> }) {
  try {
    const params = await props.params
    const slug = (
      typeof params.slug === 'string' ? params.slug.toString() : params.slug?.pop()?.toString()
    ) as string

    // Avoid dirty data in the development environment
    if (!isProduction) {
      return NextResponse.json({ total: '0' })
    }

    const newOrUpdatedViews = await __db.views.upsert({
      where: { slug },
      create: { slug },
      update: { count: { increment: 1 } },
    })

    return NextResponse.json({
      total: newOrUpdatedViews.count.toString(),
      slug,
    })
  } catch (e) {
    return NextResponse.json({ message: e.message })
  }
}
