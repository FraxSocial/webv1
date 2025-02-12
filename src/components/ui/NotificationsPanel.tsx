'use client'

import { useState, useEffect } from 'react'
import { Bell, Vote, Trophy, MessageCircle, AlertCircle } from 'lucide-react'

interface Notification {
  id: string
  type: 'governance' | 'social' | 'achievement' | 'system'
  title: string
  message: string
  timestamp: Date
  read: boolean
  priority?: 'high' | 'medium' | 'low'
}

export default function NotificationsPanel() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  // Mock notifications for demo
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'governance',
        title: 'Critical Proposal',
        message: 'FIP-89: Emergency adjustment for frxETH collateral ratio',
        timestamp: new Date(),
        read: false,
        priority: 'high'
      },
      {
        id: '2',
        type: 'achievement',
        title: 'Level Up!',
        message: 'You reached Level 5! 🎉',
        timestamp: new Date(Date.now() - 1800000),
        read: false,
        priority: 'medium'
      },
      {
        id: '3',
        type: 'social',
        title: 'New Message',
        message: 'frax.eth: Hey, great proposal yesterday!',
        timestamp: new Date(Date.now() - 3600000),
        read: false,
        priority: 'medium'
      },
      {
        id: '4',
        type: 'achievement',
        title: 'Achievement Unlocked',
        message: 'First Vote Cast! 🏆',
        timestamp: new Date(Date.now() - 7200000),
        read: true,
        priority: 'low'
      },
      {
        id: '5',
        type: 'system',
        title: 'Wallet Update',
        message: 'New version of wallet connector available',
        timestamp: new Date(Date.now() - 86400000),
        read: true,
        priority: 'low'
      }
    ]
    setNotifications(mockNotifications)
    setUnreadCount(mockNotifications.filter(n => !n.read).length)
  }, [])

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
    setUnreadCount(prev => Math.max(0, prev - 1))
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 transition-colors rounded-lg text-text-secondary-light dark:text-text-secondary hover:bg-bg-card-light dark:hover:bg-bg-card hover:text-text-primary-light dark:hover:text-text-primary"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent-primary text-xs font-medium text-white animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 rounded-lg shadow-lg border border-border-subtle-light dark:border-border-subtle bg-bg-card-light dark:bg-bg-card">
          <div className="p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary">Notifications</h3>
              <button
                onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                className="text-sm text-accent-primary hover:text-accent-muted-light dark:hover:text-accent-muted"
              >
                Mark all as read
              </button>
            </div>
            <div className="space-y-3">
              {notifications.map(notification => (
                <div
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`cursor-pointer rounded-lg p-3 transition-colors ${notification.read ? 'bg-bg-hover-light dark:bg-bg-darker' : 'bg-bg-card-light dark:bg-bg-card'} ${
                    notification.priority === 'high' ? 'border-l-2 border-red-500' :
                    notification.priority === 'medium' ? 'border-l-2 border-yellow-500' :
                    'border-l-2 border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {notification.type === 'governance' && <Vote className="h-5 w-5 text-accent-primary" />}
                      {notification.type === 'achievement' && <Trophy className="h-5 w-5 text-yellow-500" />}
                      {notification.type === 'social' && <MessageCircle className="h-5 w-5 text-blue-500" />}
                      {notification.type === 'system' && <AlertCircle className="h-5 w-5 text-gray-500" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-text-primary-light dark:text-text-primary">{notification.title}</h4>
                          <p className="text-sm text-text-secondary-light dark:text-text-secondary">{notification.message}</p>
                        </div>
                        {!notification.read && (
                          <span className="h-2 w-2 rounded-full bg-accent-primary"></span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-text-tertiary-light dark:text-text-tertiary">
                        {new Date(notification.timestamp).toLocaleDateString(undefined, { 
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: true
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
