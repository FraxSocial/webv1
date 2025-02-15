'use client'

import { ForumFilter, Language } from '@/types/forum'
import { Globe2, TrendingUp, Clock } from 'lucide-react'

interface ForumFiltersProps {
  filters: ForumFilter
  onFilterChange: (filters: Partial<ForumFilter>) => void
}

const languages: { code: Language; name: string }[] = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'zh', name: '中文' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
]

const sortOptions = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'controversial', label: 'Controversial' },
]

const timeFrameOptions = [
  { value: 'day', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'year', label: 'This Year' },
  { value: 'all', label: 'All Time' },
]

export default function ForumFilters({ filters, onFilterChange }: ForumFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-lg border border-border-subtle bg-bg-card p-4">
      {/* Language Filter */}
      <div className="flex items-center space-x-2">
        <Globe2 className="h-4 w-4 text-text-tertiary" />
        <select
          value={filters.language || ''}
          onChange={(e) =>
            onFilterChange({ language: (e.target.value as Language) || undefined })
          }
          className="rounded-md border border-border-subtle bg-bg-card px-3 py-1 text-sm text-text-primary focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
        >
          <option value="">All Languages</option>
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      {/* Sort Filter */}
      <div className="flex items-center space-x-2">
        <TrendingUp className="h-4 w-4 text-text-tertiary" />
        <select
          value={filters.sortBy}
          onChange={(e) =>
            onFilterChange({
              sortBy: e.target.value as ForumFilter['sortBy'],
            })
          }
          className="rounded-md border border-border-subtle bg-bg-card px-3 py-1 text-sm text-text-primary focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Time Frame Filter */}
      <div className="flex items-center space-x-2">
        <Clock className="h-4 w-4 text-text-tertiary" />
        <select
          value={filters.timeFrame}
          onChange={(e) =>
            onFilterChange({
              timeFrame: e.target.value as ForumFilter['timeFrame'],
            })
          }
          className="rounded-md border border-border-subtle bg-bg-card px-3 py-1 text-sm text-text-primary focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
        >
          {timeFrameOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
