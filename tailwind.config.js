/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'PrimaryNormal': '#E54646',
        'InactiveNormal': '#D9D9D9',
        'InactiveDarker': '#4C4C4C',
        'InactiveLight': '#F6F3F3',
        'SecondaryDarker': '#090F30'
      },
      fontFamily: {
        inter: ["Inter"],
      },
    },
  },
  plugins: [],
}

