'use client'

import { Button } from '@components/ui/Button';
import Modal from '@components/ui/Modal';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const PwaUpdater = () => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js')
                .then((registration) => console.log('SW registration success scope is: ', registration.scope))
                .catch((registrationError) => console.log('SW registration failed: ', registrationError));
        }
    }, [])

    const onConfirmActive = () => {
       window.location.reload()
    }

    useEffect(() => {
        if (window.wb) {
            addEventListener('controlling', () => {
                // window.location.reload()
                router.push('/blog')
            })
            addEventListener('waiting', () => setIsOpen(true))
        }
    }, [])

    return (
        <Modal
            isOpen={isOpen}
            closeModal={() => setIsOpen(false)}
        >
            <div>
                Hey, a new version is available! Please click below to update.
            </div>

            <Button onClick={onConfirmActive}>Reload and update</Button>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
        </Modal>
    )
}

export default PwaUpdater;