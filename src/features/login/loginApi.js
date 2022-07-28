import axios from "axios";

const LOGIN_URL = process.env.REACT_APP_AUTH_URL + '/login';

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
