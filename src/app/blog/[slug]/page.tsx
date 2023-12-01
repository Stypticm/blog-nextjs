'use client'

import { Button } from '@components/ui/Button'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { ThumbsUp } from 'lucide-react'
import { Comment, Post } from '@utils/types'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/Form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from '@components/ui/Input'
import { fetchSelectedPostBySlug } from '@utils/postUtils'

const formSchema = z.object({
    comment: z.string().min(10, {
        message: 'Comment must be at least 5 characters.',
    })
})

const Page = ({
    params: { slug },
}: {
    params: { slug: string }
}) => {
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            comment: '',
        },
    })

    const [selectedPost, setSelectedPost] = useState(null as Post | null)

    const onSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
        try {

            if (selectedPost) {
                const commentData = {
                    ...values,
                    postId: selectedPost._id
                }
                await fetch('/api/createcomment', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(commentData),
                })

                await fetchSelectedPostBySlug(slug, setSelectedPost);
                form.reset()

            }
        } catch (error) {
            console.log(error)
        }
    }, [form, selectedPost, slug])

    useEffect(() => {
        fetchSelectedPostBySlug(slug, setSelectedPost);
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
                    </div>
                </div>
                <div className='shadow-sm m-4 p-4 rounded-lg bg-white grid grid-cols-1 grid-template-cols-1 text-center space-y-4 cursor-pointer'>
                    <Form {...form}>
                        <h1 className='text-xl font-bold text-center text-blue-500'>Add Comment</h1>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='space-y-8'>
                            <FormField
                                control={form.control}
                                name='comment'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-gray-800'>Comment</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Enter your comment' {...field} className='text-gray-800' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                variant='default'
                                size='lg'
                                className='m-4'
                                type='submit'>
                                Submit
                            </Button>
                        </form>
                    </Form>
                    <div className='self-end space-y-2-center pt-4'>
                        {selectedPost.comments.length === 0 ? (
                            <p>No comments yet</p>
                        ) : (
                            <>
                                {
                                    selectedPost.comments.map((comment: Comment) => (
                                        <div key={comment._id} className='border border-gray-300 m-4 p-4 rounded-lg'>
                                            <div className='flex justify-between'>
                                                <span className='text-gray-500 font-bold'>{comment.author}</span>
                                            </div>
                                            <p className='text-gray-500'>{comment.comment}</p>
                                        </div>
                                    ))
                                }
                            </>
                        )}
                    </div>
                </div>
            </>
        )}
    </div>
}

export default Page

