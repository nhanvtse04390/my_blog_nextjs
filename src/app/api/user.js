import axiosClient from '../utils/axiosConfig';

export const getUsers = async ({page,rowsPerPage}) => {
    try {
        const response = await axiosClient.get(`/api/users/list?page=${page}&rowsPerPage=${rowsPerPage}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getUserById = async (id) => {
    try {
        const response = await axiosClient.get(`/api/users/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const editUserByID = async (user) => {
    try {
        const response = await axiosClient.put('/api/users/edit',user);
        return response;
    } catch (error) {
        throw error;
    }
};