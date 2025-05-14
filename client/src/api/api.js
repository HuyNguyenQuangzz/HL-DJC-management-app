import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

export const signup = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Signup failed" };
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}/logout`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Logout failed" };
  }
};

export const resetPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password`, {
      email,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Reset password failed" };
  }
};