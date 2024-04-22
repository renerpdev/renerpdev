import type { Viewport } from "next"
import { Ubuntu } from "next/font/google"
import "./globals.css"

const font = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"]
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
    title: "Rene Ricardo - Portfolio",
    description: "Rene Ricardo's developer portfolio",
    manifest: "/manifest.json",
    openGraph: {
      type: "website",
      locale: "en",
      url: "https://renerp.dev",
      siteName: "Rene Ricardo - Portfolio",
      title: "Rene Ricardo - Portfolio",
      description: "Want to build something cool? Lets connect!",
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
      <body className={font.className}>
        <main>{children}</main>
      </body>
    </html>
  )
}
