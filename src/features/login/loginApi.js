import axios from "axios";

const LOGIN_URL = 'https://auth-api-go.shultzlab.com/login';
//const LOGIN_URL = 'http://localhost:8080/login';

export function attemptLogin (username, password) {
    const axiosConfig = {
        method: "POST",
        url: LOGIN_URL,
        data: {
            username,
            password
        }
    }

    return axios(axiosConfig);
}
