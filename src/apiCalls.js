import axios from "axios";
const apiUrl =
  process.env.REACT_APP_ENVIRONMENT == "DEV"
    ? process.env.REACT_APP_API_DEV_URI
    : process.env.REACT_APP_API_PROD_URI;

const Axios = axios.create({ baseURL: apiUrl });
export default Axios;
