import { authOptions } from '@lib/auth';
import clientPromise from '@lib/mongodb';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
    const session = await getServerSession(authOptions)
    const mongodb = await clientPromise
    const user = session?.user

    if (req.method !== 'GET') {
        return new Response(
            JSON.stringify({
                status: 405,
            })
        )
    }

    try {
        const db = await mongodb.db('blog')
        const currentUser = await db
            .collection('users')
            .findOne({ email: user?.email })

        return NextResponse.json(currentUser)

    } catch (error) {
        new Response(
            JSON.stringify({
                status: 500,
                error: 'Internal Server Error',
            })
        )
    }
}