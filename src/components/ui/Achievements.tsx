'use client'

import { useState, useEffect } from 'react'
import { Trophy, Star, Vote, MessageSquare, Users, Gauge } from 'lucide-react'

interface Achievement {
  id: string
  title: string
  description: string
  icon: JSX.Element
  progress: number
  maxProgress: number
  unlocked: boolean
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  xp: number
}

export default function Achievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [totalXP, setTotalXP] = useState(0)
  const [level, setLevel] = useState(1)

  useEffect(() => {
    const mockAchievements: Achievement[] = [
      {
        id: '1',
        title: 'First Vote',
        description: 'Cast your first governance vote',
        icon: <Vote className="h-6 w-6" />,
        progress: 1,
        maxProgress: 1,
        unlocked: true,
        rarity: 'common',
        xp: 100
      },
      {
        id: '2',
        title: 'Governance Expert',
        description: 'Vote on 50 proposals',
        icon: <Trophy className="h-6 w-6" />,
        progress: 12,
        maxProgress: 50,
        unlocked: false,
        rarity: 'epic',
        xp: 500
      },
      {
        id: '3',
        title: 'Community Leader',
        description: 'Have 100 followers',
        icon: <Users className="h-6 w-6" />,
        progress: 45,
        maxProgress: 100,
        unlocked: false,
        rarity: 'rare',
        xp: 300
      },
      {
        id: '4',
        title: 'Active Participant',
        description: 'Comment on 25 proposals',
        icon: <MessageSquare className="h-6 w-6" />,
        progress: 25,
        maxProgress: 25,
        unlocked: true,
        rarity: 'common',
        xp: 200
      },
      {
        id: '5',
        title: 'Power User',
        description: 'Delegate 1M voting power',
        icon: <Gauge className="h-6 w-6" />,
        progress: 250000,
        maxProgress: 1000000,
        unlocked: false,
        rarity: 'legendary',
        xp: 1000
      }
    ]
    setAchievements(mockAchievements)

    // Calculate total XP and level
    const xp = mockAchievements
      .filter(a => a.unlocked)
      .reduce((sum, a) => sum + a.xp, 0)
    setTotalXP(xp)
    setLevel(Math.floor(xp / 1000) + 1)
  }, [])

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common':
        return 'text-gray-400'
      case 'rare':
        return 'text-blue-400'
      case 'epic':
        return 'text-purple-400'
      case 'legendary':
        return 'text-yellow-400'
      default:
        return 'text-gray-400'
    }
  }

  return (
    <div className="rounded-lg p-6
               border border-border-subtle-light dark:border-border-subtle
               bg-bg-card-light dark:bg-bg-card">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold
                       text-text-primary-light dark:text-text-primary">Achievements</h2>
          <p className="text-text-secondary-light dark:text-text-secondary">Level {level} • {totalXP} XP</p>
        </div>
        <div className="flex items-center space-x-2">
          <Star className="h-5 w-5 text-yellow-400" />
          <span className="text-text-primary-light dark:text-text-primary">
            {achievements.filter(a => a.unlocked).length}/{achievements.length}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {achievements.map(achievement => (
          <div
            key={achievement.id}
            className={`rounded-lg border p-4 transition-all hover:border-accent-primary ${
              achievement.unlocked
                ? 'border-accent-primary bg-bg-hover-light dark:bg-bg-darker'
                : 'border-border-subtle-light dark:border-border-subtle bg-bg-card-light dark:bg-bg-card'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className={`${getRarityColor(achievement.rarity)}`}>
                  {achievement.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary-light dark:text-text-primary">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary">
                    {achievement.description}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-text-secondary-light dark:text-text-secondary">
                  {achievement.progress}/{achievement.maxProgress}
                </div>
                <div className="text-xs text-text-tertiary-light dark:text-text-tertiary">
                  {achievement.xp} XP
                </div>
              </div>
            </div>
            <div className="mt-2 h-1 w-full rounded-full bg-bg-hover-light dark:bg-bg-darker">
              <div
                className="h-full rounded-full bg-accent-primary transition-all"
                style={{
                  width: `${(achievement.progress / achievement.maxProgress) * 100}%`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
