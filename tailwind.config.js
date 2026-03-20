/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bimini: {
          50:  '#e0f7f4',
          100: '#b2ede5',
          200: '#80e1d4',
          300: '#4dd4c2',
          400: '#26cab5',
          500: '#00bfa8',
          600: '#00a896',
          700: '#008f7e',
          800: '#007766',
          900: '#00503f',
        },
        sunset: {
          100: '#fff3e0',
          300: '#ffb74d',
          500: '#ff6d00',
          700: '#e65100',
          900: '#bf360c',
        },
        night: {
          900: '#0a0e0d',
          800: '#111918',
          700: '#1a2422',
          600: '#243330',
        },
      },
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
        accent:  ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}