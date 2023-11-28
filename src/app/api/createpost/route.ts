import bcrypt from 'bcrypt'
import clientPromise from '@/lib/mongodb'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'


export async function POST(req: Request) {
    const mongodb = await clientPromise
    const session = await getServerSession(authOptions)
    const user = session?.user

    if (req.method !== 'POST') {
        return new Response(
            JSON.stringify({
                status: 405,
            })
        )
    }

    try {
        const { title, description, image } = await req.json()
        const db = await mongodb.db('blog')

        const existingTitle = await db.collection("Post").findOne(
            {
                title
            }
        )

        if (existingTitle) {
            return new Response(
                JSON.stringify({
                    status: 422,
                    error: 'Title used',
                })
            )
        }

        const post = await db.collection("Post").insertOne(
            {
                title,
                description,
                image,
                comments: [],
                likes: [],
                author: user?.name,
                email: user?.email,
                createdAt: new Date(),
            }
        )

        return new Response(
            JSON.stringify({
                status: 200,
                post,
            })
        )

    } catch {
        new Response(
            JSON.stringify({
                status: 500,
                error: 'Internal Server Error',
            })
        )
    }
}