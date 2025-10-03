/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'shake': 'shake 0.5s ease-in-out',
      },
      keyframes: {
        shake: {
          '0%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '50%': { transform: 'translateX(5px)' },
          '75%': { transform: 'translateX(-5px)' },
          '100%': { transform: 'translateX(0)' },
        }
      },
      boxShadow: {
        'nihil': '15px 15px 0 #fff',
        'nihil-lg': '20px 20px 0 #fff',
        'nihil-button': '0 5px 0 #000',
      }
    },
  },
  plugins: [],
}
