/** @type {import('tailwindcss').Config} */
export const purge = ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'];
export const darkMode = false;
export const theme = {
  extend: {
    width: {
      '200': '200px',
      '400': '400px',
    }
  },
};
export const variants = {
  extend: {},
};
export const plugins = [];