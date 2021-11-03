import axios from "axios";

const API_URL = "https://backmywallet.herokuapp.com";

const makeConfig = (token) => {
	const config = {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	};
	
	return config;
};

const getUserRegisters = (token) => {
    return axios.get(`${API_URL}`, makeConfig(token));
};

const postNewRegister = (token, body) => {
    return axios.post(`${API_URL}`, body, makeConfig(token));
};

export{
    getUserRegisters,
    postNewRegister
}