import axios from "axios";

const instance = axios.create({
   baseURL:
      !process.env.NODE_ENV || process.env.NODE_ENV === "development"
         ? process.env.REACT_APP_BASE_URL
         : process.env.REACT_APP_BASE_URL_PROD,
});

export default instance;
