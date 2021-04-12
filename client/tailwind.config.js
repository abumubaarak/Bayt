module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    flex:{
      '1': '1 1 0%',
      '2': '0 0 58%',
      '3': '0 0 42%'
    },
    extend: {
      backgroundImage: (theme) => ({
        main: "url('/src/assets/background.jpg')",
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
