const runtimeCaching = require("next-pwa/cache");
const path = require("path");

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
}

const withPWA = require('@ducanh2912/next-pwa').default({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  sw: "service-worker.js",
  customWorkerSrc: path.resolve(".src/lib/service-worker.js"),
  runtimeCaching
})


module.exports = withPWA(nextConfig)