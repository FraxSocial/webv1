'use client'

interface FeatureCardProps {
  title: string
  description: string
  delay?: number
}

export default function FeatureCard({ title, description, delay = 0 }: FeatureCardProps) {
  return (
    <div 
      className="glass-card p-8 sm:p-10 rounded-xl group transform hover:scale-[1.02] transition-all duration-300
                 bg-gradient-to-br from-white/5 to-white/10 dark:from-gray-900/5 dark:to-gray-900/10"
      style={{ 
        animationDelay: `${delay}s`,
        animation: 'float 6s ease-in-out infinite'
      }}
    >
      <h3 className="text-xl sm:text-2xl font-semibold mb-4 gradient-text group-hover:opacity-90">
        {title}
      </h3>
      <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed">
        {description}
      </p>
    </div>
  )
}
