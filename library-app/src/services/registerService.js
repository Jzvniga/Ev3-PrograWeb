import axios from 'axios';

const registerService = async (data) => {
  const response = await axios.post('http://localhost:8087/auth/register', data);
  return response.data;
};

export default registerService;