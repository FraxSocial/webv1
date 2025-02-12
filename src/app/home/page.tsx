'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAccount } from 'wagmi'
import Link from 'next/link'
import NavMenu from '@/components/ui/NavMenu'
import StatsTicker from '@/components/ui/StatsTicker'
import Achievements from '@/components/ui/Achievements'

// Types
interface UserProfile {
  fnsName: string
  bio: string
}

// Mock data
const ecosystemStats = [
  { label: 'frxUSD Price', value: '$1.001', change: '+0.1%' },
  { label: 'frxETH/ETH', value: '1.0124', change: '+1.2%' },
  { label: 'FPI Index', value: '$1.052', change: '+0.3%' },
  { label: 'Total TVL', value: '$5.2B', change: '+2.8%' }
]

const governanceProposals = [
  {
    id: 'FIP-89',
    title: 'Add USDC.e as frxUSD Collateral',
    status: 'Active',
    votes: { for: 65, against: 35 },
    endTime: '2d 4h remaining',
    veFXSParticipation: '45.2%'
  },
  {
    id: 'FIP-88',
    title: 'Fraxtal L3 Deployment Framework',
    status: 'Passed',
    votes: { for: 82, against: 18 },
    endTime: 'Ended 1d ago',
    veFXSParticipation: '52.8%'
  }
]

const ecosystemHighlights = [
  { tag: 'Fraxtal', metric: '2.4M FXTL/day', type: 'points', trend: 'up' },
  { tag: 'Fraxlend', metric: '$420M TVL', type: 'tvl', trend: 'up' },
  { tag: 'frxETH', metric: '125k ETH', type: 'staked', trend: 'up' },
  { tag: 'FXB', metric: '$25M Bonds', type: 'issued', trend: 'neutral' }
]

const ecosystemActivity = [
  {
    type: 'fraxtal',
    user: 'alex.frax',
    action: 'Earned 5.2k FXTL points',
    detail: 'Top gas spender today',
    time: '5m ago'
  },
  {
    type: 'governance',
    user: 'sam.frax',
    action: 'Delegated 50k veFXS',
    detail: 'To: frax.eth',
    time: '15m ago'
  },
  {
    type: 'defi',
    user: 'emma.frax',
    action: 'Supplied 100k frxUSD',
    detail: 'To Fraxlend @ 5.2% APY',
    time: '1h ago'
  },
  {
    type: 'development',
    user: 'dev.frax',
    action: 'Deployed new contract',
    detail: 'Generated 2.1k FXTL',
    time: '2h ago'
  }
]

