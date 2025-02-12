'use client'

import { useState, useEffect } from 'react'
import { MessageSquare, Send, X } from 'lucide-react'

interface Message {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: Date
}

interface Chat {
  id: string
  participantId: string
  participantName: string
  lastMessage?: Message
  unreadCount: number
}

interface DirectMessagingProps {
  onClose: () => void
}

export default function DirectMessaging({ onClose }: DirectMessagingProps) {

  const [chats, setChats] = useState<Chat[]>([])
  const [activeChat, setActiveChat] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')

  // Mock data
  useEffect(() => {
    const mockChats: Chat[] = [
      {
        id: '1',
        participantId: 'user1.frax',
        participantName: 'FraxGov.eth',
        unreadCount: 2
      },
      {
        id: '2',
        participantId: 'user2.frax',
        participantName: 'FraxWhale.eth',
        unreadCount: 0
      }
    ]
    setChats(mockChats)

    const mockMessages: Message[] = [
      {
        id: '1',
        senderId: 'user1.frax',
        senderName: 'FraxGov.eth',
        content: 'Have you seen the new governance proposal?',
        timestamp: new Date(Date.now() - 3600000)
      },
      {
        id: '2',
        senderId: 'me',
        senderName: 'Me',
        content: "Yes, I'm reviewing it now",
        timestamp: new Date(Date.now() - 1800000)
      }
    ]
    setMessages(mockMessages)
  }, [])

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      senderName: 'Me',
      content: newMessage,
      timestamp: new Date()
    }

    setMessages([...messages, message])
    setNewMessage('')
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[400px] h-[600px] flex flex-col rounded-xl
               border border-border-subtle-light dark:border-border-subtle
               bg-bg-card-light dark:bg-bg-card shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between p-4
                   border-b border-border-subtle-light dark:border-border-subtle">
        <h3 className="text-lg font-semibold
                   text-text-primary-light dark:text-text-primary">Messages</h3>
        <button
          onClick={onClose}
          className="p-1 rounded-lg transition-colors
                     text-text-tertiary-light hover:text-text-primary-light hover:bg-bg-hover-light
                     dark:text-text-tertiary dark:hover:text-text-primary dark:hover:bg-bg-darker"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex">
        {/* Chat list */}
        <div className="w-[160px] overflow-y-auto
                     border-r border-border-subtle-light dark:border-border-subtle">
          {chats.map(chat => (
            <div
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              className={`cursor-pointer p-3 transition-colors
                ${activeChat === chat.id 
                  ? 'bg-bg-hover-light dark:bg-bg-darker' 
                  : 'hover:bg-bg-hover-light dark:hover:bg-bg-darker'}
                ${chat.unreadCount > 0 ? 'border-l-2 border-l-accent-primary' : ''}
              `}
            >
              <div className="font-medium truncate
                           text-text-primary-light dark:text-text-primary">{chat.participantName}</div>
              {chat.unreadCount > 0 && (
                <div className="mt-1 flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
                  <span className="text-xs text-text-secondary-light dark:text-text-secondary">
                    {chat.unreadCount} new
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Message area */}
        <div className="flex flex-col flex-1 bg-bg-hover-light/50 dark:bg-bg-darker/30">
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 shadow-sm
                    ${message.senderId === 'me'
                      ? 'bg-accent-primary text-white rounded-tr-sm'
                      : 'bg-bg-card-light dark:bg-bg-card text-text-primary-light dark:text-text-primary rounded-tl-sm'
                    }`}
                >
                  <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                  <div className="mt-1 text-[10px] opacity-75">
                    {new Date(message.timestamp).toLocaleTimeString(undefined, {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={sendMessage} className="p-3 border-t
                       bg-bg-card-light dark:bg-bg-card
                       border-border-subtle-light dark:border-border-subtle">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 rounded-full px-4 py-2 transition-all
                         border border-border-subtle-light dark:border-border-subtle
                         bg-bg-hover-light dark:bg-bg-darker
                         text-sm text-text-primary-light dark:text-text-primary
                         placeholder:text-text-tertiary-light dark:placeholder:text-text-tertiary
                         focus:outline-none focus:ring-2 focus:ring-accent-primary/20 focus:border-accent-primary"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="rounded-full bg-accent-primary p-2.5 text-white
                         hover:bg-accent-primary/90 disabled:opacity-50 disabled:cursor-not-allowed
                         transition-colors shadow-sm"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
