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
import clientPromise from '@lib/mongodb'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'

export const dynamic = "force-dynamic"

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env
        .GOOGLE_CLIENT_SECRET as string,
      async profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          likedPosts: [],
          dislikedPosts: [],
        }
      },
    }),
    GithubProvider({
      name: 'Github',
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env
        .GITHUB_CLIENT_SECRET as string,
      async profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
          likedPosts: [],
          dislikedPosts: [],
        }
      }
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

        const user = await db.collection("users").findOne(
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
          id: user._id.toString(),
          email: user.email,
          name: user.name,
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  callbacks: {
    jwt: ({ token, user }: { token: JWT; user: User }) => {
      if (user) {
        return {
          ...token,
          id: user.id
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
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id
        },
      }
    },
  }
}

export const getAuthSession = () =>
  getServerSession(authOptions)
