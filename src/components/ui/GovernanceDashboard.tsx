'use client'

import { useState, useEffect } from 'react'
import { Shield, Rocket, Activity, Users, ThumbsUp, ThumbsDown, Clock, AlertCircle } from 'lucide-react'
import { Tab } from '@headlessui/react'
import { motion } from 'framer-motion'
import DelegatesTab from '@/components/governance/DelegatesTab'
import DelegatesList from '@/components/governance/DelegatesList'

interface BaseProposal {
  id: string
  title: string
  description: string
  status: 'active' | 'passed' | 'failed' | 'pending' | 'vetoed'
  votesFor: number
  votesAgainst: number
  quorum: number
  endTime: Date
  creator: string
  executionTime?: Date
  type: 'alpha' | 'omega'
}

interface AlphaProposal extends BaseProposal {
  type: 'alpha'
  proposalThreshold: number
  votingDelay: number
  votingPeriod: number
}

interface OmegaProposal extends BaseProposal {
  type: 'omega'
  vetoThreshold: number
  timelock: number
  isOptimistic: boolean
}

type Proposal = AlphaProposal | OmegaProposal



interface UserStats {
  votingPower: number
  delegatedPower: number
  proposalsParticipated: number
  totalProposals: number
  currentDelegate?: string
  isDelegate: boolean
}

