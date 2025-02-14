'use client'

import { useState, useEffect } from 'react'
import { Tab } from '@headlessui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Rocket, Activity, Users, ThumbsUp, ThumbsDown, Clock, AlertCircle, TrendingUp, MessageSquare, Share2, Award } from 'lucide-react'
import DelegateCard from './DelegateCard'
import ProposalCard from './ProposalCard'
import VotingPowerCard from './VotingPowerCard'
import CommunityMetrics from './CommunityMetrics'
import TrendingDiscussions from './TrendingDiscussions'

interface BaseProposal {
  id: string
  title: string
  description: string
  proposer: string
  status: 'active' | 'passed' | 'failed' | 'pending'
  startTime: Date
  endTime: Date
  votesFor: number
  votesAgainst: number
  quorum: number
  discussions: Discussion[]
  delegateVotes: DelegateVote[]
  communityFeedback: number
  category: 'Protocol' | 'Treasury' | 'Governance' | 'Community' | 'Development'
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  impact: 'Low' | 'Medium' | 'High' | 'Critical'
  resources: Resource[]
}

interface Discussion {
  id: string
  author: string
  content: string
  timestamp: Date
  likes: number
  replies: number
  authorIsDelegate: boolean
  authorVotingPower: number
}

interface Resource {
  type: 'Article' | 'Video' | 'Forum' | 'Documentation'
  title: string
  url: string
  description: string
}

interface DelegateVote {
  delegate: string
  vote: 'for' | 'against' | 'abstain'
  votingPower: number
  reasoning: string
  timestamp: Date
}

interface DelegateProfile extends DelegateInfo {
  expertise: string[]
  votingHistory: {
    category: string
    votes: number
    alignment: number
  }[]
  contributions: {
    type: string
    count: number
    impact: number
  }[]
  socialLinks: {
    platform: string
    handle: string
  }[]
  activeTime: string
  responseRate: number
  delegatorGrowth: number[]
  recentActivity: {
    type: 'vote' | 'comment' | 'delegate' | 'proposal'
    description: string
    timestamp: Date
  }[]
}

import Header from './Header'

export default function EnhancedGovernance() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [userMetrics, setUserMetrics] = useState({
    proposalsParticipated: 15,
    commentsPosted: 23,
    delegationStreak: 45,
    reputationScore: 780,
    learningProgress: 65,
    communityRank: 'Rising Star'
  })

  // Effects after all state declarations
  useEffect(() => {
    setMounted(true)
  }, [])

  // Early return for client-side rendering
  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a]">
      <Header />
      <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
          <div className="border-b border-gray-200 dark:border-gray-800/60 mb-6">
            <Tab.List className="flex space-x-8">
              <Tab className={({ selected }) =>
                `pb-4 text-sm font-medium outline-none ${
                  selected 
                    ? 'border-b-2 border-blue-500 dark:border-blue-400 text-gray-900 dark:text-white' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`
              }>
                Overview
              </Tab>
              <Tab className={({ selected }) =>
                `pb-4 text-sm font-medium outline-none ${
                  selected 
                    ? 'border-b-2 border-blue-500 dark:border-blue-400 text-gray-900 dark:text-white' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`
              }>
                Active Proposals
              </Tab>
              <Tab className={({ selected }) =>
                `pb-4 text-sm font-medium outline-none ${
                  selected 
                    ? 'border-b-2 border-blue-500 dark:border-blue-400 text-gray-900 dark:text-white' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`
              }>
                Delegate Discovery
              </Tab>
            </Tab.List>
          </div>

        <Tab.Panels>
          <Tab.Panel>
            {/* Overview Panel */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="rounded-lg border border-gray-200 dark:border-gray-800/60 bg-white dark:bg-[#111] p-6 shadow-sm">
                <VotingPowerCard />
              </div>
              <div className="rounded-lg border border-gray-200 dark:border-gray-800/60 bg-white dark:bg-[#111] p-6 shadow-sm">
                <CommunityMetrics />
              </div>
              <div className="rounded-lg border border-gray-200 dark:border-gray-800/60 bg-white dark:bg-[#111] p-6 shadow-sm">
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900 dark:text-white">Your Stats</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Rank</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{userMetrics.communityRank}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Reputation</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{userMetrics.reputationScore} points</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Delegation Streak</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{userMetrics.delegationStreak} days</span>
                  </div>
                </div>
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            {/* Active Proposals Panel */}
            <div className="space-y-6">
              <ProposalCard />
            </div>
          </Tab.Panel>
          <Tab.Panel>
            {/* Delegate Discovery Panel */}
            <div className="space-y-6">
              <DelegateCard />
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      </main>
    </div>
  )
}
