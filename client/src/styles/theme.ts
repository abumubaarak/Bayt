import { extendTheme } from "@chakra-ui/react"
// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors: {
    brand: {
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
  },
})