'use client'

import React from 'react'
import { Button } from './ui/Button'
import { cn } from '@lib/utils'
import { Icons } from './Icons'
import { useToast } from '@hooks/use-toast'
import { signIn } from 'next-auth/react'

interface UserAuthFormProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: React.FC<UserAuthFormProps> = ({
  className,
  ...props
}) => {
  const { toast } = useToast()
  const [isLoading, setIsLoading] =
    React.useState<boolean>(false)

  const loginWithGoogle = async () => {
    setIsLoading(true)

    try {
      await signIn('google')
    } catch (error) {
      toast({
        title: 'Login failed',
        description: 'Please try again later',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithGithub = async () => {
    setIsLoading(true)

    try {
      await signIn('github')
    } catch (error) {
      toast({
        title: 'Login failed',
        description: 'Please try again later',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className={cn('flex flex-row gap-2 pt-2', className)}
      {...props}>
      <Button
        aria-label='Continue with Google'
        isLoading={isLoading}
        type='button'
        size='sm'
        className='w-full'
        onClick={loginWithGoogle}
        disabled={isLoading}>
        {isLoading ? null : (
          <Icons.google className='h-4 w-4 mr-2' />
        )}
        Google
      </Button>
      <Button
        aria-label='Continue with Github'
        isLoading={isLoading}
        type='button'
        size='sm'
        className='w-full'
        onClick={loginWithGithub}
        disabled={isLoading}>
        {isLoading ? null : (
          <Icons.github className='h-4 w-4 mr-2' />
        )}
        Github
      </Button>
    </div>
  )
}

export default UserAuthForm
