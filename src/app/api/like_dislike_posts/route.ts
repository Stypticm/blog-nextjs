import { authOptions } from '@lib/auth'
import clientPromise from '@lib/mongodb'
import { ObjectId, PullOperator, PushOperator } from 'mongodb'
import { getServerSession } from 'next-auth/next'

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
        const { blog_id, liked } = await req.json()
        const db = await mongodb.db('blog')
        let like_dislike, addLikedPosts, addDislikedPosts
        

        // @ts-ignore
        const userId = new ObjectId(user?.id ?? '')

        if (liked) {
            like_dislike = await db.collection('posts').findOneAndUpdate(
                { _id: new ObjectId(blog_id) },
                {
                    $inc: {
                        likes: 1
                    }
                }
            )

            addLikedPosts = await db.collection('users').findOneAndUpdate(
                { _id: userId },
                {
                    $push: {
                        likedPosts: new ObjectId(blog_id)
                    } as PushOperator<[string]>,
                    $pull: {
                        dislikedPosts: new ObjectId(blog_id)
                    } as PullOperator<[string]>
                }
            )


        } else {
            like_dislike = await db.collection('posts').findOneAndUpdate(
                { _id: new ObjectId(blog_id) },
                {
                    $inc: {
                        likes: -1
                    }
                }
            )

            addDislikedPosts = await db.collection('users').findOneAndUpdate(
                { _id: userId },
                {
                    $push: {
                        dislikedPosts: new ObjectId(blog_id)
                    } as PushOperator<[string]>,
                    $pull: {
                        likedPosts: new ObjectId(blog_id)
                    } as PullOperator<[string]>
                }
            )
        }

        return new Response(
            JSON.stringify({
                status: 200,
                like_dislike
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