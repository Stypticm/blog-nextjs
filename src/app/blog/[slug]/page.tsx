'use client'

import { Button } from '@components/ui/Button'
import { useRouter } from 'next/navigation'
import { getBlogs } from '@utils/blog_helpers'
import { useEffect, useState } from 'react'
import { ThumbsUp } from 'lucide-react'
import { Post } from '@utils/types'

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
                const blogs = await getBlogs() as Post[]
                const selected = blogs.find((blog: Post) => blog._id === slug)
                setSelectedPost(selected as Post)
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
                onClick={() => router.push('/blog')}>
                Back to Blog
            </Button>
        </div>

        {selectedPost && (
            <>
                <div
                    className='shadow-2xl m-4 p-4 rounded-lg bg-white grid grid-cols-1 text-center space-y-4 cursor-pointer h-full'
                    key={selectedPost.title}>
                    <div className='self-center mx-auto'>
                        <img
                            src={selectedPost.image}
                            alt={selectedPost.title}
                            width={300}
                            height={300}
                        />
                    </div>
                    <h1 className='text-xl font-bold'>{selectedPost.title}</h1>
                    <div className='flex justify-between'>
                        <p className='text-sm text-gray-500'>by {selectedPost.author}</p>
                        <p className='text-sm text-gray-500'>{selectedPost.createdAt.toString().split('T')[0]}</p>
                    </div>
                    <div className='self-end space-y-2-center'>
                        <p>{selectedPost.description}</p>
                    </div>
                    <div className='flex justify-between'>
                        <div className='flex justify-between'>
                            <span>{selectedPost.likes}</span>
                            <ThumbsUp />
                        </div>
                        <div className='flex justify-between'>
                            {/* {selectedPost.comments.map((comment: any) => (
                            <>
                                <span>Misha</span>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                            </>
                        ))} */}
                        </div>
                    </div>
                </div>
                <div className='shadow-sm m-4 p-4 rounded-lg bg-white grid grid-cols-1 grid-template-cols-1 text-center space-y-4 cursor-pointer'>
                    <span className='text-sm text-gray-500 flex justify-between'>Author: Misha</span>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores eius unde quis quas assumenda autem aut libero non modi consequuntur, quos officiis rem commodi, impedit exercitationem quam quod repellat expedita?</p>
                </div>
                <div className='shadow-sm m-4 p-4 rounded-lg bg-white grid grid-cols-1 text-center space-y-4 cursor-pointer'>
                    <span className='text-sm text-gray-500 flex justify-between'>Author: Misha</span>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores eius unde quis quas assumenda autem aut libero non modi consequuntur, quos officiis rem commodi, impedit exercitationem quam quod repellat expedita?</p>
                </div>
                <div className='shadow-sm m-4 p-4 rounded-lg bg-white grid grid-cols-1 text-center space-y-4 cursor-pointer'>
                    <span className='text-sm text-gray-500 flex justify-between'>Author: Misha</span>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores eius unde quis quas assumenda autem aut libero non modi consequuntur, quos officiis rem commodi, impedit exercitationem quam quod repellat expedita?</p>
                </div>
                <div className='shadow-sm m-4 p-4 rounded-lg bg-white grid grid-cols-1 text-center space-y-4 cursor-pointer'>
                    <span className='text-sm text-gray-500 flex justify-between'>Author: Misha</span>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores eius unde quis quas assumenda autem aut libero non modi consequuntur, quos officiis rem commodi, impedit exercitationem quam quod repellat expedita?</p>
                </div>
            </>
        )}
    </div>
}

export default Page

