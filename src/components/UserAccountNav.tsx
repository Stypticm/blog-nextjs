'use client'

import { signOut } from 'next-auth/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/DropdownMenu'
import { UserAvatar } from './UserAvatar'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { UserAccountNavProps } from '@utils/types'

const UserAccountNav = ({ user }: UserAccountNavProps) => {

  const router = useRouter()

  const handleAdminPanelClick = () => {
    router.push('/admin')
  };

  const handleProfileClick = () => {
    router.push('/profile')
  }

  const handleSignOutClick = useCallback(async () => {
    try {
      await signOut({
        callbackUrl: '/',
      })
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({ type: 'LOGOUT' });
      }

    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{
            image: user.image || null,
            name: user.name || null,
          }}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className='cursor-pointer'
          onSelect={(event) => {
            event.preventDefault()
            handleSignOutClick()
          }}>
          Sign out
        </DropdownMenuItem>
        <DropdownMenuItem
          className='cursor-pointer'
          onSelect={(event) => {
            event.preventDefault()
            handleProfileClick()
          }}>
          Profile
        </DropdownMenuItem>
        {
          user.email === 'misha@ya.ru' && (
            <DropdownMenuItem
              className='cursor-pointer'
              onSelect={(event) => {
                event.preventDefault()
                handleAdminPanelClick()
              }}>
              Admin Panel
            </DropdownMenuItem>
          )
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAccountNav
