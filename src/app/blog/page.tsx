import Blog from '@components/Blog'
import { authOptions } from '@lib/auth'
import { getServerSession } from 'next-auth/next'


import { redirect } from 'next/navigation'

const page = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return redirect('/')
  }

  return (
    <>
      {/* <pre>{JSON.stringify(session)}</pre> */}
      <div className='flex flex-col items-center'>
        <Blog/>
      </div>
    </>
  )
}

export default page
