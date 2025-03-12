import axiosClient from '../utils/axiosConfig';

export const login = async (user) => {
    try {
        const response = await axiosClient.post('/api/login', user);
        console.log("response",response)
        return response;
    } catch (error) {
        throw error;
    }
};

export const register = async (user) => {
    try {
        const response = await axiosClient.post('/api/register', user);
        return response;
    } catch (error) {
        throw error;
    }
};