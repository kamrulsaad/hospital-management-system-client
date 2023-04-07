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
        darkGreen: '#213d33',
        lightGreen: '#00CC99',
        lightBlue: '#C9F7F5',
        cyan: '#1BC5BD ',
        blue: 'rgba(164, 238, 219, 0.56) ',
        mainBlue: '#3699FF',
        grey: '#F3F6F9',
        

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