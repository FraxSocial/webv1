/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          dark: '#0A0A0B',        // Dark mode - Main background
          darker: '#050506',      // Dark mode - Darker sections
          card: '#111113',        // Dark mode - Card background
          hover: '#16161A',       // Dark mode - Hover state
          light: '#FFFFFF',       // Light mode - Main background
          lighter: '#F9FAFB',     // Light mode - Lighter sections
          'card-light': '#FFFFFF',// Light mode - Card background
          'hover-light': '#F3F4F6'// Light mode - Hover state
        },
        accent: {
          primary: '#2A85FF',     // Main accent - subtle blue
          muted: '#1A5AAD',       // Dark mode - Muted accent
          'muted-light': '#60A5FA'// Light mode - Muted accent
        },
        text: {
          primary: '#FFFFFF',     // Dark mode - Primary text
          secondary: '#A1A1AA',   // Dark mode - Secondary text
          tertiary: '#71717A',    // Dark mode - Muted text
          'primary-light': '#111827',   // Light mode - Primary text
          'secondary-light': '#4B5563', // Light mode - Secondary text
          'tertiary-light': '#6B7280'   // Light mode - Muted text
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.1)',      // Dark mode
          strong: 'rgba(255, 255, 255, 0.15)',      // Dark mode
          'subtle-light': 'rgba(0, 0, 0, 0.1)',     // Light mode
          'strong-light': 'rgba(0, 0, 0, 0.15)'     // Light mode
        }
      },
      backgroundImage: {
        'noise': 'url("/noise.png")',
      },
      animation: {
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-down': 'slide-down 0.5s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'scale': 'scale 0.3s ease-out',
        'float': 'float 20s ease-in-out infinite',
        'spin-slow': 'spin 60s linear infinite',
        'spin-slower': 'spin 90s linear infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'carousel-slide': 'slide-left 20s linear infinite',
      },
      keyframes: {
        'ticker': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'slide-down': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'scale': {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '25%': { transform: 'translateY(-20px) translateX(20px)' },
          '50%': { transform: 'translateY(0) translateX(40px)' },
          '75%': { transform: 'translateY(20px) translateX(20px)' }
        },
        'pulse-slow': {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 0.8 }
        }
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'subtle-lg': '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
        'accent': '0 0 0 2px rgba(42, 133, 255, 0.1)',
      },
      boxShadow: {
        'glow': '0 4px 20px rgba(0, 246, 255, 0.2)',
        'glow-lg': '0 8px 32px rgba(0, 246, 255, 0.3)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
