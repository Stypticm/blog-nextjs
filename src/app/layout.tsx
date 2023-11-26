import Navbar from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from '@/components/Providers'
import { Toaster } from '@/components/ui/Toaster'
import { cn } from '@/lib/utils'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Blog, practice in Nextjs, with dynamic routes and other functionality.',
}



export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode
  authModal: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={cn('bg-gray-200', inter.className)}>
        <Providers>

          <div className='sticky top-0 z-50 inset-x-0 h-16'>
            <Navbar />
          </div>

          {authModal}
          <div>{children}</div>

        </Providers>
        <Toaster />
      </body>
    </html>
  )
}
