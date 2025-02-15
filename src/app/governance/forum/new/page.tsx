'use client'

import { useState } from 'react'
import { Language } from '@/types/forum'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const languages: { code: Language; name: string }[] = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'zh', name: '中文' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
]

export default function NewForumPost() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    language: 'en' as Language,
    tags: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Implement post creation
    console.log('Creating new post:', formData)
    // After successful creation, redirect to the forum
    router.push('/governance/forum')
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8">
        <Link
          href="/governance/forum"
          className="mb-4 flex items-center text-text-secondary transition-colors duration-300 hover:text-accent-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Forum
        </Link>
        <h1 className="text-3xl font-bold text-text-primary">Create New Post</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-text-primary"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            className="w-full rounded-lg border border-border-subtle bg-bg-card px-4 py-2 text-text-primary focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
            required
          />
        </div>

        <div>
          <label
            htmlFor="language"
            className="mb-2 block text-sm font-medium text-text-primary"
          >
            Language
          </label>
          <select
            id="language"
            value={formData.language}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                language: e.target.value as Language,
              }))
            }
            className="w-full rounded-lg border border-border-subtle bg-bg-card px-4 py-2 text-text-primary focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="content"
            className="mb-2 block text-sm font-medium text-text-primary"
          >
            Content
          </label>
          <textarea
            id="content"
            value={formData.content}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, content: e.target.value }))
            }
            rows={6}
            className="w-full rounded-lg border border-border-subtle bg-bg-card px-4 py-2 text-text-primary focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
            required
          />
        </div>

        <div>
          <label
            htmlFor="tags"
            className="mb-2 block text-sm font-medium text-text-primary"
          >
            Tags (comma-separated)
          </label>
          <input
            type="text"
            id="tags"
            value={formData.tags}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, tags: e.target.value }))
            }
            className="w-full rounded-lg border border-border-subtle bg-bg-card px-4 py-2 text-text-primary focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
            placeholder="governance, proposal, community"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-accent-primary px-4 py-2 font-medium text-white transition-colors duration-300 hover:bg-accent-primary/90"
        >
          Create Post
        </button>
      </form>
    </div>
  )
}
