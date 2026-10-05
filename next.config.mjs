/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Experimental options */
  experimental: {
    reactCompiler: true,
  },

  /* External Images Support */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
