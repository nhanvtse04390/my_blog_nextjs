import axiosClient from '../utils/axiosConfig';

export const login = async (user) => {
    try {
        const response = await axiosClient.post('/api/login', user,);
        
        localStorage.setItem("info", JSON.stringify(response.data.info));
        
        document.cookie = `token=${response.data.token}; path=/; Secure; SameSite=Strict`;
        document.cookie = `isAdmin=${response.data.info.isAdmin}; path=/; Secure; SameSite=Strict`;
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
