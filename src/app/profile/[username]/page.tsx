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
    // Get profile from localStorage
    const storedProfile = localStorage.getItem('userProfile')
    if (storedProfile) {
      const parsedProfile = JSON.parse(storedProfile)
      // Convert stored profile to UserProfile format
      setProfile({
        fnsName: parsedProfile.fnsName,
        bio: parsedProfile.bio,
        socialLinks: mockProfile.socialLinks, // Keep mock social links for now
        stats: mockProfile.stats // Keep mock stats for now
      })
    } else {
      // Fallback to mock profile for development
      setProfile(mockProfile)
    }
    setIsLoading(false)
  }, [params.username])

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-[#1D2024] font-arial text-white">
        <NavMenu />
        <StatsTicker />
        <main className="flex h-[80vh] items-center justify-center">
          <div className="text-center">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#00A2FF] border-t-transparent mx-auto"></div>
            <p className="text-[#9BA1A6]">Loading profile...</p>
          </div>
        </main>
      </div>
    )
  }

  if (!profile) return null

  return (
    <div className="min-h-screen w-full bg-[#1D2024] font-arial text-white">
      <NavMenu />
      <StatsTicker />

      <main className="mx-auto max-w-7xl px-4 pt-24 pb-12 sm:px-6 lg:px-8">
        {/* Profile Header */}
        {/* MySpace-style Profile Header */}
        <div className="mb-8 rounded p-8 bg-[#27292D] border-2 border-[#363940]">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-6">
              <div className="relative">
                <div className="h-32 w-32 border-4 border-[#363940] bg-accent-primary/20" />
                <div className="absolute -bottom-2 -right-2 bg-[#27292D] border-2 border-[#363940] px-2 py-1 text-xs">
                  View Photos
                </div>
              </div>
              <div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <h1 className="text-3xl font-bold text-[#00A2FF]">{profile.fnsName}</h1>
                    <div className="text-sm px-2 py-1 bg-[#363940] rounded animate-pulse">
                      ⚡️ Online Now! ⚡️
                    </div>
                  </div>
                  
                  {/* Mood and Last Login */}
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="text-[#9BA1A6]">
                      <span className="text-white">Mood:</span> 🚀 Bullish AF
                    </div>
                    <div className="text-[#9BA1A6]">
                      <span className="text-white">Last Login:</span> 2/12/2025
                    </div>
                    <div className="text-[#9BA1A6]">
                      <span className="text-white">Profile Views:</span> <span className="text-[#00A2FF]">42,069</span>
                    </div>
                  </div>
                  
                  <p className="text-[#9BA1A6] italic">{profile.bio}</p>
                  
                  {/* View Counter */}
                  <div className="flex items-center space-x-2 text-sm text-[#9BA1A6]">
                    <span className="text-white font-bold">Profile Views:</span> 1,337
                    <span className="text-[#363940]">•</span>
                    <span className="text-[#00A2FF] hover:underline cursor-pointer">View My Blog</span>
                  </div>
                </div>
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
            <div className="flex space-x-3">
              <button className="rounded px-4 py-2 bg-[#00A2FF] text-white font-bold hover:bg-[#0081CC] transition-colors uppercase text-sm tracking-wide">
                Add Friend
              </button>
              <button className="rounded px-4 py-2 bg-[#363940] text-white font-bold hover:bg-[#4A4F57] transition-colors uppercase text-sm tracking-wide">
                Message
              </button>
              <div className="relative group">
                <button className="rounded px-4 py-2 bg-[#363940] text-white font-bold hover:bg-[#4A4F57] transition-colors uppercase text-sm tracking-wide">
                  Customize ↓
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-[#27292D] border-2 border-[#363940] rounded shadow-lg hidden group-hover:block">
                  <div className="py-2">
                    <button className="w-full px-4 py-2 text-left text-sm text-[#9BA1A6] hover:text-[#00A2FF] hover:bg-[#1D2024]">
                      Edit Profile Song
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-[#9BA1A6] hover:text-[#00A2FF] hover:bg-[#1D2024]">
                      Change Background
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-[#9BA1A6] hover:text-[#00A2FF] hover:bg-[#1D2024]">
                      Add Glitter Effects
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-[#9BA1A6] hover:text-[#00A2FF] hover:bg-[#1D2024]">
                      Edit HTML/CSS
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* MySpace-style Stats */}
          <div className="mt-6 grid grid-cols-4 gap-4 border-t-2 border-[#363940] pt-6">
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
            <div className="rounded bg-[#27292D] p-6 border-2 border-[#363940]">
              <h2 className="text-xl font-bold text-[#00A2FF] uppercase tracking-wider">Token Balances</h2>
              <div className="mt-4 space-y-4">
                {mockBalances.map((balance) => (
                  <div key={balance.symbol} className="flex items-center justify-between pb-4 last:border-0 last:pb-0
                                   border-b-2 border-[#363940]">
                    <div>
                      <div className="font-bold text-[#00A2FF]">{balance.token}</div>
                      <div className="text-sm text-[#9BA1A6]">{balance.balance} {balance.symbol}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">{balance.value}</div>
                      <div className={`text-sm ${balance.change24h.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {balance.change24h}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* About Me */}
            <div className="rounded bg-[#27292D] p-6 border-2 border-[#363940]">
              <h2 className="text-xl font-bold text-[#00A2FF] uppercase tracking-wider">About Me</h2>
              <div className="mt-4 space-y-4 text-[#9BA1A6]">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-[#00A2FF] font-bold mb-2">General</h3>
                    <div className="space-y-2">
                      <p><span className="text-white">Status:</span> Feeling bullish 🚀</p>
                      <p><span className="text-white">Here for:</span> Trading, DeFi, NFTs</p>
                      <p><span className="text-white">Hometown:</span> Web3</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[#00A2FF] font-bold mb-2">Interests</h3>
                    <div className="space-y-2">
                      <p><span className="text-white">Music:</span> Crypto Twitter Spaces</p>
                      <p><span className="text-white">Movies:</span> The Big Short</p>
                      <p><span className="text-white">Heroes:</span> Satoshi Nakamoto</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="rounded bg-[#27292D] p-6 border-2 border-[#363940]">
              <h2 className="text-xl font-bold text-[#00A2FF] uppercase tracking-wider">Recent Activity</h2>
              <div className="mt-4 space-y-4">
                {mockTransactions.map((tx, i) => (
                  <div key={i} className="flex items-center justify-between pb-4 last:border-0 last:pb-0 border-b-2 border-[#363940]">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-[#1D2024] flex items-center justify-center text-lg border border-[#363940]">
                        {tx.type === 'send' && '↗️'}
                        {tx.type === 'receive' && '↙️'}
                        {tx.type === 'stake' && '🔒'}
                        {tx.type === 'unstake' && '🔓'}
                        {tx.type === 'vote' && '🗳️'}
                        {tx.type === 'delegate' && '👥'}
                      </div>
                      <div>
                        <div className="font-medium text-white">
                          {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)} {tx.token}
                        </div>
                        <div className="text-sm text-[#9BA1A6]">{tx.amount} {tx.token}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-[#9BA1A6]">{tx.timestamp}</div>
                      <a
                        href={`https://etherscan.io/tx/${tx.hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#00A2FF] hover:underline"
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
            {/* Top 8 Friends */}
            <div className="rounded bg-[#27292D] p-6 border-2 border-[#363940]">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#00A2FF] uppercase tracking-wider">Top 8 Friends</h2>
                <Link href="/friends" className="text-sm text-[#00A2FF] hover:underline uppercase tracking-wider">
                  View All Friends
                </Link>
              </div>

              {/* Music Player */}
              <div className="mt-6 p-4 border-2 border-[#363940] rounded bg-[#1D2024]">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-[#9BA1A6] uppercase tracking-wider text-sm block">🎵 Profile Song:</span>
                    <span className="text-[#9BA1A6] text-xs">Added: Feb 12, 2025 · Plays: 42,069</span>
                  </div>
                  <div className="space-x-2">
                    <button className="text-[#00A2FF] text-sm hover:underline">Add to Playlist</button>
                    <button className="text-[#00A2FF] text-sm hover:underline">Change Song</button>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-[#363940] border-2 border-[#4A4F57] relative overflow-hidden group">
                    <img src="https://i.imgur.com/placeholder.jpg" alt="Album cover" className="object-cover w-full h-full" />
                    <div className="absolute inset-0 flex items-center justify-center text-[#00A2FF] text-2xl font-bold bg-[#1D2024]/80 opacity-0 group-hover:opacity-100 transition-opacity">
                      ♫
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-bold text-lg">Sandstorm</div>
                    <div className="text-[#9BA1A6]">Darude</div>
                    <div className="text-[#9BA1A6] text-xs">Electronic · 1999</div>
                    <div className="mt-1 h-1 bg-[#363940] rounded-full overflow-hidden">
                      <div className="w-3/4 h-full bg-[#00A2FF] animate-pulse"></div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <button className="bg-[#363940] hover:bg-[#4A4F57] text-white px-4 py-1 rounded text-sm flex items-center space-x-1">
                      <span>▶</span><span>Play</span>
                    </button>
                    <button className="bg-[#363940] hover:bg-[#4A4F57] text-white px-4 py-1 rounded text-sm flex items-center space-x-1">
                      <span>+</span><span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-4 gap-4">
                {mockFriends.map((friend, i) => (
                  <div key={i} className="text-center">
                    <div className="relative mx-auto mb-2">
                      <div className="w-20 h-20 border-2 border-[#363940] bg-accent-primary/20" />
                      {friend.isOnline && (
                        <div className="absolute -bottom-1 -right-1 px-2 py-0.5 bg-[#27292D] border border-[#363940] text-xs text-[#00A2FF]">
                          Online
                        </div>
                      )}
                    </div>
                    <Link href={`/profile/${friend.fnsName}`} 
                          className="block font-bold text-[#00A2FF] hover:underline truncate">
                      {friend.fnsName}
                    </Link>
                    <div className="text-xs text-[#9BA1A6] truncate">
                      {friend.lastActive}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="rounded bg-[#27292D] p-6 border-2 border-[#363940]">
              <h2 className="text-xl font-bold text-[#00A2FF] uppercase tracking-wider">Achievements</h2>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded bg-[#1D2024] flex items-center justify-center text-lg border border-[#363940]">
                    🗳️
                  </div>
                  <div className="mt-2 text-center">
                    <div className="text-sm font-medium text-white">Voter</div>
                    <div className="text-xs text-[#9BA1A6]">10+ votes</div>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded bg-[#1D2024] flex items-center justify-center text-lg border border-[#363940]">
                    💎
                  </div>
                  <div className="mt-2 text-center">
                    <div className="text-sm font-medium text-white">HODLer</div>
                    <div className="text-xs text-[#9BA1A6]">1yr+ stake</div>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded bg-[#1D2024] flex items-center justify-center text-lg border border-[#363940]">
                    🚀
                  </div>
                  <div className="mt-2 text-center">
                    <div className="text-sm font-medium text-white">Early Bird</div>
                    <div className="text-xs text-[#9BA1A6]">Beta user</div>
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
