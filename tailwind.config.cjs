/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
    
      'tahiti': {
        primary: '#00CC99',
        dark: '#000000',
        grey: '#AEAEAE',
        white: '#FFFFFF',
        green: '#f0fdf4',
        red: '#FF0000',
        babyPink: '#f2f2f2',

      }},
    extend: {},
  },
  plugins:  [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          primary: "#f0fdf4",
          "primary-focus": "mediumblue",
        },
      },
    ],
  },
}