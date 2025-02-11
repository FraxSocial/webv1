'use client'

import Link from 'next/link'
import FeatureCard from '../components/ui/FeatureCard'

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
  { value: '$2.1B', label: 'TVL', change: '+12.4%' },
  { value: '11.2%', label: 'APY', change: '+2.1%' },
  { value: '142K', label: 'Users', change: '+5.8%' }
]

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-dark">
      {/* Subtle noise texture */}
      <div className="pointer-events-none fixed inset-0 bg-noise opacity-[0.15]" />

      {/* Hero Section */}
      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Brand tag */}
            <div className="inline-flex items-center space-x-2 rounded-full border border-border-subtle 
                          bg-bg-card px-4 py-1.5">
              <span className="text-sm text-text-secondary">Powered by</span>
              <span className="text-sm font-medium text-accent-primary">Frax Protocol</span>
            </div>

            {/* Main heading */}
            <div className="mt-8 space-y-4">
              <h1 className="text-5xl font-bold tracking-tight text-text-primary sm:text-6xl lg:text-7xl">
                frax<span className="text-accent-primary">.social</span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-text-secondary">
                Advanced DeFi tools for sophisticated users. Monitor, analyze, and engage with the Frax ecosystem.
              </p>
            </div>

            {/* Metrics */}
            <div className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-6">
              {metrics.map((metric, i) => (
                <div key={i} className="space-y-1 rounded-lg border border-border-subtle bg-bg-card p-4">
                  <div className="text-2xl font-bold text-text-primary">{metric.value}</div>
                  <div className="text-sm text-text-tertiary">{metric.label}</div>
                  <div className="text-xs text-accent-primary">{metric.change}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/app"
                className="rounded-lg bg-accent-primary px-8 py-3 text-sm font-medium text-text-primary 
                         transition-colors duration-300 hover:bg-accent-muted"
              >
                Launch Interface
              </Link>
              
              <Link
                href="/docs"
                className="rounded-lg border border-border-subtle bg-bg-card px-8 py-3 text-sm 
                         font-medium text-text-secondary transition-colors duration-300 
                         hover:border-border-strong hover:bg-bg-hover hover:text-text-primary"
              >
                Documentation
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative mt-32 bg-bg-darker py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text-primary">
              Advanced Capabilities
            </h2>
            <p className="mt-4 text-text-secondary">
              Professional-grade tools for serious DeFi participants
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature, i) => (
              <FeatureCard
                key={i}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
