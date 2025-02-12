'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'

const WalletConnectButton = dynamic(
  () => import('./WalletConnectButton'),
  { ssr: false }
)

const navItems = [
  { label: 'Home', href: '/home' },
  { label: 'Governance', href: '/governance' },
  { label: 'Analytics', href: '/analytics' },
  { label: 'Docs', href: '/docs' }
]



export default function NavMenu() {
  return (
    <nav className="fixed right-8 top-8 z-50">
      <div className="flex items-center space-x-1 rounded-full border border-border-subtle 
                    bg-bg-card/80 p-1 backdrop-blur-sm">
        {navItems.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="group relative rounded-full px-4 py-2 text-sm font-medium text-text-secondary 
                     transition-colors duration-300 hover:text-text-primary"
          >
            {/* Hover effect */}
            <span className="absolute inset-0 rounded-full bg-accent-primary/0 transition-colors 
                         duration-300 group-hover:bg-accent-primary/5" />
            
            {/* Text */}
            <span className="relative">{item.label}</span>
          </Link>
        ))}

        {/* Connect button */}
        <WalletConnectButton />
      </div>
    </nav>
  )
}
