import axios from "axios";

//baseURL: "http://localhost:5478",
// "https://shy-lime-dibbler-garb.cyclic.app:5478"

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000"
});

export default axiosInstance;
