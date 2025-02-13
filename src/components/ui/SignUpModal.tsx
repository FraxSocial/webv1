'use client'

import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useAccount, usePublicClient, useConnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { validateFNSName, resolveFNSName } from '@/utils/fns'
import { useRouter } from 'next/navigation'

interface SignUpModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const router = useRouter()
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector()
  })
  const publicClient = usePublicClient()
  const [fnsName, setFnsName] = useState('')
  const [isValidatingFNS, setIsValidatingFNS] = useState(false)
  const [fnsError, setFnsError] = useState('')
  const [bio, setBio] = useState('')

  // Close modal if profile exists
  useEffect(() => {
    if (isOpen) {
      const hasProfile = localStorage.getItem('userProfile')
      if (hasProfile) {
        onClose()
      }
    }
  }, [isOpen, onClose])

  const validateFNS = async (name: string) => {
    setIsValidatingFNS(true)
    setFnsError('')

    try {
      // Basic format validation
      const isValid = await validateFNSName(name)
      if (!isValid) {
        setFnsError('Invalid FNS name format. Use 3-32 characters, alphanumeric and hyphens only.')
        return false
      }

      // For development, we'll consider all valid format names as available
      // In production, this would check the FNS contract for name availability
      return true
    } catch (error) {
      console.error('Error validating FNS:', error)
      setFnsError('Error validating FNS name')
      return false
    } finally {
      setIsValidatingFNS(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const isValidFNS = await validateFNS(fnsName)
    if (!isValidFNS) return

    try {
      // Create a more complete profile
      const profile = {
        address,
        fnsName: fnsName + '.frax',
        bio,
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        socialLinks: {
          twitter: '',
          discord: '',
          github: '',
          telegram: ''
        },
        stats: {
          following: 0,
          followers: 0,
          proposals: 0,
          votes: 0
        }
      }
      
      // Store profile in localStorage for development
      localStorage.setItem('userProfile', JSON.stringify(profile))
      console.log('Profile created:', profile)

      // Close modal and navigate to user's profile page
      onClose()
      router.push(`/profile/${fnsName}`)
    } catch (error) {
      console.error('Error creating profile:', error)
      setFnsError('Error creating profile. Please try again.')
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all
                               bg-bg-card-light dark:bg-bg-card
                               border border-border-subtle-light dark:border-border-subtle">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6
                             text-text-primary-light dark:text-text-primary"
                >
                  {!isConnected ? 'Connect Wallet' : 'Create Your Profile'}
                </Dialog.Title>

                {!isConnected ? (
                  <div className="mt-4 space-y-4">
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary">
                      Connect your wallet to get started with frax.social
                    </p>
                    <button
                      onClick={() => connect()}
                      className="w-full rounded-md border border-transparent px-4 py-2 text-sm font-medium
                               bg-accent-primary text-white
                               hover:bg-accent-muted-light dark:hover:bg-accent-muted
                               focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2"
                    >
                      Connect Wallet
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <div>
                    <label htmlFor="wallet" className="block text-sm font-medium
                                   text-text-primary-light dark:text-text-primary">
                      Wallet Address
                    </label>
                    <input
                      type="text"
                      id="wallet"
                      value={address}
                      disabled
                      className="mt-1 block w-full rounded-md shadow-sm sm:text-sm
                               border-border-subtle-light dark:border-border-subtle
                               bg-bg-hover-light dark:bg-bg-darker
                               text-text-primary-light dark:text-text-primary
                               focus:border-accent-primary focus:ring-accent-primary"
                    />
                  </div>

                  <div>
                    <label htmlFor="fnsName" className="block text-sm font-medium
                                   text-text-primary-light dark:text-text-primary">
                      FNS Name
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="relative rounded-md shadow-sm">
                        <input
                          type="text"
                          id="fnsName"
                          value={fnsName}
                          onChange={(e) => {
                            const newName = e.target.value.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()
                            setFnsName(newName)
                            setFnsError('')
                          }}
                          required
                          className={`block w-full pr-16 rounded-md sm:text-sm
                                     text-text-primary-light dark:text-text-primary
                                     bg-bg-card-light dark:bg-bg-card
                                     ${fnsError
                                       ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                       : 'border-border-subtle-light dark:border-border-subtle focus:border-accent-primary focus:ring-accent-primary'
                                     }`}
                          placeholder="your-name"
                          spellCheck="false"
                          autoComplete="off"
                          autoCapitalize="none"
                        />
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <span className="text-text-secondary-light dark:text-text-secondary sm:text-sm">.frax</span>
                        </div>
                      </div>
                      {isValidatingFNS && (
                        <div className="absolute inset-y-0 right-14 pr-3 flex items-center">
                          <svg className="animate-spin h-5 w-5 text-accent-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </div>
                      )}
                    </div>
                    {fnsError && (
                      <p className="mt-2 text-sm text-red-600">{fnsError}</p>
                    )}
                    <p className="mt-2 text-sm text-text-secondary-light dark:text-text-secondary">
                      Enter your Frax Name Service (FNS) name. This will be your unique identifier.our primary identifier.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent-primary focus:ring-accent-primary sm:text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 dark:border-gray-600"
                      placeholder="Tell us about yourself"
                    />
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="inline-flex justify-center rounded-md px-4 py-2 text-sm font-medium
                               border border-border-subtle-light dark:border-border-subtle
                               text-text-primary-light dark:text-text-primary
                               hover:bg-bg-hover-light dark:hover:bg-bg-hover
                               focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isValidatingFNS}
                      className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium
                               bg-accent-primary text-white
                               hover:bg-accent-muted-light dark:hover:bg-accent-muted
                               focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2
                               disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Create Profile
                    </button>
                  </div>
                </form>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
