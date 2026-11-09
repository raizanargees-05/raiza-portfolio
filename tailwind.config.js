/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        retro: {
          yellow: '#F0E85A',
          gold: '#F5C242',
          amber: '#F79E1B',
          red: '#D0003A',
          green: '#007A3D',
          dark: '#141516',
          darkSoft: '#1e2022',
          cream: '#FDF8E2',
          card: '#18191B',
        }
      },
      fontFamily: {
        display: ['"Dela Gothic One"', '"Bowlby One SC"', '"Bowlby One"', 'Impact', 'sans-serif'],
        mono: ['"Space Mono"', '"JetBrains Mono"', 'monospace'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px #141516',
        'brutal-lg': '8px 8px 0px 0px #141516',
        'brutal-red': '4px 4px 0px 0px #D0003A',
        'brutal-green': '4px 4px 0px 0px #007A3D',
      },
      animation: {
        'pulse-fast': 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
      }
    },
  },
  plugins: [],
}

