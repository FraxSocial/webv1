'use client'

interface StatsCardProps {
  label: string
  value: string
  delay?: number
}

export default function StatsCard({ label, value, delay = 0 }: StatsCardProps) {
  return (
    <div 
      className="glass-card p-6 text-center"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="text-2xl md:text-3xl font-bold gradient-text mb-2">{value}</div>
      <div className="text-gray-600 dark:text-gray-400 text-sm">{label}</div>
    </div>
  )
}
