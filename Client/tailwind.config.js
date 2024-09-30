/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customPalette: {
          red: '#D36135',    // custom red
          blue: '#80A4ED',   // custom blue
          yellow: '#F9CB77', // custom yellow
          white: '#FFFFFF',  // white
          black: '#02020B',  // near black
        },
      },
      fontFamily: ['Poppins', 'sans-serif'],
    },
  },
  plugins: [],
}

