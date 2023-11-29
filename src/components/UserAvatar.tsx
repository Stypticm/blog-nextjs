import { User } from 'next-auth'
import Image from 'next/image'
import {
  Avatar,
  AvatarFallback,
} from '@components/ui/Avatar'

interface UserAvatarProps {
  user: Pick<User, 'name' | 'image'>
}

export function UserAvatar({
  user,
  ...props
}: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.image ? (
        <div className='relative aspect-square h-full w-full'>
          <Image
            fill
            src={user.image}
            
            alt='profile picture'
            referrerPolicy='no-referrer'
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className='sr-only'>{user?.name}</span>
        </AvatarFallback>
      )}
    </Avatar>
  )
}
