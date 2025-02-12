import { Inter } from 'next/font/google'
import './globals.css'
import ClientLayout from './client-layout'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="light">
      <body suppressHydrationWarning className="bg-bg-lighter dark:bg-bg-dark">
        <ClientLayout className={inter.variable}>{children}</ClientLayout>
      </body>
    </html>
  )
}
