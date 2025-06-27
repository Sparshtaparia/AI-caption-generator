import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Capify',
  description: 'Created by Sparsh',
  generator: 'Sparsh',
  icons: {
    icon: '/Screenshot 2025-06-27 230957.png', // or '/logo.png' for PNG
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
