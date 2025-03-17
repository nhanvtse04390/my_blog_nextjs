import axiosClient from '../utils/axiosConfig';

export const addNewProduct = async (Product) => {
    try {
        const response = await axiosClient.post('/api/product/add-new', Product);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getProduct = async ({page,rowsPerPage}) => {
    try {
        const response = await axiosClient.get(`/api/product/list?page=${page}&limit=${rowsPerPage}`);
        return response;
    } catch (error) {
        throw error;
    }
};
