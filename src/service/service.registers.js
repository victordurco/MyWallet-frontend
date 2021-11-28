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

const getUserRegisters = (token) => {
    return axios.get(`${API_URL}/registers`, makeConfig(token));
};

const postNewRegister = (token, body) => {
    return axios.post(`${API_URL}/registers`, body, makeConfig(token));
};

export { getUserRegisters, postNewRegister };
