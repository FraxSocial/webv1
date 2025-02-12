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
                 bg-gradient-to-br from-bg-hover-light/50 to-bg-hover-light/80
                 dark:from-white/5 dark:to-white/10
                 border border-border-subtle-light dark:border-border-subtle"
      style={{ 
        animationDelay: `${delay}s`,
        animation: 'float 6s ease-in-out infinite'
      }}
    >
      <div className="text-4xl sm:text-5xl font-bold mb-3
                   text-text-primary-light dark:text-text-primary">
        {value}
      </div>
      <div className="text-base sm:text-lg font-medium tracking-wide
                   text-text-secondary-light dark:text-text-secondary">
        {label}
      </div>
    </div>
  )
}
