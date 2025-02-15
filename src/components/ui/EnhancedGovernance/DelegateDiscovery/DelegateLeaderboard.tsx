'use client'

import { Trophy, TrendingUp, Users } from 'lucide-react'
import { formatNumber } from '@/lib/utils'

interface Delegate {
  address: string
  name: string
  veFxs: number
  delegators: number
  proposals: number
  successRate: number
}

interface DelegateLeaderboardProps {
  delegates: Delegate[]
}

export default function DelegateLeaderboard({ delegates }: DelegateLeaderboardProps) {
  return (
    <div className="rounded-lg border border-border-subtle bg-bg-card">
      <div className="border-b border-border-subtle p-4">
        <div className="flex items-center">
          <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
          <h2 className="text-lg font-semibold text-text-primary">Top Delegates</h2>
        </div>
      </div>
      <div className="divide-y divide-border-subtle">
        {delegates.map((delegate, index) => (
          <div
            key={delegate.address}
            className="flex items-center justify-between p-4 hover:bg-bg-subtle transition-colors duration-200"
          >
            <div className="flex items-center space-x-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-primary/10 text-accent-primary font-semibold">
                {index + 1}
              </div>
              <div>
                <h3 className="font-medium text-text-primary">{delegate.name}</h3>
                <p className="text-sm text-text-secondary truncate max-w-[200px]">
                  {delegate.address}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="flex items-center text-text-secondary">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  <span>{formatNumber(delegate.veFxs)} veFXS</span>
                </div>
                <div className="flex items-center text-sm text-text-tertiary">
                  <Users className="mr-1 h-3 w-3" />
                  <span>{delegate.delegators} delegators</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-text-secondary">
                  {delegate.proposals} proposals
                </div>
                <div className="text-sm text-text-tertiary">
                  {delegate.successRate}% success
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
