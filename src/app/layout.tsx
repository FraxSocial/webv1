import { Inter } from 'next/font/google'
import './globals.css'
import ClientLayout from './client-layout'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: 'Frax Social',
  description: 'The social platform for the Frax community',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} light`}>
      <body suppressHydrationWarning className="min-h-screen bg-bg-lighter dark:bg-bg-dark">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
