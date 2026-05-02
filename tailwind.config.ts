import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        carnival: {
          gold: '#FFD700',
          red: '#DC143C',
          blue: '#1E90FF',
          green: '#228B22',
          pink: '#FF69B4',
          darkBg: '#1A1A1A',
          lightBg: '#F5F5F5',
        },
        primary: {
          50: '#fff9e6',
          100: '#fff3cc',
          500: '#FFD700',
          600: '#e6c200',
          700: '#ccaa00',
        },
        secondary: {
          50: '#ffe6e6',
          100: '#ffcccc',
          500: '#DC143C',
          600: '#c40d2f',
          700: '#a80a28',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
        accent: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config
