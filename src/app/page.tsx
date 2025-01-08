'use client'

import Link from 'next/link'
import Image from 'next/image'
import BackgroundEffects from '../components/ui/BackgroundEffects'
import StatsCard from '../components/ui/StatsCard'
import FeatureCard from '../components/ui/FeatureCard'

const stats = [
  { label: 'Total Value Locked', value: '$2.5B' },
  { label: 'Active Delegates', value: '150+' }
]

const features = [
  {
    title: 'Become a Delegate',
    description: 'Shape protocol decisions and earn rewards for your contribution'
  },
  {
    title: 'Connect & Collaborate',
    description: 'Join a vibrant community of DeFi leaders and innovators'
  },
  {
    title: 'Stay Informed',
    description: 'Get real-time updates on governance proposals and community activities'
  }
]

export default function Home() {
  return (
    <>
      <BackgroundEffects />

      <main className="flex min-h-screen flex-col items-center justify-start p-4 md:p-12 relative overflow-hidden">
        <div className="z-10 w-full max-w-5xl mx-auto pt-12">
          {/* Hero Section */}
          <div className="text-center space-y-6 mb-16">
            <div className="mb-12">
              <Image
                src="/frax-logo.png"
                alt="Frax Social"
                width={120}
                height={120}
                className="mx-auto"
              />
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight">
              <span className="gradient-text">Shape the Future</span>
              <br />
              <span className="gradient-text">of DeFi</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto font-light">
              Join the next generation of Frax delegates
            </p>

            {/* Primary CTA */}
            <div className="pt-8">
              <Link 
                href="/delegate"
                className="inline-block w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-highlight-blue to-highlight-purple
                         text-white font-medium rounded-xl text-lg
                         hover:opacity-90 transition-all duration-300 hover:scale-[1.02] 
                         shadow-lg hover:shadow-xl"
              >
                Apply to Become a Delegate
              </Link>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 gap-6 mb-16">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <FeatureCard 
                key={i}
                title={feature.title}
                description={feature.description}
                delay={i * 0.2}
              />
            ))}
          </div>

          {/* Footer CTA */}
          <div className="text-center mt-20 space-y-4">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Not ready to delegate?
            </p>
            <Link 
              href="/community"
              className="inline-block w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm
                       text-gray-800 dark:text-white font-medium rounded-xl text-lg
                       hover:bg-white/20 transition-all duration-300
                       border border-gray-200/20 dark:border-gray-700/20"
            >
              Join Our Community
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
