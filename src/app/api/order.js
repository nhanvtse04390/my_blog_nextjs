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

export const getOrderById = async (id) => {
    try {
        const response = await axiosClient.get(`/api/order/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const updateOrder = async (id, orderStatus) => {
    try {
        const response = await axiosClient.put(`/api/order/${id}/edit`, {orderStatus :orderStatus});
        return response;
    } catch (error) {
        throw error;
    }
};