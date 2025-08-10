/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['eiec269001.blob.core.windows.net'],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
}

module.exports = nextConfig
