'use client'

import { Activity, TrendingUp, Users } from 'lucide-react'
import { motion } from 'framer-motion'

export default function VotingPowerCard() {
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800/60 bg-white dark:bg-[#111] overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Your Voting Power</h2>
          <button className="text-sm text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300">
            Boost Power →
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="h-5 w-5 text-blue-500 dark:text-blue-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Current Power</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">50,000</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">veFXS</p>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span className="text-sm text-gray-600 dark:text-text-secondary">Potential Boost</span>
            </div>
            <p className="text-2xl font-bold text-green-500">+15,000</p>
            <p className="text-sm text-gray-600 dark:text-text-secondary mt-1">By locking FXS</p>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Users className="h-5 w-5 text-blue-500" />
              <span className="text-sm text-gray-600 dark:text-text-secondary">Delegated To You</span>
            </div>
            <p className="text-2xl font-bold text-blue-500">10,000</p>
            <p className="text-sm text-gray-600 dark:text-text-secondary mt-1">From 8 users</p>
          </div>
        </div>

        {/* Power Breakdown */}
        <div className="mt-6">
          <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden flex">
            <motion.div 
              className="bg-blue-500 dark:bg-blue-400"
              initial={{ width: 0 }}
              animate={{ width: '60%' }}
              transition={{ duration: 1 }}
            />
            <motion.div 
              className="bg-green-500"
              initial={{ width: 0 }}
              animate={{ width: '20%' }}
              transition={{ duration: 1, delay: 0.2 }}
            />
            <motion.div 
              className="bg-blue-500"
              initial={{ width: 0 }}
              animate={{ width: '20%' }}
              transition={{ duration: 1, delay: 0.4 }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-600 dark:text-text-secondary">
            <span>Base Power</span>
            <span>Boost</span>
            <span>Delegated</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 flex space-x-4">
          <button className="flex-1 px-4 py-2 bg-blue-500 dark:bg-blue-400 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-300 transition-colors">
            Lock More FXS
          </button>
          <button className="flex-1 px-4 py-2 border border-gray-200 dark:border-border-subtle text-gray-900 dark:text-text-primary rounded-lg hover:bg-gray-50 dark:hover:bg-bg-subtle transition-colors">
            Become a Delegate
          </button>
        </div>
      </div>

      {/* Educational Footer */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-[#0a0a0a] border-t border-gray-200 dark:border-gray-800/60">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">💡 Power Tips</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Lock your FXS for longer periods to increase your voting power. The longer you lock, the more power you get!
        </p>
      </div>
    </div>
  )
}
