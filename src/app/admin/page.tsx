import AdminPanel from '@components/AdminPanel'
import { Button } from '@components/ui/Button'
import { authOptions } from '@lib/auth'
import { getServerSession } from 'next-auth'

import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
    const session = await getServerSession(authOptions)

    // if (session?.user?.email !== 'admin@localhost') {
    //     return redirect('/blog')
    // }

    return (
        <>
            {/* <pre>{JSON.stringify(session)}</pre> */}
            <div className='flex flex-col items-center'>
                <AdminPanel />
            </div>
        </>
    )
}

export default page
