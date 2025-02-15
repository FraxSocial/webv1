'use client'

import Link from 'next/link'
import { Github, Twitter, MessageCircle } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="relative mt-32 border-t border-border-subtle bg-bg-darker">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left side */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-text-primary">
                frax<span className="text-accent-primary">.social</span>
              </h2>
              <p className="mt-4 max-w-md text-sm text-text-secondary">
                Advanced DeFi tools for sophisticated users. Monitor, analyze, and engage with the Frax ecosystem.
              </p>
            </div>
            
            {/* Social links */}
            <div className="flex space-x-6">
              <a
                href="https://twitter.com/fraxfinance"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary transition-colors duration-300 hover:text-accent-primary"
              >
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="https://discord.gg/frax"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary transition-colors duration-300 hover:text-accent-primary"
              >
                <span className="sr-only">Discord</span>
                <MessageCircle className="h-6 w-6" />
              </a>
              <a
                href="https://github.com/FraxSocial/webv1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary transition-colors duration-300 hover:text-accent-primary"
              >
                <span className="sr-only">GitHub</span>
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Right side */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {/* Resources */}
            <div>
              <h3 className="text-sm font-semibold text-text-primary">Resources</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a
                    href="https://erosnolasco.gitbook.io/https-docs.fraxsocial.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-text-secondary transition-colors duration-300 hover:text-accent-primary"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="https://facts.frax.finance"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-text-secondary transition-colors duration-300 hover:text-accent-primary"
                  >
                    Analytics
                  </a>
                </li>
                <li>
                  <a
                    href="https://forum.frax.finance"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-text-secondary transition-colors duration-300 hover:text-accent-primary"
                  >
                    Forum
                  </a>
                </li>
              </ul>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-sm font-semibold text-text-primary">Products</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link
                    href="/governance"
                    className="text-sm text-text-secondary transition-colors duration-300 hover:text-accent-primary"
                  >
                    Governance
                  </Link>
                </li>
                <li>
                  <Link
                    href="/learn"
                    className="text-sm text-text-secondary transition-colors duration-300 hover:text-accent-primary"
                  >
                    Learn
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-sm font-semibold text-text-primary">Legal</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-sm text-text-secondary transition-colors duration-300 hover:text-accent-primary"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-text-secondary transition-colors duration-300 hover:text-accent-primary"
                  >
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 border-t border-border-subtle pt-8">
          <p className="text-center text-sm text-text-tertiary">
            &copy; {new Date().getFullYear()} Frax Social. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
