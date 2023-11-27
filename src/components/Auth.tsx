'use client'

import React, { useCallback } from 'react'
import { Input } from './ui/Input'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

const Auth = () => {
  const router = useRouter()

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [name, setName] = React.useState('')

  const [variant, setVariant] = React.useState<
    'login' | 'register'
  >('login')

  const toggleVAriant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === 'login' ? 'register' : 'login'
    )
  }, [])

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/blog',
        redirect: true,
      })
      setEmail('')
      setPassword('')
    } catch (error) {
      console.log(error)
    }
  }, [email, password, router])

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        email,
        name,
        password,
      })
      setEmail('')
      setPassword('')
      setName('')
      login()
    } catch (error) {
      console.log(error)
    }
  }, [email, name, password, login])

  const signInGitHub = useCallback(async () => {
    try {
      await signIn('github', {
        callbackUrl: '/blog',
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  const signInGoogle = useCallback(async () => {
    try {
      await signIn('google', {
        callbackUrl: '/blog',
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <div className='flex justify-center'>
      <div className='bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full'>
        <h2 className='text-white text-2xl font-semibold mb-4'>
          {variant === 'login' ? 'Login' : 'Register'}
        </h2>
        <div className='flex flex-col gap-4'>
          {variant === 'register' && (
            <Input
              placeholder='Name'
              onChange={(
                e: React.ChangeEvent<HTMLInputElement>
              ) => setName(e.target.value)}
              id='name'
              type='text'
              value={name}
            />
          )}
          <Input
            placeholder='Email'
            onChange={(
              e: React.ChangeEvent<HTMLInputElement>
            ) => setEmail(e.target.value)}
            id='email'
            type='email'
            value={email}
          />
          <Input
            placeholder='Password'
            onChange={(
              e: React.ChangeEvent<HTMLInputElement>
            ) => setPassword(e.target.value)}
            id='password'
            type='password'
            value={password}
          />
        </div>
        <button
          onClick={variant === 'login' ? login : register}
          className='bg-red-500 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition'>
          {variant === 'login' ? 'Sign In' : 'Sign Up'}
        </button>
        <div className='flex flex-row items-center gap-4 mt-8 justify-center'>
          <div
            className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'
            onClick={signInGoogle}>
            <FcGoogle size={30} />
          </div>
          <div
            className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'
            onClick={signInGitHub}>
            <FaGithub size={30} />
          </div>
        </div>
        <p className='text-neutral-500 mt-12'>
          {variant === 'login'
            ? 'First time using Blog ?'
            : 'Already have an account ?'}
          <span
            onClick={toggleVAriant}
            className='text-white ml-1 hover:underline cursor-pointer'>
            {variant === 'login'
              ? 'Create an account'
              : 'Login'}
          </span>
        </p>
      </div>
    </div>
  )
}

export default Auth
