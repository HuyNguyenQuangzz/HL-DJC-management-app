import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    _id: string;
    username: string;
    level: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

export const login = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`${API_URL}/login`, { username, password });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Login failed' };
  }
};