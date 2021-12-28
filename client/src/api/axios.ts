import axios from "axios"
const { REACT_APP_BASE_URL: BASE_URL } = process.env;

const instance = axios.create({ baseURL: BASE_URL });

export default instance