import type { Metadata, Viewport } from "next"
import "@fontsource/inter/latin-300.css"
import "@fontsource/inter/latin-400.css"
import "@fontsource/inter/latin-500.css"
import "@fontsource/ubuntu/latin-300.css"
import "@fontsource/ubuntu/latin-500.css"
import "@fontsource/ubuntu/latin-700.css"

import "./globals.css"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#111827"
}

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio.renerp.dev"),
  description: "René Ricardo's developer portfolio",
  manifest: "/manifest.json",
  icons: { apple: "/icons/apple-touch-icon.png" },
  title: "René Ricardo - Portfolio",
  openGraph: {
    type: "website",
    locale: "en",
    url: "/",
    siteName: "René Ricardo - Portfolio",
    title: "René Ricardo - Portfolio",
    description: "Want to build something cool? Let's connect!",
    images: [
      {
        url: "/assets/og-img.png",
        width: 800,
        height: 600,
        alt: "René Ricardo profile picture"
      }
    ]
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  )
}
