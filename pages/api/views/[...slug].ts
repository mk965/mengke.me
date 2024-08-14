import type { NextApiRequest, NextApiResponse } from 'next'
import { __db } from '~/libs/prisma'

const isProduction = process.env.NODE_ENV === 'production'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const slug = (
      typeof req.query.slug === 'string'
        ? req.query.slug.toString()
        : req.query.slug?.pop()?.toString()
    ) as string
    if (req.method === 'POST') {
      if (!isProduction) {
        return res.status(200).json({ total: '0' })
      }
      const newOrUpdatedViews = await __db.views.upsert({
        where: { slug },
        create: { slug },
        update: { count: { increment: 1 } },
      })
      return res.status(200).json({ total: newOrUpdatedViews.count.toString() })
    }
    if (req.method === 'GET') {
      const views = await __db.views.findUnique({ where: { slug } })
      return res.status(200).json({ total: views?.count?.toString?.() || 0 })
    }
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}
