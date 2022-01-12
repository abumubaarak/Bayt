import axios from "axios";

const instance =
   !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? axios
      : axios.create({ baseURL: process.env.REACT_APP_BASE_URL_PROD });


export default instance;
