/** @type {import('next').NextConfig} */
const nextConfig = {
  /* React Compiler support */
  reactCompiler: true,

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
