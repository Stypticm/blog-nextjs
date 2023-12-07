import { authOptions } from '@lib/auth'
import { getServerSession } from 'next-auth/next'


import { redirect } from 'next/navigation'

const page = async () => {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
        return redirect('/')
    }

    return (
        <>
            {/* <pre>{JSON.stringify(session)}</pre> */}
            <div className='text-center pt-5 text-2xl overflow-hidden'>
                <pre>{JSON.stringify(session)}</pre>
            </div>
        </>
    )
}

export default page
