import axiosClient from '../utils/axiosConfig';

export const createOrder = async (params) => {
    try {
        const response = await axiosClient.post('/api/order/add-new',params);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getListOrder = async ({page,rowsPerPage}) => {
    try {
        const response = await axiosClient.get(`/api/order/list?page=${page}&rowsPerPage=${rowsPerPage}`);
        return response;
    } catch (error) {
        throw error;
    }
};
