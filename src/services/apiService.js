import axios from "axios";

const EVENT_URL = "https://dotr.jhanson.us/api/Events/";
const USER_URL = "https://dotr.jhanson.us/api/Users/";

// Auth
export const registerUser = async (formData) => {
	try {
		const response = await axios.post(
			`https://dotr.jhanson.us/api/Auth/register`,
			formData
		);
		return response.data;
	} catch (error) {
		console.error("Error registering user:", error);
		throw error;
	}
};

export const loginUser = async (email, password) => {
	try {
		const response = await axios.post(
			"https://dotr.jhanson.us/api/Auth/login",
			{
				email: email,
				password: password,
			},
			{
				withCredentials: true,
			}
		);
		console.log("Login successful:", response.data);
		return response.data;
	} catch (error) {
		console.error("Error logging in user:", error);
		throw error;
	}
};

export const logout = async () => {
	try {
		const response = await axios.post(
			"https://dotr.jhanson.us/api/Auth/logout",
			{},
			{
				withCredentials: true,
			}
		);
		return response;
	} catch (error) {
		console.error("Error logging out user:", error);
		throw error;
	}
};

// Users

export const getUsers = async () => {
	try {
		const response = await axios.get(USER_URL, {
			withCredentials: true,
		});
		return response.data;
	} catch (error) {
		console.error("Error getting users:", error);
		throw error;
	}
};

export const getUserById = async (id) => {
	try {
		const response = await axios.get(`${USER_URL}${id}`, {
			withCredentials: true,
		});
		return response.data;
	} catch (error) {
		console.error("Error getting user by ID:", error);
		throw error;
	}
};

export const updateUser = async (id, formData) => {
	try {
		const response = await axios.put(
			`https://dotr.jhanson.us/api/Users/${id}`,
			formData,
			{
				withCredentials: true,
			}
		);
		return response.data;
	} catch (error) {
		console.error("Error updating user:", error);
		throw error;
	}
};

// Events
export const getAllEvents = async () => {
	try {
		const response = await axios.get(EVENT_URL, {
			headers: {
				"Access-Control-Allow-Origin": "https://localhost:5173",
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error getting events:", error);
		throw error;
	}
};

export const getLandingEvents = async () => {
	try {
		const response = await axios.get(EVENT_URL);
		return response.data;
	} catch (error) {
		console.error("Error getting events:", error);
		throw error;
	}
};

export const getEventById = async (id) => {
	try {
		const response = await axios.get(
			`https://dotr.jhanson.us/api/Events/${id}`,
			{
				withCredentials: true,
			}
		);
		return response.data;
	} catch (error) {
		console.error("Error getting event by ID:", error);
		throw error;
	}
};

export const createEvent = async (formData) => {
	try {
		const response = await axios.post(EVENT_URL, formData, {
			withCredentials: true,
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error creating event:", error);
		throw error;
	}
};

export const updateEvent = async (id, formData) => {
	try {
		const response = await axios.put(
			`https://dotr.jhanson.us/api/Events/${id}`,
			formData,
			{
				withCredentials: true,
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error("Error updating event:", error);
		throw error;
	}
};

export const deleteEvent = async (id) => {
	try {
		await axios.delete(`https://dotr.jhanson.us/api/Events/${id}`, {
			withCredentials: true,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		console.error("Error deleting event:", error);
		throw error;
	}
};

export const validateAuthToken = async () => {
	try {
		const response = await axios.post(
			"https://dotr.jhanson.us/api/Auth/auth",
			{
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			}
		);

		console.log("Validation successful:", response.data);
	} catch (error) {
		console.error("Validation failed:", error);
	}
};
export async function getRoles() {
	try {
		// const response = await axios.get("/api/Users/roles");
		const response = [
			{ id: 1, name: "Admin" },
			{ id: 2, name: "User" },
		];
		return response;
	} catch (error) {
		console.error("Error fetching roles:", error);
		throw error;
	}
}
