'use client'

import { useState, useEffect } from 'react'
import { WagmiConfig } from 'wagmi'
import { config } from '../config/wagmi'
import ThemeToggle from '../components/ThemeToggle'

type ClientLayoutProps = {
  children: React.ReactNode
  className?: string
}

function ThemeManager() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <ThemeToggle />
    </div>
  )
}

export default function ClientLayout({ children, className }: ClientLayoutProps) {
  return (
    <div 
      className={`${className} antialiased min-h-screen transition-colors duration-300
                 bg-bg-lighter dark:bg-bg-dark
                 text-text-primary-light dark:text-text-primary`}
      suppressHydrationWarning
    >
      <WagmiConfig config={config}>
        <div className="relative">
          <ThemeManager />
          {children}
        </div>
      </WagmiConfig>
    </div>
  )
}
