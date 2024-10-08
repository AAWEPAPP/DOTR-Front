import axios from "axios";

const API_URL = "http://jason.jhanson.us/api/Auth/register";

export const registerUser = async (formData) => {
	try {
		const response = await axios.post(`${API_URL}/register`, formData);
		return response.data;
	} catch (error) {
		console.error("Error registering user:", error);
		throw error;
	}
};
