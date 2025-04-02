import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Forest Echo Chat - Ghibli-Inspired AI",
  description: "A Ghibli-inspired AI chat application with a forest theme",
  keywords: ["Ghibli", "AI", "Chat", "Forest", "Nature", "Whimsy"],
  authors: [{ name: "Sergio Rovira" }],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-white text-black`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}