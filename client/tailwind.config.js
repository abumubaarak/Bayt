module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    flex:{
      '1': '1 1 0%',
      '2': '0 0 58%',
      '3': '0 0 42%',
      '4': '0 1 5%',
      '5': '0 1 95%',
      
    },
    extend: {
      backgroundImage: (theme) => ({
        main: "url('/src/assets/background.jpg')",
        gradient:"linear-gradient(to right top, #8e89c2, #938fc6, #9995c9, #9e9ccd, #a4a2d0, #aaa8d3, #afadd6, #b5b3d9, #bbb9dc, #c2bfe0, #c8c6e3, #cecce7);"
      }),
      colors: {
        50: "#eeedfe",
        100: "#cecce7",
        200: "#acabd4",
        300: "#8e89c2",
        400: "#7367af",
        500: "#5e4e96",
        600: "#4d3c75",
        700: "#3a2b54",
        800: "#241935",
        900: "#0f0817",
      },
     
      fontFamily: {
        'sand': ['Quicksand','ui-sans-serif', 'system-ui', '-apple-system'],
        'railway':['Raleway','ui-sans-serif', 'system-ui', '-apple-system']
      },
      width:{
        '50':'50rem'
      },
      flex:{
        'base':'0 0 70%'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
