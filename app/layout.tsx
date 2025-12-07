import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Pinyon_Script } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _pinyonScript = Pinyon_Script({ weight: "400", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Isabelle&Felipe",
  description: "Venha celebrar conosco!",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/sunflower2icon.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/sunflower2icon.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/sunflower2icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/sunflower2icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
