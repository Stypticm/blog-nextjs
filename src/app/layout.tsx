import Navbar from '@components/Navbar'
import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Providers from '@components/Providers'
import { Toaster } from '@components/ui/Toaster'
import { cn } from '@lib/utils'
import dynamic from 'next/dynamic'
import Head from 'next/head'

const PwaUpdater = dynamic(() => import('@components/PwaUpdater'), { ssr: false });

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "PWA Blog Practice",
  description: "Practice Nextjs, Next-auth, PWA",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "nextjs13", "next13", "pwa", "next-pwa"],
  authors: [
    { name: "Mikhail Volodin  " }
  ],
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
  ],
};

export const viewport = {
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }]
};

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode
  authModal: React.ReactNode
}) {

  return (
    <>
      <html lang='en'>
        <Head>
          <meta name="theme-color" content="#383737" />
        </Head>
        <body className={cn(inter.className, 'bg-zinc-400 dark:bg-[#0d1117]')}>
          <Providers>

            <div className='sticky top-0 z-50 inset-x-0 h-16'>
              <Navbar />
            </div>

            <PwaUpdater />

            {authModal}
            <div>
              {children}
            </div>

          </Providers>
          <Toaster />
        </body>
      </html>
    </>
  )
}