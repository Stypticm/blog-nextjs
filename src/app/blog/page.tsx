import Blog from '@components/Blog'
import { authOptions } from '@lib/auth'
import { getServerSession } from 'next-auth/next'

import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return redirect('/')
  }


  return (
    <>
      <div className='flex flex-col items-center'>
          <Blog />
      </div>
    </>
  )
}

export default page
