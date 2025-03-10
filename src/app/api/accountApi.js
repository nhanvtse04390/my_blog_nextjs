import axiosClient from '../utils/axiosConfig';

export const login = async (user) => {
    try {
        const response = await axiosClient.post('/api/login',user);
        return response;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};