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

interface UserAccountNavProps {
  user: {
    name?: string | null
    image?: string | null,
    email?: string | null,
    role?: string | null
  }
}

const UserAccountNav = ({ user }: UserAccountNavProps) => {

  const router = useRouter()

  const handleAdminPanelClick = () => {
    router.push('/admin')
  };

  const handleProfileClick = () => {
    router.push('/profile')
  }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{
            name: user.name || null,
            image: user.image || null,
          }}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className='cursor-pointer'
          onSelect={(event) => {
            event.preventDefault()
            signOut({
              callbackUrl: `${window.location.origin}/`,
            })
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
