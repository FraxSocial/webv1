'use client'

import { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import NotificationsPanel from './NotificationsPanel'
import DirectMessaging from './DirectMessaging'
import { MessageCircle } from 'lucide-react'
import { useAccount } from 'wagmi'

const WalletConnectButton = dynamic(
  () => import('./WalletConnectButton'),
  { ssr: false }
)

const navItems = [
  { label: 'Home', href: '/home' },
  { label: 'Governance', href: '/governance' },
  { label: 'Learn', href: '/learn' },
  { label: 'Analytics', href: '/analytics' }
]

export default function NavMenu() {
  const { isConnected } = useAccount()
  const [unreadMessages, setUnreadMessages] = useState(2) // Example unread count
  const [showMessages, setShowMessages] = useState(false)

  return (
    <div>
      {/* Messages Window */}
      {showMessages && <DirectMessaging onClose={() => setShowMessages(false)} />}
      
      <nav className="fixed right-8 top-8 z-50">
        <div className="flex items-center space-x-2 rounded-full
                      border border-border-subtle-light dark:border-border-subtle
                      bg-bg-card-light/80 dark:bg-bg-card/80 p-1 backdrop-blur-sm">
          {isConnected ? (
            <>
              {/* Navigation Links */}
              <div className="flex items-center space-x-1">
                {navItems.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className="group relative rounded-full px-4 py-2 text-sm font-medium
                             text-text-secondary-light dark:text-text-secondary
                             hover:text-text-primary-light dark:hover:text-text-primary
                             transition-colors duration-300"
                  >
                    {/* Hover effect */}
                    <span className="absolute inset-0 rounded-full bg-accent-primary/0 transition-colors 
                                 duration-300 group-hover:bg-accent-primary/5" />
                    
                    {/* Text */}
                    <span className="relative">{item.label}</span>
                  </Link>
                ))}
              </div>

              {/* Divider */}
              <div className="h-6 w-px mx-1 bg-border-subtle-light dark:bg-border-subtle" />

              {/* Notifications */}
              <NotificationsPanel />

              {/* Messages Link */}
              <button
                onClick={() => setShowMessages(!showMessages)}
                className="relative px-3 py-2 rounded-lg transition-colors
                           text-text-secondary-light hover:text-text-primary-light hover:bg-bg-hover-light
                           dark:text-text-secondary dark:hover:text-text-primary dark:hover:bg-bg-hover"
              >
                Messages
                {unreadMessages > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent-primary text-xs font-medium text-white animate-pulse">
                    {unreadMessages}
                  </span>
                )}
              </button>
            </>
          ) : null}

          {/* Connect button */}
          <WalletConnectButton />
        </div>
      </nav>
    </div>
  )
}
