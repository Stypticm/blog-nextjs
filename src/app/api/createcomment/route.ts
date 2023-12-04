import { authOptions } from '@lib/auth'
import clientPromise from '@lib/mongodb'
import { ObjectId, PushOperator } from 'mongodb'
import { getServerSession } from 'next-auth'
import { Comment } from '@utils/types'

export async function PUT(req: Request) {
    const mongodb = await clientPromise
    const session = await getServerSession(authOptions)
    const user = session?.user

    if (req.method !== 'PUT') {
        return new Response(
            JSON.stringify({
                status: 405,
            })
        )
    }

    try {
        const { postId, comment } = await req.json()
        const db = await mongodb.db('blog')

        const updatedPost = await db.collection('posts').findOneAndUpdate(
            { _id: new ObjectId(postId) },
            {
                $push: {
                    comments: {
                        $each:
                            [{ _id: new ObjectId(), author: user?.name || '', comment }]
                    }
                } as PushOperator<Comment>,
            },
        )

        return new Response(
            JSON.stringify({
                status: 200,
                updatedPost,
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