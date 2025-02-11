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
          dark: '#0A0A0B',        // Main background
          darker: '#050506',      // Darker sections
          card: '#111113',        // Card background
          hover: '#16161A'        // Hover state
        },
        accent: {
          primary: '#2A85FF',     // Main accent - subtle blue
          muted: '#1A5AAD'        // Muted accent
        },
        text: {
          primary: '#FFFFFF',     // Primary text
          secondary: '#A1A1AA',   // Secondary text
          tertiary: '#71717A'     // Muted text
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.1)',
          strong: 'rgba(255, 255, 255, 0.15)'
        }
      },
      backgroundImage: {
        'noise': 'url("/noise.png")',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        glow: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.6 }
        }
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
