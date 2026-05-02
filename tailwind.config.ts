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
          yellow: '#FFC600',    // Amarillo oficial Barranquilla
          red: '#E31E24',       // Rojo oficial Barranquilla
          green: '#228B22',     // Verde vibrante para Carnaval
          gold: '#FFC600',      // Alias para yellow
          darkBg: '#0F1419',    // Negro profundo
          lightBg: '#F8F9FA',   // Blanco casi puro
        },
        primary: {
          50: '#FFF8E1',
          100: '#FFF1C2',
          500: '#FFC600',
          600: '#E6B000',
          700: '#CCB000',
        },
        secondary: {
          50: '#FFE8E8',
          100: '#FFD1D1',
          500: '#E31E24',
          600: '#C91A20',
          700: '#B01619',
        },
        accent: {
          50: '#E8F4FF',
          500: '#228B22',
          600: '#1E7A1E',
          700: '#155A15',
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
