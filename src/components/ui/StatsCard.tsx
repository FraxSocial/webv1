'use client'

interface StatsCardProps {
  label: string
  value: string
  delay?: number
}

export default function StatsCard({ label, value, delay = 0 }: StatsCardProps) {
  return (
    <div 
      className="glass-card p-8 sm:p-10 text-center transform hover:scale-[1.02] transition-all duration-300
                 bg-gradient-to-br from-white/5 to-white/10 dark:from-gray-900/5 dark:to-gray-900/10"
      style={{ 
        animationDelay: `${delay}s`,
        animation: 'float 6s ease-in-out infinite'
      }}
    >
      <div className="text-4xl sm:text-5xl font-bold gradient-text mb-3">{value}</div>
      <div className="text-base sm:text-lg text-gray-600 dark:text-gray-400 font-medium tracking-wide">
        {label}
      </div>
    </div>
  )
}
