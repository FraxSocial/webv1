'use client'

import { MessageSquare, ThumbsUp, Users, Flame } from 'lucide-react'
import { motion } from 'framer-motion'

interface Discussion {
  id: string
  title: string
  author: string
  authorType: 'delegate' | 'team' | 'user'
  timestamp: string
  category: string
  replies: number
  likes: number
  participants: number
  hot: boolean
}

export default function TrendingDiscussions() {
  const discussions: Discussion[] = [
    {
      id: '1',
      title: 'Proposal: Expanding Frax to Layer 2 Solutions',
      author: 'FraxWhale.eth',
      authorType: 'delegate',
      timestamp: '2h ago',
      category: 'Development',
      replies: 34,
      likes: 156,
      participants: 45,
      hot: true
    },
    {
      id: '2',
      title: 'Community Call Summary: February Week 2',
      author: 'FraxTeam',
      authorType: 'team',
      timestamp: '5h ago',
      category: 'Community',
      replies: 12,
      likes: 89,
      participants: 23,
      hot: false
    },
    {
      id: '3',
      title: 'Analyzing Recent Market Movements',
      author: 'CryptoAnalyst.eth',
      authorType: 'user',
      timestamp: '8h ago',
      category: 'Market',
      replies: 67,
      likes: 234,
      participants: 78,
      hot: true
    }
  ]

  return (
    <div className="rounded-lg border border-border-subtle bg-bg-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold text-text-primary">Trending Discussions</h2>
          <span className="px-2 py-1 text-xs font-medium bg-accent-primary/10 text-accent-primary rounded-full">
            Live
          </span>
        </div>
        <button className="text-sm text-accent-primary hover:text-accent-primary-dark">
          View All →
        </button>
      </div>

      <div className="space-y-4">
        {discussions.map((discussion, index) => (
          <motion.div
            key={discussion.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-lg hover:bg-bg-subtle transition-colors cursor-pointer group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    discussion.category === 'Development' ? 'bg-purple-100 text-purple-800' :
                    discussion.category === 'Community' ? 'bg-green-100 text-green-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {discussion.category}
                  </span>
                  {discussion.hot && (
                    <span className="flex items-center space-x-1 px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                      <Flame className="h-3 w-3" />
                      <span>Hot</span>
                    </span>
                  )}
                </div>
                <h3 className="font-medium text-text-primary group-hover:text-accent-primary transition-colors">
                  {discussion.title}
                </h3>
                <div className="flex items-center space-x-2 mt-2 text-sm text-text-secondary">
                  <span className={`font-medium ${
                    discussion.authorType === 'delegate' ? 'text-accent-primary' :
                    discussion.authorType === 'team' ? 'text-blue-500' :
                    'text-text-primary'
                  }`}>
                    {discussion.author}
                  </span>
                  <span>·</span>
                  <span>{discussion.timestamp}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6 mt-4 text-sm text-text-secondary">
              <div className="flex items-center space-x-1">
                <MessageSquare className="h-4 w-4" />
                <span>{discussion.replies}</span>
              </div>
              <div className="flex items-center space-x-1">
                <ThumbsUp className="h-4 w-4" />
                <span>{discussion.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{discussion.participants} participants</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Post */}
      <div className="mt-6 pt-6 border-t border-border-subtle">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Start a new discussion..."
            className="flex-1 px-4 py-2 rounded-lg bg-bg-subtle text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-primary/20"
          />
          <button className="px-4 py-2 bg-accent-primary text-white rounded-lg hover:bg-accent-primary-dark transition-colors">
            Post
          </button>
        </div>
      </div>
    </div>
  )
}
