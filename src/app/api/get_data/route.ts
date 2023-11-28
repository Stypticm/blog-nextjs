import { authOptions } from '@lib/auth'
import clientPromise from '@lib/mongodb'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  const mongodb = await clientPromise
  const user = session?.user

  if (req.method !== 'GET') {
    return new Response(
      JSON.stringify({
        status: 405,
      })
    )
  }

  try {
    const db = await mongodb.db('blog')
    const posts = await db
      .collection('Post')
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json({ posts })
  } catch (error) {
    new Response(
      JSON.stringify({
        status: 500,
        error: 'Internal Server Error',
      })
    )
  }


  // return NextResponse.json({ authenticated: !!session })
}
