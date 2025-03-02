import axiosClient from '../utils/axiosConfig';

export const fetchData = async () => {
  const response = await axiosClient.get('express-production-0dd6.up.railway.app:8080/api/users');
  console.log("vao day chua",response)

  return response;
};  