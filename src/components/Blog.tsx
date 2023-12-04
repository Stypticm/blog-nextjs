'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@components/ui/Button'
import { ArrowBigDown, ArrowBigUp, MessageSquare } from 'lucide-react'
import { UserAvatar } from './UserAvatar'

import { getCurrentUser } from '@utils/blog_user_helpers'
import { getBlogs } from '@utils/blog_helpers'
import { Post, User } from '@utils/types'
import axios from 'axios'


const Blog = () => {

  const router = useRouter()

  const [blogs, setBlogs] = useState([] as Post[])
  const [currentUser, setCurrentUser] = useState({} as any)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser() as User
        user.dislikedPosts?.find((dislikedPost: string) => console.log(dislikedPost))
        setCurrentUser(user)
      } catch (error) {
        console.error(error)
      }
    }
    fetchUser()
  }, [])

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await getBlogs() as Post[]
        setBlogs(blogs as Post[])
      } catch (error) {
        console.error(error)
      }
    }
    fetchBlogs()
  }, [])

  const likeOrDislikePost = useCallback(async (blogId: string, liked: boolean) => {
    try {
      await axios.put('/api/like_dislike_posts', {
        blogId, liked
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <div className='relative'>
      <div className='flex items-center justify-center text-center pt-5'>
        <Button variant='default' size='lg' className='m-4' onClick={() => {
          router.push('/createpost')
        }}>
          Create Post
        </Button>
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {
          blogs.length === 0 ? (
            <div className='text-center text-gray-500 mx-auto'>
              No posts yet
            </div>
          ) : (
            blogs.map((blog: Post) => (
              <div
                className='shadow-2xl m-2 p-2 rounded-lg bg-white grid grid-cols-1 text-center space-y-4 cursor-pointer h-full'
                // onClick={() => {
                //   router.push(`/blog/${blog._id}`)
                // }}
                key={blog._id}>
                <div className='self-center mx-auto'>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    loading='lazy'
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                      width: '300px',
                      height: '150px'
                    }}
                  />
                </div>
                <h1 className='text-xl font-bold text-gray-800'>{blog.title}gfdgd</h1>
                <div className='self-end space-y-2-center text-gray-500'>
                  {blog.description.length > 50 ? blog.description.slice(0, 50) + '...' : blog.description}
                </div>
                <div className='flex gap-2 m-6'>
                  <p className='p-1 border-gray-800 flex justify-center items-center'>
                    <UserAvatar
                      user={{
                        image: blog.avatar || null,
                      }}
                    />
                  </p>
                  <div className='flex flex-col justify-center ml-2'>
                    <p className='text-sm text-gray-500 font-bold'>by {blog.author}</p>
                    <p className='text-sm text-gray-500'>{blog.createdAt.toString().split('T')[0]}</p>
                  </div>
                </div>


                <div className='flex justify-between m-6'>
                  <div className='flex justify-between gap-2'>
                    {
                      currentUser.dislikedPosts?.find((dislikedPost: string) => dislikedPost === blog._id) ? (
                        <button disabled>
                          <ArrowBigDown />
                        </button>
                      ) : (
                        <button>
                          <ArrowBigDown className='hover:text-red-600' onClick={() => {
                            likeOrDislikePost(blog._id, false)
                          }} />
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
                          <ArrowBigUp className='hover:text-green-600' onClick={() => {
                            likeOrDislikePost(blog._id, true)
                          }} />
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
                <div className='self-end'>
                  <Button variant='default' size='lg' className='m-4' onClick={() => {
                    router.push(`/blog/${blog._id}`)
                  }}>
                    Read More
                  </Button>
                </div>
              </div>
            ))
          )
        }
      </div>
    </div>
  )
}



export default Blog
