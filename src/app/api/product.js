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
        const response = await axiosClient.get(`/api/product/list?page=${page}&rowsPerPage=${rowsPerPage}`);
        return response;
    } catch (error) {
        throw error;
    }
};


export const getProductById = async (id) => {
    try {
        const response = await axiosClient.get(`/api/product/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const removeImage = async (productId,imageUrl) => {
    console.log("productId",productId)
    console.log("imageUrl",imageUrl)
    try {
        const response = await axiosClient.put(`/api/${productId}/remove-image`, {imageUrl});
        return response;
    } catch (error) {
        throw error;
    }
}
