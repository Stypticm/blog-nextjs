import Navbar from '@components/Navbar'
import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Providers from '@components/Providers'
import { Toaster } from '@components/ui/Toaster'
import { cn } from '@lib/utils'

const inter = Inter({ subsets: ['latin'] })

const APP_NAME = "Blog";
const APP_DEFAULT_TITLE = "Awesome Blog PWA";
const APP_TITLE_TEMPLATE = "%s - PWA Blog App";
const APP_DESCRIPTION = "PWA app practice!";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
}

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
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
        <body className={cn(inter.className, 'bg-zinc-400 dark:bg-[#0d1117]')}>
          <Providers>

            <div className='sticky top-0 z-50 inset-x-0 h-16'>
              <Navbar />
            </div>

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