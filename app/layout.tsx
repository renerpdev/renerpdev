import type { Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#111827"
}

export async function generateMetadata() {
  return {
    title: "Rene Ricardo - Portfolio",
    description: "Frontend Developer portfolio",
    manifest: "/manifest.json",
    openGraph: {
      type: "website",
      locale: "en",
      url: "https://renerp.dev",
      siteName: "Rene Ricardo - Portfolio",
      title: "Rene Ricardo - Portfolio",
      description: "Frontend Developer portfolio",
      images: [
        {
          url: "https://avatars.githubusercontent.com/u/32307287",
          width: 800,
          height: 600,
          alt: "Rene Ricardo profile picture"
        }
      ]
    }
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <main>{children}</main>
      </body>
    </html>
  )
}
