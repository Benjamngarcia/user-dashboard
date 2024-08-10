/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  optimizeFonts: true,
  images: {
    domains: ['randomuser.me'],
  },
};

export default nextConfig;
