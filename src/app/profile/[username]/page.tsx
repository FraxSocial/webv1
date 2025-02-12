'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useAccount } from 'wagmi'
import Link from 'next/link'
import NavMenu from '@/components/ui/NavMenu'
import StatsTicker from '@/components/ui/StatsTicker'

// Types
interface UserProfile {
  fnsName: string
  bio: string
  avatar?: string
  socialLinks: {
    twitter?: string
    discord?: string
    github?: string
    telegram?: string
  }
  stats: {
    following: number
    followers: number
    proposals: number
    votes: number
  }
}

interface TokenBalance {
  token: string
  symbol: string
  balance: string
  value: string
  change24h: string
}

interface Transaction {
  type: 'send' | 'receive' | 'stake' | 'unstake' | 'vote' | 'delegate'
  token: string
  amount: string
  timestamp: string
  hash: string
  status: 'success' | 'pending' | 'failed'
}

interface Friend {
  fnsName: string
  avatar?: string
  lastActive: string
  isOnline: boolean
}

// Mock data
const mockProfile: UserProfile = {
  fnsName: 'vitalik.frax',
  bio: 'Building the future of decentralized finance with Frax',
  socialLinks: {
    twitter: 'https://twitter.com',
    discord: 'https://discord.com',
    github: 'https://github.com',
    telegram: 'https://telegram.org'
  },
  stats: {
    following: 142,
    followers: 1337,
    proposals: 5,
    votes: 23
  }
}

const mockBalances: TokenBalance[] = [
  { token: 'Frax', symbol: 'FRAX', balance: '1,000.00', value: '$1,000.00', change24h: '+0.1%' },
  { token: 'Frax Shares', symbol: 'FXS', balance: '100.00', value: '$950.00', change24h: '+2.5%' },
  { token: 'frxETH', symbol: 'frxETH', balance: '1.5', value: '$3,000.00', change24h: '+1.2%' },
  { token: 'Fraxtal', symbol: 'FXTL', balance: '500.00', value: '$750.00', change24h: '+5.0%' }
]

const mockTransactions: Transaction[] = [
  { type: 'stake', token: 'FXS', amount: '50.00', timestamp: '2h ago', hash: '0x123...', status: 'success' },
  { type: 'send', token: 'FRAX', amount: '100.00', timestamp: '1d ago', hash: '0x456...', status: 'success' },
  { type: 'vote', token: 'veFXS', amount: '75.00', timestamp: '2d ago', hash: '0x789...', status: 'success' },
  { type: 'receive', token: 'FXTL', amount: '250.00', timestamp: '3d ago', hash: '0xabc...', status: 'success' }
]

const mockFriends: Friend[] = [
  { fnsName: 'sam.frax', avatar: '', lastActive: '5m ago', isOnline: true },
  { fnsName: 'justin.frax', avatar: '', lastActive: '1h ago', isOnline: true },
  { fnsName: 'alex.frax', avatar: '', lastActive: '3h ago', isOnline: false },
  { fnsName: 'emma.frax', avatar: '', lastActive: '1d ago', isOnline: false }
]

