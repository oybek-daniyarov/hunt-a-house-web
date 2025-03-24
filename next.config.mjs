/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'huntahouse.test',
      },
      {
        protocol: 'https',
        hostname: 'staging.api.huntahouse.com',
      },
    ],
  },
  logging: {
    warn: true,
    error: true,
    info: true,
    fetches: {
      fullUrl: false,
    },
  },
  experimental: {
    reactCompiler: true,
  },
};

export default nextConfig;
