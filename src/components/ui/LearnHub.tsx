'use client'

import { useState } from 'react'
import { BookOpen, Play, CheckCircle, Lock } from 'lucide-react'

interface Course {
  id: string
  title: string
  description: string
  modules: Module[]
  level: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  completed: boolean
}

interface Module {
  id: string
  title: string
  duration: string
  completed: boolean
  locked: boolean
  type: 'video' | 'article' | 'quiz'
}

export default function LearnHub() {
  const [courses] = useState<Course[]>([
    {
      id: '1',
      title: 'Introduction to Frax Protocol',
      description: 'Learn the basics of Frax Protocol and its core components',
      level: 'beginner',
      duration: '45 mins',
      completed: true,
      modules: [
        {
          id: '1-1',
          title: 'What is Frax?',
          duration: '10 mins',
          completed: true,
          locked: false,
          type: 'video'
        },
        {
          id: '1-2',
          title: 'Understanding FRAX Stablecoin',
          duration: '15 mins',
          completed: true,
          locked: false,
          type: 'article'
        },
        {
          id: '1-3',
          title: 'FXS Tokenomics',
          duration: '20 mins',
          completed: true,
          locked: false,
          type: 'video'
        }
      ]
    },
    {
      id: '2',
      title: 'Governance Participation Guide',
      description: 'Master the art of participating in Frax governance',
      level: 'intermediate',
      duration: '1.5 hours',
      completed: false,
      modules: [
        {
          id: '2-1',
          title: 'Governance Overview',
          duration: '20 mins',
          completed: true,
          locked: false,
          type: 'video'
        },
        {
          id: '2-2',
          title: 'Creating Proposals',
          duration: '30 mins',
          completed: false,
          locked: false,
          type: 'article'
        },
        {
          id: '2-3',
          title: 'Advanced Voting Strategies',
          duration: '40 mins',
          completed: false,
          locked: true,
          type: 'video'
        }
      ]
    }
  ])

  const getLevelColor = (level: Course['level']) => {
    switch (level) {
      case 'beginner':
        return 'text-green-400'
      case 'intermediate':
        return 'text-blue-400'
      case 'advanced':
        return 'text-purple-400'
      default:
        return 'text-text-secondary'
    }
  }

  const getModuleIcon = (type: Module['type']) => {
    switch (type) {
      case 'video':
        return <Play className="h-4 w-4" />
      case 'article':
        return <BookOpen className="h-4 w-4" />
      case 'quiz':
        return <CheckCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary">Learning Hub</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-green-400" />
            <span className="text-sm text-text-secondary-light dark:text-text-secondary">Beginner</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-blue-400" />
            <span className="text-sm text-text-secondary-light dark:text-text-secondary">Intermediate</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-purple-400" />
            <span className="text-sm text-text-secondary-light dark:text-text-secondary">Advanced</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {courses.map(course => (
          <div
            key={course.id}
            className="rounded-lg p-6 transition-all
                       border border-border-subtle-light dark:border-border-subtle
                       bg-bg-card-light dark:bg-bg-card
                       hover:border-accent-primary"
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary">{course.title}</h3>
                <p className="mt-1 text-sm text-text-secondary-light dark:text-text-secondary">{course.description}</p>
              </div>
              {course.completed && (
                <div className="rounded-full bg-green-400/10 px-3 py-1 text-xs font-medium text-green-400">
                  Completed
                </div>
              )}
            </div>

            <div className="mb-4 flex items-center space-x-4 text-sm text-text-tertiary-light dark:text-text-tertiary">
              <span className={getLevelColor(course.level)}>{course.level}</span>
              <span>{course.duration}</span>
              <span>{course.modules.length} modules</span>
            </div>

            <div className="space-y-3">
              {course.modules.map(module => (
                <div
                  key={module.id}
                  className={`flex items-center justify-between rounded-lg border ${
                    module.locked
                      ? 'border-border-subtle-light dark:border-border-subtle bg-bg-hover-light dark:bg-bg-darker opacity-50'
                      : module.completed
                      ? 'border-green-400/30 bg-green-400/5'
                      : 'border-border-subtle-light dark:border-border-subtle bg-bg-hover-light dark:bg-bg-darker'
                  } p-3`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-accent-primary">
                      {module.locked ? <Lock className="h-4 w-4" /> : getModuleIcon(module.type)}
                    </div>
                    <div>
                      <h4 className="font-medium text-text-primary-light dark:text-text-primary">{module.title}</h4>
                      <p className="text-sm text-text-tertiary-light dark:text-text-tertiary">{module.duration}</p>
                    </div>
                  </div>
                  {module.completed && <CheckCircle className="h-5 w-5 text-green-400" />}
                </div>
              ))}
            </div>

            <button className="mt-4 w-full rounded-lg px-4 py-2 font-medium text-white transition-colors
                       bg-accent-primary hover:bg-accent-muted-light dark:hover:bg-accent-muted">
              {course.completed ? 'Review Course' : 'Continue Learning'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
