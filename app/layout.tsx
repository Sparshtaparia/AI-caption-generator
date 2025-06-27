import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Capify',
  description: 'Created by Sparsh Taparia',
  generator: 'Sparsh Taparia',
  icons: {
    icon: '/Screenshot 2025-06-27 230957.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
