import axiosClient from '../utils/axiosConfig';

export const createOrder = async (params) => {
    try {
        const response = await axiosClient.post('/api/order/add-new',params);
        return response;
    } catch (error) {
        throw error;
    }
};
