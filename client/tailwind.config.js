/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#002366',
        gold: '#D4AF37',
        pblue: '#B6D0E2',
        lblack: '#1D1D1D',
      }
    },
  },
  plugins: [],
}

