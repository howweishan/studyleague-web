/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'rgb(from var(--color-primary-50) r g b)',
          100: 'rgb(from var(--color-primary-100) r g b)',
          200: 'rgb(from var(--color-primary-200) r g b)',
          300: 'rgb(from var(--color-primary-300) r g b)',
          400: 'rgb(from var(--color-primary-400) r g b)',
          500: 'rgb(from var(--color-primary-500) r g b)',
          600: 'rgb(from var(--color-primary-600) r g b)',
          700: 'rgb(from var(--color-primary-700) r g b)',
          800: 'rgb(from var(--color-primary-800) r g b)',
          900: 'rgb(from var(--color-primary-900) r g b)',
          950: 'rgb(from var(--color-primary-950) r g b)'
        },
        secondary: {
          50: 'rgb(from var(--color-secondary-50) r g b)',
          100: 'rgb(from var(--color-secondary-100) r g b)',
          200: 'rgb(from var(--color-secondary-200) r g b)',
          300: 'rgb(from var(--color-secondary-300) r g b)',
          400: 'rgb(from var(--color-secondary-400) r g b)',
          500: 'rgb(from var(--color-secondary-500) r g b)',
          600: 'rgb(from var(--color-secondary-600) r g b)',
          700: 'rgb(from var(--color-secondary-700) r g b)',
          800: 'rgb(from var(--color-secondary-800) r g b)',
          900: 'rgb(from var(--color-secondary-900) r g b)',
          950: 'rgb(from var(--color-secondary-950) r g b)'
        },
        success: {
          50: 'rgb(from var(--color-success-50) r g b)',
          100: 'rgb(from var(--color-success-100) r g b)',
          200: 'rgb(from var(--color-success-200) r g b)',
          300: 'rgb(from var(--color-success-300) r g b)',
          400: 'rgb(from var(--color-success-400) r g b)',
          500: 'rgb(from var(--color-success-500) r g b)',
          600: 'rgb(from var(--color-success-600) r g b)',
          700: 'rgb(from var(--color-success-700) r g b)',
          800: 'rgb(from var(--color-success-800) r g b)',
          900: 'rgb(from var(--color-success-900) r g b)',
          950: 'rgb(from var(--color-success-950) r g b)'
        },
        warning: {
          50: 'rgb(from var(--color-warning-50) r g b)',
          100: 'rgb(from var(--color-warning-100) r g b)',
          200: 'rgb(from var(--color-warning-200) r g b)',
          300: 'rgb(from var(--color-warning-300) r g b)',
          400: 'rgb(from var(--color-warning-400) r g b)',
          500: 'rgb(from var(--color-warning-500) r g b)',
          600: 'rgb(from var(--color-warning-600) r g b)',
          700: 'rgb(from var(--color-warning-700) r g b)',
          800: 'rgb(from var(--color-warning-800) r g b)',
          900: 'rgb(from var(--color-warning-900) r g b)',
          950: 'rgb(from var(--color-warning-950) r g b)'
        },
        danger: {
          50: 'rgb(from var(--color-danger-50) r g b)',
          100: 'rgb(from var(--color-danger-100) r g b)',
          200: 'rgb(from var(--color-danger-200) r g b)',
          300: 'rgb(from var(--color-danger-300) r g b)',
          400: 'rgb(from var(--color-danger-400) r g b)',
          500: 'rgb(from var(--color-danger-500) r g b)',
          600: 'rgb(from var(--color-danger-600) r g b)',
          700: 'rgb(from var(--color-danger-700) r g b)',
          800: 'rgb(from var(--color-danger-800) r g b)',
          900: 'rgb(from var(--color-danger-900) r g b)',
          950: 'rgb(from var(--color-danger-950) r g b)'
        }
      },
      fontFamily: {
        sans: ['var(--font-family-sans)'],
        mono: ['var(--font-family-mono)'],
        serif: ['var(--font-family-serif)']
      },
      spacing: {
        18: '4.5rem',
        88: '22rem'
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-slow': 'bounce 2s infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    }
  },
  plugins: []
}
