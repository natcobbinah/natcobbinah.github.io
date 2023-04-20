import axios from "axios";

async function sendForm_DataToMail(data) {
    return await axios.post("/api/sendMail", data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export default sendForm_DataToMail;