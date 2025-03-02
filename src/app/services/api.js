import axiosClient from '../utils/axiosConfig';

export const fetchData = async () => {
  const response = await axiosClient.get('https://express-production-0dd6.up.railway.app/api/users');
  console.log("vao day chua",response)

  return response;
};  