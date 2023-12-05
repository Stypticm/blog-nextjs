import { ArrowBigDown, ArrowBigUp, MessageSquare } from 'lucide-react'
import { Post, User } from '@utils/types'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import axios from 'axios'
import React from 'react'


const LikeDislike = ({ blog, currentUser, updateBlogs, updateCurrentUser }: { blog: Post, currentUser: User, updateBlogs: Function, updateCurrentUser: Function }) => {
    const router = useRouter()

    const likeOrDislikePost = useCallback(async (blog_id: string, liked: boolean) => {
        try {
            await axios.put('/api/like_dislike_posts', {
                blog_id,
                liked
            })
            updateBlogs()
            updateCurrentUser()
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <div className='flex justify-between m-6'>
            <div className='flex justify-between gap-2'>
                {
                    currentUser.dislikedPosts?.find((dislikedPost: string) => dislikedPost === blog._id) ? (
                        <button disabled>
                            <ArrowBigDown />
                        </button>
                    ) : (
                        <button>
                            <ArrowBigDown className='hover:text-red-600' onClick={() => likeOrDislikePost(blog._id, false)} />
                        </button>
                    )
                }
                <span className='text-sm text-gray-500 font-bold flex justify-center items-center'>{blog.likes}</span>
                {
                    currentUser.likedPosts?.find((likedPost: string) => likedPost === blog._id) ? (
                        <button disabled>
                            <ArrowBigUp />
                        </button>
                    ) : (
                        <button>
                            <ArrowBigUp className='hover:text-green-600' onClick={() => likeOrDislikePost(blog._id, true)} />
                        </button>
                    )
                }
            </div>
            <div className='flex justify-between gap-2'>
                <MessageSquare className='hover:text-blue-500' onClick={() => {
                    router.push(`/blog/${blog._id}`)
                }
                } />
                <span className='text-sm text-gray-500 font-bold flex justify-center items-center'>{blog.comments.length}</span>
                {' '}
                <span className='text-sm text-gray-500 font-bold flex justify-center items-center'>comments</span>
            </div>
        </div>
    )
}

export default React.memo(LikeDislike)