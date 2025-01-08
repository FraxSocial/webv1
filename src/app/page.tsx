'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    // Create floating particles
    const createParticles = () => {
      const particles = document.querySelector('.particles')
      if (!particles) return

      // Clear existing particles
      particles.innerHTML = ''

      // Create new particles
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div')
        particle.className = 'particle'
        particle.style.width = Math.random() * 4 + 2 + 'px'
        particle.style.height = particle.style.width
        particle.style.left = Math.random() * 100 + 'vw'
        particle.style.top = Math.random() * 100 + 'vh'
        particle.style.animationDelay = Math.random() * 15 + 's'
        particles.appendChild(particle)
      }
    }

    createParticles()
    window.addEventListener('resize', createParticles)
    return () => window.removeEventListener('resize', createParticles)
  }, [])

  return (
    <>
      {/* Navbar */}
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

      {/* Background Effects */}
      <div className="cyber-grid" />
      <div className="particles" />
      <div className="mesh-gradient" />

      <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 relative overflow-hidden pt-32">
        {/* Animated background gradients */}
        <div className="hero-gradient" />
        
        {/* Main content */}
        <div className="z-10 w-full max-w-6xl items-center justify-between text-sm lg:flex flex-col gap-8">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="gradient-text">Shape the Future of DeFi</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mt-6 font-light">
              Join an exclusive network of delegates guiding the evolution of Frax Finance
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 w-full">
            {[
              { label: 'Community Members', value: '50K+' },
              { label: 'Total Value Locked', value: '$2.5B' },
              { label: 'Active Delegates', value: '150+' },
              { label: '24/7 Support', value: 'Available' }
            ].map((stat, i) => (
              <div 
                key={i} 
                className="glass-card p-6 text-center float"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="text-2xl md:text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center space-y-8">
            <p className="text-lg text-gray-600 dark:text-gray-400 font-light">
              Ready to make an impact on the future of decentralized finance?
            </p>
            
            <Link 
              href="/delegate"
              className="inline-block px-8 py-4 bg-gradient-to-r from-highlight-blue to-highlight-purple
                       text-white font-medium rounded-xl
                       hover:opacity-90 transition-all duration-500 hover:scale-[1.02] 
                       shadow-lg shadow-highlight-blue/5 hover:shadow-highlight-blue/10
                       dark:shadow-highlight-blue/10 dark:hover:shadow-highlight-blue/20"
            >
              Become a Delegate
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {[
              {
                title: 'Protocol Governance',
                description: 'Shape the future of Frax through active participation in governance'
              },
              {
                title: 'Community Leadership',
                description: 'Guide and represent the community in key decisions'
              },
              {
                title: 'Delegation Rewards',
                description: 'Earn rewards for your contribution to the ecosystem'
              }
            ].map((feature, i) => (
              <div 
                key={i} 
                className="glass-card p-8 group float"
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                <h3 className="text-xl font-semibold mb-3 gradient-text group-hover:opacity-90">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-light">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
