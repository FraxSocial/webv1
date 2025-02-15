'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Home, BookOpen, Users, MessageSquare, Bell } from 'lucide-react'

interface NavItem {
  label: string
  href: string
  icon: any
  badge?: number
  external?: boolean
}

const Navigation = () => {
  const [activeItem, setActiveItem] = useState('Governance')

  const navItems: NavItem[] = [
    {
      label: 'Home',
      href: '/',
      icon: Home
    },
    {
      label: 'Governance',
      href: '/governance',
      icon: BookOpen,
      badge: 3
    },
    {
      label: 'Learn',
      href: '/learn',
      icon: BookOpen
    },
    {
      label: 'Analytics',
      href: 'https://facts.frax.finance/',
      icon: BookOpen,
      external: true
    },
    {
      label: 'Community',
      href: '/governance/forum',
      icon: Users
    },
    {
      label: 'Discussions',
      href: '/discussions',
      icon: MessageSquare,
      badge: 5
    }
  ]

  return (
    <nav className="bg-bg-card dark:bg-bg-card-dark border-b border-border-subtle dark:border-border-subtle-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-accent-primary flex items-center justify-center text-white font-bold">
              F
            </div>
            <span className="text-lg font-semibold text-text-primary dark:text-text-primary-dark">
              Frax Social
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            {navItems.map((item) => 
              item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative px-3 py-2 rounded-md text-sm font-medium ${
                    activeItem === item.label
                      ? 'text-accent-primary dark:text-accent-primary-dark bg-accent-primary/10'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-subtle'
                  }`}
                  onClick={() => setActiveItem(item.label)}
                >
                  <div className="flex items-center space-x-2">
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 text-xs flex items-center justify-center bg-accent-primary text-white rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative px-3 py-2 rounded-md text-sm font-medium ${
                    activeItem === item.label
                      ? 'text-accent-primary dark:text-accent-primary-dark bg-accent-primary/10'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-subtle'
                  }`}
                  onClick={() => setActiveItem(item.label)}
                >
                  <div className="flex items-center space-x-2">
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 text-xs flex items-center justify-center bg-accent-primary text-white rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
