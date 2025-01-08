'use client'

import Link from 'next/link'
import Navbar from '../components/layout/Navbar'
import BackgroundEffects from '../components/ui/BackgroundEffects'
import StatsCard from '../components/ui/StatsCard'
import FeatureCard from '../components/ui/FeatureCard'

const stats = [
  { label: 'Community Members', value: '50K+' },
  { label: 'Total Value Locked', value: '$2.5B' },
  { label: 'Active Delegates', value: '150+' },
  { label: '24/7 Support', value: 'Available' }
]

const features = [
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
]

export default function Home() {
  return (
    <>
      <Navbar />
      <BackgroundEffects />

      <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 relative overflow-hidden pt-32">
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
            {stats.map((stat, i) => (
              <StatsCard 
                key={i}
                label={stat.label}
                value={stat.value}
                delay={i * 0.2}
              />
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
            {features.map((feature, i) => (
              <FeatureCard 
                key={i}
                title={feature.title}
                description={feature.description}
                delay={i * 0.3}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