export default function HomePage() {
  const { address, isConnected } = useAccount()
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load profile from localStorage
  useEffect(() => {
    const loadProfile = async () => {
      try {
        // Check if user is connected
        if (!isConnected || !address) {
          router.push('/')
          return
        }

        // Load profile from localStorage
        const savedProfile = localStorage.getItem('userProfile')
        if (!savedProfile) {
          router.push('/')
          return
        }

        const profile = JSON.parse(savedProfile)
        setProfile(profile)
        setIsLoading(false)
      } catch (error) {
        console.error('Error loading profile:', error)
        router.push('/')
      }
    }

    loadProfile()
  }, [address, isConnected, router])

  if (isLoading) {
    return (
      <main className="min-h-screen bg-bg-lighter dark:bg-bg-dark">
        <NavMenu />
        <StatsTicker />
        <div className="flex h-[80vh] items-center justify-center">
          <div className="text-center">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-accent-primary border-t-transparent mx-auto"></div>
            <p className="text-text-secondary-light dark:text-text-secondary">Loading your dashboard...</p>
          </div>
        </div>
      </main>
    )
  }

  if (!profile) {
    return null
  }

  return (
    <main className="min-h-screen bg-bg-lighter dark:bg-bg-dark">
      <NavMenu />
      <StatsTicker />

      <div className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary-light dark:text-text-primary">Welcome back, {profile.fnsName}</h1>
          <p className="mt-2 text-text-secondary-light dark:text-text-secondary">Here's what's happening in the Frax ecosystem</p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Main Content - 8 columns */}
          <div className="space-y-8 lg:col-span-8">
            {/* Ecosystem Metrics */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {ecosystemStats.map((stat, i) => (
                <div key={i} className="rounded-lg p-4 shadow-subtle
                             border border-border-subtle-light dark:border-border-subtle
                             bg-bg-card-light dark:bg-bg-card">
                  <div className="text-sm text-text-tertiary-light dark:text-text-tertiary">{stat.label}</div>
                  <div className="mt-1 flex items-baseline justify-between">
                    <div className="text-2xl font-semibold text-text-primary-light dark:text-text-primary">{stat.value}</div>
                    <div className={`text-sm ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Achievements */}
            <Achievements />

            {/* Recent Activity */}
            <div className="rounded-lg p-6 shadow-subtle
                         border border-border-subtle-light dark:border-border-subtle
                         bg-bg-card-light dark:bg-bg-card">
              <h2 className="text-xl font-semibold text-text-primary-light dark:text-text-primary">Recent Activity</h2>
              <div className="mt-4 space-y-4">
                {ecosystemActivity.map((activity, i) => (
                  <div key={i} className="flex items-center justify-between pb-4 last:border-0 last:pb-0
                               border-b border-border-subtle-light dark:border-border-subtle">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-accent-primary/20" />
                      <div>
                        <div>
                          <span className="font-medium text-text-primary-light dark:text-text-primary">{activity.user}</span>
                          <span className="text-text-secondary-light dark:text-text-secondary"> {activity.action}</span>
                          <div className="text-xs text-text-tertiary-light dark:text-text-tertiary">{activity.detail}</div>
                        </div>
                        <div className="text-sm text-text-tertiary-light dark:text-text-tertiary">{activity.time}</div>
                      </div>
                    </div>
                    <div className="text-sm text-text-tertiary-light dark:text-text-tertiary">
                      {activity.type === 'fraxtal' && '🚀'}
                      {activity.type === 'governance' && '🗳️'}
                      {activity.type === 'defi' && '💰'}
                      {activity.type === 'development' && '👨‍💻'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - 4 columns */}
          <div className="lg:col-span-4 space-y-8">
            {/* Profile Card */}
            <div className="rounded-lg p-6 shadow-subtle
                         border border-border-subtle-light dark:border-border-subtle
                         bg-bg-card-light dark:bg-bg-card">
              <div className="text-center">
                <Link href={`/profile/${profile.fnsName}`} className="block group">
                  <div className="h-20 w-20 mx-auto rounded-full bg-accent-primary/20 group-hover:ring-2 group-hover:ring-accent-primary transition-all" />
                  <h2 className="mt-4 text-xl font-bold text-text-primary-light dark:text-text-primary group-hover:text-accent-primary transition-colors">{profile.fnsName}</h2>
                  <p className="mt-2 text-sm text-text-secondary-light dark:text-text-secondary">{profile.bio}</p>
                </Link>
                <div className="mt-4 grid grid-cols-3 gap-4 border-t border-border-subtle-light dark:border-border-subtle pt-4">
                  <div>
                    <div className="text-lg font-semibold text-text-primary-light dark:text-text-primary">0</div>
                    <div className="text-sm text-text-tertiary-light dark:text-text-tertiary">Proposals</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-text-primary-light dark:text-text-primary">0</div>
                    <div className="text-sm text-text-tertiary-light dark:text-text-tertiary">Votes</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-text-primary-light dark:text-text-primary">0</div>
                    <div className="text-sm text-text-tertiary-light dark:text-text-tertiary">FXTL/day</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ecosystem Highlights */}
            <div className="rounded-lg p-6 shadow-subtle
                         border border-border-subtle-light dark:border-border-subtle
                         bg-bg-card-light dark:bg-bg-card">
              <h2 className="text-xl font-semibold text-text-primary-light dark:text-text-primary">Ecosystem Highlights</h2>
              <div className="mt-4 space-y-4">
                {ecosystemHighlights.map((highlight, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <div className="text-accent-primary">{highlight.tag}</div>
                      <div className="text-sm text-text-tertiary-light dark:text-text-tertiary">{highlight.metric}</div>
                    </div>
                    <div className="text-lg">
                      {highlight.trend === 'up' && '📈'}
                      {highlight.trend === 'neutral' && '📊'}
                      {highlight.trend === 'down' && '📉'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-lg p-6 shadow-subtle
                         border border-border-subtle-light dark:border-border-subtle
                         bg-bg-card-light dark:bg-bg-card">
              <h2 className="text-xl font-semibold text-text-primary-light dark:text-text-primary">Quick Actions</h2>
              <div className="mt-4 space-y-2">
                <button className="w-full rounded-lg px-4 py-2 transition-colors
                                 border border-accent-primary
                                 text-accent-primary hover:bg-accent-primary hover:text-white">
                  Create Proposal
                </button>
                <button className="w-full rounded-lg px-4 py-2 transition-colors
                                 border border-border-subtle-light dark:border-border-subtle
                                 text-text-secondary-light dark:text-text-secondary
                                 hover:border-accent-primary hover:text-accent-primary">
                  Stake FXS
                </button>
                <button className="w-full rounded-lg px-4 py-2 transition-colors
                                 border border-border-subtle-light dark:border-border-subtle
                                 text-text-secondary-light dark:text-text-secondary
                                 hover:border-accent-primary hover:text-accent-primary">
                  View Analytics
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
