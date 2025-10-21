/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // We're using ESLint CLI directly with flat config, so skip Next.js's built-in linting
    ignoreDuringBuilds: true
  },
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
        pathname: "/dms/image/**"
      }
    ]
  }
}

export default nextConfig
