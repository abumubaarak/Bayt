import { extendTheme } from "@chakra-ui/react";
// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors: {
    brand: {
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
      sky:"#323250"
    }
  },
});
