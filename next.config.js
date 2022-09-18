/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    fclCryptoContract: process.env.NEXT_PUBLIC_FCL_CRYPTO_CONTRACT,
  },
  env: {
    FCL_CRYPTO_CONTRACT: process.env.FCL_CRYPTO_CONTRACT,
  },
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
}

module.exports = nextConfig
