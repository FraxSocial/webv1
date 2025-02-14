'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface TickerItem {
  label: string
  value: string
  change: string
  isPositive: boolean
}

export default function RotatingTicker() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [tickerItems] = useState<TickerItem[]>([
    {
      label: 'FXS Price',
      value: '$12.45',
      change: '+5.2%',
      isPositive: true
    },
    {
      label: 'Total veFXS',
      value: '12.5M',
      change: '+3.1%',
      isPositive: true
    },
    {
      label: 'Proposals Active',
      value: '8',
      change: '+2',
      isPositive: true
    },
    {
      label: 'Governance TVL',
      value: '$245M',
      change: '-1.2%',
      isPositive: false
    }
  ])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((current) => 
        current === tickerItems.length - 1 ? 0 : current + 1
      )
    }, 3000)

    return () => clearInterval(timer)
  }, [tickerItems.length])

  return (
    <div className="bg-bg-card border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-center space-x-6"
          >
            <div className="flex items-center space-x-2">
              <span className="text-sm text-text-secondary">
                {tickerItems[currentIndex].label}:
              </span>
              <span className="text-sm font-medium text-text-primary">
                {tickerItems[currentIndex].value}
              </span>
              <div className={`flex items-center space-x-1 ${
                tickerItems[currentIndex].isPositive ? 'text-green-500' : 'text-red-500'
              }`}>
                {tickerItems[currentIndex].isPositive ? 
                  <TrendingUp className="h-3 w-3" /> : 
                  <TrendingDown className="h-3 w-3" />
                }
                <span className="text-xs font-medium">
                  {tickerItems[currentIndex].change}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="ml-auto flex items-center space-x-1">
          {tickerItems.map((_, index) => (
            <div
              key={index}
              className={`h-1 w-1 rounded-full transition-colors duration-300 ${
                index === currentIndex ? 'bg-accent-primary' : 'bg-border-subtle'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
