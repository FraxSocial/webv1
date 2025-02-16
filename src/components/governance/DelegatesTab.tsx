'use client'

import { motion } from 'framer-motion'
import DelegatesList from './DelegatesList'

export default function DelegatesTab() {
  return (
    <div className="space-y-6">
      {/* Search and Delegate List */}
      <DelegatesList />
    </div>
  )
}
