import Auth from '@components/Auth'
import { buttonVariants } from '@components/ui/Button'
import { cn } from '@lib/utils'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

const Page = () => {
  return (
    <div className='mt-10'>
      <Link
        href='/'
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'self-start -mt-20'
        )}>
        <ChevronLeft className='mr-2 h-4 w-4' />
        Home
      </Link>

      <Auth />
    </div>
  )
}

export default Page
