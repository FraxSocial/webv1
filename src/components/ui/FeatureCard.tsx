'use client'

interface FeatureCardProps {
  title: string
  description: string
  icon: string
}

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="group relative animate-fade-in rounded-lg p-6 transition-all duration-300 hover:-translate-y-1
                    border border-border-subtle-light dark:border-border-subtle
                    bg-bg-card-light dark:bg-bg-card
                    hover:border-accent-primary hover:shadow-accent">
      {/* Accent line */}
      <div className="absolute inset-x-0 -bottom-px h-px bg-accent-primary opacity-0
                    transition-opacity duration-300 group-hover:opacity-100" />

      <div className="space-y-4">
        {/* Icon with background effect */}
        <div className="relative inline-block">
          <div className="absolute -inset-2 rounded-lg bg-accent-primary/5 opacity-0
                        transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative flex h-12 w-12 items-center justify-center rounded-md text-xl
                        transition-transform duration-300 group-hover:scale-110
                        bg-bg-hover-light dark:bg-bg-hover
                        text-accent-primary
                        ring-1 ring-border-subtle-light dark:ring-border-subtle
                        group-hover:text-accent-primary group-hover:ring-accent-primary/30">
            {icon}
          </div>
        </div>

        {/* Content with hover effect */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium transition-colors duration-300
                       text-text-primary-light dark:text-text-primary
                       group-hover:text-accent-primary">
            {title}
          </h3>
          <p className="text-sm leading-relaxed transition-colors duration-300
                      text-text-secondary-light dark:text-text-secondary
                      group-hover:text-text-primary-light dark:group-hover:text-text-primary">
            {description}
          </p>
        </div>
      </div>

      {/* Subtle corner accents */}
      <div className="absolute -right-px -top-px h-8 w-px bg-accent-primary opacity-0
                    transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute -right-px -top-px h-px w-8 bg-accent-primary opacity-0
                    transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  )
}
