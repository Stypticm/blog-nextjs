'use client'

import { Button } from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import { getBlogs } from '../../../../utils/blog_helpers'
import { useEffect, useState } from 'react'
import { MessageSquare, ThumbsUp } from 'lucide-react'


interface Post {
    title: string
    description: string
    image: string
    author: string
    createdAt: string
    likes: number
}

const Page = ({
    params: { slug },
}: {
    params: { slug: string }
}) => {
    const router = useRouter()

    const [selectedPost, setSelectedPost] = useState(null as Post | null)

    useEffect(() => {
        const fetchSelectedPost = async () => {
            try {
                const blogs = await getBlogs()
                const selected = blogs.find((blog: any) => blog._id === slug)
                setSelectedPost(selected)
            } catch (error) {
                console.error(error)
            }
        }
        fetchSelectedPost()
    }, [slug])


    return <div className='relative pt-5 '>
        <div className='flex justify-center'>
            <Button
                variant='default'
                size='lg'
                className='m-4'
                disabled
            >
                Create Post
            </Button>
            <Button
                variant='default'
                size='lg'
                className='m-4'
                onClick={() => router.push('/blog')}>
                Back to Blog
            </Button>
        </div>

        {selectedPost && (
            <div
                className='shadow-2xl m-4 p-4 rounded-lg bg-white grid grid-cols-1 text-center space-y-4 cursor-pointer h-full'
                key={selectedPost.title}>
                <div className='self-center mx-auto'>
                    <img
                        src={selectedPost.image}
                        alt={selectedPost.title}
                        width={200}
                        height={200}
                    />
                </div>
                <h1 className='text-xl font-bold'>{selectedPost.title}</h1>
                <div className='flex justify-between'>
                    <p className='text-sm text-gray-500'>by {selectedPost.author}</p>
                    <p className='text-sm text-gray-500'>{selectedPost.createdAt.split('T')[0]}</p>
                </div>
                <div className='self-end space-y-2-center'>
                    <p>{selectedPost.description}</p>
                </div>
                <div className='flex justify-between'>
                    <div className='flex justify-between'>
                        <span>{selectedPost.likes}</span>
                        <ThumbsUp />
                    </div>
                    {/* <div className='flex justify-between'>
                <MessageSquare />
                {selectedPost.comments}
            </div> */}

                </div>
            </div>

        )}
    </div>
}

export default Page

