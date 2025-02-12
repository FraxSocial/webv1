import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useConnect } from 'wagmi'

interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
}

const walletIcons = {
  'MetaMask': (
    <svg className="h-6 w-6" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32.9582 1L19.8241 10.7183L22.2665 4.99099L32.9582 1Z" fill="#E17726" stroke="#E17726" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2.65479 1L15.6681 10.809L13.3465 4.99098L2.65479 1Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M28.2861 23.7367L24.8059 29.1318L32.4239 31.2024L34.5935 23.8511L28.2861 23.7367Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M1.02783 23.8511L3.18508 31.2024L10.7917 29.1318L7.32293 23.7367L1.02783 23.8511Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'Coinbase Wallet': (
    <svg className="h-6 w-6" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 0C6.268 0 0 6.268 0 14C0 21.732 6.268 28 14 28C21.732 28 28 21.732 28 14C28 6.268 21.732 0 14 0Z" fill="#2C5FF6"/>
      <path d="M14 4.6665C8.8 4.6665 4.66667 8.79984 4.66667 13.9998C4.66667 19.1998 8.8 23.3332 14 23.3332C19.2 23.3332 23.3333 19.1998 23.3333 13.9998C23.3333 8.79984 19.2 4.6665 14 4.6665Z" fill="white"/>
      <path d="M11.4833 11.6665H16.5167C16.9833 11.6665 17.3667 12.0498 17.3667 12.5165V15.4832C17.3667 15.9498 16.9833 16.3332 16.5167 16.3332H11.4833C11.0167 16.3332 10.6333 15.9498 10.6333 15.4832V12.5165C10.6333 12.0498 11.0167 11.6665 11.4833 11.6665Z" fill="#2C5FF6"/>
    </svg>
  )
}

export default function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const { connect, connectors, isLoading, pendingConnector } = useConnect()

  // Don't render anything during server-side rendering
  if (typeof window === 'undefined') return null

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
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
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
                               bg-bg-card-light dark:bg-bg-dark
                               border border-border-subtle-light dark:border-border-subtle">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 mb-4
                             text-text-primary-light dark:text-text-primary"
                >
                  Connect Wallet
                </Dialog.Title>
                <div className="mt-2 space-y-3">
                  {connectors.map((connector) => (
                    <button
                      key={connector.id}
                      onClick={() => {
                        connect({ connector })
                        onClose()
                      }}
                      disabled={!connector.ready || isLoading}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-lg
                               transition-colors duration-200
                               bg-bg-card-light dark:bg-bg-card
                               hover:bg-bg-hover-light dark:hover:bg-accent-primary/5
                               border border-border-subtle-light dark:border-border-subtle"
                    >
                      <div className="flex items-center space-x-3">
                        {walletIcons[connector.name as keyof typeof walletIcons]}
                        <span className="font-medium
                                     text-text-primary-light dark:text-text-primary">
                          {connector.name}
                          {isLoading && connector.id === pendingConnector?.id && ' (connecting)'}
                        </span>
                      </div>
                      {!connector.ready && (
                        <span className="text-sm
                                     text-text-secondary-light dark:text-text-secondary">
                          Not installed
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
