import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'unavatar.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
  env: {
    API_URL: process.env.API_URL, 
  },
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
};

export default nextConfig;
