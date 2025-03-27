import axiosClient from '../utils/axiosConfig';

export const fetchData = async () => {
  try {
    const response = await axiosClient.get('/api/users');
    return response;
  } catch (error) {
    return error;
  }
};  