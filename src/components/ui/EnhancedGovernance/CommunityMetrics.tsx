'use client'

import { Users, Vote, MessageSquare, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CommunityMetrics() {
  const metrics = [
    {
      title: 'Active Delegates',
      value: '156',
      change: '+12%',
      isPositive: true,
      icon: Users
    },
    {
      title: 'Voter Turnout',
      value: '73%',
      change: '+5%',
      isPositive: true,
      icon: Vote
    },
    {
      title: 'Proposal Comments',
      value: '2.4k',
      change: '+28%',
      isPositive: true,
      icon: MessageSquare
    },
    {
      title: 'Total veFXS',
      value: '12.5M',
      change: '+3%',
      isPositive: true,
      icon: TrendingUp
    }
  ]

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800/60 bg-white dark:bg-[#111] p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Community Metrics</h2>
        <select className="text-sm text-gray-600 dark:text-gray-400 bg-transparent border-none outline-none">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
        </select>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <div className="absolute -top-2 -right-2">
              <metric.icon className="h-12 w-12 text-blue-500 dark:text-blue-400 opacity-10" />
            </div>
            <div>
              <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-1">{metric.title}</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
              <div className={`flex items-center mt-2 text-sm ${
                metric.isPositive ? 'text-green-500' : 'text-red-500'
              }`}>
                <span>{metric.change}</span>
                <svg
                  className={`h-4 w-4 ml-1 ${metric.isPositive ? '' : 'transform rotate-180'}`}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 15l7-7 7 7" />
                </svg>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mini Charts */}
      <div className="grid grid-cols-4 gap-6 mt-6">
        {metrics.map((metric, index) => (
          <div key={`chart-${index}`} className="h-16">
            <motion.div
              className="h-full flex items-end space-x-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="flex-1 bg-blue-500/20 dark:bg-blue-400/20 rounded-t"
                  initial={{ height: '20%' }}
                  animate={{ height: `${20 + Math.random() * 80}%` }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                />
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  )
}
