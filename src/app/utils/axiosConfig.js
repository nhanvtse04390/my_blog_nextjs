// src/utils/axiosConfig.js
import axios from 'axios';

// Tạo instance của axios
const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 60000,
});

// Thêm interceptor cho request
axiosClient.interceptors.request.use(
    (config) => {
        // Kiểm tra xem có phải môi trường client không
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Thêm interceptor cho response
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            return Promise.reject(error.response.data);
        } else if (error.request) {
            return Promise.reject({message: "Không thể kết nối đến server."});
        } else {
            return Promise.reject({message: "Đã có lỗi xảy ra!"});
        }
    }
);

export default axiosClient;