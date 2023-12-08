'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@components/ui/Button'
import { UserAvatar } from './UserAvatar'

import { getCurrentUser } from '@utils/blog_user_helpers'
import { getBlogs } from '@utils/blog_helpers'
import { Post, User } from '@utils/types'
import { MessageSquare } from 'lucide-react'
import LikeCounter from './LikeCounter'


const Blog = () => {

  const router = useRouter()

  const [blogs, setBlogs] = useState([] as Post[])
  const [currentUser, setCurrentUser] = useState({} as any)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser() as User
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
          blogs === undefined ? (
            <p className='text-gray-500'>Can't get access to Mongo data base</p>
          ) : (
            blogs.length === 0 ? (
              <p className='text-gray-500'>
                No posts yet
              </p>
            ) : (
              blogs.map((blog: Post) => (
                <div
                  className='shadow-2xl m-2 p-2 rounded-lg bg-white grid grid-cols-1 text-center space-y-4 cursor-pointer h-full'
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

                  <div className='flex justify-between'>
                    <LikeCounter postId={blog._id} currentUser={currentUser} likes={blog.likes} />

                    <div className='flex justify-between gap-2 items-center' onClick={() => {
                      router.push(`/blog/${blog._id}`)
                    }}>
                      <MessageSquare className='hover:text-blue-500' />
                      <span className='text-sm text-gray-500 font-bold flex justify-center items-center'>{blog.comments.length}</span>
                      {' '}
                      <span className='text-sm text-gray-500 font-bold flex justify-center items-center'>comments</span>
                    </div>
                  </div>

                  <div className='self-end'>
                    <Button variant='default' size='lg' className='m-4 dark:bg-gray-800 dark:text-gray-200' onClick={() => {
                      router.push(`/blog/${blog._id}`)
                    }}>
                      Read More
                    </Button>
                  </div>
                </div>
              ))
            )
          )
        }
      </div>
    </div>
  )
}



export default Blog
