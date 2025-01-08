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
          primary: '#0C0E12',
          secondary: '#141722',
          accent: '#1B2537',
        },
        'highlight': {
          blue: '#2E6BF7',
          purple: '#6366F1',
          cyan: '#22D3EE',
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
    },
  },
  plugins: [],
}
