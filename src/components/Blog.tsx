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
                className='shadow-2xl m-2 p-2 rounded-lg bg-white grid grid-cols-1 text-center space-y-4 cursor-pointer h-full'
                onClick={() => {
                  router.push(`/blog/${blog._id}`)
                }}
                key={blog.title}>
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
                    <p className='text-sm text-gray-500'>{blog.createdAt.split('T')[0]}</p>
                  </div>
                </div>


                <div className='flex justify-between m-6'>
                  <div className='flex justify-between gap-2'>
                    <span className='text-sm text-gray-500 font-bold flex justify-center items-center'>{blog.likes}</span>
                    <ThumbsUp className='hover:text-blue-500'/>
                  </div>
                  <div className='flex justify-between gap-2'>
                    <span className='text-sm text-gray-500 font-bold flex justify-center items-center'>{blog.comments.length}</span>
                    <MessageSquare className='hover:text-blue-500'/>
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
