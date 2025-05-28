import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sponza Influencer Marketing Platform',
  description: 'Sponza Influencer Marketing Platform',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
