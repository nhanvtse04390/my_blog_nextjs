import axiosClient from '../utils/axiosConfig';

export const fetchData = async () => {
  const response = await axiosClient.get('http://localhost:8080/api/users');
  console.log("vao day chua",response)

  return response;
};