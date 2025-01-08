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
        'frax': {
          primary: '#000000',
          secondary: '#0a0a0a',
          accent: '#1a1a1a',
        },
        'highlight': {
          white: '#ffffff',
          gray: '#808080',
          accent: '#404040',
        },
        'surface': {
          light: '#F8FAFC',
          dark: '#0F1117',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow': '0 4px 16px rgba(0, 0, 0, 0.1)',
        'glow-lg': '0 8px 32px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
}
