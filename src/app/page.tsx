'use client';

import Link from 'next/link';

export default function Home() {
  
  return (
    <div className='mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center'>
      <div className='mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2'>
        <h1 className='max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl'>
          Start your personal
          <br />
          <Link href='/blog'>
            <span className='text-blue-500'>Blog</span> and
          </Link>
          &nbsp;share
          <br />
          your thoughts.
        </h1>
      </div>
    </div>
  )
}
