import axios from "axios";

const API_URL = "http://localhost:4000";

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

export { registerUser, loginUser };
