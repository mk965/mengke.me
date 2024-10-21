import { NextResponse } from 'next/server'
import { __db } from '~/server/prisma.server'

export async function GET(req: Request) {
  const totalViews = await __db.views.aggregate({
    _sum: {
      count: true,
    },
  })

  return NextResponse.json({
    total: totalViews._sum.count?.toString(),
  })
}
