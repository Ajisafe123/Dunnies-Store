import axios, { AxiosError } from 'axios';

const API_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_LOCAL_URL || 'http://localhost:3000'
    : process.env.NEXT_PUBLIC_DEPLOY_URL || 'https://dunnies-store.vercel.app';

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        throw new Error(axiosError.response?.data?.message || 'Login failed');
    }
};

export const register = async (userData: any) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/register`, userData);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        throw new Error(axiosError.response?.data?.message || 'Registration failed');
    }
};

export const logout = async () => {
    try {
        await axios.post(`${API_URL}/api/auth/logout`);
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        throw new Error(axiosError.response?.data?.message || 'Logout failed');
    }
};

export const getCurrentUser = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/auth/current`);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        throw new Error(axiosError.response?.data?.message || 'Failed to fetch current user');
    }
};
