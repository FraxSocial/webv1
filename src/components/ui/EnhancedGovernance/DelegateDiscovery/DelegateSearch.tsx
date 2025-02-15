'use client'

import { Search } from 'lucide-react'

interface DelegateSearchProps {
  onSearch: (query: string) => void
}

export default function DelegateSearch({ onSearch }: DelegateSearchProps) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <Search className="h-4 w-4 text-text-tertiary" />
      </div>
      <input
        type="text"
        placeholder="Search delegates by name, address, or description..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full rounded-lg border border-border-subtle bg-bg-card pl-10 pr-4 py-2 text-text-primary placeholder:text-text-tertiary focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
      />
    </div>
  )
}
