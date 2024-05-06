import type { Viewport } from "next"
import { Inter, Ubuntu } from "next/font/google"
import Head from "next/head"

import "./globals.css"

const ubuntuFont = Ubuntu({
  weight: ["300", "500", "700"],
  subsets: ["latin"],
  variable: "--font-ubuntu"
})

const interFont = Inter({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-inter"
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#111827"
}

export async function generateMetadata() {
  return {
    description: "René Ricardo's developer portfolio",
    manifest: "/manifest.json",
    title: "René Ricardo - Portfolio",
    openGraph: {
      type: "website",
      locale: "en",
      url: "https://renerp.dev",
      siteName: "René Ricardo - Portfolio",
      title: "René Ricardo - Portfolio",
      description: "Want to build something cool? Let's connect!",
      images: [
        {
          url: "https://renerp.dev/assets/og-img.png",
          width: 800,
          height: 600,
          alt: "René Ricardo profile picture"
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
      <Head>
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      </Head>
      <body className={`${ubuntuFont.variable} ${interFont.variable}`}>{children}</body>
    </html>
  )
}
