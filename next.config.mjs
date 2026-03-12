/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nauss.edu.sa'
      }
    ]
  }
};

export default nextConfig;
