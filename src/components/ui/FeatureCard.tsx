'use client'

interface FeatureCardProps {
  title: string
  description: string
  delay?: number
}

export default function FeatureCard({ title, description, delay = 0 }: FeatureCardProps) {
  return (
    <div 
      className="glass-card p-8 group"
      style={{ animationDelay: `${delay}s` }}
    >
      <h3 className="text-xl font-semibold mb-3 gradient-text group-hover:opacity-90">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 font-light">
        {description}
      </p>
    </div>
  )
}
