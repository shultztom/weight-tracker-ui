import axios from "axios";

const VERIFY_URL = process.env.REACT_APP_AUTH_URL + '/verify';

export function verifyToken (token) {
    const axiosConfig = {
        method: "GET",
        url: VERIFY_URL,
        headers: {
            'x-auth-token': token
        }
    }

    return axios(axiosConfig);
}