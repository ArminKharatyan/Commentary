import { db } from '@/lib/db'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const q = url.searchParams.get('q')

  if (!q) return new Response('Invalid query', { status: 400 })

  const results = await db.subboard.findMany({
    where: {
      name: {
        startsWith: q,
      },
    },
    select: {
    id: true,
    name: true,
    slug: true, 
    _count: true,
    },
    take: 5,
  })

  return new Response(JSON.stringify(results))
}
