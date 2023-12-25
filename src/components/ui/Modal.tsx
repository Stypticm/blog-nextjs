'use client'

import * as Dialog from '@radix-ui/react-dialog'
import type { FC, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface ModalProps {
  children: ReactNode,
  isOpen?: boolean,
  closeModal: () => void
}

const Modal: FC<ModalProps> = ({
  children,
  isOpen,
  closeModal
}) => {
  const router = useRouter()

  const handleOnOpenChange = (open: boolean) => {
    if (!open) {
      closeModal()
      router.back()
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOnOpenChange} defaultOpen={false}>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-black/70' />
        <Dialog.Content className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default Modal
