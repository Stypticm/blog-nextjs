'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@components/ui/Button'
import { getBlogs } from '@utils/blog_helpers'
import { MessageSquare, ThumbsUp } from 'lucide-react'
import { Post } from '@utils/types'
import { UserAvatar } from './UserAvatar'


const Blog = () => {

  const router = useRouter()

  const [blogs, setBlogs] = useState([] as Post[])

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
          blogs.length === 0 ? (
            <div className='text-center text-gray-500 mx-auto'>
              No posts yet
            </div>
          ) : (
            blogs.map((blog: any) => (
              <div
                className='shadow-2xl m-4 p-4 rounded-lg bg-white grid grid-cols-1 text-center space-y-4 cursor-pointer h-full'
                key={blog.title}>
                <div className='self-center mx-auto'>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    width={300}
                    height={200}
                  />
                </div>
                <h1 className='text-xl font-bold text-gray-800'>{blog.title}gfdgd</h1>
                <div className='self-end space-y-2-center text-gray-500'>
                  <p>{blog.description}</p>
                </div>
                <div className='flex gap-2'>
                  <p className='border rounded-full p-1 border-gray-800 flex justify-center items-center'>
                    <UserAvatar
                      user={{
                        image: blog.avatar || null,
                      }}
                    />
                  </p>
                  <div className=''>
                    <p className='text-sm text-gray-500 font-bold'>by {blog.author}</p>
                    <p className='text-sm text-gray-500'>{blog.createdAt.split('T')[0]}</p>
                  </div>
                </div>


                <div className='flex justify-between'>
                  <div className='flex justify-between'>
                    <span>{blog.likes}</span>
                    <ThumbsUp />
                  </div>
                  <div className='flex justify-between'>
                    <MessageSquare />
                    {blog.comments}
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
