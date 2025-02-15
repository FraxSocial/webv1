'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import FeatureCard from '@/components/ui/FeatureCard'
import StatsTicker from '@/components/ui/StatsTicker'
import SparklineChart from '@/components/ui/SparklineChart'
import NavMenu from '@/components/ui/NavMenu'
import SignUpModal from '@/components/ui/SignUpModal'
import Footer from '@/components/layout/Footer'

const features = [
  {
    title: 'Protocol Integration',
    description: 'Direct smart contract interaction with advanced transaction management',
    icon: '⚡'
  },
  {
    title: 'Real-Time Analytics',
    description: 'Advanced metrics, custom dashboards, and predictive modeling',
    icon: '📊'
  },
  {
    title: 'Governance Suite',
    description: 'Comprehensive voting system with delegation and proposal tracking',
    icon: '🔮'
  }
]

const metrics = [
  { 
    value: '$2.1B', 
    label: 'TVL', 
    change: '+12.4%',
    data: [65, 68, 62, 71, 74, 72, 68, 71, 75, 78, 82, 85]
  },
  { 
    value: '11.2%', 
    label: 'APY', 
    change: '+2.1%',
    data: [11.0, 10.8, 10.9, 11.2, 11.4, 11.2, 11.1, 11.2, 11.3, 11.2]
  },
  { 
    value: '142K', 
    label: 'Users', 
    change: '+5.8%',
    data: [125, 128, 130, 132, 135, 137, 138, 140, 141, 142]
  }
]

export default function Home() {
  const { isConnected } = useAccount()
  const router = useRouter()
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)

  // Check if user has a profile
  useEffect(() => {
    if (isConnected) {
      const hasProfile = localStorage.getItem('userProfile')
      if (hasProfile && window.location.pathname === '/') {
        router.push('/home')
      } else if (!hasProfile && !isSignUpOpen) {
        setIsSignUpOpen(true)
      }
    }
  }, [isConnected, router, isSignUpOpen])

  // Reset modal state when disconnected
  useEffect(() => {
    if (!isConnected) {
      setIsSignUpOpen(false)
    }
  }, [isConnected])
  return (
    <main className="relative min-h-screen overflow-hidden bg-bg-dark">
      <NavMenu />
      {/* Stats Ticker */}
      <StatsTicker />
      {/* Dynamic background elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Noise texture */}
        <div className="absolute inset-0 bg-noise opacity-[0.15]" />

        {/* Animated circles */}
        <div className="absolute -left-1/4 top-1/4 h-[800px] w-[800px] animate-[spin_60s_linear_infinite]">
          <div className="absolute h-full w-full rounded-full border border-accent-primary/5" />
          <div className="absolute h-3/4 w-3/4 translate-x-1/8 translate-y-1/8 rounded-full border border-accent-primary/5" />
          <div className="absolute h-1/2 w-1/2 translate-x-1/4 translate-y-1/4 rounded-full border border-accent-primary/5" />
        </div>

        <div className="absolute -right-1/4 top-3/4 h-[600px] w-[600px] animate-[spin_45s_linear_infinite_reverse]">
          <div className="absolute h-full w-full rounded-full border border-accent-primary/5" />
          <div className="absolute h-3/4 w-3/4 translate-x-1/8 translate-y-1/8 rounded-full border border-accent-primary/5" />
          <div className="absolute h-1/2 w-1/2 translate-x-1/4 translate-y-1/4 rounded-full border border-accent-primary/5" />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(42,133,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(42,133,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]" />

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`particle particle-${i + 1}`}
            />
          ))}
        </div>

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">

        <div className="relative mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Brand tag */}
            <div className="animate-slide-down inline-flex items-center space-x-2 rounded-full 
                          border border-border-subtle bg-bg-card px-4 py-1.5 shadow-subtle">
              <span className="text-sm text-text-secondary">Powered by</span>
              <span className="text-sm font-medium text-accent-primary">Frax Protocol</span>
            </div>

            {/* Main heading */}
            <div className="mt-12 space-y-6">
              <h1 className="animate-slide-up text-5xl font-bold tracking-tight text-text-primary 
                           sm:text-6xl lg:text-7xl">
                frax<span className="relative text-accent-primary">.social
                  <span className="absolute -inset-1 -z-10 opacity-50 blur-xl" />
                </span>
              </h1>
              <p className="animate-slide-up mx-auto max-w-2xl text-lg text-text-secondary 
                          [animation-delay:150ms]">
                Advanced DeFi tools for sophisticated users. Monitor, analyze, and engage with the Frax ecosystem.
              </p>
            </div>

            {/* Metrics */}
            <div className="mx-auto mt-20 grid max-w-3xl grid-cols-3 gap-6">
              {metrics.map((metric, i) => (
                <div key={i} 
                     className="group animate-fade-in cursor-pointer space-y-2 rounded-lg 
                                border border-border-subtle bg-bg-card p-6 shadow-subtle 
                                transition-all duration-300 hover:-translate-y-1 
                                hover:border-accent-primary hover:shadow-accent"
                     style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="flex items-baseline justify-between">
                    <div className="text-sm font-medium text-text-tertiary transition-colors 
                                  duration-300 group-hover:text-text-secondary">
                      {metric.label}
                    </div>
                    <div className="text-xs text-accent-primary">{metric.change}</div>
                  </div>
                  <div className="text-3xl font-bold tracking-tight text-text-primary 
                              transition-colors duration-300 group-hover:text-accent-primary">
                    {metric.value}
                  </div>
                  <SparklineChart data={metric.data} positive={metric.change.startsWith('+')} />
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-16 flex animate-fade-in flex-col items-center justify-center gap-4 
                          sm:flex-row [animation-delay:400ms]">
              <button
                onClick={() => setIsSignUpOpen(true)}
                className="group relative overflow-hidden rounded-lg bg-accent-primary px-8 
                         py-3 text-sm font-medium text-text-primary transition-all duration-300 
                         hover:bg-accent-muted hover:shadow-accent"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Launch Interface</span>
                  <svg 
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M14 5l7 7m0 0l-7 7m7-7H3" 
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 -z-10 bg-[linear-gradient(45deg,transparent_25%,rgba(68,147,255,0.4)_50%,transparent_75%)] 
                              bg-[length:250%_250%] bg-[0%_0%] opacity-0 transition-all 
                              duration-500 group-hover:animate-[shine_1s_ease_forwards] 
                              group-hover:opacity-100" />
              </button>
              
              <a
                href="https://docs.fx.social.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border-subtle bg-bg-card px-8 py-3 
                         text-sm font-medium text-text-secondary shadow-subtle transition-all 
                         duration-300 hover:-translate-y-1 hover:border-accent-primary 
                         hover:text-text-primary hover:shadow-accent"
              >
                Documentation
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative mt-32 bg-bg-darker py-32">
        {/* Decorative elements */}
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent" />
        {/* Section divider */}
        <div className="absolute inset-x-0 -top-px h-px bg-border-subtle" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-slide-up space-y-4">
              <h2 className="text-3xl font-bold tracking-tight text-text-primary">
                Advanced Capabilities
              </h2>
              <p className="mx-auto max-w-2xl text-text-secondary">
                Professional-grade tools for serious DeFi participants
              </p>
            </div>

            <div className="mt-20 grid gap-8 md:grid-cols-3">
              {features.map((feature, i) => (
                <div key={i} 
                     className="animate-fade-in" 
                     style={{ animationDelay: `${i * 150}ms` }}>
                  <FeatureCard
                    title={feature.title}
                    description={feature.description}
                    icon={feature.icon}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sign Up Modal */}
      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </main>
  )
}
