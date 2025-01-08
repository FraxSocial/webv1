'use client'

import Link from 'next/link'
import BackgroundEffects from '../components/ui/BackgroundEffects'
import StatsCard from '../components/ui/StatsCard'
import FeatureCard from '../components/ui/FeatureCard'

const stats = [
  { label: 'Total Value Locked', value: '$2.5B' },
  { label: 'Active Delegates', value: '150+' },
  { label: 'Community Members', value: '50K+' }
]

const features = [
  {
    title: 'Become a Delegate',
    description: 'Shape protocol decisions and earn rewards for your contribution',
    icon: '🏛️'
  },
  {
    title: 'Connect & Collaborate',
    description: 'Join a vibrant community of DeFi leaders and innovators',
    icon: '🤝'
  },
  {
    title: 'Stay Informed',
    description: 'Get real-time updates on governance proposals and community activities',
    icon: '📊'
  }
]

export default function Home() {
  return (
    <>
      <BackgroundEffects />

      <main className="flex min-h-screen flex-col items-center justify-start p-4 md:p-12 relative overflow-hidden">
        <div className="z-10 w-full max-w-6xl mx-auto pt-12">
          {/* Hero Section */}
          <div className="text-center space-y-8 mb-20">
            <div className="mb-12 relative">
              <div className="mx-auto animate-float flex flex-col items-center">
                <div className="relative font-mono">
                  <span className="text-5xl font-bold tracking-tighter bg-gradient-to-r from-highlight-blue via-highlight-purple to-highlight-cyan text-transparent bg-clip-text">
                    frax<span className="text-highlight-cyan">.</span>social
                  </span>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-highlight-cyan animate-blink"></div>
                  <div className="absolute -bottom-2 left-1/2 w-16 h-[1px] bg-gradient-to-r from-transparent via-highlight-blue to-transparent"></div>
                </div>
                <div className="mt-3 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="inline-block w-3 h-[1px] bg-current"></span>
                  <span className="font-mono tracking-wider">DEFI GOVERNANCE</span>
                  <span className="inline-block w-3 h-[1px] bg-current"></span>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-highlight-blue/20 to-highlight-purple/20 blur-3xl -z-10" />
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight">
              <span className="gradient-text">Shape the Future</span>
              <br />
              <span className="gradient-text">of DeFi</span>
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto font-light">
              Join the next generation of Frax delegates
            </p>

            {/* Primary CTA */}
            <div className="pt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                href="/delegate"
                className="group relative inline-flex items-center justify-center px-8 py-4 w-full sm:w-auto
                         bg-gradient-to-r from-highlight-blue to-highlight-purple
                         text-white font-medium rounded-xl text-lg
                         hover:opacity-90 transition-all duration-300 hover:scale-[1.02] 
                         shadow-lg hover:shadow-xl overflow-hidden"
              >
                <span className="relative z-10">Apply to Become a Delegate</span>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-highlight-purple to-highlight-blue opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
              <Link 
                href="/learn"
                className="group relative inline-flex items-center justify-center px-8 py-4 w-full sm:w-auto
                         border border-gray-200/20 dark:border-gray-700/20
                         text-gray-700 dark:text-gray-300 font-medium rounded-xl text-lg
                         hover:border-gray-200/40 dark:hover:border-gray-700/40
                         transition-all duration-300 backdrop-blur-sm"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20">
            {stats.map((stat, i) => (
              <StatsCard 
                key={i}
                label={stat.label}
                value={stat.value}
                delay={i * 0.2}
              />
            ))}
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <FeatureCard 
                key={i}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                delay={i * 0.2}
              />
            ))}
          </div>

          {/* Footer CTA */}
          <div className="text-center mt-24 space-y-6">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-medium mb-6 gradient-text">
                Join Our Growing Community
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Connect with other members, stay updated, and be part of the Frax ecosystem
              </p>
              <Link 
                href="/community"
                className="inline-flex items-center justify-center px-8 py-4 w-full sm:w-auto
                         bg-white/5 dark:bg-gray-800/5 backdrop-blur-sm
                         text-gray-700 dark:text-gray-300 font-medium rounded-xl text-lg
                         border border-gray-200/20 dark:border-gray-700/20
                         hover:bg-white/10 dark:hover:bg-gray-800/10
                         hover:border-gray-200/40 dark:hover:border-gray-700/40
                         transition-all duration-300"
              >
                Join Community
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
