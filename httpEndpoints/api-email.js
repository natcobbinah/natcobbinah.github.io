import { baseUrl, emailUrl } from "./constants";

const fetchClient = (url) => (resource) => (method) => (body) => (headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}) => (signal) => {
    return fetch(`${url}/${resource}`, {
        method: method,
        headers: headers,
        signal: signal,
        body: body && JSON.stringify(body),
    })
}

const apiUrl = fetchClient(baseUrl);
const httpPost = 'post';

const createUserAction = apiUrl(emailUrl)(httpPost);

const sendEmail = (body) => {
    return createUserAction(body)()()
                .then((res) => res.json());
}

export {
    sendEmail
};