export default function ProfilePage() {
  const params = useParams()
  const { address } = useAccount()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, we would fetch the profile data from an API
    setProfile(mockProfile)
    setIsLoading(false)
  }, [params.username])

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-bg-lighter dark:bg-bg-dark">
        <NavMenu />
        <StatsTicker />
        <main className="flex h-[80vh] items-center justify-center">
          <div className="text-center">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-accent-primary border-t-transparent mx-auto"></div>
            <p className="text-text-secondary-light dark:text-text-secondary">Loading profile...</p>
          </div>
        </main>
      </div>
    )
  }

  if (!profile) return null

  return (
    <div className="min-h-screen w-full bg-bg-lighter dark:bg-bg-dark">
      <NavMenu />
      <StatsTicker />

      <main className="mx-auto max-w-7xl px-4 pt-24 pb-12 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="mb-8 rounded-lg p-8
                     border border-border-subtle-light dark:border-border-subtle
                     bg-bg-card-light dark:bg-bg-card">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-6">
              <div className="h-24 w-24 rounded-full bg-accent-primary/20" />
              <div>
                <h1 className="text-3xl font-bold text-text-primary-light dark:text-text-primary">{profile.fnsName}</h1>
                <p className="mt-2 text-text-secondary-light dark:text-text-secondary">{profile.bio}</p>
                <div className="mt-4 flex space-x-4">
                  {Object.entries(profile.socialLinks).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-tertiary hover:text-accent-primary transition-colors"
                    >
                      <span className="sr-only">{platform}</span>
                      {platform === 'twitter' && '𝕏'}
                      {platform === 'discord' && '📱'}
                      {platform === 'github' && '💻'}
                      {platform === 'telegram' && '✈️'}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <button className="rounded-lg border border-accent-primary px-4 py-2 text-accent-primary hover:bg-accent-primary hover:text-white transition-colors">
              Follow
            </button>
          </div>
          <div className="mt-6 grid grid-cols-4 gap-4 border-t border-border-subtle pt-6">
            <div>
              <div className="text-2xl font-semibold text-text-primary">{profile.stats.followers}</div>
              <div className="text-sm text-text-tertiary">Followers</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-text-primary">{profile.stats.following}</div>
              <div className="text-sm text-text-tertiary">Following</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-text-primary">{profile.stats.proposals}</div>
              <div className="text-sm text-text-tertiary">Proposals</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-text-primary">{profile.stats.votes}</div>
              <div className="text-sm text-text-tertiary">Votes</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content - 2 columns */}
          <div className="space-y-8 lg:col-span-2">
            {/* Token Balances */}
            <div className="rounded-lg p-6
                         border border-border-subtle-light dark:border-border-subtle
                         bg-bg-card-light dark:bg-bg-card">
              <h2 className="text-xl font-semibold text-text-primary-light dark:text-text-primary">Token Balances</h2>
              <div className="mt-4 space-y-4">
                {mockBalances.map((balance) => (
                  <div key={balance.symbol} className="flex items-center justify-between pb-4 last:border-0 last:pb-0
                                   border-b border-border-subtle-light dark:border-border-subtle">
                    <div>
                      <div className="font-medium text-text-primary-light dark:text-text-primary">{balance.token}</div>
                      <div className="text-sm text-text-tertiary-light dark:text-text-tertiary">{balance.balance} {balance.symbol}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-text-primary-light dark:text-text-primary">{balance.value}</div>
                      <div className={`text-sm ${balance.change24h.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {balance.change24h}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="rounded-lg p-6
                         border border-border-subtle-light dark:border-border-subtle
                         bg-bg-card-light dark:bg-bg-card">
              <h2 className="text-xl font-semibold text-text-primary-light dark:text-text-primary">Recent Transactions</h2>
              <div className="mt-4 space-y-4">
                {mockTransactions.map((tx, i) => (
                  <div key={i} className="flex items-center justify-between pb-4 last:border-0 last:pb-0
                                   border-b border-border-subtle-light dark:border-border-subtle">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-accent-primary/20 flex items-center justify-center">
                        {tx.type === 'send' && '↗️'}
                        {tx.type === 'receive' && '↙️'}
                        {tx.type === 'stake' && '🔒'}
                        {tx.type === 'unstake' && '🔓'}
                        {tx.type === 'vote' && '🗳️'}
                        {tx.type === 'delegate' && '👥'}
                      </div>
                      <div>
                        <div className="font-medium text-text-primary-light dark:text-text-primary">
                          {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)} {tx.token}
                        </div>
                        <div className="text-sm text-text-tertiary-light dark:text-text-tertiary">{tx.amount} {tx.token}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-text-tertiary-light dark:text-text-tertiary">{tx.timestamp}</div>
                      <a
                        href={`https://etherscan.io/tx/${tx.hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-accent-primary hover:underline"
                      >
                        View on Etherscan
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - 1 column */}
          <div className="space-y-8">
            {/* Friends List */}
            <div className="rounded-lg p-6
                         border border-border-subtle-light dark:border-border-subtle
                         bg-bg-card-light dark:bg-bg-card">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-text-primary-light dark:text-text-primary">Friends</h2>
                <Link href="/friends" className="text-sm text-accent-primary hover:underline">
                  View All
                </Link>
              </div>
              <div className="mt-4 space-y-4">
                {mockFriends.map((friend, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-accent-primary/20" />
                        {friend.isOnline && (
                          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-bg-card" />
                        )}
                      </div>
                      <div>
                        <Link href={`/profile/${friend.fnsName}`} className="font-medium text-text-primary-light dark:text-text-primary hover:text-accent-primary">
                          {friend.fnsName}
                        </Link>
                        <div className="text-sm text-text-tertiary-light dark:text-text-tertiary">Last active {friend.lastActive}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="rounded-lg p-6
                         border border-border-subtle-light dark:border-border-subtle
                         bg-bg-card-light dark:bg-bg-card">
              <h2 className="text-xl font-semibold text-text-primary-light dark:text-text-primary">Achievements</h2>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-accent-primary/20 flex items-center justify-center text-lg">
                    🗳️
                  </div>
                  <div className="mt-2 text-center">
                    <div className="text-sm font-medium text-text-primary-light dark:text-text-primary">Voter</div>
                    <div className="text-xs text-text-tertiary-light dark:text-text-tertiary">10+ votes</div>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-accent-primary/20 flex items-center justify-center text-lg">
                    💎
                  </div>
                  <div className="mt-2 text-center">
                    <div className="text-sm font-medium text-text-primary-light dark:text-text-primary">HODLer</div>
                    <div className="text-xs text-text-tertiary-light dark:text-text-tertiary">1yr+ stake</div>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-accent-primary/20 flex items-center justify-center text-lg">
                    🚀
                  </div>
                  <div className="mt-2 text-center">
                    <div className="text-sm font-medium text-text-primary">Early Bird</div>
                    <div className="text-xs text-text-tertiary">Beta user</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
