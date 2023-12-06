import { Post, User } from '@utils/types'
import { useCallback } from 'react'
import axios from 'axios'
import React from 'react'
import LikeCounter from './LikeCounter'


const LikeDislike = ({ blog, currentUser, updateBlogs, updateCurrentUser }: { blog: Post, currentUser: User, updateBlogs: Function, updateCurrentUser: Function }) => {

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
        <div className='flex justify-between'>
            <LikeCounter postId={blog._id} currentUser={currentUser} likes={blog.likes} />
        </div>
    )
}

export default React.memo(LikeDislike)