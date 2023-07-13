/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'PrimaryNormal': '#E54646',
        'InactiveNormal': '#D9D9D9',
        'InactiveDarkActive':'#626262',
        'InactiveDark':'#A3A3A3',
        'InactiveDarker': '#4C4C4C',
        'InactiveLight': '#F6F3F3',
        'InactiveLightActive': '#F3F3F3',
        'SecondaryNormal': '#1A2B88',
        'SecondaryDarker': '#090F30',
        'textHitam': '#2D2D2D',
        'SuccessNormal': '#4BB543',
        'SuccessLight': '#EDF8EC',
        'OTPHitam': '#2B2B2B',
        'backgroundHome': '#F8F8F8',
        'backgroundHomeItem': '#F7C6C6',
        'clockBackground': '#D9D9D9',
        'WarningNormal': '#F0AD4E'
      },
      fontFamily: {
        inter: ["Inter"],
      },
    },
  },
  plugins: [],
}

