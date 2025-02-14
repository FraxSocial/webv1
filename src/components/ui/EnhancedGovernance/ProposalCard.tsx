'use client'

import { ThumbsUp, ThumbsDown, Users, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

interface ProposalCardProps {
  proposal: {
    title: string
    description: string
    status: 'active' | 'passed' | 'failed' | 'pending'
    votesFor: number
    votesAgainst: number
    timeRemaining: string
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
    category: string
  }
}

const mockProposal = {
  title: 'FIP-X: Adjust Frax Staking Rewards',
  description: 'Proposal to adjust the staking rewards distribution to optimize protocol sustainability.',
  status: 'active' as const,
  votesFor: 1250000,
  votesAgainst: 450000,
  timeRemaining: '2 days',
  difficulty: 'Intermediate' as const,
  category: 'Protocol'
}

export default function ProposalCard({ proposal = mockProposal }: Partial<ProposalCardProps>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-gray-200 dark:border-gray-800/60 bg-white dark:bg-[#111] p-4 shadow-sm"
    >
      <div className="flex items-start space-x-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              proposal.status === 'active' ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
              proposal.status === 'passed' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
              proposal.status === 'failed' ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
              'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
            }`}>
              {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
            </span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              proposal.difficulty === 'Beginner' ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
              proposal.difficulty === 'Intermediate' ? 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
              'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400'
            }`}>
              {proposal.difficulty}
            </span>
            <span className="px-2 py-1 text-xs font-medium bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full">
              {proposal.category}
            </span>
          </div>
          <h3 className="font-medium text-gray-900 dark:text-white">{proposal.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{proposal.description}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="flex items-center space-x-2">
          <ThumbsUp className="h-4 w-4 text-green-500" />
          <span className="text-sm text-gray-600 dark:text-gray-400">{proposal.votesFor}</span>
        </div>
        <div className="flex items-center space-x-2">
          <ThumbsDown className="h-4 w-4 text-red-500" />
          <span className="text-sm text-gray-600 dark:text-gray-400">{proposal.votesAgainst}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          <span className="text-sm text-gray-600 dark:text-gray-400">{proposal.timeRemaining}</span>
        </div>
      </div>

      <div className="mt-4 flex space-x-4">
        <button className="flex-1 px-4 py-2 bg-blue-500 dark:bg-blue-400 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-300 transition-colors text-sm font-medium">
          Vote
        </button>
        <button className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-800/60 text-gray-900 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors text-sm font-medium">
          View Details
        </button>
      </div>
    </motion.div>
  )
}
