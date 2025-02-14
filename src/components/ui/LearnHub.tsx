'use client'

import { useState, useMemo, useEffect } from 'react'
import { BookOpen, Play, CheckCircle, Lock, Globe2, ArrowLeft, Search, Filter, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { translations, courseTranslations } from '@/translations/learn'

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
  const router = useRouter()
  const [language, setLanguage] = useState<'en' | 'es'>('en')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLevel, setSelectedLevel] = useState<Course['level'] | 'all'>('all')
  const [isLoading, setIsLoading] = useState(true)
  const t = translations[language]
  
  const [baseCourses] = useState<Course[]>([
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

  // Calculate overall progress
  const overallProgress = useMemo(() => {
    const totalModules = baseCourses.reduce((acc, course) => acc + course.modules.length, 0)
    const completedModules = baseCourses.reduce(
      (acc, course) => acc + course.modules.filter(m => m.completed).length,
      0
    )
    return Math.round((completedModules / totalModules) * 100)
  }, [baseCourses])

  // Filter courses based on search and level
  const filteredCourses = useMemo(() => {
    return baseCourses.filter(course => {
      const matchesSearch = 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel
      return matchesSearch && matchesLevel
    })
  }, [baseCourses, searchQuery, selectedLevel])

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-accent-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 px-3 py-2 rounded-lg
                   text-text-secondary hover:text-text-primary
                   transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="text-sm font-medium">Back</span>
        </button>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-lg bg-bg-card border border-border-subtle
                       text-sm placeholder:text-text-tertiary focus:outline-none
                       focus:border-accent-primary transition-colors w-64"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary">{t.learningHub}</h2>
            <p className="text-text-secondary mt-1">
              {overallProgress}% {t.completed.toLowerCase()} • {baseCourses.length} {t.courses}
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg
                       bg-accent-primary/10 text-accent-primary hover:bg-accent-primary/20
                       transition-colors duration-200"
            >
              <Globe2 className="h-4 w-4" />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </button>
            <div className="flex items-center space-x-4">
              {['all', 'beginner', 'intermediate', 'advanced'].map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level as Course['level'] | 'all')}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-colors
                            ${selectedLevel === level
                              ? 'bg-accent-primary/10 text-accent-primary'
                              : 'hover:bg-bg-hover text-text-secondary'}`}
                >
                  {level !== 'all' && (
                    <div className={`h-3 w-3 rounded-full ${
                      level === 'beginner' ? 'bg-green-400' :
                      level === 'intermediate' ? 'bg-blue-400' : 'bg-purple-400'
                    }`} />
                  )}
                  <span className="text-sm font-medium capitalize">
                    {level === 'all' ? t.allLevels : t[level as keyof typeof t]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="text-center py-12 text-text-secondary">
          <p className="text-lg">{t.noCoursesFound}</p>
          <p className="mt-2">{t.tryAdjustingFilters}</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredCourses.map(course => {
            const translation = courseTranslations[language][course.id]
            return (
              <div
                key={course.id}
                className="rounded-lg p-6 transition-all
                         border border-border-subtle-light dark:border-border-subtle
                         bg-bg-card-light dark:bg-bg-card
                         hover:border-accent-primary"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary">
                      {translation.title}
                    </h3>
                    <p className="mt-1 text-sm text-text-secondary-light dark:text-text-secondary">
                      {translation.description}
                    </p>
                  </div>
                  {course.completed && (
                    <div className="rounded-full bg-green-400/10 px-3 py-1 text-xs font-medium text-green-400">
                      {t.completed}
                    </div>
                  )}
                </div>

                <div className="mb-4 flex items-center space-x-4 text-sm text-text-tertiary-light dark:text-text-tertiary">
                  <span className={getLevelColor(course.level)}>{course.level}</span>
                  <span>{course.duration}</span>
                  <span>{course.modules.length} {t.modules}</span>
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
                          <h4 className="font-medium text-text-primary-light dark:text-text-primary">
                            {translation.modules[parseInt(module.id.split('-')[1]) - 1].title}
                          </h4>
                          <p className="text-sm text-text-tertiary-light dark:text-text-tertiary">
                            {module.duration}
                          </p>
                        </div>
                      </div>
                      {module.completed && <CheckCircle className="h-5 w-5 text-green-400" />}
                    </div>
                  ))}
                </div>

                <button
                  className="mt-4 w-full rounded-lg px-4 py-2 font-medium text-white transition-colors
                           bg-accent-primary hover:bg-accent-muted-light dark:hover:bg-accent-muted"
                >
                  {course.completed ? t.reviewCourse : t.continueLearning}
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
