'use client'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import type { FC } from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const queryClient = new QueryClient()

const Providers: FC<LayoutProps> = ({
  children
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        {children}
      </SessionProvider>
    </QueryClientProvider>
  )
}

export default Providers
