import AdminPanel from '@components/AdminPanel'
import { authOptions } from '@lib/auth'
import { getServerSession } from 'next-auth'

import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
    const session = await getServerSession(authOptions)

    if (session?.user?.email !== 'misha@ya.ru') {
        return redirect('/blog')
    }

    return (
        <>
            <div className='flex flex-col items-center'>
                <AdminPanel />
            </div>
        </>
    )
}

export default page
