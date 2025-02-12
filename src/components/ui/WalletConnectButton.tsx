'use client'

import { useState, useEffect } from 'react'
import { useAccount, useDisconnect } from 'wagmi'
import WalletModal from './WalletModal'
import SignUpModal from './SignUpModal'

const ConnectButtonContent = (
  <>
    <span>Connect</span>
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
      />
    </svg>
  </>
)

const DisconnectButtonContent = (address: string) => (
  <>
    <span>{address.slice(0, 6)}...{address.slice(-4)}</span>
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </>
)

export default function WalletConnectButton() {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)

  // Show sign up modal when wallet is connected and no profile exists
  useEffect(() => {
    if (isConnected) {
      setIsWalletModalOpen(false)
      const hasProfile = localStorage.getItem('userProfile')
      if (!hasProfile && window.location.pathname === '/') {
        setIsSignUpModalOpen(true)
      }
    }
  }, [isConnected])

  if (isConnected && address) {
    return (
      <>
        <button
          onClick={() => disconnect()}
          className="flex items-center space-x-2 rounded-full bg-accent-muted px-4 py-2 
                   text-sm font-medium text-text-primary transition-all duration-300 
                   hover:bg-accent-primary"
        >
          {DisconnectButtonContent(address)}
        </button>
        <SignUpModal
          isOpen={isSignUpModalOpen}
          onClose={() => setIsSignUpModalOpen(false)}
        />
      </>
    )
  }

  return (
    <>
      <button
        onClick={() => setIsWalletModalOpen(true)}
        className="flex items-center space-x-2 rounded-full bg-accent-primary px-4 py-2 
                 text-sm font-medium text-text-primary transition-all duration-300 
                 hover:bg-accent-muted"
      >
        {ConnectButtonContent}
      </button>
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </>
  )
}
