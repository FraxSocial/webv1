'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Home, BookOpen, Users, MessageSquare, Bell, Menu, X } from 'lucide-react'
import Link from 'next/link'

interface NavItem {
  label: string
  href: string
  icon: any
  badge?: number
}

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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
      label: 'Community',
      href: '/community',
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
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-accent-primary flex items-center justify-center text-white font-bold">
              F
            </div>
              <span className="text-lg font-semibold text-text-primary dark:text-text-primary-dark">Frax Social</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`relative px-3 py-2 rounded-md text-sm font-medium ${
                  activeItem === item.label
                    ? 'text-accent-primary dark:text-accent-primary-dark bg-accent-primary/10 dark:bg-accent-primary-dark/10'
                    : 'text-text-secondary dark:text-text-secondary-dark hover:text-text-primary dark:hover:text-text-primary-dark hover:bg-bg-subtle dark:hover:bg-bg-subtle-dark'
                } transition-colors`}
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
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-text-secondary hover:text-text-primary rounded-full hover:bg-bg-subtle transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-accent-primary rounded-full" />
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-accent-primary text-white rounded-lg hover:bg-accent-primary-dark transition-colors">
              <span>Connect Wallet</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-bg-subtle transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{ height: isMobileMenuOpen ? 'auto' : 0 }}
        className="md:hidden overflow-hidden"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                activeItem === item.label
                  ? 'text-accent-primary bg-accent-primary/10'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-subtle'
              } transition-colors`}
              onClick={() => {
                setActiveItem(item.label)
                setIsMobileMenuOpen(false)
              }}
            >
              <div className="flex items-center space-x-2">
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-accent-primary text-white px-2 py-0.5 rounded-full text-xs">
                    {item.badge}
                  </span>
                )}
              </div>
            </Link>
          ))}
          <button className="w-full mt-4 px-4 py-2 bg-accent-primary text-white rounded-lg hover:bg-accent-primary-dark transition-colors">
            Connect Wallet
          </button>
        </div>
      </motion.div>
    </nav>
  )
}
