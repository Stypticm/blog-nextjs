import Blog from '@components/Blog'
import CreatePostForm from '@components/CreatePostForm'
import { Button } from '@components/ui/Button'
import { authOptions } from '@lib/auth'
import { getServerSession } from 'next-auth'

import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return redirect('/')
  }

  return (
    <>
      {/* <pre>{JSON.stringify(session)}</pre> */}
      <div className='flex flex-col items-center'>
        <CreatePostForm />
      </div>
    </>
  )
}

export default page
