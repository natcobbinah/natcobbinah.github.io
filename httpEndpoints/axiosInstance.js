import axios from "axios";

//baseURL: "http://localhost:5478",

const axiosInstance = axios.create({
    baseURL: "https://shy-lime-dibbler-garb.cyclic.app:5478"
  });
  
  export default axiosInstance;
  