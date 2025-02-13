'use client'

import { useEffect, useState } from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { useAccount } from 'wagmi'
import { usePathname } from 'next/navigation'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const { isConnected } = useAccount()
  const pathname = usePathname()

  // Handle mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle theme updates
  useEffect(() => {
    if (!mounted) return

    const isLandingPage = pathname === '/'

    // If on landing page, always use dark theme
    if (isLandingPage) {
      document.documentElement.classList.add('dark')
      setIsDark(true)
      return
    }

    // For connected users on other pages, use saved theme or default
    if (isConnected) {
      const savedTheme = window.localStorage.getItem('theme')
      const shouldBeDark = savedTheme === 'dark'
      document.documentElement.classList.toggle('dark', shouldBeDark)
      setIsDark(shouldBeDark)
    }
  }, [mounted, isConnected])

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark')
      window.localStorage.setItem('theme', 'light')
    } else {
      document.documentElement.classList.add('dark')
      window.localStorage.setItem('theme', 'dark')
    }
    setIsDark(!isDark)
  }

  // Don't render anything until mounted on client
  if (!mounted) return null

  // Don't render the toggle on landing page or if not connected
  if (!isConnected || pathname === '/') return null

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-40 p-3 rounded-full shadow-lg
               bg-bg-card-light dark:bg-bg-card hover:bg-bg-hover-light dark:hover:bg-bg-hover
               text-text-primary-light dark:text-text-primary transition-all
               border border-border-subtle-light dark:border-border-subtle"
      aria-label="Toggle theme"
      style={{ transform: 'translateX(-80px)' }} // Offset to avoid collision with messages
    >
      {isDark ? (
        <SunIcon className="w-5 h-5" />
      ) : (
        <MoonIcon className="w-5 h-5" />
      )}
    </button>
  )
}
