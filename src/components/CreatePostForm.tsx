'use client'

import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@components/ui/Button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/Form'
import { Input } from '@components/ui/Input'
import { useCallback, useMemo } from 'react'
import axios from 'axios'
import dynamic from 'next/dynamic'
import { toast } from '@hooks/use-toast'

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
  }),
  image: z.string().url({
    message: 'Image must be a valid URL.',
  }).optional(),
})

const CreatePostForm = () => {
  const router = useRouter()
  const DynamicQuill = useMemo(() => dynamic(() => import('./ui/QuillUI'), { ssr: false }), [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      image: '',
    },
  })

  const onSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post('/api/createpost', values)
      form.reset();
      router.push('/blog');
    } catch (error) {
      toast({
        title: 'Post creation failed',
        description: 'Please try again later',
        variant: 'destructive',
      })
    }
  }, [form, router])

  return (
    <div className='pt-5'>
      <section className='flex justify-center'>
        <Button
          aria-label='Back to Blog'
          variant='default'
          size='lg'
          className='m-4'
          onClick={() => router.push('/blog')}>
          Back to Blog
        </Button>
      </section>

      <Form {...form}>
        <h1 className='text-2xl font-bold text-center text-blue-500'>Create Post</h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-gray-800 dark:text-gray-200'>Title</FormLabel>
                <FormControl>
                  <Input placeholder='Enter your title name' {...field} className='text-gray-800 dark:text-gray-200' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className='text-gray-800 dark:text-gray-200'>
                <FormLabel className='text-gray-800 dark:text-gray-200'>Description</FormLabel>
                <DynamicQuill value={field.value} onChange={field.onChange} className="max-w-lg mx-auto p-4" />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='image'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-gray-800 dark:text-gray-200'>Picture</FormLabel>
                <FormControl>
                  <Input type='url' placeholder='Enter url your picture' {...field} className='text-gray-800 dark:text-gray-200' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button aria-label='Submit' type='submit'>Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default CreatePostForm
