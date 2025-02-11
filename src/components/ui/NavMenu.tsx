'use client'

import Link from 'next/link'

const navItems = [
  { label: 'Dashboard', href: '/app' },
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
        <button className="flex items-center space-x-2 rounded-full bg-accent-primary px-4 py-2 
                       text-sm font-medium text-text-primary transition-all duration-300 
                       hover:bg-accent-muted">
          <span>Connect</span>
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
        </button>
      </div>
    </nav>
  )
}
