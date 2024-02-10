import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rene Ricardo Portfolio",
  description: "Frontend Developer Portfolio"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className={"p-1.5 border-b-cyan-800 border-2"}>
          <nav className={" font-bold uppercase space-x-1"}>
            <Link href={"/"}>
              My<span className={"text-cyan-600"}>Portfolio</span>
            </Link>
          </nav>
        </header>
        <main className={"p-5 w-full"}>{children}</main>
      </body>
    </html>
  )
}
