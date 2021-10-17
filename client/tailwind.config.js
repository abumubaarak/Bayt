module.exports = {
   purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
   darkMode: false, // or 'media' or 'class'
   theme: {
      flex: {
         1: "1 1 0%",
         2: "0 0 58%",
         3: "0 0 42%",
         4: "0 1 5%",
         5: "0 1 95%",
      },
      extend: {
         backgroundImage: (theme) => ({
            main: "url('/src/assets/background.jpg')",
            gradient:
               "linear-gradient(to right top, #8e89c2, #938fc6, #9995c9, #9e9ccd, #a4a2d0, #aaa8d3, #afadd6, #b5b3d9, #bbb9dc, #c2bfe0, #c8c6e3, #cecce7);",
         }),
         colors: {
            50: "#ddf2ff",
            100: "#aed4ff",
            200: "#7db8ff",
            300: "#4b9bff",
            400: "#1a7fff",
            500: "#0065e6",
            600: "#004fb4",
            700: "#003882",
            800: "#002251",
            900: "#000b21",
            sky: "#323250",
         },

         fontFamily: {
            sand: ["Quicksand", "ui-sans-serif", "system-ui", "-apple-system"],
            railway: ["Raleway", "ui-sans-serif", "system-ui", "-apple-system"],
         },
         width: {
            50: "50rem",
         },
         flex: {
            base: "0 0 70%",
         },
      },
   },
   variants: {
      extend: {},
   },
   plugins: [],
};
