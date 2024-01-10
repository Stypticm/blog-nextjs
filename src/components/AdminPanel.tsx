'use client'

import { getBlogs } from '@utils/blog_helpers'
import { Post } from '@utils/types'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState, ReactNode, FC } from 'react'
import { Button } from './ui/Button'
import { UserAvatar } from './UserAvatar'
import CustomModal from './ui/CustomModal'

const AdminPanel = () => {
  const router = useRouter()

  const [blogs, setBlogs] = useState([] as Post[])
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [deletedPostId, setDeletedPostId] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await getBlogs()
        setBlogs(blogs as Post[])
      } catch (error) {
        console.error(error)
      }
    }
    fetchBlogs()
  }, [getBlogs])

  const handleDeletePost = (id: string) => {
    setDeletedPostId(id)
    setTimeout(() => {
      setDeletedPostId(null)
    }, 2000)
    const updatedBlogs = blogs.filter(blog => blog._id !== id);
    setBlogs(updatedBlogs);
  }

  return (
    <div className='relative'>
      <div className='flex items-center justify-center text-center pt-5'>
        <Button aria-label='Create Post' variant='default' size='lg' className='m-4' onClick={() => {
          router.push('/blog')
        }}>
          Back to Blog
        </Button>
      </div>
      {deletedPostId && (
        <p className='text-xl font-bold text-center'>
          Post with ID: {deletedPostId} has been deleted!
        </p>
      )}
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
                  onClick={() => {
                    setSelectedPostId(blog._id)
                    setModalOpen(true)
                  }}
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
                  <h1 className='text-xl font-bold text-gray-800'>{blog.title}</h1>
                  <div className='self-end space-y-2-center text-gray-500'>
                    {blog.description.length > 50 ? blog.description.slice(0, 50) + '...' : blog.description}
                  </div>
                  <div className='flex gap-2 m-6'>
                    <p className='p-1 flex justify-center items-center'>
                      <UserAvatar
                        user={{
                          image: blog.avatar || null,
                          name: blog.author
                        }}
                      />
                    </p>
                    <div className='flex flex-col justify-center ml-2'>
                      <p className='text-sm text-gray-500 font-bold'>by {blog.author}</p>
                      <p className='text-sm text-gray-500'>{blog.createdAt.toString().split('T')[0]}</p>
                    </div>
                  </div>
                </div>
              ))
            )
          )
        }
      </div>

      {selectedPostId && (
        <CustomModal
          id={selectedPostId}
          isOpen={modalOpen}
          closeModal={() => {
            setModalOpen(false)
            setSelectedPostId(null)
          }}
          onDeletePost={handleDeletePost}
        />
      )}
    </div>
  )
}

export default AdminPanel