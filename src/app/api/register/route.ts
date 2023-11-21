import bcrypt from 'bcrypt'
import { prismadb } from '@/lib/prismadb'

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({
        status: 405,
      })
    )
  }
  try {
    const { email, name, password } = await req.json()

    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    })

    if (existingUser) {
      return new Response(
        JSON.stringify({
          status: 422,
          error: 'Email taken',
        })
      )
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: '',
        emailVerified: new Date(),
      },
    })

    return new Response(
      JSON.stringify({
        status: 200,
        user,
      })
    )
  } catch (error) {
    new Response(
      JSON.stringify({
        status: 500,
        error: 'Internal Server Error',
      })
    )
  }
}
