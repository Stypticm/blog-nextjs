import Link from 'next/link'
import { Icons } from './Icons'
import { Button, buttonVariants } from './ui/Button'
import { authOptions } from '@lib/auth'
import { getServerSession } from 'next-auth/next'
import UserAccountNav from './UserAccountNav'
import dynamic from 'next/dynamic'

const Themes = dynamic(() => import('./Themes'), {
  ssr: false,
})

const Navbar = async () => {
  const session = await getServerSession(authOptions)

  return (
    <div className='bg-zinc-400 dark:bg-[#0d1117] p-6 flex justify-between items-center'>
      <div className='container flex justify-between items-center'>
        <div className='flex justify-start gap-4'>
          {/* logo */}
          <Link href='/' className='flex gap-2'>
            <Icons.logo className='h-8 w-8 sm:h-6 sm:w-6' />
            <p>Blog</p>

          </Link>
          <Themes />
        </div>

        {/* actions */}
        {session?.user ? (
          <div className='flex justify-center items-center gap-2'>
            <UserAccountNav user={session.user} />
            <h1 className='text-sm font-bold'>
              {session.user.name}
            </h1>
          </div>
        ) : (
            <Link href='/auth' className={buttonVariants()}>
              Sign In
            </Link>
        )}
      </div>
    </div>
  )
}

export default Navbar
