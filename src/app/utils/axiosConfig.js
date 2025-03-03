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
    // Xử lý response thành công
    return response.data;
  },
  (error) => {
    // Xử lý lỗi
    if (error.response) {
      // Lỗi từ phía server (ví dụ: 404, 500)
      console.error('Server Error:', error.response.data);
    } else if (error.request) {
      // Lỗi không nhận được phản hồi từ server
      console.error('Network Error:', error.message);
    } else {
      // Lỗi khác
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;