'use client'

import { useState } from 'react'
import DelegateSearch from '@/components/ui/EnhancedGovernance/DelegateDiscovery/DelegateSearch'
import DelegateLeaderboard from '@/components/ui/EnhancedGovernance/DelegateDiscovery/DelegateLeaderboard'

// Mock data - Replace with actual API data
const mockDelegates = [
  {
    address: '0x1234567890abcdef1234567890abcdef12345678',
    name: 'Alice Finance',
    veFxs: 1500000,
    delegators: 128,
    proposals: 45,
    successRate: 92,
  },
  {
    address: '0xabcdef1234567890abcdef1234567890abcdef12',
    name: 'Bob\'s Governance',
    veFxs: 1200000,
    delegators: 95,
    proposals: 38,
    successRate: 89,
  },
  {
    address: '0x7890abcdef1234567890abcdef1234567890abcd',
    name: 'Carol Ventures',
    veFxs: 900000,
    delegators: 76,
    proposals: 29,
    successRate: 86,
  },
  {
    address: '0xdef1234567890abcdef1234567890abcdef12345',
    name: 'Dave Protocol',
    veFxs: 750000,
    delegators: 64,
    proposals: 25,
    successRate: 84,
  },
  {
    address: '0x567890abcdef1234567890abcdef1234567890ab',
    name: 'Eve Capital',
    veFxs: 600000,
    delegators: 52,
    proposals: 20,
    successRate: 85,
  },
]

export default function DelegateDiscoveryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [delegates] = useState(mockDelegates)

  const filteredDelegates = delegates.filter((delegate) => {
    const searchLower = searchQuery.toLowerCase()
    return (
      delegate.name.toLowerCase().includes(searchLower) ||
      delegate.address.toLowerCase().includes(searchLower)
    )
  })

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <h1 className="mb-6 text-3xl font-bold text-text-primary">
            Delegate Discovery
          </h1>
          <div className="mb-6">
            <DelegateSearch onSearch={setSearchQuery} />
          </div>
          <div className="space-y-4">
            {filteredDelegates.map((delegate) => (
              <div
                key={delegate.address}
                className="rounded-lg border border-border-subtle bg-bg-card p-4 hover:border-accent-primary transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-text-primary">
                      {delegate.name}
                    </h2>
                    <p className="text-sm text-text-secondary">{delegate.address}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-medium text-accent-primary">
                      {delegate.veFxs.toLocaleString()} veFXS
                    </div>
                    <div className="text-sm text-text-secondary">
                      {delegate.delegators} delegators
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-text-secondary">
                  <div>
                    <span className="font-medium">{delegate.proposals}</span>{' '}
                    proposals submitted
                  </div>
                  <div>
                    <span className="font-medium">{delegate.successRate}%</span>{' '}
                    success rate
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <DelegateLeaderboard delegates={delegates} />
        </div>
      </div>
    </div>
  )
}
