/** @type {import('next').NextConfig} */
const createEnvFile = require('./environment-builder')

const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    createEnvFile()
    return config
  },
}

module.exports = nextConfig
