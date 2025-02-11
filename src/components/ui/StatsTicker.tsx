'use client'

interface Stat {
  label: string
  value: string
  change: string
}

const liveStats: Stat[] = [
  { label: 'FRAX Price', value: '$1.00', change: '+0.01%' },
  { label: '24h Volume', value: '$245.8M', change: '+12.4%' },
  { label: 'Total Locked', value: '$2.1B', change: '+5.2%' },
  { label: 'Holders', value: '142,856', change: '+1.2%' },
  { label: 'Market Cap', value: '$1.45B', change: '+3.4%' },
]

export default function StatsTicker() {
  return (
    <div className="relative overflow-hidden border-b border-border-subtle bg-bg-darker py-2">
      {/* Edge fade effects */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 
                    bg-gradient-to-r from-bg-darker via-bg-darker to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 
                    bg-gradient-to-l from-bg-darker via-bg-darker to-transparent" />

      {/* Scrolling content */}
      <div className="animate-[ticker_30s_linear_infinite] flex items-center whitespace-nowrap">
        {/* Duplicate the stats twice to create seamless loop */}
        {[...liveStats, ...liveStats].map((stat, i) => (
          <div 
            key={i}
            className="mx-8 flex items-center space-x-2 text-sm"
          >
            <span className="font-medium text-text-secondary">{stat.label}</span>
            <span className="text-text-primary">{stat.value}</span>
            <span className="text-accent-primary">
              {stat.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
