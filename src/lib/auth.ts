import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import {
  AuthOptions,
  Session,
  User,
  getServerSession,
} from 'next-auth'
import { compare } from 'bcrypt'
import { JWT } from 'next-auth/jwt'

import clientPromise from '@/lib/mongodb'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise, {
    collections: {
      Accounts: 'Account',
      Users: 'User',
    },
  }),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth',
  },
  providers: [
    GoogleProvider({
      name: 'Google',
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env
        .GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      name: 'Github',
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env
        .GITHUB_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        const mongodb = await clientPromise
        const db = await mongodb.db('blog')

        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required')
        }

        const user = await db.collection("User").findOne(
          {
            email: credentials.email
          }
        )

        if (!user || !user.hashedPassword) {
          throw new Error('Email does not exist')
        }

        const isCorrectPassword = await compare(
          credentials.password,
          user.hashedPassword
        )

        if (!isCorrectPassword) {
          throw new Error('Incorrect password')
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          randomKey: 'Hey cool',
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  callbacks: {
    jwt: ({ token, user }: { token: JWT; user: User }) => {
      // console.log('JWT callback', { token, user })
      if (user) {
        const u = user as unknown as any
        return {
          ...token,
          id: user.id,
          randomKey: u.randomKey,
        }
      }
      return token
    },
    session: ({
      session,
      token,
    }: {
      session: Session
      token: JWT
    }) => {
      // console.log('Session callback', { session, token })
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      }
    },
  },
}

export const getAuthSession = () =>
  getServerSession(authOptions)
