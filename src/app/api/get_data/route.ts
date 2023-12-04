import clientPromise from '@lib/mongodb'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const mongodb = await clientPromise

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
      .collection('posts')
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
}
