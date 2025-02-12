'use client'

import { useState, useEffect } from 'react'
import { PieChart, BarChart, Activity, Users, ThumbsUp, ThumbsDown } from 'lucide-react'

interface Proposal {
  id: string
  title: string
  description: string
  status: 'active' | 'passed' | 'failed' | 'pending'
  votesFor: number
  votesAgainst: number
  quorum: number
  endTime: Date
  creator: string
}

interface DelegateInfo {
  address: string
  name: string
  votingPower: number
  proposalsVoted: number
}

export default function GovernanceDashboard() {
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [topDelegates, setTopDelegates] = useState<DelegateInfo[]>([])
  const [userVotingPower, setUserVotingPower] = useState(0)
  const [votingHistory, setVotingHistory] = useState({ participated: 0, total: 0 })

  useEffect(() => {
    // Mock data
    const mockProposals: Proposal[] = [
      {
        id: '1',
        title: 'FIP-89: Adjust collateral ratio for frxETH',
        description: 'Proposal to adjust the collateral ratio for frxETH from 110% to 115%',
        status: 'active',
        votesFor: 750000,
        votesAgainst: 250000,
        quorum: 1000000,
        endTime: new Date(Date.now() + 86400000 * 3), // 3 days from now
        creator: 'frax.eth'
      },
      {
        id: '2',
        title: 'FIP-90: Add new AMO',
        description: 'Add Curve V2 pool as a new algorithmic market operations controller',
        status: 'passed',
        votesFor: 1200000,
        votesAgainst: 300000,
        quorum: 1000000,
        endTime: new Date(Date.now() - 86400000), // 1 day ago
        creator: 'fraxgov.eth'
      }
    ]
    setProposals(mockProposals)

    const mockDelegates: DelegateInfo[] = [
      {
        address: '0x1234...5678',
        name: 'FraxWhale.eth',
        votingPower: 2500000,
        proposalsVoted: 45
      },
      {
        address: '0x8765...4321',
        name: 'FraxGov.eth',
        votingPower: 1800000,
        proposalsVoted: 38
      }
    ]
    setTopDelegates(mockDelegates)

    setUserVotingPower(50000)
    setVotingHistory({ participated: 15, total: 20 })
  }, [])

  return (
    <div className="space-y-6">
      {/* User Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-lg p-4
                    border border-border-subtle-light dark:border-border-subtle
                    bg-bg-card-light dark:bg-bg-card">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-text-secondary-light dark:text-text-secondary">
              Voting Power
            </h3>
            <Activity className="h-5 w-5 text-accent-primary" />
          </div>
          <p className="mt-2 text-2xl font-bold text-text-primary-light dark:text-text-primary">
            {userVotingPower.toLocaleString()}
          </p>
        </div>
        <div className="rounded-lg p-4
                    border border-border-subtle-light dark:border-border-subtle
                    bg-bg-card-light dark:bg-bg-card">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-text-secondary-light dark:text-text-secondary">
              Participation Rate
            </h3>
            <PieChart className="h-5 w-5 text-accent-primary" />
          </div>
          <p className="mt-2 text-2xl font-bold text-text-primary-light dark:text-text-primary">
            {Math.round((votingHistory.participated / votingHistory.total) * 100)}%
          </p>
        </div>
        <div className="rounded-lg p-4
                    border border-border-subtle-light dark:border-border-subtle
                    bg-bg-card-light dark:bg-bg-card">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-text-secondary-light dark:text-text-secondary">
              Active Proposals
            </h3>
            <BarChart className="h-5 w-5 text-accent-primary" />
          </div>
          <p className="mt-2 text-2xl font-bold text-text-primary-light dark:text-text-primary">
            {proposals.filter(p => p.status === 'active').length}
          </p>
        </div>
        <div className="rounded-lg p-4
                    border border-border-subtle-light dark:border-border-subtle
                    bg-bg-card-light dark:bg-bg-card">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-text-secondary-light dark:text-text-secondary">
              Top Delegates
            </h3>
            <Users className="h-5 w-5 text-accent-primary" />
          </div>
          <p className="mt-2 text-2xl font-bold text-text-primary-light dark:text-text-primary">
            {topDelegates.length}
          </p>
        </div>
      </div>

      {/* Active Proposals */}
      <div className="rounded-lg
                   border border-border-subtle-light dark:border-border-subtle
                   bg-bg-card-light dark:bg-bg-card">
        <div className="p-4 border-b border-border-subtle-light dark:border-border-subtle">
          <h2 className="text-lg font-semibold text-text-primary-light dark:text-text-primary">
            Active Proposals
          </h2>
        </div>
        <div className="divide-y divide-border-subtle-light dark:divide-border-subtle">
          {proposals.map(proposal => (
            <div key={proposal.id} className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-text-primary-light dark:text-text-primary">
                    {proposal.title}
                  </h3>
                  <p className="mt-1 text-sm text-text-secondary-light dark:text-text-secondary">
                    {proposal.description}
                  </p>
                  <div className="mt-2 flex items-center space-x-4 text-sm">
                    <span className="text-text-tertiary-light dark:text-text-tertiary">
                      By {proposal.creator}
                    </span>
                    <span className="text-text-tertiary-light dark:text-text-tertiary">
                      Ends {new Date(proposal.endTime).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <ThumbsUp className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-text-secondary-light dark:text-text-secondary">
                        {proposal.votesFor.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ThumbsDown className="h-4 w-4 text-red-400" />
                      <span className="text-sm text-text-secondary-light dark:text-text-secondary">
                        {proposal.votesAgainst.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <button className="rounded-lg px-4 py-2 text-sm font-medium text-white
                                   bg-accent-primary hover:bg-accent-muted-light dark:hover:bg-accent-muted">
                    Vote
                  </button>
                </div>
              </div>
              {/* Progress bar */}
              <div className="mt-4 h-2 w-full rounded-full
                           bg-bg-hover-light dark:bg-bg-darker">
                <div
                  className="h-full rounded-full bg-accent-primary"
                  style={{
                    width: `${(proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100}%`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Delegates */}
      <div className="rounded-lg
                   border border-border-subtle-light dark:border-border-subtle
                   bg-bg-card-light dark:bg-bg-card">
        <div className="p-4 border-b border-border-subtle-light dark:border-border-subtle">
          <h2 className="text-lg font-semibold text-text-primary-light dark:text-text-primary">
            Top Delegates
          </h2>
        </div>
        <div className="divide-y divide-border-subtle-light dark:divide-border-subtle">
          {topDelegates.map(delegate => (
            <div key={delegate.address} className="flex items-center justify-between p-4">
              <div>
                <h3 className="font-medium text-text-primary-light dark:text-text-primary">
                  {delegate.name}
                </h3>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary">
                  {delegate.address}
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-text-primary-light dark:text-text-primary">
                  {delegate.votingPower.toLocaleString()} VP
                </div>
                <div className="text-sm text-text-secondary-light dark:text-text-secondary">
                  {delegate.proposalsVoted} proposals voted
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
