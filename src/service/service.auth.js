import axios from "axios";

const API_URL = process.env.REACT_APP_URL_API;

const makeConfig = (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    return config;
};

const registerUser = (name, email, password) => {
    const body = {
        name,
        email,
        password,
    };

    return axios.post(`${API_URL}/sign-up`, body);
};

const loginUser = (email, password) => {
    const body = {
        email,
        password,
    };

    return axios.post(`${API_URL}/sign-in`, body);
};

const logoutUser = (token) => {
    return axios.post(`${API_URL}/sign-out`, {}, makeConfig(token));
};

export { registerUser, loginUser, logoutUser };
