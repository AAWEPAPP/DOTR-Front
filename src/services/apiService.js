import axios from "axios";

const AUTH_URL = "http://jason.jhanson.us/api/Auth/";
const EVENT_URL = "http://jason.jhanson.us/api/Events/";
const USER_URL = "http://jason.jhanson.us/api/Users/";

const URLs = {
	LOGIN: `${AUTH_URL}/login`,
	REGISTER: `${AUTH_URL}/register`,
};

// Auth
export const registerUser = async (formData) => {
	try {
		const response = await axios.post(`${API_URL}/register`, formData);
		return response.data;
	} catch (error) {
		console.error("Error registering user:", error);
		throw error;
	}
};

export const loginUser = async (email, password) => {
	try {
		const response = await axios.post(URLs.LOGIN, email, password);
		return response.data;
	} catch (error) {
		console.error("Error logging in user:", error);
		throw error;
	}
};

// Users

export const getUsers = async () => {
	try {
		const response = await axios.get(USER_URL);
		return response.data;
	} catch (error) {
		console.error("Error getting users:", error);
		throw error;
	}
};

export const updateUser = async (id, formData) => {
	try {
		const response = await axios.put(`${USER_URL}/${id}`, formData);
		return response.data;
	} catch (error) {
		console.error("Error updating user:", error);
		throw error;
	}
};

// Events
export const getAllEvents = async () => {
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
			"http://jason.jhanson.us/api/Events/".replace("{id}", id)
		);
		return response.data;
	} catch (error) {
		console.error("Error getting event by ID:", error);
		throw error;
	}
};

export const createEvent = async (formData) => {
	try {
		const response = await axios.post(EVENT_URL, formData);
		return response.data;
	} catch (error) {
		console.error("Error creating event:", error);
		throw error;
	}
};

export const updateEvent = async (id, formData) => {
	try {
		const response = await axios.put(
			URLs.GET_EVENTS_BY_ID.replace("{id}", id),
			formData
		);
		return response.data;
	} catch (error) {
		console.error("Error updating event:", error);
		throw error;
	}
};

export const deleteEvent = async (id) => {
	try {
		await axios.delete(URLs.GET_EVENTS_BY_ID.replace("{id}", id));
	} catch (error) {
		console.error("Error deleting event:", error);
		throw error;
	}
};
