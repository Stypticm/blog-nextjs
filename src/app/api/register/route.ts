import bcrypt from 'bcrypt'
import clientPromise from '@lib/mongodb'
import { User } from '@utils/types'

export async function POST(req: Request) {
  const mongodb = await clientPromise

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({
        status: 405,
      })
    )
  }
  try {
    const { email, name, password } = await req.json()

    const db = await mongodb.db('blog')

    const existingUser = await db.collection("users").findOne(
      {
        email
      }
    )


    if (existingUser) {
      return new Response(
        JSON.stringify({
          status: 422,
          error: 'Email taken',
        })
      )
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await db.collection("users").insertOne(
      {
        email,
        name,
        hashedPassword,
        image: '',
        emailVerified: new Date(),
        likedPosts: [],
        dislikedPosts: [],
      } as User
    )

    return new Response(
      JSON.stringify({
        status: 200,
        user,
      })
    )
  } catch (error) {
    new Response(
      JSON.stringify({
        status: 500,
        error: 'Internal Server Error',
      })
    )
  }
}
