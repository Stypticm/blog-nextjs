/** @type {import('next').NextConfig} */

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
})

const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/a/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/*/photo-*',
      },
    ],
  },
  transpilePackages: ['lucide-react'],
  experimental: {
    appDir: true
  },
  webpack: (config, {}) => {
    config.module.rules.push({
      test: /\.html$/,
      use: 'ignore-loader',
    })

    return config
  }
}

module.exports = withPWA(nextConfig)
