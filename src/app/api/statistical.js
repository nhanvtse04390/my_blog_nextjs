import axiosClient from '../utils/axiosConfig';

export const getUsersByOrder = async ({page,rowsPerPage}) => {
    try {
        const response = await axiosClient.get(`/api/statistical?page=${page}&rowsPerPage=${rowsPerPage}`);
        return response;
    } catch (error) {
        throw error;
    }
};
