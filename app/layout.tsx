import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'High Quality Photo Gallery',
  description: 'Professional photo gallery application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
