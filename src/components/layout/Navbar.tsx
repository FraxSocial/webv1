'use client'

import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 nav-glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold gradient-text">
              frax.social
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link href="/delegates" className="nav-link">Delegates</Link>
              <Link href="/governance" className="nav-link">Governance</Link>
              <Link href="/community" className="nav-link">Community</Link>
              <Link href="/docs" className="nav-link">Docs</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
