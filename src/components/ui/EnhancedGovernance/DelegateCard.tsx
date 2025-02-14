'use client'

import { Users, Award, ThumbsUp } from 'lucide-react'
import { motion } from 'framer-motion'

interface DelegateCardProps {
  delegate: {
    name: string
    address: string
    votingPower: string
    delegators: number
    proposalsVoted: number
    successRate: number
  }
}

const mockDelegate = {
  name: 'frax.eth',
  address: '0x1234...5678',
  votingPower: '250k',
  delegators: 128,
  proposalsVoted: 45,
  successRate: 92
}

export default function DelegateCard({ delegate = mockDelegate }: Partial<DelegateCardProps>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-gray-200 dark:border-gray-800/60 bg-white dark:bg-[#111] p-4 hover:border-blue-500/20 transition-colors"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white">{delegate.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{delegate.address}</p>
        </div>
        <div className="flex items-center space-x-1 text-blue-500 dark:text-blue-400">
          <Award className="h-4 w-4" />
          <span className="text-xs font-medium">Top Delegate</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div>
          <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 mb-1">
            <Users className="h-4 w-4" />
            <span className="text-xs">Delegators</span>
          </div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">{delegate.delegators}</p>
        </div>
        <div>
          <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 mb-1">
            <ThumbsUp className="h-4 w-4" />
            <span className="text-xs">Proposals</span>
          </div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">{delegate.proposalsVoted}</p>
        </div>
        <div>
          <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 mb-1">
            <span className="text-xs">Success</span>
          </div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">{delegate.successRate}%</p>
        </div>
      </div>

      <div className="mt-4">
        <button className="w-full px-4 py-2 bg-blue-500/10 dark:bg-blue-400/10 text-blue-500 dark:text-blue-400 rounded-lg hover:bg-blue-500/20 dark:hover:bg-blue-400/20 transition-colors text-sm font-medium">
          Delegate Votes
        </button>
      </div>
    </motion.div>
  )
}
