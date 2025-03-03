import axiosClient from '../utils/axiosConfig';

export const fetchData = async () => {
  console.log("process.env.NEXT_PUBLIC_API",process.env.NEXT_PUBLIC_API)
  try {
    const response = await axiosClient.get('/api/users');
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};  