'use client'

interface FeatureCardProps {
  title: string
  description: string
  icon: string
}

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="group relative rounded-lg border border-border-subtle bg-bg-card p-6
                    transition-all duration-300 hover:border-border-strong hover:bg-bg-hover">
      <div className="space-y-4">
        {/* Icon */}
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-md
                      bg-bg-hover text-xl text-accent-primary">
          {icon}
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-text-primary">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-text-secondary">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
