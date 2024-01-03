/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  media: false, // darkMode: false
  theme: {
    extend: {
      width: {
        '200': '200px',
        '400': '400px',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: []
}