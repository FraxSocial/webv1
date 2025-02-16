'use client'

import { useState } from 'react'
import { ArrowLeft, ThumbsUp, ThumbsDown, Send } from 'lucide-react'
import Link from 'next/link'
import { ForumPost, ForumComment } from '@/types/forum'
import { formatDistanceToNow } from 'date-fns'

interface ForumPostDetailProps {
  post: ForumPost
  initialComments: ForumComment[]
}

export default function ForumPostDetail({ post, initialComments }: ForumPostDetailProps) {
  const [newComment, setNewComment] = useState('')
  const [comments, setComments] = useState(initialComments)

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement comment creation
    const comment: ForumComment = {
      id: String(comments.length + 1),
      postId: post.id,
      content: newComment,
      authorId: 'current-user', // Replace with actual user ID
      authorName: 'Current User', // Replace with actual user name
      createdAt: new Date(),
      updatedAt: new Date(),
      likes: 0,
      dislikes: 0,
    }
    setComments((prev) => [...prev, comment])
    setNewComment('')
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Link
        href="/governance/forum"
        className="mb-8 flex items-center text-text-secondary transition-colors duration-300 hover:text-accent-primary"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Forum
      </Link>

      <article className="rounded-lg border border-border-subtle bg-bg-card p-6">
        <div className="mb-6 border-b border-border-subtle pb-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-primary text-white">
                {post.authorName[0].toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-text-primary">
                  {post.title}
                </h1>
                <p className="text-sm text-text-secondary">
                  by {post.authorName} •{' '}
                  {formatDistanceToNow(post.createdAt, { addSuffix: true })}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1 text-text-secondary transition-colors duration-300 hover:text-accent-primary">
                <ThumbsUp className="h-4 w-4" />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center space-x-1 text-text-secondary transition-colors duration-300 hover:text-accent-primary">
                <ThumbsDown className="h-4 w-4" />
                <span>{post.dislikes}</span>
              </button>
            </div>
          </div>
          <p className="text-text-primary">{post.content}</p>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-text-primary">Comments</h2>

          <form onSubmit={handleSubmitComment} className="flex space-x-4">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 rounded-lg border border-border-subtle bg-bg-card px-4 py-2 text-text-primary focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
            />
            <button
              type="submit"
              className="flex items-center space-x-2 rounded-lg bg-accent-primary px-4 py-2 text-white transition-colors duration-300 hover:bg-accent-primary/90"
            >
              <Send className="h-4 w-4" />
              <span>Send</span>
            </button>
          </form>

          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="rounded-lg border border-border-subtle bg-bg-subtle p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-primary text-white">
                      {comment.authorName[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">
                        {comment.authorName}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {formatDistanceToNow(comment.createdAt, {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-1 text-text-secondary transition-colors duration-300 hover:text-accent-primary">
                      <ThumbsUp className="h-3 w-3" />
                      <span className="text-xs">{comment.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-text-secondary transition-colors duration-300 hover:text-accent-primary">
                      <ThumbsDown className="h-3 w-3" />
                      <span className="text-xs">{comment.dislikes}</span>
                    </button>
                  </div>
                </div>
                <p className="text-text-primary">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  )
}
