'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import ThemeToggle from '../components/ThemeToggle'
import { useEffect } from 'react'

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
  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased dark:bg-gray-900 bg-gray-50 bg-surface-light dark:bg-frax-primary min-h-screen transition-colors duration-300`}>
        <ThemeToggle />
        {children}
      </body>
    </html>
  )
}
