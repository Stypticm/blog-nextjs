'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { getBlogs } from '../../utils/blog_helpers'
import { MessageSquare, ThumbsUp } from 'lucide-react'


const Blog = () => {

  const router = useRouter()

  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    getBlogs().then((blogs) => {
      setBlogs(blogs)
    })
  }, [])

  return (
    <div className='relative'>
      <div className='flex items-center justify-center text-center pt-5'>
        <Button variant='default' size='lg' className='m-4' onClick={() => {
          router.push('/createpost')
        }}>
          Create Post
        </Button>
        {/* <Button variant='default' size='lg' className='m-4'>
          Another function
        </Button> */}
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {blogs.map((blog: any) => (
          <div
            className='shadow-2xl m-4 p-4 rounded-lg bg-white grid grid-cols-1 text-center space-y-4 cursor-pointer h-full'
            key={blog.title}>
            <div className='self-center mx-auto'>
              <img
                src={blog.image}
                alt={blog.title}
                width={200}
                height={200}
              />
            </div>
            <h1 className='text-xl font-bold'>{blog.title}</h1>
            <div className='flex justify-between'>
              <p className='text-sm text-gray-500'>by {blog.author}</p>
              <p className='text-sm text-gray-500'>{blog.createdAt.split('T')[0]}</p>
            </div>
            <div className='self-end space-y-2-center'>
              <p>{blog.description}</p>
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
        ))}
      </div>
    </div>
  )
}



export default Blog
