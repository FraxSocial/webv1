'use client'

import { useEffect } from 'react'
import { WagmiConfig } from 'wagmi'
import { config } from '../config/wagmi'
import ThemeToggle from '../components/ThemeToggle'

type ClientLayoutProps = {
  children: React.ReactNode
  className?: string
}

export default function ClientLayout({ children, className }: ClientLayoutProps) {
  useEffect(() => {
    const root = document.documentElement
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const updateTheme = () => {
      const isDark = localStorage.theme === 'dark' || 
        (!('theme' in localStorage) && darkModeQuery.matches)
      
      root.classList.toggle('dark', isDark)
    }

    updateTheme()
    darkModeQuery.addEventListener('change', updateTheme)
    
    return () => darkModeQuery.removeEventListener('change', updateTheme)
  }, [])

  return (
    <div className={`${className} antialiased min-h-screen dark:bg-gray-900 bg-gray-50 transition-colors duration-300`}>
      <WagmiConfig config={config}>
        <ThemeToggle />
        {children}
      </WagmiConfig>
    </div>
  )
}
