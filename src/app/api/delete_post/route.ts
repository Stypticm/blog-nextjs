import clientPromise from '@lib/mongodb'
import { ObjectId } from 'mongodb'

export const dynamic = 'force-dynamic'

export async function DELETE(req: Request) {
    const mongodb = await clientPromise

    if (req.method !== 'DELETE') {
        return new Response(
            JSON.stringify({
                status: 405,
            })
        )
    }

    try {
        const { id } = await req.json()
        const db = await mongodb.db('blog')
        await db.collection('posts').deleteOne({ _id: new ObjectId(id) })

        let _id = new ObjectId(id)

        const users = await db.collection('users').find({
            $or: [{ likedPosts: _id }, { dislikedPosts: _id }]
        }).toArray()

        const updateUsersOperations = users.map((user) => {
            const updatedLikedPosts = user.likedPosts.filter((postId: ObjectId) => postId.toString() !== id)
            const updatedDislikedPosts = user.dislikedPosts.filter((postId: ObjectId) => postId.toString() !== id)

            return {
                updateOne: {
                    filter: { _id: new ObjectId(user._id) },
                    update: {
                        $set: {
                            likedPosts: updatedLikedPosts,
                            dislikedPosts: updatedDislikedPosts
                        }
                    }
                }
            }
        })

        await db.collection('users').bulkWrite(updateUsersOperations)

        return new Response(
            JSON.stringify({
                status: 200,
            })
        )
    } catch (error) {
        return new Response(
            JSON.stringify({
                status: 500,
                error: 'Internal Server Error',
            })
        )
    }
}