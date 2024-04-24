/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: ""
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
        port: "",
        pathname: '/dms/image/**',
      }
    ]
  }
}

export default nextConfig
