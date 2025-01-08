'use client'

import { useEffect } from 'react'

export default function BackgroundEffects() {
  useEffect(() => {
    const createParticles = () => {
      const particles = document.querySelector('.particles')
      if (!particles) return

      particles.innerHTML = ''

      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div')
        particle.className = 'particle'
        particle.style.width = Math.random() * 4 + 2 + 'px'
        particle.style.height = particle.style.width
        particle.style.left = Math.random() * 100 + 'vw'
        particle.style.top = Math.random() * 100 + 'vh'
        particle.style.animationDelay = Math.random() * 15 + 's'
        particles.appendChild(particle)
      }
    }

    createParticles()
    window.addEventListener('resize', createParticles)
    return () => window.removeEventListener('resize', createParticles)
  }, [])

  return (
    <>
      <div className="cyber-grid" />
      <div className="particles" />
      <div className="mesh-gradient" />
    </>
  )
}
