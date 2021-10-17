import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { store } from "./redux/store";
import "./styles/fonts.css";
import { theme } from "./styles/theme";
 
ReactDOM.render(
   <BrowserRouter>
      <React.StrictMode>
         <ChakraProvider theme={theme}>
            <Provider store={store}>
               <App />
            </Provider>
         </ChakraProvider>
      </React.StrictMode>
   </BrowserRouter>,
   document.getElementById("root")
);
