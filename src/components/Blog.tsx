'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'

async function getBlogs() {
  const res = await fetch('https://fakestoreapi.com/products?limit=6')

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

const Blog = async () => {

  const router = useRouter()

  const blogs = await getBlogs()

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
            <h1 className='text-xl font-bold'>{blog.title}</h1>
            <div className='self-center mx-auto'>
              <img
                src={blog.image}
                alt={blog.title}
                width={200}
                height={200}
              />
            </div>
            <div className='self-end space-y-2-center'>
              <p>{blog.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Blog
