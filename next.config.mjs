/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  eslint: {
    // We're using ESLint CLI directly with flat config, so skip Next.js's built-in linting
    ignoreDuringBuilds: true
  },
  images: {
    loader: "custom",
    loaderFile: "./sanity/lib/image.ts"
  }
}

export default nextConfig
