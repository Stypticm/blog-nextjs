export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/blog', '/api/auth/:path*'],
}
