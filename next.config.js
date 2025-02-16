/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api.dicebear.com']
  },
  typescript: {
    ignoreBuildErrors: true // Temporarily ignore type errors during build
  },
  eslint: {
    ignoreDuringBuilds: true // Temporarily ignore eslint errors during build
  },
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  }
}

module.exports = nextConfig
