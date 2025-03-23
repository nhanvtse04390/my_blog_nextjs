import axiosClient from '../utils/axiosConfig';

export const getUsers = async ({page,rowsPerPage}) => {
    try {
        const response = await axiosClient.get(`/api/users/list?page=${page}&rowsPerPage=${rowsPerPage}`);
        return response;
    } catch (error) {
        throw error;
    }
};

