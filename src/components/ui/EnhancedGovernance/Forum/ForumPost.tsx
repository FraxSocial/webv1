'use client'

import { ForumPost as ForumPostType } from '@/types/forum'
import { ThumbsUp, ThumbsDown, MessageCircle, Globe2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'

interface ForumPostProps {
  post: ForumPostType
  onLike: (postId: string) => void
  onDislike: (postId: string) => void
}

export default function ForumPost({ post, onLike, onDislike }: ForumPostProps) {
  return (
    <div className="rounded-lg border border-border-subtle bg-bg-card p-4 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          {post.authorAvatar ? (
            <img
              src={post.authorAvatar}
              alt={post.authorName}
              className="h-10 w-10 rounded-full"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-primary text-white">
              {post.authorName[0].toUpperCase()}
            </div>
          )}
          <div>
            <h3 className="font-medium text-text-primary">{post.title}</h3>
            <p className="text-sm text-text-secondary">
              by {post.authorName} •{' '}
              {formatDistanceToNow(post.createdAt, { addSuffix: true })}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Globe2 className="h-4 w-4 text-text-tertiary" />
          <span className="text-sm font-medium uppercase text-text-tertiary">
            {post.language}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-text-primary">{post.content}</p>
      </div>

      <div className="mt-4 flex items-center space-x-4">
        <button
          onClick={() => onLike(post.id)}
          className="flex items-center space-x-1 text-text-secondary transition-colors duration-300 hover:text-accent-primary"
        >
          <ThumbsUp className="h-4 w-4" />
          <span className="text-sm">{post.likes}</span>
        </button>
        <button
          onClick={() => onDislike(post.id)}
          className="flex items-center space-x-1 text-text-secondary transition-colors duration-300 hover:text-accent-primary"
        >
          <ThumbsDown className="h-4 w-4" />
          <span className="text-sm">{post.dislikes}</span>
        </button>
        <Link
          href={`/governance/forum/post/${post.id}`}
          className="flex items-center space-x-1 text-text-secondary transition-colors duration-300 hover:text-accent-primary"
        >
          <MessageCircle className="h-4 w-4" />
          <span className="text-sm">{post.commentCount} comments</span>
        </Link>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-bg-subtle px-3 py-1 text-xs text-text-secondary"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
