'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'

const blogs = [
  {
    id: 1,
    title: 'Blog 1',
    content:
      'Lipsum dolor sit amet consectetur adipiscing elit dolor sit amet consectetur adipiscing elit',
    author: 'Author 1',
    image:
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
  },
  {
    id: 2,
    title: 'Blog 2',
    content:
      'Lipsum dolor sit amet consectetur adipiscing elit dolor sit amet consectetur adipiscing elit',
    author: 'Author 2',
    image:
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
  },
  {
    id: 3,
    title: 'Blog 3',
    content:
      'Lipsum dolor sit amet consectetur adipiscing elit dolor sit amet consectetur adipiscing elit',
    author: 'Author 3',
    image:
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
  },
]

const Blog = () => {

  const router = useRouter()

  return (
    <div className='relative'>
      <Button variant='default' size='lg' className='m-4' onClick={() => {
        router.push('/createpost')
      }}>
        Create Post
      </Button>
      <Button variant='default' size='lg' className='m-4'>
        Another function
      </Button>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {blogs.map((blog: any) => (
          <div
            className='shadow-2xl m-4 p-4 rounded-lg bg-white flex flex-col items-center justify-center text-center space-y-4'
            key={blog.title}>
            <img
              src={blog.image}
              alt={blog.title}
              width={300}
              height={300}
              className='rounded-lg shadow-2xl'
            />
            <div className='space-y-2'>
              <h1>{blog.title}</h1>
              <p>{blog.author}</p>
              <p>{blog.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Blog
