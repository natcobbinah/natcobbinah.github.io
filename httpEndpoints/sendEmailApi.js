import axiosInstance from "./axiosInstance";

function sendForm_DataToMail(data){
    return axiosInstance.post("/api/sendMail",data);
}

export default sendForm_DataToMail;