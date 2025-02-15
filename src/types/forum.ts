export type Language = 'en' | 'es' | 'fr' | 'de' | 'zh' | 'ja' | 'ko'

export interface ForumPost {
  id: string
  title: string
  content: string
  authorId: string
  authorName: string
  authorAvatar?: string
  language: Language
  createdAt: Date
  updatedAt: Date
  likes: number
  dislikes: number
  commentCount: number
  tags: string[]
}

export interface ForumComment {
  id: string
  postId: string
  content: string
  authorId: string
  authorName: string
  authorAvatar?: string
  createdAt: Date
  updatedAt: Date
  likes: number
  dislikes: number
  parentId?: string // For nested comments/replies
  replies?: ForumComment[]
}

export interface ForumFilter {
  language?: Language
  tag?: string
  sortBy: 'latest' | 'popular' | 'controversial'
  timeFrame: 'day' | 'week' | 'month' | 'year' | 'all'
}
