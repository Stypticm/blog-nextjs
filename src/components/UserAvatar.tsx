import Image from 'next/image'
import {
  Avatar,
  AvatarFallback,
} from '@components/ui/Avatar'
import { UserAvatarProps } from '@utils/types'

export function UserAvatar({
  user,
  ...props
}: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.image ? (
        <div className='relative aspect-square h-full w-full'>
          <Image
            sizes='(max-width: 768px) 100vw, 50vw'
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
