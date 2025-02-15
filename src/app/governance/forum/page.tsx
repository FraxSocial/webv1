'use client'

import { useState } from 'react'
import { Plus, ArrowLeft } from 'lucide-react'
import ForumPost from '@/components/ui/EnhancedGovernance/Forum/ForumPost'
import ForumFilters from '@/components/ui/EnhancedGovernance/Forum/ForumFilters'
import { ForumFilter, ForumPost as ForumPostType } from '@/types/forum'
import Link from 'next/link'

// Mock data - Replace with actual API calls
const mockPosts: ForumPostType[] = [
  {
    id: '1',
    title: 'Proposal for New Governance Model',
    content:
      'I think we should consider implementing a new governance model that better represents our international community...',
    authorId: '1',
    authorName: 'Alice Chen',
    language: 'en',
    createdAt: new Date('2024-02-14T10:00:00'),
    updatedAt: new Date('2024-02-14T10:00:00'),
    likes: 42,
    dislikes: 5,
    commentCount: 15,
    tags: ['governance', 'proposal', 'community'],
  },
  {
    id: '2',
    title: 'Propuesta para Nuevo Sistema de Votación',
    content:
      'Deberíamos considerar implementar un sistema de votación más transparente y eficiente...',
    authorId: '2',
    authorName: 'Carlos Rodriguez',
    language: 'es',
    createdAt: new Date('2024-02-14T09:00:00'),
    updatedAt: new Date('2024-02-14T09:00:00'),
    likes: 38,
    dislikes: 3,
    commentCount: 12,
    tags: ['votación', 'propuesta', 'transparencia'],
  },
]

export default function ForumPage() {
  const [filters, setFilters] = useState<ForumFilter>({
    sortBy: 'latest',
    timeFrame: 'week',
  })

  const handleFilterChange = (newFilters: Partial<ForumFilter>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  const handleLike = (postId: string) => {
    // Implement like functionality
    console.log('Liked post:', postId)
  }

  const handleDislike = (postId: string) => {
    // Implement dislike functionality
    console.log('Disliked post:', postId)
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <Link
        href="/governance"
        className="mb-6 flex items-center text-text-secondary transition-colors duration-300 hover:text-accent-primary"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Governance
      </Link>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-text-primary">
          International Forum
        </h1>
        <Link
          href="/governance/forum/new"
          className="flex items-center space-x-2 rounded-lg bg-accent-primary px-4 py-2 text-white transition-colors duration-300 hover:bg-accent-primary/90"
        >
          <Plus className="h-5 w-5" />
          <span>New Post</span>
        </Link>
      </div>

      <div className="mb-6">
        <ForumFilters filters={filters} onFilterChange={handleFilterChange} />
      </div>

      <div className="space-y-4">
        {mockPosts
          .filter((post) => !filters.language || post.language === filters.language)
          .map((post) => (
            <ForumPost
              key={post.id}
              post={post}
              onLike={handleLike}
              onDislike={handleDislike}
            />
          ))}
      </div>
    </div>
  )
}
