import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { SubboardValidator } from '@/lib/validators/subboard'
import { z } from 'zod'
import slugify from 'slugify'

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { name } = SubboardValidator.parse(body)

    const slug = slugify(name, { lower: true }) 
    
    const subboardExists = await db.subboard.findFirst({
      where: {
        slug,
      },
    })

    if (subboardExists) {
      return new Response('Subboard already exists', { status: 409 })
    }

   
    const subboard = await db.subboard.create({
      data: {
        name,
        slug, 
        creatorId: session.user.id,
      },
    })

    
    await db.subscription.create({
      data: {
        userId: session.user.id,
        subboardId: subboard.id,
      },
    })

    return new Response(slug) 
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    }

    return new Response('Could not create subboard', { status: 500 })
  }
}
