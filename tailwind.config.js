/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto', 'Arial', 'sans-serif'],
      },
      colors: {
        youtube: {
          red: '#FF0000',
          darkRed: '#CC0000',
          dark: '#0f0f0f',
          darkSurface: '#212121',
          darkBorder: '#3f3f3f',
          darkHover: '#3f3f3f',
          lightGray: '#f9f9f9',
          textPrimary: '#0f0f0f',
          textSecondary: '#606060',
          textDark: '#ffffff',
          textDarkSecondary: '#aaaaaa',
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
}

