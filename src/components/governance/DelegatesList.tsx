import { useState } from 'react'
import Image from 'next/image'

// Mock data for delegates
const topDelegates = [
  {
    id: 1,
    name: 'Frax Whale',
    address: '0x1234...5678',
    votingPower: '2.1M FRAX',
    proposals: 24,
    successRate: '95%',
    imageUrl: 'https://api.dicebear.com/7.x/personas/svg?seed=fraxwhale',
    description: 'Long-term Frax advocate and governance participant. Focus on protocol growth and stability.'
  },
  {
    id: 2,
    name: 'DeFi Guru',
    address: '0x8765...4321',
    votingPower: '1.8M FRAX',
    proposals: 18,
    successRate: '92%',
    imageUrl: 'https://api.dicebear.com/7.x/personas/svg?seed=defiguru',
    description: 'DeFi researcher and active governance participant across multiple protocols.'
  },
  {
    id: 3,
    name: 'Governance Pro',
    address: '0x9876...2345',
    votingPower: '1.5M FRAX',
    proposals: 15,
    successRate: '89%',
    imageUrl: 'https://api.dicebear.com/7.x/personas/svg?seed=govpro',
    description: 'Focused on improving protocol governance and community engagement.'
  }
]

export default function DelegatesList() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDelegate, setSelectedDelegate] = useState<typeof topDelegates[0] | null>(null)

  const filteredDelegates = topDelegates.filter(delegate =>
    delegate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    delegate.address.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search delegates by name or address..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-border-subtle bg-bg-card px-4 py-2 
                   text-sm text-text-primary placeholder-text-tertiary outline-none 
                   transition-colors duration-200 focus:border-accent-primary"
        />
        <svg
          className="absolute right-3 top-2.5 h-4 w-4 text-text-tertiary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Delegates List */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDelegates.map((delegate) => (
          <button
            key={delegate.id}
            onClick={() => setSelectedDelegate(delegate)}
            className="group relative overflow-hidden rounded-lg border border-border-subtle 
                     bg-bg-card p-4 text-left transition-all duration-200 
                     hover:border-accent-primary/20 hover:bg-bg-card/80"
          >
            <div className="flex items-start space-x-4">
              {/* Profile Picture */}
              <div className="relative h-12 w-12 overflow-hidden rounded-full 
                            border border-border-subtle bg-bg-card">
                <Image
                  src={delegate.imageUrl}
                  alt={delegate.name}
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Delegate Info */}
              <div className="flex-1 space-y-1">
                <h4 className="font-medium text-text-primary">{delegate.name}</h4>
                <p className="text-sm text-text-secondary">{delegate.address}</p>
                <div className="mt-2 flex items-center space-x-4 text-sm">
                  <span className="text-accent-primary">{delegate.votingPower}</span>
                  <span className="text-text-tertiary">{delegate.proposals} proposals</span>
                  <span className="text-text-tertiary">{delegate.successRate} success</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="mt-3 text-sm text-text-secondary line-clamp-2">
              {delegate.description}
            </p>

            {/* Hover Effect */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent-primary/5 
                         to-transparent opacity-0 transition-opacity duration-200 
                         group-hover:opacity-100" />
          </button>
        ))}
      </div>

      {/* Selected Delegate Modal */}
      {selectedDelegate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-lg rounded-lg bg-bg-card p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <Image
                  src={selectedDelegate.imageUrl}
                  alt={selectedDelegate.name}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
                <div>
                  <h3 className="text-xl font-medium text-text-primary">
                    {selectedDelegate.name}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {selectedDelegate.address}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedDelegate(null)}
                className="rounded-full p-1 text-text-tertiary hover:bg-bg-card/80 
                         hover:text-text-secondary"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-6 space-y-4">
              <p className="text-text-secondary">{selectedDelegate.description}</p>
              <div className="grid grid-cols-3 gap-4 rounded-lg bg-bg-dark p-4">
                <div>
                  <p className="text-sm text-text-tertiary">Voting Power</p>
                  <p className="text-lg font-medium text-accent-primary">
                    {selectedDelegate.votingPower}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-text-tertiary">Proposals</p>
                  <p className="text-lg font-medium text-text-primary">
                    {selectedDelegate.proposals}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-text-tertiary">Success Rate</p>
                  <p className="text-lg font-medium text-text-primary">
                    {selectedDelegate.successRate}
                  </p>
                </div>
              </div>
              <button
                className="w-full rounded-lg bg-accent-primary px-4 py-2 text-sm 
                         font-medium text-white transition-colors duration-200 
                         hover:bg-accent-muted"
              >
                Delegate Votes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
