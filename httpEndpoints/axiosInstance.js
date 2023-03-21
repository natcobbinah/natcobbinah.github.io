import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5478",
  });
  
  export default axiosInstance;
  