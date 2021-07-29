import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./styles/theme";
import { Provider } from "react-redux";
import {store} from "./redux/store";

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