export default function GovernanceDashboard() {
  const [selectedTab, setSelectedTab] = useState(0)
  const [proposals, setProposals] = useState<Proposal[]>([])

  const [userStats, setUserStats] = useState<UserStats>({
    votingPower: 0,
    delegatedPower: 0,
    proposalsParticipated: 0,
    totalProposals: 0,
    isDelegate: false
  })

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
        endTime: new Date(Date.now() + 86400000 * 3),
        creator: 'frax.eth',
        type: 'alpha',
        proposalThreshold: 100000,
        votingDelay: 1,
        votingPeriod: 7
      },
      {
        id: '2',
        title: 'FIP-90: Deploy Frax on Optimism',
        description: 'Team proposal to deploy Frax protocol on Optimism L2',
        status: 'active',
        votesFor: 200000,
        votesAgainst: 50000,
        quorum: 500000,
        endTime: new Date(Date.now() + 86400000 * 5),
        creator: 'fraxteam.eth',
        type: 'omega',
        vetoThreshold: 400000,
        timelock: 2,
        isOptimistic: true
      }
    ]
    setProposals(mockProposals)

    const mockDelegates: DelegateInfo[] = [
      {
        address: '0x1234...5678',
        name: 'FraxWhale.eth',
        votingPower: 2500000,
        proposalsVoted: 45,
        delegatedAmount: 1500000,
        delegators: 120
      },
      {
        address: '0x8765...4321',
        name: 'FraxTeam.eth',
        votingPower: 1800000,
        proposalsVoted: 38,
        delegatedAmount: 1000000,
        delegators: 85,
        isTeamMember: true
      }
    ]
    setTopDelegates(mockDelegates)

    setUserStats({
      votingPower: 50000,
      delegatedPower: 10000,
      proposalsParticipated: 15,
      totalProposals: 20,
      currentDelegate: 'FraxWhale.eth',
      isDelegate: false
    })
  }, [])

  return (
    <div className="space-y-6 p-4">
      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        {/* Header with Tabs */}
        <div className="border-b border-border-subtle">
          <Tab.List className="flex space-x-8">
            <Tab className={({ selected }) =>
              `pb-4 text-sm font-medium outline-none ${
                selected 
                  ? 'border-b-2 border-accent-primary text-text-primary' 
                  : 'text-text-secondary hover:text-text-primary'
              }`
            }>
              Overview
            </Tab>
            <Tab className={({ selected }) =>
              `pb-4 text-sm font-medium outline-none ${
                selected 
                  ? 'border-b-2 border-accent-primary text-text-primary' 
                  : 'text-text-secondary hover:text-text-primary'
              }`
            }>
              Proposals
            </Tab>
            <Tab className={({ selected }) =>
              `pb-4 text-sm font-medium outline-none ${
                selected 
                  ? 'border-b-2 border-accent-primary text-text-primary' 
                  : 'text-text-secondary hover:text-text-primary'
              }`
            }>
              Delegates
            </Tab>
          </Tab.List>
        </div>

      <Tab.Panels>
        <Tab.Panel>
          {/* Overview Panel */}
          <div className="space-y-6">
            {/* User Stats */}
            <div className="grid grid-cols-4 gap-4">
              <div className="rounded-lg p-4 border border-border-subtle bg-bg-card">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-text-secondary">
                    Total Voting Power
                  </h3>
                  <Activity className="h-5 w-5 text-accent-primary" />
                </div>
                <p className="mt-2 text-2xl font-bold text-text-primary">
                  {userStats.votingPower.toLocaleString()} veFXS
                </p>
                {userStats.currentDelegate && (
                  <p className="mt-1 text-sm text-text-secondary">
                    Delegated to: {userStats.currentDelegate}
                  </p>
                )}
              </div>

              <div className="rounded-lg p-4 border border-border-subtle bg-bg-card">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-text-secondary">
                    Delegated Power
                  </h3>
                  <Users className="h-5 w-5 text-accent-primary" />
                </div>
                <p className="mt-2 text-2xl font-bold text-text-primary">
                  {userStats.delegatedPower.toLocaleString()} veFXS
                </p>
                <p className="mt-1 text-sm text-text-secondary">
                  {userStats.isDelegate ? `From ${userStats.delegators || 0} delegators` : 'Not a delegate'}
                </p>
              </div>

              <div className="rounded-lg p-4 border border-border-subtle bg-bg-card">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-text-secondary">
                    Participation Rate
                  </h3>
                  <ThumbsUp className="h-5 w-5 text-accent-primary" />
                </div>
                <p className="mt-2 text-2xl font-bold text-text-primary">
                  {Math.round((userStats.proposalsParticipated / userStats.totalProposals) * 100)}%
                </p>
                <p className="mt-1 text-sm text-text-secondary">
                  {userStats.proposalsParticipated} of {userStats.totalProposals} proposals
                </p>
              </div>

              <div className="rounded-lg p-4 border border-border-subtle bg-bg-card">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-text-secondary">
                    Active Proposals
                  </h3>
                  <AlertCircle className="h-5 w-5 text-accent-primary" />
                </div>
                <p className="mt-2 text-2xl font-bold text-text-primary">
                  {proposals.filter(p => p.status === 'active').length}
                </p>
                <p className="mt-1 text-sm text-text-secondary">
                  Requires your attention
                </p>
              </div>
            </div>

            {/* Governance Overview */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg p-6 border border-border-subtle bg-bg-card">
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="h-6 w-6 text-accent-primary" />
                  <h3 className="text-lg font-semibold text-text-primary">FraxGovernorAlpha</h3>
                </div>
                <p className="text-sm text-text-secondary mb-4">
                  High-security governance for critical protocol changes. Requires high quorum and careful deliberation.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Proposal Threshold</span>
                    <span className="text-text-primary">100,000 veFXS</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Voting Delay</span>
                    <span className="text-text-primary">1 day</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Voting Period</span>
                    <span className="text-text-primary">7 days</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-6 border border-border-subtle bg-bg-card">
                <div className="flex items-center space-x-3 mb-4">
                  <Rocket className="h-6 w-6 text-accent-primary" />
                  <h3 className="text-lg font-semibold text-text-primary">FraxGovernorOmega</h3>
                </div>
                <p className="text-sm text-text-secondary mb-4">
                  Optimistic governance for team operations. Proposals pass by default unless vetoed by the community.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Veto Threshold</span>
                    <span className="text-text-primary">400,000 veFXS</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Timelock</span>
                    <span className="text-text-primary">2 days</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Type</span>
                    <span className="text-text-primary">Optimistic</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Tab.Panel>

        <Tab.Panel>
          {/* Proposals Panel */}
          <div className="space-y-4">
            {proposals.map((proposal) => (
              <motion.div
                key={proposal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg p-6 border border-border-subtle bg-bg-card"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-3">
                      {proposal.type === 'alpha' ? (
                        <Shield className="h-5 w-5 text-accent-primary" />
                      ) : (
                        <Rocket className="h-5 w-5 text-accent-primary" />
                      )}
                      <h3 className="text-lg font-semibold text-text-primary">{proposal.title}</h3>
                    </div>
                    <p className="mt-2 text-sm text-text-secondary">{proposal.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      proposal.status === 'active' ? 'bg-green-100 text-green-800' :
                      proposal.status === 'passed' ? 'bg-blue-100 text-blue-800' :
                      proposal.status === 'failed' ? 'bg-red-100 text-red-800' :
                      proposal.status === 'vetoed' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="flex items-center space-x-1 text-text-secondary">
                      <ThumbsUp className="h-4 w-4" />
                      <span>For</span>
                    </div>
                    <p className="mt-1 font-medium text-text-primary">
                      {proposal.votesFor.toLocaleString()} veFXS
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-1 text-text-secondary">
                      <ThumbsDown className="h-4 w-4" />
                      <span>Against</span>
                    </div>
                    <p className="mt-1 font-medium text-text-primary">
                      {proposal.votesAgainst.toLocaleString()} veFXS
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-1 text-text-secondary">
                      <Clock className="h-4 w-4" />
                      <span>Time Remaining</span>
                    </div>
                    <p className="mt-1 font-medium text-text-primary">
                      {Math.ceil((proposal.endTime.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days
                    </p>
                  </div>
                </div>

                {'proposalThreshold' in proposal && (
                  <div className="mt-4 text-xs text-text-secondary">
                    Requires {proposal.proposalThreshold.toLocaleString()} veFXS to propose
                  </div>
                )}
                {'vetoThreshold' in proposal && (
                  <div className="mt-4 text-xs text-text-secondary">
                    Requires {proposal.vetoThreshold.toLocaleString()} veFXS to veto
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </Tab.Panel>

        <Tab.Panel>
          {/* Delegates Panel */}
          <DelegatesTab />
        </Tab.Panel>
      </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
